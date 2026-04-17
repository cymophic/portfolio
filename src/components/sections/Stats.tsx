"use client";

import { useEffect, useState } from "react";
import { MdLocationPin, MdCode, MdAccessTime, MdCalendarMonth, MdMusicNote, MdHeadphones } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";
import AnimateText from "@/components/ui/AnimatedText";
import { getAge, getDaysUntilBirthday, getLocalTime } from "@/lib/utils/profile";
import useTextMarquee from "@/hooks/animations/useTextMarquee";
import Tooltip from "@/components/ui/Tooltip";

const TIMEZONE = "Asia/Manila";
const COUNTRY = "Philippines";

async function fetchGithubStats(): Promise<{ contributions: number; totalCommits: number } | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/github`);
    const result = await res.json();
    return result.contributions != null && result.totalCommits != null
      ? { contributions: result.contributions, totalCommits: result.totalCommits }
      : null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

async function fetchWakatimeStats(): Promise<{ monthly: number; yearly: number } | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/wakatime`);
    const result = await res.json();
    return result.monthly != null && result.yearly != null ? result : null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

type MusicStats = {
  nowPlaying: { song: string; artist: string; url: string; isPlaying: boolean } | null;
  lastPlayed: { song: string; artist: string; url: string } | null;
  topTrack: { song: string; artist: string; url: string } | null;
};

async function fetchSpotifyStats(): Promise<MusicStats | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/spotify`);
    const result = await res.json();
    return result ?? null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

type StatItemType = {
  icon: React.ReactNode;
  label: React.ReactNode;
  labelText?: string;
  sublabel: React.ReactNode;
  ready: boolean;
};

function StatItem({ stat }: { stat: StatItemType }) {
  const { ref } = useTextMarquee(stat.labelText, stat.ready);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !stat.ready) return;

    const observer = new ResizeObserver(() => {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.ready, ref]);

  return (
    <li className="break-inside-avoid mb-6 flex items-start gap-4 text-zinc-600 dark:text-zinc-400">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-zinc-400">
        {stat.icon}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        {stat.ready ? (
          <Tooltip content={stat.labelText ?? ""} disabled={!isOverflowing}>
            <span ref={ref} className="block overflow-hidden scrollbar-gutter-auto whitespace-nowrap pr-2 sm:pr-1 leading-5 text-base text-zinc-800 dark:text-zinc-200">
              {stat.label}
            </span>
          </Tooltip>
        ) : (
          <Skeleton shape="pill" className="h-5 w-48" />
        )}
        {stat.ready ? (
          <span className="leading-5 truncate text-sm text-zinc-600 dark:text-zinc-400">
            {stat.sublabel}
          </span>
        ) : (
          <Skeleton shape="pill" className="h-5 w-48" />
        )}
      </div>
    </li>
  );
}

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState<{ time: string; offset: string } | null>(null);
  const [githubStats, setGithubStats] = useState<{ contributions: number; totalCommits: number } | null>(null);
  const [wakatimeStats, setWakatimeStats] = useState<{ monthly: number; yearly: number } | null>(null);
  const [spotifyStats, setSpotifyStats] = useState<MusicStats | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime(TIMEZONE));
    }, 1000);

    fetchGithubStats().then(setGithubStats);
    fetchWakatimeStats().then(setWakatimeStats);
    fetchSpotifyStats().then(setSpotifyStats);

    return () => clearInterval(interval);
  }, []);

  const nowOrLast = spotifyStats?.nowPlaying ?? spotifyStats?.lastPlayed;

  const stats: StatItemType[] = [
    {
      icon: <MdCalendarMonth size={18} />,
      label: <><AnimateText words={[age]} variant="slot" cursor="none" className="leading-5" /> years old</>,
      sublabel: <><AnimateText words={[String(getDaysUntilBirthday(profileInfo.birthDate))]} variant="slot" cursor="none" /> days until next birthday</>,
      ready: age !== "—",
    },
    {
      icon: <MdLocationPin size={18} />,
      label: `Currently in ${COUNTRY}`,
      sublabel: <><AnimateText words={[time?.time ?? "—"]} variant="slot" cursor="none" /> ({time?.offset})</>,
      ready: time !== null,
    },
    {
      icon: <MdCode size={18} />,
      label: <><span className="font-mono">{githubStats?.contributions.toLocaleString()}</span> contributions</>,
      sublabel: "On GitHub in the last year",
      ready: githubStats !== null,
    },
    {
      icon: <MdAccessTime size={18} />,
      label: <><span className="font-mono">{wakatimeStats?.monthly.toLocaleString()}</span> hours coded this month</>,
      sublabel: <><span className="font-mono">{wakatimeStats?.yearly.toLocaleString()}</span> hours coded this year</>,
      ready: wakatimeStats !== null,
    },
    {
      icon: <MdMusicNote size={18} />,
      label: nowOrLast
        ? <><a href={nowOrLast.url} target="_blank" rel="noopener noreferrer" className="underline">{nowOrLast.song}</a> by {nowOrLast.artist}</>
        : "-",
      labelText: nowOrLast ? `${nowOrLast.song} by ${nowOrLast.artist}` : undefined,
      sublabel: spotifyStats?.nowPlaying ? "Currently playing" : "Recently played",
      ready: spotifyStats !== null,
    },
    {
      icon: <MdHeadphones size={18} />,
      label: spotifyStats?.topTrack
        ? <><a href={spotifyStats.topTrack.url} target="_blank" rel="noopener noreferrer" className="underline">{spotifyStats.topTrack.song}</a> by {spotifyStats.topTrack.artist}</>
        : "-",
      labelText: spotifyStats?.topTrack ? `${spotifyStats.topTrack.song} by ${spotifyStats.topTrack.artist}` : undefined,
      sublabel: "Top track this year",
      ready: spotifyStats !== null,
    },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        <ul className="columns-1 gap-6 sm:columns-2 md:columns-3">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}