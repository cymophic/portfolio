"use client";

import type { MouseEventHandler } from "react";
import { MdMenu, MdClose } from "react-icons/md";

type NavToggleButtonProps = {
  open: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
};

export default function NavToggleButton({ open, onToggle }: NavToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-0 left-0 z-50 p-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    >
      {open ? <MdClose size={18} /> : <MdMenu size={18} />}
    </button>
  );
}

