"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

type UseNavPanelResult = {
  open: boolean;
  visible: boolean;
  toggle: () => void;
  close: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
  linksRef: React.RefObject<(HTMLAnchorElement | null)[]>;
};

export function useNavPanel(): UseNavPanelResult {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    }
  }, [open]);

  const close = useCallback(() => {
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
  }, []);

  const openPanel = () => {
    setOpen(true);
    setVisible(true);
  };

  const toggle = () => {
    if (open) {
      close();
    } else {
      openPanel();
    }
  };

  return { open, visible, toggle, close, panelRef, linksRef };
}

