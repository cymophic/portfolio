import type { Week } from "./github";

export type GitlabData = {
  contributions: number;
  commits: number;
  weeks: Week[];
};

export async function fetchGitlabData(): Promise<GitlabData | null> {
  const url = process.env.NEXT_PUBLIC_CDN_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/stats/gitlab.json`);
    if (!res.ok) return null;
    const result = await res.json();
    if (result.contributions == null) return null;
    return {
      contributions: result.contributions,
      commits: result.commits ?? 0,
      weeks: result.weeks ?? [],
    };
  } catch {
    return null;
  }
}