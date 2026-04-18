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

    const [monthlyRes, yearlyRes, weeklyRes, todayRes] = await Promise.all([
      fetch("https://wakatime.com/api/v1/users/current/stats/last_30_days", { headers }),
      fetch("https://wakatime.com/api/v1/users/current/stats/last_year", { headers }),
      fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", { headers }),
      fetch("https://wakatime.com/api/v1/users/current/summaries?range=today", { headers }),
    ]);

    if (!monthlyRes.ok) throw new Error(`WakaTime API error: ${monthlyRes.status}`);
    if (!yearlyRes.ok) throw new Error(`WakaTime API error: ${yearlyRes.status}`);
    if (!weeklyRes.ok) throw new Error(`WakaTime API error: ${weeklyRes.status}`);
    if (!todayRes.ok) throw new Error(`WakaTime API error: ${todayRes.status}`);

    const [monthly, yearly, weekly, today] = await Promise.all([
      monthlyRes.json(), yearlyRes.json(), weeklyRes.json(), todayRes.json()
    ]);

    if (monthly.error || yearly.error || weekly.error || today.error) {
      return response(500, { error: "WakaTime API error" });
    }

    const toHours = (seconds) => Math.round(seconds / 3600);

    cache = response(200, {
      today: toHours(today.data.reduce((sum, day) => sum + day.grand_total.total_seconds, 0)),
      weekly: toHours(weekly.data.total_seconds),
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