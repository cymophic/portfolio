"use client";

import { useState, useRef, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks } from "@/lib/navigation";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      gsap.fromTo(
        panelRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: "power2.out", delay: 0.15 }
      );
    }
  }, [open]);

  const handleClose = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      x: "-100%",
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setOpen(false);
        setVisible(false);
      },
    });
  };

  return (
    <>
      {/* Toggle button (open/close) */}
      <button
        onClick={() => {
          if (open) {
            handleClose();
          } else {
            setOpen(true);
            setVisible(true);
          }
        }}
        className="fixed top-0 left-0 z-50 p-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        {open ? <MdClose size={18} /> : <MdMenu size={18} />}
      </button>

      {/* Overlay */}
      {visible && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40"
        />
      )}

      {/* Panel */}
      {visible && (
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
                  ref={(el) => { if (el) linksRef.current[i] = el; }}
                  onClick={handleClose}
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
      )}
    </>
  );
}