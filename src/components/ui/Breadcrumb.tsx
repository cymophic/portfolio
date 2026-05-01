"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  separator?: string;
};

export default function Breadcrumb({ separator = "/" }: Props) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const segments = pathname.split("/").filter(Boolean);
  const showEllipsis = segments.length > 1;
  const visibleSegments = showEllipsis ? segments.slice(-2) : segments;
  const ellipsisHref = "/" + segments.slice(0, -2).join("/");

  return (
    <nav className="font-console text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
      {!showEllipsis && (
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
          Home
        </Link>
      )}
      {showEllipsis && (
        <>
          <Link href={ellipsisHref} className="hover:text-zinc-600 dark:hover:text-zinc-300">
            ..
          </Link>
        </>
      )}
      {visibleSegments.map((segment, i) => {
        const href = "/" + segments.slice(0, segments.length - 2 + i + 1).join("/");
        const label = segment.replaceAll("-", " ");

        return (
          <span key={href} className="flex items-center gap-2">
            <span className="text-zinc-200 dark:text-zinc-700">{separator}</span>
            {i === segments.length - 1 ? (
              <span className="pointer-events-none">{label}</span>
            ) : (
              <Link href={href} className="hover:text-zinc-600 dark:hover:text-zinc-300">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}