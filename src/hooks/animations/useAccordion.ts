"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

type UseAccordionResult = {
  contentRef: React.RefObject<HTMLUListElement | null>;
  animate: (isOpen: boolean) => void;
};

export function useAccordion(): UseAccordionResult {
  const contentRef = useRef<HTMLUListElement | null>(null);

  const animate = useCallback((isOpen: boolean) => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }, []);

  return { contentRef, animate };
}