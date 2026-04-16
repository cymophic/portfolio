import { useState, useEffect, useRef } from "react";

const CONFIG = {
  scrambleDurationMs: 80, // how long a character scrambles before locking in
  scrambleIntervalMs: 40, // how fast the scramble character cycles
};
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

type ScrambleUpdateConfig = Partial<typeof CONFIG>;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useScrambleUpdate(value: string, config?: ScrambleUpdateConfig) {
  const { scrambleDurationMs, scrambleIntervalMs } = { ...CONFIG, ...config };

  const [displayed, setDisplayed] = useState(value);

  // Mutable ref holds all animation state — no cascading setState
  const state = useRef({
    chars: value.split(""),
    scrambling: new Set<number>(),
    prev: value,
  });

  useEffect(() => {
    const s = state.current;
    const prev = s.prev;
    s.prev = value;

    // Sync chars array to new value length (handles additions/removals)
    s.chars = value.split("").map((char, i) => s.chars[i] !== undefined ? s.chars[i] : char);

    // Find positions where the character changed
    const changedPositions = value
      .split("")
      .map((char, i) => (char !== prev[i] ? i : null))
      .filter((i): i is number => i !== null);

    if (changedPositions.length === 0) return;

    let cancelled = false;

    for (const i of changedPositions) {
      s.scrambling.add(i);
    }

    // Interval cycles scramble chars at all actively scrambling positions
    const interval = setInterval(() => {
      if (cancelled) return;
      for (const i of s.scrambling) {
        s.chars[i] = randomChar();
      }
      setDisplayed(s.chars.join(""));
    }, scrambleIntervalMs);

    // Lock in each changed position after scrambleDurationMs
    changedPositions.forEach((i) => {
      setTimeout(() => {
        if (cancelled) return;
        s.scrambling.delete(i);
        s.chars[i] = value[i];
        setDisplayed(s.chars.join(""));
        if (s.scrambling.size === 0) clearInterval(interval);
      }, scrambleDurationMs);
    });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [value, scrambleDurationMs, scrambleIntervalMs]);

  return { displayed };
}