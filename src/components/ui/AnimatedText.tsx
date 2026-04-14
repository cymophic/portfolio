"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTypingAnimation } from "@/hooks/animations/useTypingAnimation";
import { useScramble } from "@/hooks/animations/useScrambleText";

interface AnimatedTextProps {
  words: string[];
  variant?: "typing" | "scramble";
  className?: string;
  cursor?: "block" | "underscore" | "bar" | "none";
  config?: {
    pauseMs?: number;
    typingSpeedMs?: number;
    deletingSpeedMs?: number;
    scrambleDurationMs?: number;
    scrambleIntervalMs?: number;
  };
}

const CURSORS = {
  block: "▌",
  underscore: "_",
  bar: "|",
  none: "\u200B",
};

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

  const { locked, scrambleChar, isBusy } = variant === "scramble"
    ? scramble
    : { locked: typing.displayed, scrambleChar: null, isBusy: typing.isBusy };

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

  return (
    <span className={className}>
      {locked}
      {scrambleChar && <span className="opacity-80">{scrambleChar}</span>}
      <span ref={cursorRef}>{CURSORS[cursor]}</span>
    </span>
  );
}