import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client();
const API_BASE = "https://api.github.com";
const PORTFOLIO_REPO = "portfolio";

const GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
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

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const [graphqlRes, totalCommitsRes, recentCommitsRes] = await Promise.all([
      fetch(`${API_BASE}/graphql`, {
        method: "POST",
        headers,
        body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { username } }),
      }),
      fetch(`${API_BASE}/search/commits?q=author:${username}&per_page=1`, {
        headers: { ...headers, Accept: "application/vnd.github.cloak-preview" },
      }),
      fetch(`${API_BASE}/repos/${username}/${PORTFOLIO_REPO}/commits?per_page=10&sha=main`, { headers }),
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

    const { totalContributions, weeks } =
      graphqlResult.data?.user?.contributionsCollection.contributionCalendar ?? {};

    const recentPortfolioCommits = recentCommitsResult.map((c) => ({
      id: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      date: c.commit.author.date,
      url: c.html_url,
    }));

    const recentActivity = graphqlResult.data?.user?.activity.commitContributionsByRepository.map((r) => ({
      repo: r.repository.name,
      url: r.repository.url,
      lastCommitAt: r.contributions.nodes[0]?.occurredAt ?? null,
      commitCount: r.contributions.nodes[0]?.commitCount ?? null,
    })) ?? [];

    const payload = {
      contributions: totalContributions ?? null,
      totalCommits: totalCommitsResult.total_count ?? null,
      weeks: weeks ?? [],
      recentPortfolioCommits,
      recentActivity,
    };

    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: "stats/github.json",
      Body: JSON.stringify(payload),
      ContentType: "application/json",
    }));

    return response(200, { ok: true });
  } catch (error) {
    console.error("GitHub Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};