const CACHE_TTL = 60 * 60 * 1000; // 1 hour

let cache = null;
let cacheTime = null;

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const now = Date.now();
    if (cache && cacheTime && now - cacheTime < CACHE_TTL) return cache;

    const token = process.env.WAKATIME_API_KEY;
    const headers = { Authorization: `Basic ${Buffer.from(token).toString("base64")}` };

    const [monthlyRes, yearlyRes] = await Promise.all([
      fetch("https://wakatime.com/api/v1/users/current/stats/last_30_days", { headers }),
      fetch("https://wakatime.com/api/v1/users/current/stats/last_year", { headers }),
    ]);

    if (!monthlyRes.ok) throw new Error(`WakaTime API error: ${monthlyRes.status}`);
    if (!yearlyRes.ok) throw new Error(`WakaTime API error: ${yearlyRes.status}`);

    const [monthly, yearly] = await Promise.all([monthlyRes.json(), yearlyRes.json()]);

    if (monthly.error || yearly.error) {
      return response(500, { error: "WakaTime API error" });
    }

    const toHours = (seconds) => Math.round(seconds / 3600);

    cache = response(200, {
      monthly: toHours(monthly.data.total_seconds),
      yearly: toHours(yearly.data.total_seconds),
    });
    cacheTime = now;
    return cache;
  } catch (error) {
    console.error("WakaTime Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};