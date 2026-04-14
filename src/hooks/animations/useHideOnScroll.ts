"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const CONFIG = {
  scrollThreshold: 50,
  mobileBreakpoint: 1280,
  showDuration: 0.18,
  hideDuration: 0.18,
  showEase: "power2.out",
  hideEase: "power2.in",
};

export function useHideOnScroll(mobileOnly = true) {
  const ref = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileOnly && window.innerWidth >= CONFIG.mobileBreakpoint) return;

      const currentY = window.scrollY;
      const isAtTop = currentY < CONFIG.scrollThreshold;
      const isScrollingUp = currentY < lastScrollY.current;

      if (isAtTop || isScrollingUp) {
        if (hidden.current) {
          gsap.to(ref.current, { y: 0, duration: CONFIG.showDuration, ease: CONFIG.showEase });
          hidden.current = false;
          setIsHidden(false);
        }
      } else {
        if (!hidden.current) {
          gsap.to(ref.current, { y: "-100%", duration: CONFIG.hideDuration, ease: CONFIG.hideEase });
          hidden.current = true;
          setIsHidden(true);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOnly]);

  return { ref, isHidden };
} 