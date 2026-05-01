import { useState } from "react";
import { portfolioEasterEggMessages } from "@/lib/site";

export default function usePortfolioURLEasterEgg() {
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const trigger = () => {
    const current = portfolioEasterEggMessages[index];
    if (current.type === "action") {
      setDisabled(true);
      return current;
    }
    setIndex((prev) => prev + 1);
    return current;
  };

  return { disabled, trigger };
}