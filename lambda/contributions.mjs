export const handler = async () => {
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

  const result = await res.json();

  if (result.errors) {
    return { statusCode: 500, body: JSON.stringify({ error: result.errors[0].message }) };
  }

  const total = result.data?.user?.contributionsCollection.contributionCalendar.totalContributions ?? null;

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "https://luisabhram.dev" },
    body: JSON.stringify({ contributions: total }),
  };
};