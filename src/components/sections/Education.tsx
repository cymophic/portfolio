"use client";

import { useState } from "react";
import { education } from "@/lib/site";
import AccordionItem from "@/components/ui/Accordion";
import SectionTitle from "@/components/sections/common/SectionTitle";

export default function Education() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        {/* Title */}
        <SectionTitle title="Education" />

        <div className="relative flex flex-col">
          {/* Timeline Line */}
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Education List */}
          {education.map((edu, i) => (
            <AccordionItem
              key={i}
              title={edu.degree}
              subtitle={edu.school}
              meta={edu.end}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {edu.honors.map((honor, j) => (
                <li key={j} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                  {honor}
                </li>
              ))}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}