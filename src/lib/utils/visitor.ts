// Detects the user's operating system from the browser's navigator API
export function getDeviceOS(): string {
  const platform =
    (navigator as Navigator & { userAgentData?: { platform: string } })
      .userAgentData?.platform ??
    navigator.platform ??
    "";
  const os_types: Record<string, string> = {
    Win: "Windows",
    Mac: "MacOS",
    Linux: "Linux",
    Android: "Android",
    iPhone: "iOS",
    iPad: "iOS",
  };

  for (const [key, value] of Object.entries(os_types)) {
    if (platform.includes(key)) return value;
  }
  return "unknown";
}
