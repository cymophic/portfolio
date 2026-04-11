import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useTechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);
  const lastX = useRef(0);
  const lastVelocity = useRef(0);
  const lastTimestamp = useRef(0);
  const velocitySamples = useRef<number[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.set(track, { x: "-50%" });
    const tween = gsap.to(track, {
      x: "0%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    tweenRef.current = tween;

    const startDrag = (clientX: number) => {
      isDragging.current = true;
      dragStartX.current = clientX;
      lastX.current = clientX;
      lastVelocity.current = 0;
      lastTimestamp.current = performance.now();
      velocitySamples.current = [];
      dragStartProgress.current = tween.progress();
      gsap.killTweensOf(tween);
      tween.timeScale(0);
    };

    const moveDrag = (clientX: number) => {
      if (!isDragging.current) return;
      const now = performance.now();
      const dt = now - lastTimestamp.current;
      const dx = clientX - lastX.current;

      // Keep a rolling window of velocity samples
      if (dt > 0) {
        velocitySamples.current.push(dx / dt);
        if (velocitySamples.current.length > 5) velocitySamples.current.shift();
      }

      lastX.current = clientX;
      lastTimestamp.current = now;

      const totalDx = clientX - dragStartX.current;
      const trackWidth = track.scrollWidth / 2;
      const delta = totalDx / trackWidth;
      let newProgress = (dragStartProgress.current + delta) % 1;
      if (newProgress < 0) newProgress += 1;
      tween.progress(newProgress);
    };

    const endDrag = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const samples = velocitySamples.current;
      const avgVelocity = samples.length
        ? samples.reduce((a, b) => a + b, 0) / samples.length
        : 0;

      const trackWidth = track.scrollWidth / 2;
      const normalSpeed = trackWidth / (60 * 1000);
      const inertiaScale = Math.min(Math.abs(avgVelocity) / normalSpeed, 8);

      const direction = avgVelocity < 0 ? -1 : 1;

      gsap.killTweensOf(tween);
      tween.timeScale(direction * inertiaScale);
      gsap.to(tween, { timeScale: 1, duration: 1.5, ease: "power3.out" });
    };

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const onMouseUp = () => endDrag();
    const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      moveDrag(e.touches[0].clientX);
    };
    const onTouchEnd = () => endDrag();

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: false });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      tween.kill();
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