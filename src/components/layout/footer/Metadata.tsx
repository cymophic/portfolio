import React from "react";
import { IconGitCommit } from "@tabler/icons-react";

import Tooltip from "@/components/ui/Tooltip";
import useMetadata from "@/hooks/utils/useMetadata";
import { cn } from "@/lib/utils/cn";

export default function Metadata() {
  const { sessionTime, visitCount, deviceOS, latestCommit, lastUpdated } =
    useMetadata();

  const items = [
    {
      label: "Visit Count",
      content: visitCount,
      suppressHydrationWarning: true,
    },
    {
      label: "Device OS",
      content: deviceOS.toLowerCase(),
      suppressHydrationWarning: true,
    },
    { label: "Session Time", content: sessionTime },
    {
      label: "Commit Version",
      content: latestCommit?.id ?? "-",
      icon: IconGitCommit,
    },
    { label: "Last Updated", content: lastUpdated.toLowerCase() },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center">
      {items.map(({ label, content, suppressHydrationWarning, icon }, i) => {
        const Icon = icon;
        return (
          <React.Fragment key={i}>
            <Tooltip content={label}>
              <Data suppressHydrationWarning={suppressHydrationWarning}>
                {Icon && (
                  <Icon size={12} className="inline overflow-clip -mt-0.5" />
                )}
                {content}
              </Data>
            </Tooltip>
            {i < items.length - 1 && <Separator />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Vertical divider between metadata values
export function Separator() {
  const separatorSymbol = "|";
  return (
    <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mx-2.5">
      {separatorSymbol}
    </span>
  );
}

// Styled wrapper for each metadata value
export function Data({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-tight text-zinc-400 dark:text-zinc-500 transition-colors cursor-default",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
