const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

let cache = null;
let cacheTime = null;

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const now = Date.now();
    if (cache && cacheTime && now - cacheTime < CACHE_TTL) return cache;

    const token = process.env.MONKEYTYPE_API_KEY;
    const headers = { Authorization: `ApeKey ${token}` };

    const [res15, res60] = await Promise.all([
      fetch("https://api.monkeytype.com/users/personalBests?mode=time&mode2=15", { headers }),
      fetch("https://api.monkeytype.com/users/personalBests?mode=time&mode2=60", { headers }),
    ]);

    if (!res15.ok) throw new Error(`Monkeytype API error: ${res15.status}`);
    if (!res60.ok) throw new Error(`Monkeytype API error: ${res60.status}`);

    const [{ data: data15 }, { data: data60 }] = await Promise.all([res15.json(), res60.json()]);
    console.log("data15:", JSON.stringify(data15));
    console.log("data60:", JSON.stringify(data60));

    const pick = (entry) => {
      if (!entry) return null;
      return { wpm: entry.wpm, acc: entry.acc, consistency: entry.consistency, timestamp: entry.timestamp };
    };

    cache = response(200, {
      time: {
        15: pick(data15?.[0]),
        60: pick(data60?.[0]),
      },
    });
    cacheTime = now;
    return cache;
  } catch (error) {
    console.error("Monkeytype Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};