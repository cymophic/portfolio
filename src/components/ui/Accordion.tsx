"use client";

import { useEffect } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useAccordion } from "@/hooks/animations/useAccordion";

type Props = {
  title: string;
  subtitle?: string;
  meta?: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
};

export default function AccordionItem({ title, subtitle, meta, isOpen, onToggle, children }: Props) {
  const { contentRef, animate } = useAccordion();

  useEffect(() => {
    if (isOpen) animate(true);
  }, [animate, isOpen]);

  const handleToggle = () => {
    if (isOpen) animate(false);
    setTimeout(() => onToggle(), isOpen ? 150 : 0);
  };

  return (
    <div className="relative pl-8 pb-10 last:pb-0 group/item">
      <div className="absolute left-1.75 top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 group-last/item:hidden" />
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950" />

      <button onClick={handleToggle} className="w-full text-left flex flex-col gap-1 group/btn">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-zinc-700 dark:text-zinc-100 group-hover/btn:text-zinc-900 dark:group-hover/btn:text-white transition-colors">
            {title}
          </span>
          <span className="text-zinc-400 shrink-0">
            {isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
          </span>
        </div>
        {(subtitle || meta) && (
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            {subtitle && <span>{subtitle}</span>}
            {subtitle && meta && <span>·</span>}
            {meta && <span>{meta}</span>}
          </div>
        )}
      </button>

      {isOpen && (
        <ul ref={contentRef} className="mt-4 flex flex-col gap-2">
          {children}
        </ul>
      )}
    </div>
  );
}