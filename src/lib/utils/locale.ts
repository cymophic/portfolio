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
