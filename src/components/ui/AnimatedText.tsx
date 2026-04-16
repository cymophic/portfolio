"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTypingAnimation } from "@/hooks/animations/useTypingAnimation";
import { useScramble } from "@/hooks/animations/useScrambleText";
import { useScrambleUpdate } from "@/hooks/animations/useScrambleUpdate";
import { useSlotUpdate } from "@/hooks/animations/useSlotUpdate";
import type { CharPhase } from "@/hooks/animations/useSlotUpdate";

interface AnimatedTextProps {
  words: string[];
  variant?: "typing" | "scramble" | "update" | "slot";
  className?: string;
  cursor?: "block" | "underscore" | "bar" | "none";
  config?: {
    pauseMs?: number;
    typingSpeedMs?: number;
    deletingSpeedMs?: number;
    scrambleDurationMs?: number;
    scrambleIntervalMs?: number;
    durationMs?: number;
  };
}

const CURSORS = {
  block: "▌",
  underscore: "_",
  bar: "|",
  none: "\u200B",
};

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

  return <span ref={ref} style={{ display: "inline-block" }}>{char}</span>;
}

export default function AnimateText({
  words,
  variant = "scramble",
  className,
  cursor = "bar",
  config,
}: AnimatedTextProps) {
  const cursorRef = useRef<HTMLSpanElement>(null);

  const typing = useTypingAnimation(words, config);
  const scramble = useScramble(words, config);
  const update = useScrambleUpdate(words[0] ?? "", config);
  const slot = useSlotUpdate(words[0] ?? "", config);

  const { locked, scrambleChar, isBusy } =
    variant === "scramble"
      ? scramble
      : variant === "update"
      ? { locked: update.displayed, scrambleChar: null, isBusy: false }
      : variant === "slot"
      ? { locked: "", scrambleChar: null, isBusy: false }
      : { locked: typing.displayed, scrambleChar: null, isBusy: typing.isBusy };

  useEffect(() => {
    if (variant === "slot") return;

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
  }, [isBusy, variant]);

  if (variant === "slot") {
    return (
      <span className={className}>
        {slot.chars.map((c, i) => (
          <span key={i} style={{ overflow: "hidden" }}>
            <SlotChar char={c.char === " " ? "\u00A0" : c.char} phase={c.phase} durationMs={config?.durationMs ?? 120} />
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {locked}
      {scrambleChar && <span className="opacity-80">{scrambleChar}</span>}
      <span ref={cursorRef}>{CURSORS[cursor]}</span>
    </span>
  );
}