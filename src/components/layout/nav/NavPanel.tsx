"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks } from "@/lib/navigation";

type NavPanelProps = {
  visible: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  linksRef: React.RefObject<(HTMLAnchorElement | null)[]>;
  onLinkClick: () => void;
};

export default function NavPanel({
  visible,
  panelRef,
  linksRef,
  onLinkClick,
}: NavPanelProps) {
  const pathname = usePathname();

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      className="fixed top-0 left-0 h-full w-56 z-40 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between py-4 px-6"
    >
      <div className="mt-12">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              onClick={onLinkClick}
              className={`text-md py-1.5 transition-colors font-semibold ${
                pathname === link.href
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <ThemeToggle />
    </div>
  );
}

