"use client";

type NavOverlayProps = {
  visible: boolean;
  onClick: () => void;
};

export default function NavOverlay({ visible, onClick }: NavOverlayProps) {
  if (!visible) return null;

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40"
    />
  );
}

