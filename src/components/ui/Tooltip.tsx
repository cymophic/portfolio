"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type Props = {
  content: string;
  disabled?: boolean;
  children: React.ReactNode;
};

type Position = "top" | "bottom";

export default function Tooltip({ content, disabled = false, children }: Props) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>("top");
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    setPosition(spaceAbove >= spaceBelow ? "top" : "bottom");
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    updatePosition();
    setVisible(true);
  }, [disabled, updatePosition]);

  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible) return;
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, [visible, hide]);

  return (
    <div
      ref={triggerRef}
      className="relative min-w-0"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`${position === "top" ? "bottom-full mb-2" : "top-full mt-2"} pointer-events-none absolute left-0 z-50 w-max max-w-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 shadow-md`}
        >
          {content}
        </div>
      )}
    </div>
  );
}