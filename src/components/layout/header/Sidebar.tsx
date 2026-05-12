"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/site";
import SocialLinks from "@/components/ui/SocialLinks";

type Props = {
  visible: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  linksRef: React.RefObject<(HTMLAnchorElement | null)[]>;
  iconsRef: React.RefObject<(HTMLAnchorElement | null)[]>;
  onLinkClick: () => void;
};

export default function Sidebar({
  visible,
  panelRef,
  linksRef,
  iconsRef,
  onLinkClick,
}: Props) {
  const pathname = usePathname();

  return (
    <div
      ref={panelRef}
      inert={!visible ? true : undefined}
      className="fixed top-0 left-0 h-full w-full md:w-64 z-40 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between py-4 px-6 invisible"
    >
      <div className="mt-16">
        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              onClick={onLinkClick}
              className={`text-lg py-2 transition-colors font-semibold ${
                pathname === link.href
                  ? "text-zinc-700 dark:text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="mt-16">
          <SocialLinks iconsRef={iconsRef} hoverEffect="monochrome" />
        </div>
      </div>
    </div>
  );
}
