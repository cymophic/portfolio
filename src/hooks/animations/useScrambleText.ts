import { useState, useEffect, useRef } from "react";

const CONFIG = {
  typingSpeedMs: 40, // delay between each letter being revealed
  scrambleDurationMs: 80, // how long a letter scrambles before locking in
  scrambleIntervalMs: 40, // how fast the scramble character cycles
  pauseMs: 1000, // pause after the full word is revealed
  loop: false, // repeat the sequence after the last word
};
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

type ScrambleConfig = Partial<typeof CONFIG>;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useScramble(words: string[], config?: ScrambleConfig) {
  const { typingSpeedMs, scrambleDurationMs, scrambleIntervalMs, pauseMs, loop } = {
    ...CONFIG,
    ...config,
  };

  const [locked, setLocked] = useState("");
  const [isBusy, setIsBusy] = useState(true);
  const [scrambleChar, setScrambleChar] = useState<string | null>(null);

  // Mutable ref holds all animation state — no cascading setState
  const state = useRef({
    wordIndex: 0,
    lockedLetters: [] as string[],
    scrambleChar: null as string | null,
  });

  useEffect(() => {
    let cancelled = false;

    // Cycles the scramble character at the current unlocked position
    const scrambleInterval = setInterval(() => {
      const s = state.current;
      if (s.scrambleChar !== null) {
        s.scrambleChar = randomChar();
        if (!cancelled) {
          setLocked(s.lockedLetters.join(""));
          setScrambleChar(s.scrambleChar);
        }
      }
    }, scrambleIntervalMs);

    function revealWord(word: string, onDone: () => void) {
      let pos = 0;

      function revealNext() {
        if (cancelled) return;
        if (pos >= word.length) {
          onDone();
          return;
        }

        // Show scramble character at current position
        state.current.scrambleChar = randomChar();

        // Lock in correct letter after scrambleDurationMs
        setTimeout(() => {
          if (cancelled) return;
          state.current.lockedLetters[pos] = word[pos];
          state.current.scrambleChar = null;
          setScrambleChar(null);
          setLocked(state.current.lockedLetters.join(""));
          pos++;

          // Delay before revealing next letter
          setTimeout(revealNext, typingSpeedMs);
        }, scrambleDurationMs);
      }

      revealNext();
    }

    function runCycle() {
      if (cancelled) return;

      const s = state.current;
      const word = words[s.wordIndex];

      setIsBusy(true);
      s.lockedLetters = [];
      s.scrambleChar = null;
      setScrambleChar(null);
      setLocked("");

      revealWord(word, () => {
        if (cancelled) return;
        setIsBusy(false);

        const isLast = s.wordIndex === words.length - 1;
        if (isLast && !loop) return;

        setTimeout(() => {
          if (cancelled) return;
          s.wordIndex = (s.wordIndex + 1) % words.length;
          runCycle();
        }, pauseMs);
      });
    }

    runCycle();

    return () => {
      cancelled = true;
      clearInterval(scrambleInterval);
    };
  // Only re-run if the word list or config changes
  }, [words, typingSpeedMs, scrambleDurationMs, scrambleIntervalMs, pauseMs, loop]);

  return { locked, scrambleChar, isBusy };
}