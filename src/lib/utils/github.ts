type GithubData = {
  contributions: number;
  totalCommits: number;
  recentCommit: { id: string; url: string; date: string };
};

export async function fetchGithubData(): Promise<GithubData | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/github`);
    const result = await res.json();
    const commit = result.recentPortfolioCommits?.[0];

    if (result.contributions == null || result.totalCommits == null || !commit) return null;

    return {
      contributions: result.contributions,
      totalCommits: result.totalCommits,
      recentCommit: { id: commit.id, url: commit.url, date: commit.date },
    };
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}