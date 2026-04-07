"use client";

import { MouseEvent } from "react";

import NavToggleButton from "@/components/ui/NavToggleButton";
import NavOverlay from "@/components/layout/nav/NavOverlay";
import NavPanel from "@/components/layout/nav/NavPanel";
import { useNavPanel } from "@/hooks/navigation/useNavPanel";

export default function Nav() {
  const { open, visible, toggle, close, panelRef, linksRef } = useNavPanel();

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggle();
  };

  return (
    <>
      <NavToggleButton open={open} onToggle={handleToggle} />
      <NavOverlay visible={visible} onClick={close} />
      <NavPanel
        visible={visible}
        panelRef={panelRef}
        linksRef={linksRef}
        onLinkClick={close}
      />
    </>
  );
}

