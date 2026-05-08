export type NowPlaying = {
  song: string;
  artist: string;
  url: string;
  isPlaying: boolean;
};

export type SpotifyStats = {
  nowPlaying: NowPlaying | null;
  lastPlayed: { song: string; artist: string; url: string } | null;
  topTrack: { song: string; artist: string; url: string } | null;
};

export async function fetchSpotifyStats(): Promise<SpotifyStats | null> {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!cdnUrl || !apiUrl) return null;

  try {
    const [statsRes, nowPlayingRes] = await Promise.all([
      fetch(`${cdnUrl}/stats/spotify.json`),
      fetch(`${apiUrl}/spotify/now-playing`),
    ]);

    const stats = await statsRes.json();
    const nowPlaying = await nowPlayingRes.json();

    return { ...stats, nowPlaying: nowPlaying.nowPlaying ?? null };
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}
