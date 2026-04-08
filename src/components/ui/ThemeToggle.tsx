"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconSize = 18;

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return <MdDarkMode size={iconSize} className="m-2 text-zinc-500" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100 transition-colors"
    >
      {isDark ? <MdLightMode size={iconSize} /> : <MdDarkMode size={iconSize} />}
    </button>
  );
}