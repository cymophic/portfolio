import { useRef, useEffect, useCallback } from "react";

const CONFIG = {
  pauseStart: 2.7, // seconds to pause before sliding
  pauseEnd: 3.7, // seconds to pause after reaching the end
  pixelsPerStep: 1, // pixels to move per step
  stepInterval: 16, // ms per step (~60fps)
};

export default function useTextMarquee(labelText: string | undefined, ready: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const animateRef = useRef<() => (() => void) | undefined>(undefined);

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el || !labelText) return;

    // not truncated, skip
    const isOverflowing = el.scrollWidth > el.clientWidth;
    if (!isOverflowing) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    let cancelled = false;

    const pauseStartTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return clearInterval(interval);

        el.scrollLeft += CONFIG.pixelsPerStep;

        if (el.scrollLeft >= maxScroll) {
          clearInterval(interval);

          const pauseEndTimer = setTimeout(() => {
            el.scrollLeft = 0;
            if (!cancelled) requestAnimationFrame(() => animateRef.current?.());
          }, CONFIG.pauseEnd * 1000);

          return () => clearTimeout(pauseEndTimer);
        }
      }, CONFIG.stepInterval);
    }, CONFIG.pauseStart * 1000);

    return () => {
      cancelled = true;
      clearTimeout(pauseStartTimer);
      el.scrollLeft = 0;
    };
  }, [labelText]);

  useEffect(() => {
    if (!ready || !labelText) return;
    animateRef.current = animate;
    const cleanup = animate();
    return cleanup;
  }, [ready, labelText, animate]);

  return { ref };
}