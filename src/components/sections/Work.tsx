"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/BreadCrumb";
import { workExperience } from "@/lib/site";
import WorkAccordionItem from "@/components/sections/common/WorkItem";

export default function WorkOverviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-col gap-6">
          <Breadcrumb />
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