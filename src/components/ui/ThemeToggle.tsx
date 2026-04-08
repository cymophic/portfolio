"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconSize = 18;

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return <MdDarkMode size={iconSize} className="m-2 text-zinc-500" />;

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(isDark ? "light" : "dark");
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="p-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100 transition-colors"
    >
      {isDark ? <MdLightMode size={iconSize} /> : <MdDarkMode size={iconSize} />}
    </button>
  );
}