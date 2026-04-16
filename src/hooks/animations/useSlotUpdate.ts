import { useState, useEffect, useRef } from "react";

export type CharPhase = "idle" | "exit" | "enter";
export type CharState = { char: string; phase: CharPhase };

const CONFIG = {
  durationMs: 120, // how long the exit/enter animation takes
};

type SlotConfig = Partial<typeof CONFIG>;

export function useSlotUpdate(value: string, config?: SlotConfig) {
  const { durationMs } = { ...CONFIG, ...config };
  const prev = useRef(value);

  const [chars, setChars] = useState<CharState[]>(
    value.split("").map((char) => ({ char, phase: "idle" }))
  );

  useEffect(() => {
    const oldVal = prev.current;
    prev.current = value;

    if (oldVal === value) return;

    // Mark changed positions as "exit" first
    setChars(
      value.split("").map((char, i) => ({
        char: oldVal[i] ?? char,
        phase: oldVal[i] !== value[i] ? "exit" : "idle",
      }))
    );

    // After exit duration, swap to new char and enter from below
    const t = setTimeout(() => {
      setChars(
        value.split("").map((char, i) => ({
          char,
          phase: oldVal[i] !== value[i] ? "enter" : "idle",
        }))
      );

      // Settle to idle after enter animation
      const t2 = setTimeout(() => {
        setChars(value.split("").map((char) => ({ char, phase: "idle" })));
      }, durationMs);

      return () => clearTimeout(t2);
    }, durationMs);

    return () => clearTimeout(t);
  }, [value, durationMs]);

  return { chars };
}