"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";

type UseAccordionResult = {
  contentRef: React.RefObject<HTMLUListElement | null>;
  animate: (isOpen: boolean) => void;
};

export function useAccordion(): UseAccordionResult {
  const contentRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.classList.remove("invisible");
      gsap.set(contentRef.current, { opacity: 0, height: 0, overflow: "hidden", marginTop: 0 });
    }
  }, []);

  const animate = useCallback((isOpen: boolean) => {
    if (!contentRef.current) return;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      gsap.to(contentRef.current, {
        height, opacity: 1, marginTop: 16, duration: 0.3, ease: "power2.out"
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0, opacity: 0, marginTop: 0, duration: 0.2, ease: "power2.in"
      });
    }
  }, []);

  return { contentRef, animate };
}