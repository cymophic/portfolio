const STATS_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const ACTIVITY_CACHE_TTL = 60 * 60 * 1000; // 1 hour
const PORTFOLIO_REPO = "portfolio";

let statsCache = null;
let statsCacheTime = null;
let activityCache = null;
let activityCacheTime = null;

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const now = Date.now();
    const statsCacheHit = statsCache && statsCacheTime && now - statsCacheTime < STATS_CACHE_TTL;
    const activityCacheHit = activityCache && activityCacheTime && now - activityCacheTime < ACTIVITY_CACHE_TTL;

    if (statsCacheHit && activityCacheHit) return response(200, { ...statsCache, ...activityCache });

    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    const year = new Date().getFullYear() - 1;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // GraphQL — contributions + recent activity
    const graphqlQuery = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
            }
          }
          activity: contributionsCollection {
            commitContributionsByRepository(maxRepositories: 10) {
              repository {
                name
                url
              }
              contributions(first: 1) {
                nodes {
                  occurredAt
                  commitCount
                }
              }
            }
          }
        }
      }
    `;

    // REST — total commit count + recent portfolio commits (parallel)
    const [graphqlRes, totalCommitsRes, recentCommitsRes] = await Promise.all([
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: graphqlQuery,
          variables: {
            username,
            from: `${year}-01-01T00:00:00Z`,
            to: `${year}-12-31T23:59:59Z`,
          },
        }),
      }),
      fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=1`, {
        headers: { ...headers, Accept: "application/vnd.github.cloak-preview" },
      }),
      fetch(`https://api.github.com/repos/${username}/${PORTFOLIO_REPO}/commits?per_page=10`, { headers }),
    ]);

    if (!graphqlRes.ok) throw new Error(`GitHub GraphQL error: ${graphqlRes.status}`);
    if (!totalCommitsRes.ok) throw new Error(`GitHub REST error: ${totalCommitsRes.status}`);
    if (!recentCommitsRes.ok) throw new Error(`GitHub REST error: ${recentCommitsRes.status}`);

    const [graphqlResult, totalCommitsResult, recentCommitsResult] = await Promise.all([
      graphqlRes.json(),
      totalCommitsRes.json(),
      recentCommitsRes.json(),
    ]);

    if (graphqlResult.errors) {
      return response(500, { error: graphqlResult.errors[0].message });
    }

    const contributions =
      graphqlResult.data?.user?.contributionsCollection.contributionCalendar.totalContributions ?? null;

    const totalCommits = totalCommitsResult.total_count ?? null;

    const recentPortfolioCommits = recentCommitsResult.map((c) => ({
      id: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0], // first line only
      date: c.commit.author.date,
      url: c.html_url,
    }));

    const recentActivity = graphqlResult.data?.user?.activity.commitContributionsByRepository.map((r) => ({
      repo: r.repository.name,
      url: r.repository.url,
      lastCommitAt: r.contributions.nodes[0]?.occurredAt ?? null,
      commitCount: r.contributions.nodes[0]?.commitCount ?? null,
    })) ?? [];

    statsCache = { contributions, totalCommits };
    statsCacheTime = now;

    activityCache = { recentPortfolioCommits, recentActivity };
    activityCacheTime = now;

    return response(200, { ...statsCache, ...activityCache });
  } catch (error) {
    console.error("GitHub Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};
