/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { IconHeart, IconGitCommit } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

import ProfileImage from "@/components/ui/ProfileImage";
import { profileInfo } from "@/lib/site";
import SocialLinks from "../../ui/SocialLinks";
import Tooltip from "@/components/ui/Tooltip";
import { fetchGithubData } from "@/lib/utils/github";

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

function getDeviceOS(): string {
  const platform = (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData?.platform ?? navigator.platform ?? "";
  if (platform.includes("Win")) return "windows";
  if (platform.includes("Mac")) return "macos";
  if (platform.includes("Linux")) return "linux";
  if (platform.includes("Android")) return "android";
  if (platform.includes("iPhone") || platform.includes("iPad")) return "ios";
  return "unknown";
}

function formatCommitDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" }).toLowerCase();
}

export default function Footer() {
  const [session, setSession] = useState(0);
  const [os, setOs] = useState("—");
  const [visitCount, setVisitCount] = useState(0);
  const [commit, setCommit] = useState<{ id: string; url: string; date: string } | null>(null);
  const hours = Math.floor(session / 3600);
  const minutes = Math.floor((session % 3600) / 60);
  const seconds = session % 60;
  const sessionTime = hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const visitLabel = process.env.NODE_ENV === "development"
    ? "dev mode"
    : visitCount > 0 ? `${getOrdinal(visitCount)} visit` : "—";
  const lastUpdated = commit ? formatCommitDate(commit.date) : "—";
  const metaItem = "font-mono text-xs tracking-tight text-zinc-400 dark:text-zinc-500 transition-colors cursor-default";
  const separator = "font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5";
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => setSession((s) => s + 1), 1000);
    setOs(getDeviceOS());

    if (process.env.NODE_ENV !== "development") {
      fetch("https://abacus.jasoncameron.dev/hit/luisabhram.dev/visits")
        .then((res) => res.json())
        .then((data) => setVisitCount(data.value));
    }
      
    fetchGithubData().then((data) => setCommit(data?.recentCommit ?? null));
    return () => clearInterval(interval);
  }, []);

  function handleImageClick() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  return (
    <footer className="flex flex-col items-center text-center pt-10 pb-18 gap-6">
      {/* Line */}
      <div className="w-px h-16 bg-zinc-300 dark:bg-zinc-700"/>

      {/* Byline */}
      <div className="my-1">
        <p className="font-mono text-xs tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-500">
          Made with <IconHeart className="inline overflow-clip -mt-1" size={14} style={{ strokeWidth: 3 }} /> by {profileInfo.name}
        </p>
      </div>

      {/* Profile Image */}
      <Tooltip content={pathname === "/" ? "Jump to Top" : "Return to Home"}>
        <button onClick={handleImageClick}>
          <ProfileImage width={48} height={48} className="hover:scale-112 transition-transform"/>
        </button>
      </Tooltip>

      {/* Social Links */}
      <SocialLinks iconSize={18} hoverEffect="monochrome" />

      {/* Metadata */}
      <div className="flex flex-col items-center gap-1.5">
        {/* Desktop */}
        <div className="hidden sm:flex items-center">
          <span className={metaItem} suppressHydrationWarning>{visitLabel}</span>
          <span className={separator}>|</span>
          <span className={metaItem} suppressHydrationWarning>{os.toLowerCase()}</span>
          <span className={separator}>|</span>
          <span className={metaItem}>{sessionTime}</span>
          <span className={separator}>|</span>
            {commit
              ? <a href={commit.url} target="_blank" rel="noopener noreferrer" className={`${metaItem} sm:hover:text-zinc-600 sm:dark:hover:text-zinc-300 transition-colors cursor-pointer`}>
                <IconGitCommit size={12} className="inline overflow-clip -mt-0.5" /> 
                {commit.id}
              </a>
              : <span className={metaItem}>
                  —
                </span>
            }
          <span className={separator}>|</span><span className={metaItem}>{lastUpdated}</span>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden flex-col items-center gap-1.5">
          <div className="flex items-center">
            <span className={metaItem}>{visitLabel}</span>
            <span className={separator}>|</span>
            <span className={metaItem}>{sessionTime}</span>
            <span className={separator}>|</span>
            <span className={metaItem}>{os.toLowerCase()}</span>
          </div>
          <div className="flex items-center">
            {commit
              ? <a href={commit.url} target="_blank" rel="noopener noreferrer" className={metaItem}>
                <IconGitCommit size={12} className="inline overflow-clip -mt-0.5" /> 
                {commit.id}
              </a>
              : <span className={metaItem}>
                  —
                </span>
            }
            <span className={separator}>|</span>
            <span className={metaItem}>{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        © 2026{new Date().getFullYear() !== 2026 ? ` - ${new Date().getFullYear()}` : ""}. All rights reserved.
      </p>
    </footer>
  );
}