import { IconGitCommit } from "@tabler/icons-react";

import { cn } from "@/lib/utils/cn";
import useMetadata from "@/hooks/utils/useMetadata";

export default function Metadata() {
  const { sessionTime, visitCount, deviceOS, latestCommit, lastUpdated } =
    useMetadata();

  return (
    <div className="flex flex-wrap justify-center items-center">
      <Data suppressHydrationWarning>{visitCount}</Data>
      <Separator />
      <Data suppressHydrationWarning>{deviceOS.toLowerCase()}</Data>
      <Separator />
      <Data>{sessionTime}</Data>
      <Separator />
      {latestCommit ? (
        <a
          href={latestCommit.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "font-mono text-xs tracking-tight text-zinc-400 dark:text-zinc-500 transition-colors cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300",
          )}
        >
          <IconGitCommit size={12} className="inline overflow-clip -mt-0.5" />
          {latestCommit.id}
        </a>
      ) : (
        <Data>-</Data>
      )}
      <Separator />
      <Data>{lastUpdated}</Data>
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
