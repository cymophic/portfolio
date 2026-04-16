export const handler = async () => {
  const token = process.env.WAKATIME_API_KEY;
  const headers = { Authorization: `Basic ${Buffer.from(token).toString("base64")}` };

  const [monthlyRes, yearlyRes] = await Promise.all([
    fetch("https://wakatime.com/api/v1/users/current/stats/last_30_days", { headers }),
    fetch("https://wakatime.com/api/v1/users/current/stats/last_year", { headers }),
  ]);

  const [monthly, yearly] = await Promise.all([monthlyRes.json(), yearlyRes.json()]);

  if (monthly.error || yearly.error) {
    return { statusCode: 500, body: JSON.stringify({ error: "WakaTime API error" }) };
  }

  const toHours = (seconds) => Math.round(seconds / 3600);

  return {
    statusCode: 200,
    body: JSON.stringify({
      monthly: toHours(monthly.data.total_seconds),
      yearly: toHours(yearly.data.total_seconds),
    }),
  };
};