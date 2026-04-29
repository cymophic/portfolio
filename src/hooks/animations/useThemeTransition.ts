"use client";

import { useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

type UseThemeTransitionResult = {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  toggleTheme: (e: React.MouseEvent) => void;
};

export function useThemeTransition(isDark: boolean): UseThemeTransitionResult {
  const { setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isTransitioning = useRef(false);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    transition.finished.then(() => {
      isTransitioning.current = false;
    });

    transition.ready.then(() => {
      requestAnimationFrame(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
          { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)", fill: "both" }
        );
      });
    });
  }, [isDark, setTheme]);

  return { buttonRef, toggleTheme };
}