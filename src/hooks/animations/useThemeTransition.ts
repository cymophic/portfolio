"use client";

import { useRef, useCallback } from "react";
import { useTheme } from "next-themes";

type UseThemeTransitionResult = {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  toggleTheme: () => void;
};

export function useThemeTransition(isDark: boolean): UseThemeTransitionResult {
  const { setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => setTheme(nextTheme));

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, [isDark, setTheme]);

  return { buttonRef, toggleTheme };
}