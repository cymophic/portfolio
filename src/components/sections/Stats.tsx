"use client";

import { useEffect, useState } from "react";
import { MdCake, MdAccessTime, MdCode } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";

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

function getLocalTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
  }) + " (UTC +08:00)";
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

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState("—");
  const [contributions, setContributions] = useState<number | null>(null);

  useEffect(() => {
    // Interval for age and time
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime());
    }, 1000);

    // Fetch contributions
    fetchContributions().then(setContributions);

    return () => clearInterval(interval);
  }, []);

  const stats: { icon: React.ReactNode; label: string; sublabel: string; ready: boolean }[] = [
    {
      icon: <MdCake size={16} />,
      label: `${age} years old`,
      sublabel: `Next birthday in ${getDaysUntilBirthday(profileInfo.birthDate)} days`,
      ready: age !== "—",
    },
    {
      icon: <MdAccessTime size={16} />,
      label: "Currently in the Philippines",
      sublabel: `${time}`,
      ready: time !== "—",
    },
    {
      icon: <MdCode size={16} />,
      label: `${contributions?.toLocaleString()} contributions`,
      sublabel: `On GitHub in the last year`,
      ready: contributions !== null,
    },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        <ul className="flex flex-col gap-6">
          {stats.map((stat, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
              <span className="flex h-5 items-center text-zinc-400 dark:text-zinc-500">{stat.icon}</span>
              <div className="flex flex-col gap-1">
                {stat.ready ? (
                  <span className="text-sm font-medium leading-5 text-zinc-800 dark:text-zinc-200">
                    {stat.label}
                  </span> 
                ) : (
                  <Skeleton shape="pill" className="h-5 w-48" />
                )}
                {stat.ready ? (
                  <span className="text-sm font-medium leading-5 text-zinc-400 dark:text-zinc-500">
                    {stat.sublabel}
                  </span> 
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