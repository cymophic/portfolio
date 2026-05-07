import React from "react";
import { IconGitCommit } from "@tabler/icons-react";

import Tooltip from "@/components/ui/Tooltip";
import useMetadata from "@/hooks/utils/useMetadata";
import { cn } from "@/lib/utils/cn";
import useIsMobile from "@/hooks/utils/useIsMobile";

export default function Metadata() {
  const { sessionTime, visitCount, deviceOS, latestCommit, lastUpdated } =
    useMetadata();
  const isMobile = useIsMobile();

  let items = [
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
  const desktopOrder = [0, 1, 2, 3, 4];
  const mobileOrder = [0, 2, 1, 3, 4];
  items = (isMobile ? mobileOrder : desktopOrder).map((i) => items[i]);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {items
        .slice(0, -2)
        .map(({ label, content, suppressHydrationWarning, icon }, i) => {
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
              {/* Show separator between items; then on mobile, hide the last one since it line-breaks */}
              {i < items.slice(0, -2).length - 1 ? (
                <Separator />
              ) : (
                <span className="hidden sm:inline">
                  <Separator />
                </span>
              )}
            </React.Fragment>
          );
        })}
      <div className="w-full sm:hidden" />
      {items
        .slice(-2)
        .map(({ label, content, suppressHydrationWarning, icon }, i) => {
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
              {i < 1 && <Separator />}
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
function Data({
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
