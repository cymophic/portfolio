import { useRef, useEffect, useCallback } from "react";

const CONFIG = {
  pauseStart: 2.7, // seconds to pause before sliding
  pauseEnd: 3.7, // seconds to pause after reaching the end
  pixelsPerStep: 1, // pixels to move per step
  stepInterval: 16, // ms per step (~60fps)
};

export default function useTextMarquee(labelText: string | undefined, ready: boolean) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const animateRef = useRef<() => (() => void) | undefined>(undefined);

  const animate = useCallback(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner || !labelText) return;

    const isOverflowing = inner.scrollWidth > container.clientWidth;
    if (!isOverflowing) return;

    let cancelled = false;
    let offset = 0;
    const maxOffset = inner.scrollWidth - container.clientWidth;

    let pauseEndTimer: ReturnType<typeof setTimeout> | undefined;

    const pauseStartTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return clearInterval(interval);

        offset += CONFIG.pixelsPerStep;
        inner.style.transform = `translateX(-${offset}px)`;

        if (offset >= maxOffset) {
          clearInterval(interval);

          pauseEndTimer = setTimeout(() => {
            offset = 0;
            inner.style.transform = `translateX(0px)`;
            if (!cancelled) animateRef.current?.();
          }, CONFIG.pauseEnd * 1000);
        }
      }, CONFIG.stepInterval);
    }, CONFIG.pauseStart * 1000);

    return () => {
      cancelled = true;
      clearTimeout(pauseStartTimer);
      clearTimeout(pauseEndTimer);
      offset = 0;
      inner.style.transform = `translateX(0px)`;
    };
  }, [labelText]);

  useEffect(() => {
    if (!ready || !labelText) return;
    animateRef.current = animate;

    let cleanup: (() => void) | undefined;

    const observer = new ResizeObserver(() => {
      cleanup?.();
      cleanup = animate();
    });

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [ready, labelText, animate]);

  return { containerRef, innerRef };
}