"use client";

import Link from "next/link";
import Tooltip from "@/components/ui/Tooltip";
import { IconArrowUpRight } from "@tabler/icons-react";

type Props = {
  title: string;
  href?: string;
  tooltip?: string;
};

export default function SectionTitle({ title, href, tooltip }: Props) {
  const content = href ? (
    <Tooltip content={tooltip ?? title} className="inline">
      <Link
        href={href}
        className="hover:underline underline-offset-4 hover:text-zinc-600 dark:hover:text-zinc-300"
      >
        {title}
        <IconArrowUpRight size={16} className="inline overflow-clip align-middle ml-0.5 -mt-0.5" />
      </Link>
    </Tooltip>
  ) : (
    title
  );

  return (
    <div className="flex gap-2 font-console text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
      <span className="text-zinc-200 dark:text-zinc-700">/</span>
      {content}
    </div>
  );
}