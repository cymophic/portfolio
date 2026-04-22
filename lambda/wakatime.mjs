import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client();
const API_BASE = "https://wakatime.com/api/v1/users/current";

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const token = process.env.WAKATIME_API_KEY;
    const headers = { Authorization: `Basic ${Buffer.from(token).toString("base64")}` };

    const [monthlyRes, yearlyRes, weeklyRes, todayRes] = await Promise.all([
      fetch(`${API_BASE}/stats/last_30_days`, { headers }),
      fetch(`${API_BASE}/stats/last_year`, { headers }),
      fetch(`${API_BASE}/stats/last_7_days`, { headers }),
      fetch(`${API_BASE}/summaries?range=today`, { headers }),
    ]);

    if (!monthlyRes.ok) throw new Error(`WakaTime API error: ${monthlyRes.status}`);
    if (!yearlyRes.ok) throw new Error(`WakaTime API error: ${yearlyRes.status}`);
    if (!weeklyRes.ok) throw new Error(`WakaTime API error: ${weeklyRes.status}`);
    if (!todayRes.ok) throw new Error(`WakaTime API error: ${todayRes.status}`);

    const [monthly, yearly, weekly, today] = await Promise.all([
      monthlyRes.json(), yearlyRes.json(), weeklyRes.json(), todayRes.json(),
    ]);

    if (monthly.error || yearly.error || weekly.error || today.error) {
      return response(500, { error: "WakaTime API error" });
    }

    const toHours = (seconds) => Math.round(seconds / 3600);

    const payload = {
      today: toHours(today.data.reduce((sum, day) => sum + day.grand_total.total_seconds, 0)),
      weekly: toHours(weekly.data.total_seconds),
      monthly: toHours(monthly.data.total_seconds),
      yearly: toHours(yearly.data.total_seconds),
    };

    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: "stats/wakatime.json",
      Body: JSON.stringify(payload),
      ContentType: "application/json",
    }));

    return response(200, { ok: true });
  } catch (error) {
    console.error("WakaTime Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};