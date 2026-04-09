"use client";

import { useEffect, useRef, useState } from "react";
import { useTagPanelAnimation } from "@/hooks/animations/useTagPanelAnimation";

type Props = {
  count: number;
  hiddenTags: string[];
  tagStyling: string;
};

export default function TriggerTagsPanel({ count, hiddenTags, tagStyling }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Animate panel on open/close
  useTagPanelAnimation(panelRef, open);

  // Close panel on outside click or Escape key
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${count} more tags: ${hiddenTags.join(", ")}`}
        className={`${tagStyling} cursor-pointer text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80`}
        onClick={() => setOpen((v) => !v)}
      >
        +{count}
      </button>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label={`${count} additional tags`}
        className="absolute bottom-full left-1/2 z-50 mb-2 w-max -translate-x-1/2 rounded-lg border border-zinc-200 bg-zinc-50 p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        style={{ visibility: "hidden", maxWidth: "18rem" }}
      >
        <ul className="flex max-h-[min(40vh,16rem)] list-none flex-wrap gap-1.5 overflow-y-auto p-0">
          {hiddenTags.map((tag, j) => (
            <li key={`${j}-${tag}`} className={tagStyling}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}