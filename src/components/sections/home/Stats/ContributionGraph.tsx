"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@wrksz/themes/client";
import Tooltip from "@/components/ui/Tooltip";
import type { Week } from "@/lib/services/github";

type Props = {
  weeks: Week[];
  totalContributions?: number;
};
type PaletteKey = keyof typeof PALETTES;

const THRESHOLDS = [0, 10, 30, 50];
const PALETTES = {
  green: {
    light: {
      empty: "#ebedf0",
      low: "#9be9a8",
      mid: "#40c463",
      high: "#30a14e",
      max: "#216e39",
    },
    dark: {
      empty: "#161b22",
      low: "#0e4429",
      mid: "#006d32",
      high: "#26a641",
      max: "#39d353",
    },
  },
  red: {
    light: {
      empty: "#ebedf0",
      low: "#fecdd3",
      mid: "#fb7185",
      high: "#e11d48",
      max: "#881337",
    },
    dark: {
      empty: "#161b22",
      low: "#550000",
      mid: "#9f1239",
      high: "#f43f5e",
      max: "#fda4af",
    },
  },
  orange: {
    light: {
      empty: "#ebedf0",
      low: "#ffd8a8",
      mid: "#ffa94d",
      high: "#f76707",
      max: "#c04a00",
    },
    dark: {
      empty: "#161b22",
      low: "#4a2400",
      mid: "#a05000",
      high: "#d4700a",
      max: "#ff8c42",
    },
  },
  yellow: {
    light: {
      empty: "#ebedf0",
      low: "#fef08a",
      mid: "#fbbf24",
      high: "#d97706",
      max: "#92400e",
    },
    dark: {
      empty: "#161b22",
      low: "#4a3500",
      mid: "#a06800",
      high: "#f59e0b",
      max: "#fde68a",
    },
  },
  blue: {
    light: {
      empty: "#ebedf0",
      low: "#b6d4fe",
      mid: "#5b9cf6",
      high: "#2563eb",
      max: "#1447e6",
    },
    dark: {
      empty: "#161b22",
      low: "#1a3a7a",
      mid: "#2563eb",
      high: "#3b82f6",
      max: "#60a5fa",
    },
  },
  cyan: {
    light: {
      empty: "#ebedf0",
      low: "#a5f3fc",
      mid: "#22d3ee",
      high: "#0891b2",
      max: "#155e75",
    },
    dark: {
      empty: "#161b22",
      low: "#0a4a5c",
      mid: "#0e7490",
      high: "#06b6d4",
      max: "#7dd3f0",
    },
  },
  violet: {
    light: {
      empty: "#ebedf0",
      low: "#d8b4fe",
      mid: "#a855f7",
      high: "#7c3aed",
      max: "#4c1d95",
    },
    dark: {
      empty: "#161b22",
      low: "#3b1f6e",
      mid: "#6d28d9",
      high: "#8b5cf6",
      max: "#c084fc",
    },
  },
  monochrome: {
    light: {
      empty: "#ebedf0",
      low: "#d4d4d4",
      mid: "#a3a3a3",
      high: "#626262",
      max: "#171717",
    },
    dark: {
      empty: "#161b22",
      low: "#333333",
      mid: "#525252",
      high: "#a3a3a3",
      max: "#e5e5e5",
    },
  },
} as const;
const ACTIVE_PALETTE: PaletteKey = "orange";
const PALETTE = PALETTES[ACTIVE_PALETTE];

function getColor(count: number, isDark: boolean): string {
  const color = isDark ? PALETTE.dark : PALETTE.light;
  if (count === 0) return color.empty;
  if (count <= THRESHOLDS[1]) return color.low;
  if (count <= THRESHOLDS[2]) return color.mid;
  if (count <= THRESHOLDS[3]) return color.high;
  return color.max;
}

export default function ContributionGraph({
  weeks,
  totalContributions,
}: Props) {
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
      {/* Graph */}
      <div ref={scrollRef} className="overflow-x-auto pb-1.5">
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
                      style={{
                        backgroundColor: getColor(
                          day.contributionCount,
                          isDark,
                        ),
                      }}
                      className="h-3 w-3 rounded-sm"
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-1 flex items-center justify-between gap-x-8 text-xs text-zinc-500 dark:text-zinc-400">
        {/* Contribution Count */}
        <span className="truncate">
          {totalContributions?.toLocaleString() ?? 0} GitHub contributions in
          the last year
        </span>

        {/* Legend */}
        <span className="flex items-center gap-0.75">
          {[color.empty, color.low, color.mid, color.high, color.max].map(
            (c, i) => (
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
                <div
                  style={{ backgroundColor: c }}
                  className="h-3 w-3 rounded-sm"
                />
              </Tooltip>
            ),
          )}
        </span>
      </div>
    </div>
  );
}
