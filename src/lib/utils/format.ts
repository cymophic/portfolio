// Returns a number with its ordinal suffix (e.g. 1 → "1st", 2 → "2nd", 3 → "3rd")
export function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

// Formats an ISO date string to a short month/year label (e.g "Jan 2026")
export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
