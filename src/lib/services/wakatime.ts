export type WakatimeStats = {
  today: number;
  weekly: number;
  monthly: number;
  yearly: number;
};

export async function fetchWakatimeStats(): Promise<WakatimeStats | null> {
  const url = process.env.NEXT_PUBLIC_CDN_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/stats/wakatime.json`);
    const result = await res.json();
    return result.monthly != null &&
      result.yearly != null &&
      result.weekly != null
      ? result
      : null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}
