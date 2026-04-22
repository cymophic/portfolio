import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client();
const API_BASE = "https://api.monkeytype.com/users/personalBests";

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const token = process.env.MONKEYTYPE_API_KEY;
    const headers = { Authorization: `ApeKey ${token}` };

    const [res15, res60] = await Promise.all([
      fetch(`${API_BASE}?mode=time&mode2=15`, { headers }),
      fetch(`${API_BASE}?mode=time&mode2=60`, { headers }),
    ]);

    if (!res15.ok) throw new Error(`Monkeytype API error: ${res15.status}`);
    if (!res60.ok) throw new Error(`Monkeytype API error: ${res60.status}`);

    const [{ data: data15 }, { data: data60 }] = await Promise.all([res15.json(), res60.json()]);

    const pick = (entry) => {
      if (!entry) return null;
      return { wpm: entry.wpm, acc: entry.acc, consistency: entry.consistency, timestamp: entry.timestamp };
    };

    const payload = {
      time: {
        15: pick(data15?.[0]),
        60: pick(data60?.[0]),
      },
    };

    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: "stats/monkeytype.json",
      Body: JSON.stringify(payload),
      ContentType: "application/json",
    }));

    return response(200, { ok: true });
  } catch (error) {
    console.error("Monkeytype Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};