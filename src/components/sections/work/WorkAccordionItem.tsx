"use client";

import { useEffect } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useWorkAccordion } from "@/hooks/animations/work/useWorkAccordion";

type WorkExperience = {
  company: string;
  role: string;
  start: string;
  end: string;
  lines: string[];
};

type Props = {
  job: WorkExperience;
  isOpen: boolean;
  onToggle: () => void;
};

export default function WorkAccordionItem({ job, isOpen, onToggle }: Props) {
  const { contentRef, animate } = useWorkAccordion();

  useEffect(() => {
    if (isOpen) animate(true);
  }, [animate, isOpen]);

  const handleToggle = () => {
    if (isOpen) animate(false);
    setTimeout(() => onToggle(), isOpen ? 150 : 0);
  };

  return (
    <div className="relative pl-8 pb-10 last:pb-0">
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-950" />

      <button
        onClick={handleToggle}
        className="w-full text-left flex flex-col gap-1 group"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-zinc-700 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            {job.role}
          </span>
          <span className="text-zinc-400 shrink-0">
            {isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>{job.company}</span>
          <span>·</span>
          <span>{job.start} - {job.end}</span>
        </div>
      </button>

      {isOpen && (
        <ul ref={contentRef} className="mt-4 flex flex-col gap-2">
          {job.lines.map((line, j) => (
            <li key={j} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}