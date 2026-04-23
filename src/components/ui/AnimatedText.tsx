"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTypingAnimation } from "@/hooks/animations/useTypingAnimation";
import { useScramble } from "@/hooks/animations/useScrambleText";
import { useScrambleUpdate } from "@/hooks/animations/useScrambleUpdate";
import { useSlotUpdate } from "@/hooks/animations/useSlotUpdate";
import type { CharPhase } from "@/hooks/animations/useSlotUpdate";

type CursorType = "block" | "underscore" | "bar" | "none";

type AnimConfig = {
  pauseMs?: number;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  scrambleDurationMs?: number;
  scrambleIntervalMs?: number;
  durationMs?: number;
};

const CURSORS: Record<CursorType, string> = {
  block: "▌",
  underscore: "_",
  bar: "|",
  none: "\u200B",
};

// Cursor Hook
function useCursorBlink(isBusy: boolean) {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isBusy) {
      gsap.killTweensOf(cursorRef.current);
      gsap.set(cursorRef.current, { opacity: 1 });
    } else {
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.53,
        ease: "steps(1)",
        delay: 0.53,
      });
    }
  }, [isBusy]);

  return cursorRef;
}

// SlotChar (internal)
function SlotChar({ char, phase, durationMs }: { char: string; phase: CharPhase; durationMs: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const secs = durationMs / 1000;

    if (phase === "exit") {
      gsap.to(el, { y: "-100%", opacity: 0, duration: secs, ease: "power2.in" });
    } else if (phase === "enter") {
      gsap.fromTo(el, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: secs, ease: "power2.out" });
    } else {
      gsap.set(el, { y: "0%", opacity: 1 });
    }
  }, [phase, durationMs]);

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {char}
    </span>
  );
}

// ScrambleText
interface ScrambleTextProps {
  words: string[];
  className?: string;
  cursor?: CursorType;
  config?: AnimConfig;
}

export function ScrambleText({ words, className, cursor = "bar", config }: ScrambleTextProps) {
  const { locked, scrambleChar, isBusy } = useScramble(words, config);
  const cursorRef = useCursorBlink(isBusy);

  return (
    <span className={className}>
      {locked}
      {scrambleChar && <span className="opacity-80">{scrambleChar}</span>}
      <span ref={cursorRef}>{CURSORS[cursor]}</span>
    </span>
  );
}

// TypingText
interface TypingTextProps {
  words: string[];
  className?: string;
  cursor?: CursorType;
  config?: AnimConfig;
}

export function TypingText({ words, className, cursor = "bar", config }: TypingTextProps) {
  const { displayed, isBusy } = useTypingAnimation(words, config);
  const cursorRef = useCursorBlink(isBusy);

  return (
    <span className={className}>
      {displayed}
      <span ref={cursorRef}>{CURSORS[cursor]}</span>
    </span>
  );
}

// SlotText
interface SlotTextProps {
  value: string;
  className?: string;
  config?: AnimConfig;
}

export function SlotText({ value, className, config }: SlotTextProps) {
  const { chars } = useSlotUpdate(value, config);

  return (
    <span className={className}>
      {chars.map((c, i) => (
        <span key={i} style={{ overflow: "hidden" }}>
          <SlotChar
            char={c.char === " " ? "\u00A0" : c.char}
            phase={c.phase}
            durationMs={config?.durationMs ?? 120}
          />
        </span>
      ))}
    </span>
  );
}

// UpdateText
interface UpdateTextProps {
  value: string;
  className?: string;
  cursor?: CursorType;
  config?: AnimConfig;
}

export function UpdateText({ value, className, cursor = "bar", config }: UpdateTextProps) {
  const { displayed } = useScrambleUpdate(value, config);
  const cursorRef = useCursorBlink(false);

  return (
    <span className={className}>
      {displayed}
      <span ref={cursorRef}>{CURSORS[cursor]}</span>
    </span>
  );
}