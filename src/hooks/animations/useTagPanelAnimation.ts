import { useEffect, RefObject } from "react";
import gsap from "gsap";

export function useTagPanelAnimation(
  panelRef: RefObject<HTMLDivElement | null>,
  isOpen: boolean
) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (isOpen) {
      gsap.fromTo(
        panel,
        { 
          opacity: 0, 
          scale: 0.95, 
          visibility: "visible" 
        },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.15, 
          ease: "power2.out" 
        }
      );
    } else {
      gsap.to(panel, {
        opacity: 0,
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panel, { visibility: "hidden" });
        },
      });
    }
  }, [isOpen, panelRef]);
}