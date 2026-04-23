"use client";

import {
  useState, useRef, useCallback, useEffect,
  createContext, useContext,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type TooltipState = {
  content: string;
  top: number;
  left: number;
  isTop: boolean;
} | null;

type TooltipContextType = {
  show: (content: string, triggerEl: HTMLDivElement) => void;
  hide: () => void;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

// Provider
export function TooltipProvider({ children }: { children: ReactNode }) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const hide = useCallback(() => setTooltip(null), []);

  const show = useCallback((content: string, triggerEl: HTMLDivElement) => {
    const rect = triggerEl.getBoundingClientRect();
    const isTop = window.innerHeight - rect.bottom < 60;

    setTooltip({
      content,
      top: isTop ? rect.top : rect.bottom,
      left: rect.left + rect.width / 2,
      isTop,
    });
  }, []);

  // Edge correction after render
  useEffect(() => {
    const tip = tooltipRef.current;
    if (!tip || !tooltip) return;

    const { left, right } = tip.getBoundingClientRect();
    if (right > window.innerWidth) {
      setTooltip(t => t ? { ...t, left: t.left - (right - window.innerWidth) - 8 } : null);
    } else if (left < 0) {
      setTooltip(t => t ? { ...t, left: t.left + Math.abs(left) + 8 } : null);
    }
  }, [tooltip]);

  // Hide on scroll or resize
  useEffect(() => {
    if (!tooltip) return;
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, [tooltip, hide]);

  return (
    <TooltipContext.Provider value={{ show, hide }}>
      {children}
      {tooltip && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: "fixed",
            top: tooltip.isTop ? tooltip.top - 8 : tooltip.top + 8,
            left: tooltip.left,
            transform: tooltip.isTop
              ? "translateX(-50%) translateY(-100%)"
              : "translateX(-50%)",
          }}
          className="pointer-events-none z-50 w-max max-w-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 shadow-md"
        >
          {tooltip.content}
        </div>,
        document.body
      )}
    </TooltipContext.Provider>
  );
}

// Tooltip
type Props = {
  content: string;
  disabled?: boolean;
  children: ReactNode;
};

export default function Tooltip({ content, disabled = false, children }: Props) {
  const ctx = useContext(TooltipContext);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (disabled || !ctx || !triggerRef.current) return;
    ctx.show(content, triggerRef.current);
  }, [disabled, content, ctx]);

  const handleMouseLeave = useCallback(() => {
    ctx?.hide();
  }, [ctx]);

  return (
    <div
      ref={triggerRef}
      className="relative min-w-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
    </div>
  );
}