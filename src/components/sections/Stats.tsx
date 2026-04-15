"use client";

import { useEffect, useState } from "react";
import { MdCake, MdAccessTime } from "react-icons/md";
import { profileInfo } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";

function getAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  const age = diff / (1000 * 60 * 60 * 24 * 365.25);
  return age.toFixed(8);
}

function getLocalTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
  }) + " (UTC +08:00)";
}

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState("—");

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats: { icon: React.ReactNode; label: string; ready: boolean }[] = [
    { icon: <MdCake size={14} />, label: `${age} years old`, ready: age !== "—" },
    { icon: <MdAccessTime size={14} />, label: `It is ${time}`, ready: time !== "—" },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Stats" />
        <ul className="flex flex-col gap-3">
          {stats.map((stat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 dark:text-zinc-500">{stat.icon}</span>
              {stat.ready ? stat.label : <Skeleton shape="pill" className="h-5 w-48" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}