import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client();
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

    const [topTracksData, topArtistsData, recentlyPlayedData] = await Promise.all([
      spotifyFetch("/me/top/tracks?time_range=long_term&limit=1", token),
      spotifyFetch("/me/top/artists?time_range=long_term&limit=5", token),
      spotifyFetch("/me/player/recently-played?limit=1", token),
    ]);

    const track = topTracksData?.items?.[0];
    const topTrack = track
      ? { song: track.name, artist: track.artists.map((a) => a.name).join(", "), url: track.external_urls.spotify }
      : null;

    const artist = topArtistsData?.items?.[0];
    const topArtist = artist
      ? { artist: artist.name, url: artist.external_urls.spotify }
      : null;

    const lastTrack = recentlyPlayedData?.items?.[0]?.track;
    const lastPlayed = lastTrack
      ? { song: lastTrack.name, artist: lastTrack.artists.map((a) => a.name).join(", "), url: lastTrack.external_urls.spotify }
      : null;

    const payload = { topTrack, topArtist, lastPlayed };

    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: "stats/spotify.json",
      Body: JSON.stringify(payload),
      ContentType: "application/json",
    }));

    return response(200, { ok: true });
  } catch (error) {
    console.error("Spotify Stats Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};