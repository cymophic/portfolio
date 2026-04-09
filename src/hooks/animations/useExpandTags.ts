import { useEffect, RefObject } from "react";
import gsap from "gsap";

export function useExpandTags(
  containerRef: RefObject<HTMLDivElement | null>,
  isExpanded: boolean,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hiddenTags = container.querySelectorAll(".animate-tag");
    const counter = container.querySelector(".tag-counter");
    if (hiddenTags.length === 0) return;

    if (isExpanded) {
      // Hide counter immediately before tags animate in
      gsap.set(counter, { display: "none" });

      // Stagger hidden tags in
      gsap.set(hiddenTags, {
        display: "inline-flex",
        clearProps: "scale",
      });
      gsap.fromTo(
        hiddenTags,
        { opacity: 0, scale: 0.8, x: -5 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: "back.out(1.2)",
          overwrite: true,
        }
      );
    } else {
      // Stagger hidden tags out
      gsap.to(hiddenTags, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        stagger: { each: 0.02, from: "end" },
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          gsap.set(hiddenTags, { display: "none" });
          gsap.set(counter, { display: "inline-flex" });
          gsap.fromTo(
            counter,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.2)" }
          );
          return;
        },
      });
    }
  }, [isExpanded, containerRef]);
}