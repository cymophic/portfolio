const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

async function spotifyFetch(path, token) {
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return null;
  return res.json();
}

function response(statusCode, body) {
  return { statusCode, body: JSON.stringify(body) };
}

export const handler = async () => {
  try {
    const token = await getAccessToken();

    const [topTracksData, topArtistsData, nowPlayingData, recentlyPlayedData] = await Promise.all([
      spotifyFetch("/me/top/tracks?time_range=long_term&limit=1", token),
      spotifyFetch("/me/top/artists?time_range=long_term&limit=10", token),
      spotifyFetch("/me/player/currently-playing", token),
      spotifyFetch("/me/player/recently-played?limit=1", token),
    ]);

    // Top track
    const track = topTracksData?.items?.[0];
    const topTrack = track
      ? { song: track.name, artist: track.artists.map((a) => a.name).join(", "), url: track.external_urls.spotify }
      : null;

    // Top artist
    const artist = topArtistsData?.items?.[0];
    const topArtist = artist
      ? { artist: artist.name, url: artist.external_urls.spotify }
      : null;

    // Top genre (derived from top 10 artists)
    const genreCounts = {};
    for (const a of topArtistsData?.items ?? []) {
      for (const genre of a.genres) {
        genreCounts[genre] = (genreCounts[genre] ?? 0) + 1;
      }
    }
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    // Now playing
    const nowPlaying = nowPlayingData?.is_playing && nowPlayingData.item
      ? {
          isPlaying: true,
          song: nowPlayingData.item.name,
          artist: nowPlayingData.item.artists.map((a) => a.name).join(", "),
          url: nowPlayingData.item.external_urls.spotify,
        }
      : null;

    // Last played
    const lastTrack = recentlyPlayedData?.items?.[0]?.track;
    const lastPlayed = lastTrack
      ? { song: lastTrack.name, artist: lastTrack.artists.map((a) => a.name).join(", "), url: lastTrack.external_urls.spotify }
      : null;

    return response(200, { topTrack, topArtist, topGenre, nowPlaying, lastPlayed });
  } catch (error) {
    console.error("Spotify Lambda error:", error);
    return response(500, { error: "Internal server error" });
  }
};