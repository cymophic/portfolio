"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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

  if (!mounted) return <IconMoonFilled size={iconSize} className="m-2 text-zinc-500" />;

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="p-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100 transition-colors cursor-pointer"
    >
      {isDark ? <IconSunHighFilled size={iconSize} /> : <IconMoonFilled size={iconSize} />}
    </button>
  );
}