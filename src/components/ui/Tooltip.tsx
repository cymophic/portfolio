"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  content: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export default function Tooltip({ content, disabled = false, children }: Props) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, isTop: true });
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted] = useState(() => typeof window !== "undefined");

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const isTop = rect.top >= window.innerHeight - rect.bottom;

    setCoords({
      top: isTop ? rect.top : rect.bottom,
      left: Math.min(rect.left, window.innerWidth - 328),
      isTop,
    });
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
      {visible && mounted && createPortal(
        <div
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.isTop ? coords.top - 8 : coords.top + 8,
            left: coords.left,
            transform: coords.isTop ? "translateY(-100%)" : "translateY(0)",
          }}
          className="pointer-events-none z-50 w-max max-w-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 shadow-md"
        >
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}