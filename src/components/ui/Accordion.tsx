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
  disabled?: boolean;
  showTimeline?: boolean;
  leftAdornment?: React.ReactNode;
  preview?: React.ReactNode;
};

export default function AccordionItem({
  title,
  subtitle,
  meta,
  disabled,
  isOpen,
  onToggle,
  children,
  showTimeline = true,
  leftAdornment,
  preview,
}: Props) {
  const { contentRef, animate } = useAccordion();

  useEffect(() => {
    animate(isOpen);
  }, [isOpen, animate]);

  const handleToggle = () => {
    if (disabled) return;
    animate(!isOpen);
    onToggle();
  };

  return (
    <div className="relative pb-10 last:pb-0 group/item pl-8">
      {/* Timeline Line */}
      {showTimeline && (
        <>
          <div className="absolute left-1.75 top-2 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 group-last/item:hidden" />
          <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950" />
        </>
      )}
      {/* Left Adornment */}
      {!showTimeline && leftAdornment && (
        <div className="absolute left-0 top-0.5">
          {leftAdornment}
        </div>
      )}

      <button onClick={handleToggle} className="w-full text-left flex flex-col gap-1 group/btn">
        <div className="flex items-center justify-between gap-4">
          {/* Title */}
          <span className="text-base font-semibold text-zinc-700 dark:text-zinc-100 group-hover/btn:text-zinc-900 dark:group-hover/btn:text-white transition-colors">
            {title}
          </span>

          {/* Expand/Collapse Icon */}
          {!disabled && (
            <span className="text-zinc-400 shrink-0">
              {isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
            </span>
          )}
        </div>

        {/* Subtitle and Meta */}
        {(subtitle || meta) && (
          <div className="max-w-[calc(100%-8rem)] flex flex-col gap-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            {meta && <span>{meta}</span>}
            {subtitle && <span className="wrap-break-word">{subtitle}</span>}
          </div>
        )}

        {/* Preview */}
        {preview && <div className="-ml-0.5 pt-1">{preview}</div>}
      </button>
      
      {/* Bullet Lines */}
      <ul ref={contentRef} className="max-w-[calc(100%-8rem)] flex flex-col gap-2 invisible h-0 overflow-hidden">
        {children}
      </ul>
    </div>
  );
}