import { useEffect, RefObject } from "react";
import gsap from "gsap";

export function useExpandTags(
  containerRef: RefObject<HTMLDivElement | null>,
  isExpanded: boolean,
  setShowTrigger: (val: boolean) => void
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hiddenTags = container.querySelectorAll(".animate-tag");
    if (hiddenTags.length === 0) return;

    if (isExpanded) {
      setShowTrigger(false);
      
      gsap.set(hiddenTags, { 
        display: "inline-flex", 
        clearProps: "width,paddingLeft,paddingRight,marginLeft,marginRight,scale" 
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
          overwrite: true 
        }
      );
    } else {
      gsap.to(hiddenTags, {
        opacity: 0,
        scale: 0.5,
        width: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        duration: 0.3,
        stagger: {
          each: 0.02,
          from: "end"
        },
        ease: "power2.inOut", 
        overwrite: true,
        onComplete: () => {
          gsap.set(hiddenTags, { display: "none" });
          setShowTrigger(true);
        }
      });
    }
  }, [isExpanded, containerRef, setShowTrigger]);
}