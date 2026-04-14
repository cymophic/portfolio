import { useState, useEffect } from "react";

const CONFIG = {
  typingSpeedMs: 80, // delay between each character typed
  deletingSpeedMs: 40, // delay between each character deleted
  pauseMs: 1000, // pause before starting to delete
  loop: false, // repeats the sequence once it reaches the end
};

type TypingConfig = Partial<typeof CONFIG>;

export function useTypingAnimation(words: string[], config?: TypingConfig) {
  const { typingSpeedMs, deletingSpeedMs, pauseMs, loop } = { ...CONFIG, ...config };

  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index]; 

    if (!isDeleting && displayed === current) {
      const isLast = index === words.length - 1;
      if (isLast && !loop) return;
      const pause = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayed === "") {
      const next = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 0);
      return () => clearTimeout(next);
    }

    const speed = isDeleting ? deletingSpeedMs : typingSpeedMs;
    const timeout = setTimeout(() => {
      setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, index, isDeleting, words, typingSpeedMs, deletingSpeedMs, pauseMs, loop]);

  return { displayed, isBusy: displayed !== words[index] || isDeleting };
}