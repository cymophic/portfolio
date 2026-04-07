"use client";

import type { MouseEventHandler } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "@/components/ui/button/Button";

type NavToggleButtonProps = {
  open: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
};

export default function NavToggleButton({ open, onToggle }: NavToggleButtonProps) {
  return (
    <Button
      variant="icon"
      onClick={onToggle}
      className="p-2"
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center transform transition-transform duration-300 ease-out ${
          open ? "rotate-90" : "rotate-0"
        }`}
      >
        {open ? <MdClose size={18} /> : <MdMenu size={18} />}
      </span>
    </Button>
  );
}

