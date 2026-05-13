// Utility function for conditionally joining class names
export function cn(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(" ");
}
