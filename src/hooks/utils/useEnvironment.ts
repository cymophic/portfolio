import { useState, useEffect, useSyncExternalStore } from "react";

// Checks if the component is running on the client (browser), false on the server
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

// Checks if the window width is below the given breakpoint (default: 640px / Tailwind's sm)
export function useIsMobile(breakpoint = 640): boolean {
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
