"use client";

import type { MouseEventHandler } from "react";
import { IconMenu, IconX } from "@tabler/icons-react";

type Props = {
  open: boolean;
  onToggleAction: MouseEventHandler<HTMLButtonElement>;
};

export default function SidebarToggle({ open, onToggleAction }: Props) {
  return (
    <button
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      onClick={onToggleAction}
      className="p-2 text-sm text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-300 cursor-pointer"
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center transform transition-transform duration-300 ease-out ${
          open ? "rotate-90" : "rotate-0"
        }`}
      >
        {open ? (
          <IconX size={16} stroke={3} />
        ) : (
          <IconMenu size={16} stroke={3} />
        )}
      </span>
    </button>
  );
}
