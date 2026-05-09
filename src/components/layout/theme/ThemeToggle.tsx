"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@wrksz/themes/client";
import { IconSunHighFilled, IconMoonFilled } from "@tabler/icons-react";
import { useThemeTransition } from "@/hooks/animations/useThemeTransition";

export default function ThemeToggle() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconSize = 18;
  const isDark = resolvedTheme === "dark";
  const { buttonRef, toggleTheme } = useThemeTransition(isDark);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted)
    return <IconMoonFilled size={iconSize} className="m-2 text-zinc-500" />;

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 text-sm text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-300 cursor-pointer active:scale-85 sm:active:scale-120 sm:hover:scale-120 transition-transform duration-100"
    >
      {isDark ? (
        <IconSunHighFilled size={iconSize} />
      ) : (
        <IconMoonFilled size={iconSize} />
      )}
    </button>
  );
}
