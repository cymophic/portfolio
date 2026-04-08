"use client";

import { useState } from "react";
import { workExperience } from "@/lib/site";
import AccordionItem from "../ui/Accordion";

export default function WorkOverviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Work
          </p>
        </div>

        <div className="relative flex flex-col">
          {/* Timeline Line */}
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Experience List */}
          {workExperience.map((work, i) => (
            <AccordionItem
              key={i}
              title={work.role}
              subtitle={work.company}
              meta={`${work.start} - ${work.end}`}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {work.lines.map((bulletItem, j) => (
                <li key={j} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                  {bulletItem}
                </li>
              ))}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}