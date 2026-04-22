const API_BASE = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) throw new Error(`Token error: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function spotifyFetch(path, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return null;
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const token = await getAccessToken();
    const nowPlayingData = await spotifyFetch("/me/player/currently-playing", token);

    const nowPlaying = nowPlayingData?.is_playing && nowPlayingData.item
      ? {
          isPlaying: true,
          song: nowPlayingData.item.name,
          artist: nowPlayingData.item.artists.map((a) => a.name).join(", "),
          url: nowPlayingData.item.external_urls.spotify,
        }
      : null;

    return response(200, { nowPlaying });
  } catch (error) {
    console.error("Spotify Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};