"use client";

import { useState } from "react";
import { workExperience } from "@/lib/site";
import AccordionItem from "../ui/Accordion";
import SectionTitle from "./common/SectionTitle";

export default function WorkOverviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        {/* Title */}
        <SectionTitle title="Work" />

        <div className="relative flex flex-col">
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
                <li key={j} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-2 sm:mt-2.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
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