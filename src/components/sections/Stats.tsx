"use client";

import { useEffect, useState } from "react";
import { MdLocationPin, MdCode, MdAccessTime, MdCalendarMonth, MdKeyboard, MdMusicNote } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";
import AnimateText from "@/components/ui/AnimatedText";
import { getAge, getDaysUntilBirthday, getLocalTime } from "@/lib/utils/profile";
import { fetchGithubData } from "@/lib/utils/github";
import useTextMarquee from "@/hooks/animations/useTextMarquee";
import Tooltip from "@/components/ui/Tooltip";

const TIMEZONE = "Asia/Manila";
const COUNTRY = "Philippines";

async function fetchWakatimeStats(): Promise<{ today: number; weekly: number; monthly: number; yearly: number } | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/wakatime`);
    const result = await res.json();
    return result.monthly != null && result.yearly != null && result.weekly != null ? result : null;
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

async function fetchMonkeytypeStats(): Promise<{ wpm: number; acc: number; consistency: number } | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/monkeytype`);
    const result = await res.json();
    return result.time?.["60"] ?? result.time?.["15"] ?? null;
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
  const { containerRef, innerRef } = useTextMarquee(stat.labelText, stat.ready);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !stat.ready) return;

    const observer = new ResizeObserver(() => {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.ready, containerRef]);

  return (
    <li className="break-inside-avoid mb-6 flex items-start gap-4 text-zinc-600 dark:text-zinc-400">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-zinc-400">
        {stat.icon}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        {stat.ready ? (
          <Tooltip content={stat.labelText ?? ""} disabled={!isOverflowing}>
            <span ref={containerRef} className="block overflow-hidden whitespace-nowrap pr-4 sm:pr-1 leading-5 text-base text-zinc-800 dark:text-zinc-200">
              <span ref={innerRef} className="inline-block">
                {stat.label}
              </span>
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
  const [wakatimeStats, setWakatimeStats] = useState<{ today: number; weekly: number; monthly: number; yearly: number } | null>(null);
  const [spotifyStats, setSpotifyStats] = useState<MusicStats | null>(null);
  const [monkeytypeStats, setMonkeytypeStats] = useState<{ wpm: number; acc: number; consistency: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime(TIMEZONE));
    }, 1000);

    fetchGithubData().then((data) => setGithubStats(data ? { contributions: data.contributions, totalCommits: data.totalCommits } : null));
    fetchWakatimeStats().then(setWakatimeStats);
    fetchSpotifyStats().then(setSpotifyStats);
    fetchMonkeytypeStats().then(setMonkeytypeStats);

    return () => clearInterval(interval);
  }, []);

  const nowOrLast = spotifyStats?.nowPlaying ?? spotifyStats?.lastPlayed;

  const stats: StatItemType[] = [
    {
      icon: <MdCalendarMonth size={18} />,
      label: <><span className="font-mono"><AnimateText words={[age]} variant="slot" cursor="none" /></span> years old</>,
      sublabel: <><AnimateText words={[String(getDaysUntilBirthday(profileInfo.birthDate))]} variant="slot" cursor="none" /> days until next birthday</>,
      ready: age !== "—",
    },
    {
      icon: <MdLocationPin size={18} />,
      label: `Currently in ${COUNTRY}`,
      sublabel: <><AnimateText words={[time?.time ?? "—"]} variant="slot" cursor="none" /> <span className="font-mono">({time?.offset})</span> </>,
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
      label: <><span className="font-mono">{wakatimeStats?.weekly.toLocaleString()}</span> hours coded this week</>,
      sublabel: <><span className="font-mono">{wakatimeStats?.yearly.toLocaleString()}</span> hours coded this year</>,
      ready: wakatimeStats !== null,
    },
    {
      icon: <MdKeyboard size={18} />,
      label: monkeytypeStats ? <><span className="font-mono">{Math.floor(monkeytypeStats.wpm)}</span> words per minute</> : "-",
      labelText: monkeytypeStats ? `${monkeytypeStats.wpm} 60s typing speed` : undefined,
      sublabel: "60s typing speed",
      ready: monkeytypeStats !== null,
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