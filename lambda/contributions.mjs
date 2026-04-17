const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

let cache = null;
let cacheTime = null;

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const now = Date.now();
    if (cache && cacheTime && now - cacheTime < CACHE_TTL) return cache;

    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    const year = new Date().getFullYear() - 1;

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    const variables = {
      username,
      from: `${year}-01-01T00:00:00Z`,
      to: `${year}-12-31T23:59:59Z`,
    };

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const result = await res.json();

    if (result.errors) {
      return response(500, { error: result.errors[0].message });
    }

    const total = result.data?.user?.contributionsCollection.contributionCalendar.totalContributions ?? null;

    cache = response(200, { contributions: total });
    cacheTime = now;
    return cache;
  } catch (error) {
    console.error("GitHub Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};