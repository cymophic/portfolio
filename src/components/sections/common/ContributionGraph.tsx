"use client";

import { useTheme } from "next-themes";
import Tooltip from "@/components/ui/Tooltip";
import type { Week } from "@/lib/utils/github";
import { useEffect, useRef } from "react";

const THRESHOLDS = [0, 10, 30, 50];
const PALETTE = {
  light: {
    empty: "#ebedf0",
    low:   "#9be9a8",
    mid:   "#40c463",
    high:  "#30a14e",
    max:   "#216e39",
  },
  dark: {
    empty: "#161b22",
    low:   "#0e4429",
    mid:   "#006d32",
    high:  "#26a641",
    max:   "#39d353",
  },
};

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
      {/* Contribution Graph */}
      <div ref={scrollRef} className="overflow-x-auto pb-2">
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

      {/* Labels & Legend */}
      <div className="px-1 flex items-center justify-between gap-x-8 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="truncate">{totalContributions?.toLocaleString() ?? 0} GitHub contributions in the last year</span>
        <span className="flex items-center gap-0.75">
          {[color.empty, color.low, color.mid, color.high, color.max].map((color, i) => (
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
              <div key={i} style={{ backgroundColor: color }} className="h-3 w-3 rounded-xs" />
            </Tooltip>
          ))}
        </span>
      </div>
    </div>
  );
}