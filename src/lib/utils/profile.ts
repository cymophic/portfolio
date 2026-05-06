// Calculates the exact age in years from a birth date string
export function getAge(dateOfBirth: string): string {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  const age = diff / (1000 * 60 * 60 * 24 * 365.25);
  return age.toFixed(7);
}

// Calculates the number of days until the next birthday from a birth date string
export function getDaysUntilBirthday(dateOfBirth: string): number {
  const now = new Date();
  const birth = new Date(dateOfBirth);
  const next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (next <= now) next.setFullYear(now.getFullYear() + 1);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// Returns the UTC/GMT offset string for a given timezone
export function getTimezoneOffset(
  timeZone: string,
  prefix: "GMT" | "UTC" = "GMT",
  padded: boolean = false,
): string {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: padded ? "longOffset" : "shortOffset",
  });
  const parts = formatter.formatToParts(date);
  const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  return offset.replace("GMT", `${prefix} `);
}

// Returns the current local time and UTC offset for a given timezone
export function getLocalTime(timeZone: string): {
  time: string;
  offset: string;
} {
  return {
    time: new Date().toLocaleTimeString("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    }),
    offset: getTimezoneOffset(timeZone, "UTC", true),
  };
}
