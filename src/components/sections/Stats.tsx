"use client";

import { useEffect, useState } from "react";
import { MdCake, MdLocationPin, MdCode, MdAccessTime } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";
import AnimateText from "@/components/ui/AnimatedText";

function getAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  const age = diff / (1000 * 60 * 60 * 24 * 365.25);
  return age.toFixed(7);
}

function getDaysUntilBirthday(birthDate: string): number {
  const now = new Date();
  const birth = new Date(birthDate);
  const next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (next <= now) next.setFullYear(now.getFullYear() + 1);
  return Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getUTCOffset(timeZone: string): string {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" });
  const parts = formatter.formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

function getLocalTime(timeZone: string): { time: string; offset: string } {
  return {
    time: new Date().toLocaleTimeString("en-US", { timeZone, hour: "2-digit", minute: "2-digit" }),
    offset: getUTCOffset(timeZone),
  };
}

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

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState<{ time: string; offset: string } | null>(null);
  const [contributions, setContributions] = useState<number | null>(null);
  const [codingStats, setCodingStats] = useState<{ monthly: number; yearly: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime("Asia/Manila"));
    }, 1000);

    fetchContributions().then(setContributions);
    fetchCodingStats().then(setCodingStats);

    return () => clearInterval(interval);
  }, []);

  const stats: { icon: React.ReactNode; label: React.ReactNode; sublabel: React.ReactNode; ready: boolean }[] = [
    {
      icon: <MdCake size={18} />,
      label: <><AnimateText words={[age]} variant="slot" cursor="none" /> years old</>,
      sublabel: `Next birthday in ${getDaysUntilBirthday(profileInfo.birthDate)} days`,
      ready: age !== "—",
    },
    {
      icon: <MdLocationPin size={18} />,
      label: "Currently in the Philippines",
      sublabel: <><AnimateText words={[time?.time ?? "—"]} variant="slot" cursor="none" /> {time?.offset}</>,
      ready: time !== null,
    },
    {
      icon: <MdCode size={18} />,
      label: `${contributions?.toLocaleString()} contributions`,
      sublabel: "On GitHub in the last year",
      ready: contributions !== null,
    },
    {
      icon: <MdAccessTime size={18} />,
      label: `${codingStats?.monthly.toLocaleString()} hours coded this month`,
      sublabel: `${codingStats?.yearly.toLocaleString()} hours coded this year`,
      ready: codingStats !== null,
    },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        <ul className="flex flex-col gap-6">
          {stats.map((stat, i) => (
            <li key={i} className="flex items-start gap-4 text-zinc-600 dark:text-zinc-400">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-zinc-400">{stat.icon}</span>
              <div className="flex flex-col gap-1">
                {stat.ready ? (
                  <span className="leading-5 text-base text-zinc-800 dark:text-zinc-200">{stat.label}</span>
                ) : (
                  <Skeleton shape="pill" className="h-5 w-48" />
                )}
                {stat.ready ? (
                  <span className="leading-5 text-sm text-zinc-600 dark:text-zinc-400">{stat.sublabel}</span>
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