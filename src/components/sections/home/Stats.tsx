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

import { fetchGithubData } from "@/lib/services/github";
import { fetchGitlabData } from "@/lib/services/gitlab";
import { fetchWakatimeStats } from "@/lib/services/wakatime";
import { fetchSpotifyStats } from "@/lib/services/spotify";
import { fetchMonkeytypeStats } from "@/lib/services/monkeytype";
import type { GithubData } from "@/lib/services/github";
import type { GitlabData } from "@/lib/services/gitlab";
import type { WakatimeStats } from "@/lib/services/wakatime";
import type { SpotifyStats } from "@/lib/services/spotify";
import type { MonkeytypeStats } from "@/lib/services/monkeytype";
import type { ContributionDay, Week } from "@/lib/services/github";

import { timezone, country, profileInfo } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import { getAge, getDaysUntilBirthday } from "@/lib/utils/profile";
import { getLocalTime, getLocalDate } from "@/lib/utils/locale";
import { SlotText } from "@/components/ui/AnimatedText";
import Skeleton from "@/components/ui/Skeleton";
import useTextMarquee from "@/hooks/animations/useTextMarquee";
import Tooltip from "@/components/ui/Tooltip";
import ContributionGraph from "@/components/sections/home/Stats/ContributionGraph";

// Constants
const SONG_REFRESH_INTERVAL = 1.5; // minutes
const LOADMS_CONTRIBUTION_GRAPH = 200; // milliseconds

// Types
type StatItemType = {
  icon: React.ReactNode;
  label: React.ReactNode;
  labelText?: string;
  sublabel: React.ReactNode;
  ready: boolean;
};
type GithubStats = Pick<GithubData, "contributions" | "totalCommits" | "weeks">;
type Time = { time: string; offset: string };
type NowOrLast = NonNullable<
  SpotifyStats["nowPlaying"] | SpotifyStats["lastPlayed"]
>;

function mergeContributionWeeks(
  weeksList: Week[][],
  today?: string,
): {
  weeks: Week[];
  totalContributions: number;
} {
  const byDate = new Map<string, number>();
  let totalContributions = 0;
  let minTime = Infinity;
  let maxTime = -Infinity;

  for (const weeks of weeksList) {
    for (const week of weeks) {
      for (const day of week.contributionDays) {
        byDate.set(day.date, (byDate.get(day.date) ?? 0) + day.contributionCount);
        totalContributions += day.contributionCount;
        const t = Date.parse(day.date);
        if (t < minTime) minTime = t;
        if (t > maxTime) maxTime = t;
      }
    }
  }

  if (byDate.size === 0) return { weeks: [], totalContributions: 0 };

  const todayTime = today ? Date.parse(today) : Infinity;
  if (todayTime < maxTime) maxTime = todayTime;

  const cursor = new Date(minTime);
  cursor.setUTCHours(0, 0, 0, 0);
  cursor.setUTCDate(cursor.getUTCDate() - cursor.getUTCDay());

  const last = new Date(maxTime);
  last.setUTCHours(0, 0, 0, 0);
  const lastSunday = new Date(last);
  lastSunday.setUTCDate(lastSunday.getUTCDate() - lastSunday.getUTCDay());

  const weeks: Week[] = [];
  while (cursor <= lastSunday) {
    const contributionDays: ContributionDay[] = [];
    let remaining = true;
    for (let i = 0; i < 7; i++) {
      const date = cursor.toISOString().slice(0, 10);
      if (Date.parse(`${date}T00:00:00Z`) > todayTime) {
        remaining = false;
        break;
      }
      contributionDays.push({
        date,
        contributionCount: byDate.get(date) ?? 0,
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    if (contributionDays.length === 0) break;
    weeks.push({ contributionDays });
    if (!remaining) break;
  }

  return { weeks, totalContributions };
}

// Stats section
export default function Stats() {
  // Local time and age update every second
  const [age, setAge] = useState("—");
  const [time, setTime] = useState<Time | null>(null);

  // External service stats
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
  const [gitlabStats, setGitlabStats] = useState<GitlabData | null>(null);
  const [wakatimeStats, setWakatimeStats] = useState<WakatimeStats | null>(
    null,
  );
  const [spotifyStats, setSpotifyStats] = useState<SpotifyStats | null>(null);
  const [monkeytypeStats, setMonkeytypeStats] =
    useState<MonkeytypeStats | null>(null);

  // Delays graph render to avoid layout shift on load
  const [graphReady, setGraphReady] = useState(false);

  // Ref for the Spotify polling interval
  const spotifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const nowOrLast =
    spotifyStats?.nowPlaying ?? spotifyStats?.lastPlayed ?? null;

  // Fetch all stats on mount and start live update intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthday));
      setTime(getLocalTime(timezone));
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
    fetchGitlabData().then(setGitlabStats);

    // Poll Spotify every SONG_REFRESH_INTERVAL minutes while a song is playing
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

  // Delay contribution graph render to avoid layout shift
  useEffect(() => {
    const t = setTimeout(() => setGraphReady(true), LOADMS_CONTRIBUTION_GRAPH);
    return () => clearTimeout(t);
  }, []);

  // Stat items
  const stats: StatItemType[] = [
    ageStat(age, profileInfo.birthday),
    locationStat(time),
    spotifyStat(spotifyStats, nowOrLast),
    commitStat(githubStats, gitlabStats),
    wakatimeStat(wakatimeStats),
    monkeytypeStat(monkeytypeStats),
  ];

  const merged = mergeContributionWeeks(
    [githubStats?.weeks ?? [], gitlabStats?.weeks ?? []],
    getLocalDate(timezone),
  );

  // Render
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        {merged.weeks.length > 0 && graphReady ? (
          <ContributionGraph
            weeks={merged.weeks}
            totalContributions={merged.totalContributions}
          />
        ) : (
          <Skeleton shape="pill" className="h-32.25 w-full" />
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-8 gap-y-6 md:w-full">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}

// Animated sound wave icon for active Spotify playback
function SoundWave() {
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

// Renders a single stat item with marquee overflow and skeleton loading
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
    <li className="break-inside-avoid flex items-start text-zinc-600 dark:text-zinc-400 gap-4">
      {/* Icon */}
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-zinc-400">
        {stat.icon}
      </span>

      {/* Label */}
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

// Stat builder functions
function ageStat(age: string, birthday: string): StatItemType {
  return {
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
        <SlotText value={String(getDaysUntilBirthday(birthday))} /> days until
        next birthday
      </>
    ),
    ready: age !== "—",
  };
}
function locationStat(time: Time | null): StatItemType {
  return {
    icon: <IconMapPin size={18} />,
    label: `Currently in ${country}`,
    sublabel: (
      <>
        <SlotText value={time?.time ?? "—"} /> <span>({time?.offset})</span>
      </>
    ),
    ready: time !== null,
  };
}
function spotifyStat(
  spotifyStats: SpotifyStats | null,
  nowOrLast: NowOrLast | null,
): StatItemType {
  return {
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
  };
}
function commitStat(
  githubStats: GithubStats | null,
  gitlabStats: GitlabData | null,
): StatItemType {
  const totalCommits =
    (githubStats?.totalCommits ?? 0) + (gitlabStats?.commits ?? 0);
  return {
    icon: <IconCode size={18} />,
    label: (
      <>
        <span className="font-mono">{totalCommits.toLocaleString()}</span> total
        commits
      </>
    ),
    sublabel: "Across all projects & platforms",
    ready: githubStats !== null,
  };
}
function wakatimeStat(wakatimeStats: WakatimeStats | null): StatItemType {
  return {
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
          {wakatimeStats?.yearly.toLocaleString()}
        </span>{" "}
        hours coded this year
      </>
    ),
    ready: wakatimeStats !== null,
  };
}
function monkeytypeStat(monkeytypeStats: MonkeytypeStats | null): StatItemType {
  return {
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
  };
}
