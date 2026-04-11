import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useTechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.set(track, { x: "-50%" });
    const tween = gsap.to(track, {
      x: "0%",
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    tweenRef.current = tween;

    const pause = () => tween.pause();
    const resume = () => { if (!isDragging.current) tween.play(); };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartProgress.current = tween.progress();
      tween.pause();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStartX.current;
      const trackWidth = track.scrollWidth / 2;
      const delta = dx / trackWidth;
      let newProgress = (dragStartProgress.current + delta) % 1;
      if (newProgress < 0) newProgress += 1;
      tween.progress(newProgress);
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      tween.play();
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragStartProgress.current = tween.progress();
      tween.pause();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - dragStartX.current;
      const trackWidth = track.scrollWidth / 2;
      const delta = dx / trackWidth;
      let newProgress = (dragStartProgress.current + delta) % 1;
      if (newProgress < 0) newProgress += 1;
      tween.progress(newProgress);
    };

    const onTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      tween.play();
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return { trackRef };
}