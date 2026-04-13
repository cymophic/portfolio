import { useEffect, useRef } from "react";
import gsap from "gsap";

const CONFIG = {
  duration: 30, // auto-scroll speed (higher = slower)
  momentum: 24, // swipe momentum multiplier
  glide: 2, // how long it coasts back to normal speed (seconds)
  pause: 1.5, // seconds to pause before resuming auto-scroll
};

export function useTechMarquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const track = wrapper.querySelector<HTMLDivElement>(".marquee-track");
    if (!track) return;

    const isDragging = { current: false };
    const lastX = { current: 0 };
    const lastTimestamp = { current: 0 };
    const velocitySamples = { current: [] as number[] };

    gsap.set(track, { x: "-50%" });
    const tween = gsap.to(track, {
      x: "0%",
      duration: CONFIG.duration,
      ease: "none",
      repeat: -1,
      onReverseComplete() {
        tween.progress(1);
      },
    });

    const startDrag = (clientX: number) => {
      isDragging.current = true;
      lastX.current = clientX;
      lastTimestamp.current = performance.now();
      velocitySamples.current = [];
      gsap.killTweensOf(tween);
      pauseTimer.current?.kill();
      tween.timeScale(0);
    };

    const moveDrag = (clientX: number) => {
      if (!isDragging.current) return;
      const now = performance.now();
      const dt = now - lastTimestamp.current;
      const dx = clientX - lastX.current;

      if (dt > 0) {
        velocitySamples.current.push(dx / dt);
        if (velocitySamples.current.length > 5) velocitySamples.current.shift();
      }

      lastX.current = clientX;
      lastTimestamp.current = now;

      const trackWidth = track.scrollWidth / 2;
      const delta = dx / trackWidth;
      let newProgress = tween.progress() + delta;

      if (newProgress >= 1) newProgress -= 1;
      if (newProgress < 0) newProgress += 1;

      tween.progress(newProgress, true);
    };

    const endDrag = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      gsap.killTweensOf(tween);

      const samples = velocitySamples.current;
      const avgVelocity = samples.length
        ? samples.reduce((a, b) => a + b, 0) / samples.length
        : 0;

      // Don't apply inertia if barely moving
      if (Math.abs(avgVelocity) < 0.7) {
        pauseTimer.current = gsap.delayedCall(CONFIG.pause, () => gsap.to(tween, { timeScale: 1, duration: CONFIG.glide, ease: "power3.out" }));
        return;
      }

      const trackWidth = track.scrollWidth / 2;
      const normalSpeed = trackWidth / (CONFIG.duration * 1000);
      const inertiaScale = Math.min(Math.abs(avgVelocity) / normalSpeed, CONFIG.momentum);
      const direction = avgVelocity < 0 ? -1 : 1;

      gsap.killTweensOf(tween);
      tween.timeScale(direction * inertiaScale);
      gsap.to(tween, { timeScale: 1, duration: CONFIG.glide, ease: "power3.out" });
    };

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const onMouseUp = () => endDrag();
    wrapper.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
    const onTouchEnd = () => endDrag();
    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
    wrapper.addEventListener("touchend", onTouchEnd);

    const onWindowTouchMove = (e: TouchEvent) => {
      if (isDragging.current) e.preventDefault();
    };
    window.addEventListener("touchmove", onWindowTouchMove, { passive: false });

    return () => {
      tween.kill();
      window.removeEventListener("touchmove", onWindowTouchMove);
      wrapper.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
      wrapper.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return { wrapperRef };
}