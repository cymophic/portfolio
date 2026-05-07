"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconMapPin,
  IconCode,
  IconClock,
  IconCalendarEvent,
  IconKeyboard,
  IconVolume,
} from "@tabler/icons-react";

import { profileInfo } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  getAge,
  getDaysUntilBirthday,
  getLocalTime,
} from "@/lib/utils/profile";
import { fetchGithubData } from "@/lib/utils/github";
import type { Week } from "@/lib/utils/github";
import Skeleton from "@/components/ui/Skeleton";
import { SlotText } from "@/components/ui/AnimatedText";
import useTextMarquee from "@/hooks/animations/useTextMarquee";
import Tooltip from "@/components/ui/Tooltip";
import ContributionGraph from "@/components/sections/home/Stats/ContributionGraph";

const TIMEZONE = "Asia/Manila";
const COUNTRY = "Philippines";
const SONG_REFRESH_INTERVAL = 1.5; // 1 min 30 sec
const LOADMS_CONTRIBUTION_GRAPH = 1000;

async function fetchWakatimeStats(): Promise<{
  today: number;
  weekly: number;
  monthly: number;
  yearly: number;
} | null> {
  const url = process.env.NEXT_PUBLIC_CDN_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/stats/wakatime.json`);
    const result = await res.json();
    return result.monthly != null &&
      result.yearly != null &&
      result.weekly != null
      ? result
      : null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

type SpotifyStats = {
  nowPlaying: {
    song: string;
    artist: string;
    url: string;
    isPlaying: boolean;
  } | null;
  lastPlayed: { song: string; artist: string; url: string } | null;
  topTrack: { song: string; artist: string; url: string } | null;
};

async function fetchSpotifyStats(): Promise<SpotifyStats | null> {
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

async function fetchMonkeytypeStats(): Promise<{
  wpm: number;
  acc: number;
  consistency: number;
} | null> {
  const url = process.env.NEXT_PUBLIC_CDN_URL;
  if (!url) return null;

  try {
    const res = await fetch(`${url}/stats/monkeytype.json`);
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
            <span
              ref={containerRef}
              className="block overflow-hidden whitespace-nowrap pr-4 sm:pr-1 leading-5 text-base text-zinc-600 dark:text-zinc-300"
            >
              <span ref={innerRef} className="inline-block">
                {stat.label}
              </span>
            </span>
          </Tooltip>
        ) : (
          <Skeleton shape="pill" className="h-5 w-48" />
        )}
        {stat.ready ? (
          <span className="leading-5 truncate text-sm text-zinc-500 dark:text-zinc-400">
            {stat.sublabel}
          </span>
        ) : (
          <Skeleton shape="pill" className="h-5 w-48" />
        )}
      </div>
    </li>
  );
}

export function SoundWave() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 18" className="text-current">
      {[3, 7, 11, 15].map((x, i) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1="12"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <animate
            attributeName="y1"
            values={`${[10, 8, 11, 9][i]};${[6, 5, 7, 6][i]};${[10, 8, 11, 9][i]}`}
            dur={`${[0.8, 1.1, 0.6, 0.9][i]}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
}

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState<{ time: string; offset: string } | null>(
    null,
  );
  const [githubStats, setGithubStats] = useState<{
    contributions: number;
    totalCommits: number;
    weeks: Week[];
  } | null>(null);
  const [wakatimeStats, setWakatimeStats] = useState<{
    today: number;
    weekly: number;
    monthly: number;
    yearly: number;
  } | null>(null);
  const [spotifyStats, setSpotifyStats] = useState<SpotifyStats | null>(null);
  const [monkeytypeStats, setMonkeytypeStats] = useState<{
    wpm: number;
    acc: number;
    consistency: number;
  } | null>(null);
  const [graphReady, setGraphReady] = useState(false);
  const spotifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const nowOrLast = spotifyStats?.nowPlaying ?? spotifyStats?.lastPlayed;

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthday));
      setTime(getLocalTime(TIMEZONE));
    }, 1000);

    fetchWakatimeStats().then(setWakatimeStats);
    fetchMonkeytypeStats().then(setMonkeytypeStats);
    fetchGithubData().then((data) =>
      setGithubStats(
        data
          ? {
              contributions: data.contributions,
              totalCommits: data.totalCommits,
              weeks: data.weeks ?? [],
            }
          : null,
      ),
    );
    fetchSpotifyStats().then((data) => {
      setSpotifyStats(data);
      if (data?.nowPlaying) {
        spotifyIntervalRef.current = setInterval(
          () => {
            fetchSpotifyStats().then((fresh) => {
              setSpotifyStats(fresh);
              if (!fresh?.nowPlaying) {
                clearInterval(spotifyIntervalRef.current!);
                spotifyIntervalRef.current = null;
              }
            });
          },
          SONG_REFRESH_INTERVAL * 60 * 1000,
        );
      }
    });

    return () => {
      clearInterval(interval);
      if (spotifyIntervalRef.current) clearInterval(spotifyIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setGraphReady(true), LOADMS_CONTRIBUTION_GRAPH);
    return () => clearTimeout(t);
  }, []);

  const stats: StatItemType[] = [
    {
      icon: <IconCalendarEvent size={18} />,
      label: (
        <>
          <span className="font-mono">
            <SlotText value={age} />
          </span>{" "}
          years old
        </>
      ),
      sublabel: (
        <>
          <SlotText
            value={String(getDaysUntilBirthday(profileInfo.birthday))}
          />{" "}
          days until next birthday
        </>
      ),
      ready: age !== "—",
    },
    {
      icon: <IconMapPin size={18} />,
      label: `Currently in ${COUNTRY}`,
      sublabel: (
        <>
          <SlotText value={time?.time ?? "—"} /> <span>({time?.offset})</span>
        </>
      ),
      ready: time !== null,
    },
    {
      icon: spotifyStats?.nowPlaying ? <SoundWave /> : <IconVolume size={18} />,
      label: nowOrLast ? (
        <>
          <a
            href={nowOrLast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {nowOrLast.song}
          </a>{" "}
          by {nowOrLast.artist}
        </>
      ) : (
        "-"
      ),
      labelText: nowOrLast
        ? `${nowOrLast.song} by ${nowOrLast.artist}`
        : undefined,
      sublabel: spotifyStats?.nowPlaying
        ? "Listening to right now"
        : "Recently listened to",
      ready: spotifyStats !== null,
    },
    {
      icon: <IconCode size={18} />,
      label: (
        <>
          <span className="font-mono">
            {githubStats?.totalCommits.toLocaleString()}
          </span>{" "}
          total commits
        </>
      ),
      sublabel: "On GitHub in the last year",
      ready: githubStats !== null,
    },
    {
      icon: <IconClock size={18} />,
      label: (
        <>
          <span className="font-mono">
            {wakatimeStats?.weekly.toLocaleString()}
          </span>{" "}
          hours coded this week
        </>
      ),
      sublabel: (
        <>
          <span className="font-mono">
            {wakatimeStats?.monthly.toLocaleString()}
          </span>{" "}
          hours coded this month
        </>
      ),
      ready: wakatimeStats !== null,
    },
    {
      icon: <IconKeyboard size={20} />,
      label: monkeytypeStats ? (
        <>
          <span className="font-mono">{Math.floor(monkeytypeStats.wpm)}</span>{" "}
          words per minute
        </>
      ) : (
        "-"
      ),
      labelText: monkeytypeStats
        ? `${monkeytypeStats.wpm} 60s typing speed`
        : undefined,
      sublabel: "Record typing speed in 60s",
      ready: monkeytypeStats !== null,
    },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        {githubStats && graphReady ? (
          <ContributionGraph
            weeks={githubStats.weeks}
            totalContributions={githubStats.contributions}
          />
        ) : (
          <Skeleton shape="pill" className="h-32.25 w-full" />
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-8 md:w-full">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}
