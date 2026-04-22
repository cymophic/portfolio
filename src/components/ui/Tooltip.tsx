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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mounted] = useState(() => typeof window !== "undefined");

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const isTop = window.innerHeight - rect.bottom < 60;

    setCoords({
      top: isTop ? rect.top : rect.bottom,
      left: rect.left + rect.width / 2,
      isTop,
    });
  }, []);

  useEffect(() => {
    const tip = tooltipRef.current;
    if (!tip) return;

    const { left, right } = tip.getBoundingClientRect();
    if (right > window.innerWidth) {
      setCoords(c => ({ ...c, left: c.left - (right - window.innerWidth) - 8 }));
    } else if (left < 0) {
      setCoords(c => ({ ...c, left: c.left + Math.abs(left) + 8 }));
    }
  }, [visible]);

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
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.isTop ? coords.top - 8 : coords.top + 8,
            left: coords.left,
            transform: coords.isTop ? "translateX(-50%) translateY(-100%)" : "translateX(-50%)",
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