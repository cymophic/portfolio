import { useSyncExternalStore } from "react";

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

export default useIsClient;