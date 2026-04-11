import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useTechMarquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const track = wrapper.querySelector<HTMLDivElement>(".marquee-track");
    if (!track) return;

    const isDragging = { current: false };
    const dragStartX = { current: 0 };
    const dragStartProgress = { current: 0 };
    const lastX = { current: 0 };
    const lastTimestamp = { current: 0 };
    const velocitySamples = { current: [] as number[] };

    gsap.set(track, { x: "-50%" });
    const tween = gsap.to(track, {
      x: "0%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    const startDrag = (clientX: number) => {
      isDragging.current = true;
      dragStartX.current = clientX;
      lastX.current = clientX;
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
      const normalSpeed = trackWidth / (30 * 1000);
      const inertiaScale = Math.min(Math.abs(avgVelocity) / normalSpeed, 8);
      const direction = avgVelocity < 0 ? -1 : 1;

      gsap.killTweensOf(tween);
      tween.timeScale(direction * inertiaScale);
      gsap.to(tween, { timeScale: 1, duration: 1.5, ease: "power3.out" });
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