"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

export default function Breadcrumb() {
  const pathname = usePathname();
  const home = navLinks.find((link) => link.href === "/");

  if (pathname === "/") return null;

  const current = navLinks.find((link) => link.href === pathname);
  const label = current?.label ?? pathname.slice(1);

  return (
    <nav className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
      <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
        {home!.label}
      </Link>
      <span className="mx-2">/</span>
      <span>{label}</span>
    </nav>
  );
}