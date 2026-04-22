export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type Week = {
  contributionDays: ContributionDay[];
};

export type GithubData = {
  contributions: number;
  totalCommits: number;
  recentCommit: { id: string; url: string; date: string };
  weeks: Week[];
};

export async function fetchGithubData(): Promise<GithubData | null> {
  const url = process.env.NEXT_PUBLIC_CDN_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/stats/github.json`);
    const result = await res.json();
    const commit = result.recentPortfolioCommits?.[0];

    if (result.contributions == null || result.totalCommits == null || !commit) return null;

    return {
      contributions: result.contributions,
      totalCommits: result.totalCommits,
      recentCommit: { id: commit.id, url: commit.url, date: commit.date },
      weeks: result.weeks ?? [],
    };
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}