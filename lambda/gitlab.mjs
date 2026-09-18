import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client();
const HISTORY_KEY = "stats/gitlab/history.json";
const OUTPUT_KEY = "stats/gitlab.json";

const WINDOW_DAYS = 365;
const PER_PAGE = 100;
const MAX_PAGES = 20;
const EXPIRY_WARNING_DAYS = 30;

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

const DEFAULT_TIMEZONE = "Asia/Manila";
// Marker for re-bucketing history when the timezone config changes
const SCHEMA_META = "__meta__";

const timeZone = process.env.GITLAB_TIMEZONE || DEFAULT_TIMEZONE;

const localDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone,
  weekday: "short",
});

// Local calendar date (YYYY-MM-DD) for a given ISO timestamp
function localDateOf(iso) {
  return localDateFormatter.format(new Date(iso));
}

// Midnight UTC of the Sunday that starts the local week for a YYYY-MM-DD date
function localSunday(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  const idx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    weekdayFormatter.format(base),
  );
  return new Date(Date.UTC(y, m - 1, d - idx));
}

function mergeMax(existing, incoming) {
  const merged = { ...existing };
  for (const [date, count] of Object.entries(incoming)) {
    merged[date] = Math.max(merged[date] || 0, count);
  }
  return merged;
}

async function getJson(baseUrl, path, token) {
  return fetch(`${baseUrl}/api/v4${path}`, {
    headers: { "PRIVATE-TOKEN": token },
  });
}

async function readHistory(bucket) {
  try {
    const res = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: HISTORY_KEY }),
    );
    const body = await res.Body.transformToString();
    return JSON.parse(body) || {};
  } catch (error) {
    if (error.name === "NoSuchKey") return {};
    throw error;
  }
}

async function resolveUser(baseUrl, username, token) {
  const res = await getJson(
    baseUrl,
    `/users?username=${encodeURIComponent(username)}`,
    token,
  );
  if (res.status === 401) throw new Error("401 - token invalid or revoked");
  if (res.status === 404) throw new Error("404 - user lookup failed");

  if (!res.ok) throw new Error(`user lookup ${res.status}`);

  const users = await res.json();
  const user = users.find((u) => u.username === username);
  if (!user) throw new Error(`username '${username}' not found`);
  return user;
}

async function fetchEvents(baseUrl, userId, token, startDate) {
  const events = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await getJson(
      baseUrl,
      `/users/${userId}/events?per_page=${PER_PAGE}&page=${page}&after=${startDate}`,
      token,
    );
    if (!res.ok) throw new Error(`events ${res.status}`);

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    events.push(...batch);

    const nextPage = res.headers.get("x-next-page");
    if (!nextPage) break;
  }

  return events;
}

async function checkTokenExpiry(baseUrl, token, name) {
  try {
    const res = await getJson(baseUrl, "/personal_access_tokens/self", token);
    if (!res.ok) return;

    const info = await res.json();
    if (!info.expires_at) return;

    const daysLeft = Math.ceil(
      (new Date(`${info.expires_at}T00:00:00Z`) - Date.now()) / 86400000,
    );
    if (daysLeft <= EXPIRY_WARNING_DAYS) {
      console.warn(
        `[gitlab-${name}] token expires in ${daysLeft} days (${info.expires_at})`,
      );
    }
  } catch (error) {
    console.error(`[gitlab-${name}] expiry check failed: ${error.message}`);
  }
}

function buildOutput(history, startDate) {
  const byDate = {};
  const commitsByDate = {};

  for (const [name, days] of Object.entries(history)) {
    if (name === SCHEMA_META) continue;

    const contributions = days.contributions ?? days;
    const commits = days.commits ?? {};
    for (const [date, count] of Object.entries(contributions)) {
      if (date >= startDate) byDate[date] = (byDate[date] || 0) + count;
    }
    for (const [date, count] of Object.entries(commits)) {
      if (date >= startDate) {
        commitsByDate[date] = (commitsByDate[date] || 0) + count;
      }
    }
  }

  let contributions = 0;
  for (const count of Object.values(byDate)) contributions += count;

  let commits = 0;
  for (const count of Object.values(commitsByDate)) commits += count;

  const weeks = [];

  if (Object.keys(byDate).length > 0) {
    const cursor = localSunday(startDate);
    const lastSunday = localSunday(localDateOf(new Date().toISOString()));

    while (cursor <= lastSunday) {
      const contributionDays = [];
      for (let i = 0; i < 7; i++) {
        const date = cursor.toISOString().slice(0, 10);
        contributionDays.push({
          date,
          contributionCount: byDate[date] || 0,
        });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
      weeks.push({ contributionDays });
    }
  }

  return { contributions, commits, weeks };
}

export const handler = async () => {
  const bucket = process.env.S3_BUCKET_NAME;

  let instances = [];
  try {
    instances = JSON.parse(process.env.GITLAB_INSTANCES || "[]");
  } catch (error) {
    console.error("Invalid GITLAB_INSTANCES JSON:", error);
  }

  const history = await readHistory(bucket);

  const startDate = localDateOf(
    new Date(Date.now() - WINDOW_DAYS * 86400000).toISOString(),
  );

  const meta = history[SCHEMA_META];
  const rebucket = !meta || meta.timezone !== timeZone;
  history[SCHEMA_META] = { timezone: timeZone };

  for (const instance of instances) {
    const { name, baseUrl, username, token } = instance;

    try {
      const user = await resolveUser(baseUrl, username, token);
      const events = await fetchEvents(baseUrl, user.id, token, startDate);
      if (rebucket) delete history[name];

      const dayCounts = {};
      const commitCounts = {};
      for (const event of events) {
        const date = localDateOf(event.created_at);
        dayCounts[date] = (dayCounts[date] || 0) + 1;
        const pushCommits = event.push_data?.commit_count;
        if (Number.isInteger(pushCommits) && pushCommits > 0) {
          commitCounts[date] = (commitCounts[date] || 0) + pushCommits;
        }
      }

      history[name] = history[name] || {};
      let stored = history[name];
      if (!stored.contributions) {
        stored = { contributions: stored, commits: {} };
      }
      stored.contributions = mergeMax(stored.contributions, dayCounts);
      stored.commits = mergeMax(stored.commits ?? {}, commitCounts);
      history[name] = stored;

      await checkTokenExpiry(baseUrl, token, name);

      const totalCommits = Object.values(commitCounts).reduce(
        (sum, count) => sum + count,
        0,
      );
      console.log(
        `[gitlab-${name}] ${events.length} events, ${totalCommits} commits, ${Object.keys(dayCounts).length} active days`,
      );
    } catch (error) {
      console.error(`[gitlab-${name}] failed: ${error.message}`);
    }
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: HISTORY_KEY,
      Body: JSON.stringify(history),
      ContentType: "application/json",
      CacheControl: "max-age=1800",
    }),
  );

  const hasData = Object.entries(history).some(
    ([name, days]) => name !== SCHEMA_META && Object.keys(days).length > 0,
  );
  if (hasData) {
    const output = buildOutput(history, startDate);
  await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: OUTPUT_KEY,
        Body: JSON.stringify(output),
        ContentType: "application/json",
        CacheControl: "max-age=1800",
      }),
    );
  }

  return response(200, { ok: true });
};