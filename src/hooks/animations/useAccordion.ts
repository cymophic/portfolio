"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";

type UseAccordionResult = {
  contentRef: React.RefObject<HTMLUListElement | null>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  animate: (isOpen: boolean) => void;
  isAnimating: React.RefObject<boolean>;
};

export function useAccordion(): UseAccordionResult {
  const isAnimating = useRef(false);
  const contentRef = useRef<HTMLUListElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const naturalPreviewHeight = useRef<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.classList.remove("invisible");
      gsap.set(contentRef.current, { opacity: 0, height: 0, overflow: "hidden", marginTop: 0 });
    }
    
    if (previewRef.current) {
      naturalPreviewHeight.current = previewRef.current.scrollHeight;
      gsap.set(previewRef.current, { overflow: "hidden", height: "auto" });
    }
  }, []);

  const animate = useCallback((isOpen: boolean) => {
    if (!contentRef.current) return;
    isAnimating.current = true;

    if (isOpen) {
      const height = contentRef.current.scrollHeight;

      gsap.to(contentRef.current, {
        height, opacity: 1, marginTop: 16, duration: 0.3, ease: "power2.out",
        onComplete: () => { isAnimating.current = false; }
      });

      if (previewRef.current) {
        gsap.to(previewRef.current, { height: "auto", duration: 0.3, ease: "power2.out" });
      }
    } else {
      gsap.to(contentRef.current, {
        height: 0, opacity: 0, marginTop: 0, duration: 0.2, ease: "power2.in",
        onComplete: () => { isAnimating.current = false; }
      });

      if (previewRef.current) {
        gsap.to(previewRef.current, {
          height: naturalPreviewHeight.current,
          duration: 0.2,
          ease: "power2.in",
          overwrite: true,
        });
      }
    }
  }, []);

  return { contentRef, previewRef, animate, isAnimating };
}