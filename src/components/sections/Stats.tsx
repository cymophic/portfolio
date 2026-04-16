"use client";

import { useEffect, useState } from "react";
import { MdLocationPin, MdCode, MdAccessTime, MdCalendarMonth, MdMusicNote, MdHeadphones } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";
import AnimateText from "@/components/ui/AnimatedText";
import { getAge, getDaysUntilBirthday, getLocalTime } from "@/lib/utils/profile";

const TIMEZONE = "Asia/Manila";
const COUNTRY = "Philippines";

async function fetchContributions(): Promise<number | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/contributions`);
    const result = await res.json();
    return result.contributions ?? null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

async function fetchCodingStats(): Promise<{ monthly: number; yearly: number } | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/coding-stats`);
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

async function fetchMusicStats(): Promise<MusicStats | null> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/music`);
    const result = await res.json();
    return result ?? null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState<{ time: string; offset: string } | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [codingStats, setCodingStats] = useState<{ monthly: number; yearly: number } | null>(null);
  const [musicStats, setMusicStats] = useState<MusicStats | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime(TIMEZONE));
    }, 1000);

    fetchContributions().then(setContributions);
    fetchCodingStats().then(setCodingStats);
    fetchMusicStats().then(setMusicStats);

    return () => clearInterval(interval);
  }, []);

  const stats: { icon: React.ReactNode; label: React.ReactNode; sublabel: React.ReactNode; ready: boolean }[] = [
    {
      icon: <MdCalendarMonth size={18} />,
      label: <><AnimateText words={[age]} variant="slot" cursor="none" className="text-base leading-5" /> years old</>,
      sublabel: <><AnimateText words={[String(getDaysUntilBirthday(profileInfo.birthDate))]} variant="slot" cursor="none" /> days until next birthday</>,
      ready: age !== "—",
    },
    {
      icon: <MdLocationPin size={18} />,
      label: `Currently in ${COUNTRY}`,
      sublabel: <><AnimateText words={[time?.time ?? "—"]} variant="slot" cursor="none" /> {time?.offset}</>,
      ready: time !== null,
    },
    {
      icon: <MdCode size={18} />,
      label: <><span className="font-mono">{contributions?.toLocaleString()}</span> contributions</>,
      sublabel: "On GitHub in the last year",
      ready: contributions !== null,
    },
    {
      icon: <MdAccessTime size={18} />,
      label: <><span className="font-mono">{codingStats?.monthly.toLocaleString()}</span> hours coded this month</>,
      sublabel: <><span className="font-mono">{codingStats?.yearly.toLocaleString()}</span> hours coded this year</>,
      ready: codingStats !== null,
    },
    {
      icon: <MdMusicNote size={18} />,
      label: (() => {
        const track = musicStats?.nowPlaying ?? musicStats?.lastPlayed;
        return track
          ? <><a href={track.url} target="_blank" rel="noopener noreferrer" className="underline">{track.song}</a> by {track.artist}</>
          : "-";
      })(),
      sublabel: musicStats?.nowPlaying ? "Currently playing" : "Recently played",
      ready: musicStats !== null,
    },
    {
      icon: <MdHeadphones size={18} />,
      label: musicStats?.topTrack
        ? <><a href={musicStats.topTrack.url} target="_blank" rel="noopener noreferrer" className="underline">{musicStats.topTrack.song}</a> by {musicStats.topTrack.artist}</>
        : "-",
      sublabel: "Top track this year",
      ready: musicStats !== null,
    },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        <ul className="columns-1 gap-6 sm:columns-2 md:columns-3">
          {stats.map((stat, i) => (
            <li key={i} className="break-inside-avoid mb-6 flex items-start gap-4 text-zinc-600 dark:text-zinc-400">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-zinc-400">{stat.icon}</span>
              <div className="flex min-w-0 flex-col gap-1">
                {stat.ready ? (
                  <span className="leading-5 truncate text-base text-zinc-800 dark:text-zinc-200">{stat.label}</span>
                ) : (
                  <Skeleton shape="pill" className="h-5 w-48" />
                )}
                {stat.ready ? (
                  <span className="leading-5 truncate text-sm text-zinc-600 dark:text-zinc-400">{stat.sublabel}</span>
                ) : (
                  <Skeleton shape="pill" className="h-5 w-48" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}