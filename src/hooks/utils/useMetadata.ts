"use client";

import { useEffect, useState } from "react";

import { getOrdinal, formatMonthYear } from "@/lib/utils/format";
import { fetchGithubData } from "@/lib/services/github";
import { getDeviceOS } from "@/lib/utils/visitor";

export default function useMetadata() {
  const sessionTime = useSessionTime();
  const visitCount = useVisitCount();
  const deviceOS = useDeviceOS();
  const { latestCommit, lastUpdated } = useCommit();
  return { sessionTime, visitCount, deviceOS, latestCommit, lastUpdated };
}

// Tracks the elapsed time since the page was loaded
export function useSessionTime() {
  const [session, setSession] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSession((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(session / 3600);
  const minutes = Math.floor((session % 3600) / 60);
  const seconds = session % 60;

  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Fetches and formats the visitor's visit count for this site
export function useVisitCount() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      fetch("https://abacus.jasoncameron.dev/hit/luisabhram.dev/visits")
        .then((res) => res.json())
        .then((data) => setVisitCount(data.value));
    }
  }, []);

  if (process.env.NODE_ENV === "development") return "dev mode";
  return visitCount > 0 ? `${getOrdinal(visitCount)} visit` : "—";
}

// Detects and returns the visitor's operating system on mount
export function useDeviceOS() {
  const [os, setOs] = useState("—");

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-side initialization */
    setOs(getDeviceOS());
  }, []);

  return os;
}

// Fetches the most recent portfolio commit from GitHub
export function useCommit() {
  const [latestCommit, setLatestCommit] = useState<{
    id: string;
    url: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    fetchGithubData().then((data) =>
      setLatestCommit(data?.recentCommit ?? null),
    );
  }, []);

  return {
    latestCommit,
    lastUpdated: latestCommit ? formatMonthYear(latestCommit.date) : "—",
  };
}
