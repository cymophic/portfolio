"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Tooltip from "@/components/ui/Tooltip";
import type { Week } from "@/lib/utils/github";

const THRESHOLDS = [0, 10, 30, 50];
const PALETTES = {
  green: {
    light: { empty: "#ebedf0", low: "#9be9a8", mid: "#40c463", high: "#30a14e", max: "#216e39" },
    dark:  { empty: "#161b22", low: "#0e4429", mid: "#006d32", high: "#26a641", max: "#39d353" },
  },
  red: {
    light: { empty: "#ebedf0", low: "#ffb3b3", mid: "#ff6666", high: "#e03131", max: "#a80000" },
    dark:  { empty: "#161b22", low: "#4a0000", mid: "#7d0000", high: "#c00000", max: "#ff4444" },
  },
  orange: {
    light: { empty: "#ebedf0", low: "#ffd8a8", mid: "#ffa94d", high: "#f76707", max: "#c04a00" },
    dark:  { empty: "#161b22", low: "#3d1f00", mid: "#7a3d00", high: "#c25c00", max: "#ff8c42" },
  },
  blue: {
    light: { empty: "#ebedf0", low: "#b6d4fe", mid: "#5b9cf6", high: "#2563eb", max: "#1447e6" },
    dark:  { empty: "#161b22", low: "#0d1f4a", mid: "#1a3a8f", high: "#2563eb", max: "#60a5fa" },
  },
  cyan: {
    light: { empty: "#ebedf0", low: "#a5f3fc", mid: "#22d3ee", high: "#0891b2", max: "#155e75" },
    dark:  { empty: "#161b22", low: "#0a3a4a", mid: "#0e7490", high: "#06b6d4", max: "#38bdf8" },
  },
  violet: {
    light: { empty: "#ebedf0", low: "#d8b4fe", mid: "#a855f7", high: "#7c3aed", max: "#4c1d95" },
    dark:  { empty: "#161b22", low: "#3b1f6e", mid: "#5b21b6", high: "#7c3aed", max: "#c084fc" },
  },
} as const;

type PaletteKey = keyof typeof PALETTES;
const ACTIVE_PALETTE: PaletteKey = "orange";
const PALETTE = PALETTES[ACTIVE_PALETTE];

type Props = {
  weeks: Week[];
  totalContributions?: number;
};

function getColor(count: number, isDark: boolean): string {
  const color = isDark ? PALETTE.dark : PALETTE.light;
  if (count === 0) return color.empty;
  if (count <= THRESHOLDS[1]) return color.low;
  if (count <= THRESHOLDS[2]) return color.mid;
  if (count <= THRESHOLDS[3]) return color.high;
  return color.max;
}

export default function ContributionGraph({ weeks, totalContributions }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const color = isDark ? PALETTE.dark : PALETTE.light;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);

  return (
    <div className="flex flex-col gap-1">
      <div ref={scrollRef} className="overflow-x-auto pb-0.5">
        <div className="mx-auto w-fit">
          <div className="flex gap-0.75">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.75">
                {week.contributionDays.map((day) => (
                  <Tooltip
                    key={day.date}
                    content={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                  >
                    <div
                      style={{ backgroundColor: getColor(day.contributionCount, isDark) }}
                      className="h-3 w-3 rounded-xs"
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-1 flex items-center justify-between gap-x-8 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="truncate">{totalContributions?.toLocaleString() ?? 0} GitHub contributions in the last year</span>
        <span className="flex items-center gap-0.75">
          {[color.empty, color.low, color.mid, color.high, color.max].map((c, i) => (
            <Tooltip
              key={i}
              content={
                i === 0
                  ? "0 contributions"
                  : i === THRESHOLDS.length
                  ? `${THRESHOLDS[i - 1] + 1}+ contributions`
                  : `${THRESHOLDS[i - 1] + 1} to ${THRESHOLDS[i]} contributions`
              }
            >
              <div style={{ backgroundColor: c }} className="h-3 w-3 rounded-xs" />
            </Tooltip>
          ))}
        </span>
      </div>
    </div>
  );
}