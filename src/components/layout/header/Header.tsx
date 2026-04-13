"use client";

import { MouseEvent } from "react";

import { useToggleSidebar } from "@/hooks/animations/useToggleSidebar";
import { navLinks } from "@/lib/site";
import Sidebar from "@/components/layout/header/Sidebar";
import SidebarToggle from "@/components/layout/header/Toggle";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Nav() {
  const { open, visible, toggle, close, panelRef, linksRef, iconsRef } = useToggleSidebar();
  const showNavToggle = navLinks.length > 0;

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggle();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 pointer-events-none">
        {/* Sidebar Toggle Button */}
        <div className="pointer-events-auto -ml-1">
          {showNavToggle && <SidebarToggle open={open} onToggle={handleToggle} />}
        </div>

        {/* Theme Toggle */}
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </header>
      
      {/* Sidebar Panel */}
      {showNavToggle && (
        <>
          {/* Overlay */}
          {visible && (
            <div
              onClick={close}
              className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40"
            />
          )}

          {/* Sidebar Panel */}
          <Sidebar
            visible={visible}
            panelRef={panelRef}
            linksRef={linksRef}
            iconsRef={iconsRef}
            onLinkClick={close}
          />
        </>
      )}
    </>
  );
}

