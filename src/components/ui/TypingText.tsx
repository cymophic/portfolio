"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTypingAnimation } from "@/hooks/animations/useTypingAnimation";

interface TypingTextProps {
  words: string[];
  className?: string;
  cursor?: "block" | "outline" | "underscore" | "bar" | "none";
  config?: {
    pauseMs?: number;
    typingSpeedMs?: number;
    deletingSpeedMs?: number;
  };
}

const CURSORS = {
  block: "█",
  outline: "▒",
  underscore: "_",
  bar: "|", 
  none: "\u200B",
};

export default function TypingText({ words, className, cursor = "none", config }: TypingTextProps) {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const { displayed, isBusy } = useTypingAnimation(words, config);

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
      {displayed}
      <span ref={cursorRef}>{CURSORS[cursor]}</span>
    </span>
  );
}