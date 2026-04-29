import { useState, useEffect } from "react";
import useIsClient from "./useIsClient";

export default function useIsMobile(breakpoint = 640) {
  const isClient = useIsClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isClient) return;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [isClient, breakpoint]);

  return isMobile;
}