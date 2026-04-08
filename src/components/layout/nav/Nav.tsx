"use client";

import { MouseEvent } from "react";

import NavToggleButton from "@/components/layout/nav/NavToggleButton";
import NavOverlay from "@/components/layout/nav/NavOverlay";
import NavPanel from "@/components/layout/nav/NavPanel";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useNavPanel } from "@/hooks/animations/navigation/useNavPanel";

export default function Nav() {
  const { open, visible, toggle, close, panelRef, linksRef, iconsRef } = useNavPanel();

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggle();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 pointer-events-none">
        <div className="pointer-events-auto -ml-1">
          <NavToggleButton open={open} onToggle={handleToggle} />
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </header>

      <NavOverlay visible={visible} onClick={close} />
      <NavPanel
        visible={visible}
        panelRef={panelRef}
        linksRef={linksRef}
        iconsRef={iconsRef}
        onLinkClick={close}
      />
    </>
  );
}

