import { useRef, useCallback } from "react";
import { gsap } from "gsap";

const useShake = () => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const shake = useCallback(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { x: 0 },
      { x: 4, duration: 0.4, ease: "bounce.out",
        keyframes: { x: [0, -2, 2, -1, 1, 0] }
      }
    );
  }, []);

  return { ref, shake };
};

export default useShake;