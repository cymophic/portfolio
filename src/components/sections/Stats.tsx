"use client";

import { useEffect, useState } from "react";
import { MdCake, MdAccessTime, MdCode } from "react-icons/md";
import { profileInfo, socialLinks } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import Skeleton from "@/components/ui/Skeleton";

function getAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  const age = diff / (1000 * 60 * 60 * 24 * 365.25);
  return age.toFixed(7);
}

function getLocalTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
  }) + " (UTC +08:00)";
}

async function fetchContributions(username: string | undefined, year: number): Promise<number | null> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (!token || !username) return null;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;
  const variables = { 
    username, 
    from: `${year}-01-01T00:00:00Z`, 
    to: `${year}-12-31T23:59:59Z` 
  };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await res.json();
    if (result.errors) { console.error("GraphQL Error:", result.errors[0].message); return null; }
    return result.data?.user?.contributionsCollection.contributionCalendar.totalContributions ?? null;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    return null;
  }
}

export default function Stats() {
  const [age, setAge] = useState("—");
  const [time, setTime] = useState("—");
  const [contributions, setContributions] = useState<number | null>(null);
  const githubUsername = socialLinks
    .find((l) => l.label === "GitHub")?.link
    .split("/")
    .pop();
  const year = new Date().getFullYear() - 1;

  useEffect(() => {
    // Interval for age and time
    const interval = setInterval(() => {
      setAge(getAge(profileInfo.birthDate));
      setTime(getLocalTime());
    }, 1000);

    // Fetch contributions
    fetchContributions(githubUsername, year).then(setContributions);

    return () => clearInterval(interval);
  }, [githubUsername, year]);

  const stats: { icon: React.ReactNode; label: string; ready: boolean }[] = [
    { icon: <MdCake size={16} />, label: `${age} years old`, ready: age !== "—" },
    { icon: <MdAccessTime size={16} />, label: `It is ${time}`, ready: time !== "—" },
    { icon: <MdCode size={16} />, label: `${contributions?.toLocaleString()} contributions in ${year}`, ready: contributions !== null },
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