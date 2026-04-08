"use client";

import { useState } from "react";
import { workExperience } from "@/lib/site";
import WorkAccordionItem from "@/components/sections/common/WorkItem";

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
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

          {workExperience.map((job, i) => (
            <WorkAccordionItem
              key={i}
              job={job}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}