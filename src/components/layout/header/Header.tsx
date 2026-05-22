"use client";

import { MouseEvent } from "react";

import { useToggleSidebar } from "@/hooks/animations/useToggleSidebar";
import { useHideOnScroll } from "@/hooks/animations/useHideOnScroll";
import { navLinks } from "@/lib/site";
import Sidebar from "@/components/layout/header/Sidebar";
import SidebarToggle from "@/components/layout/header/Toggle";
import ThemeToggle from "@/components/layout/theme/ThemeToggle";

export default function Nav() {
  const { open, visible, toggle, close, panelRef, linksRef, iconsRef } =
    useToggleSidebar();
  const showNavToggle = navLinks.length > 0;
  const { ref: headerRef, isHidden } = useHideOnScroll();

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggle();
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full fixed top-0 left-0 right-0 z-10 p-4 ${isHidden ? "overflow-hidden" : ""}`}
      >
        <div className="flex items-center justify-between">
          {/* Sidebar Toggle Button */}
          <div className="pointer-events-auto -ml-1 z-50">
            {showNavToggle && (
              <SidebarToggle open={open} onToggle={handleToggle} />
            )}
          </div>

          {/* Theme Toggle */}
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Sidebar Panel */}
        {showNavToggle && (
          <>
            {/* Overlay */}
            {visible && (
              <div
                onClick={close}
                className="fixed inset-0 z-10 bg-black/20 dark:bg-black/40"
              />
            )}

            {/* Sidebar Panel */}
            <Sidebar
              visible={visible}
              panelRef={panelRef}
              linksRef={linksRef}
              iconsRef={iconsRef}
              onLinkClickAction={close}
            />
          </>
        )}

        {/* Header Background */}
        <div className="absolute top-0 left-0 right-0 -z-10 bg-linear-to-b from-zinc-50 via-zinc-50/98 dark:from-zinc-950 dark:via-zinc-950/96 to-transparent pointer-events-none pb-24" />
      </header>
    </>
  );
}
