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
