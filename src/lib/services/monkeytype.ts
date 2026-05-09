export type MonkeytypeStats = {
  wpm: number;
  acc: number;
  consistency: number;
};

export async function fetchMonkeytypeStats(): Promise<MonkeytypeStats | null> {
  const url = process.env.NEXT_PUBLIC_CDN_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/stats/monkeytype.json`);
    const result = await res.json();
    return result.time?.["60"] ?? result.time?.["15"] ?? null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}
