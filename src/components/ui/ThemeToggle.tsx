"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    >
      {isDark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
    </button>
  );
}