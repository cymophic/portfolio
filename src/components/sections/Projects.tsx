"use client";

import { useState } from "react";
import { MdFolder } from "react-icons/md";
import { projects } from "@/lib/site";
import AccordionItem from "@/components/ui/Accordion";
import SectionTitle from "@/components/sections/common/SectionTitle";
import TriggerTagsPanel from "@/components/sections/common/OtherTags";

type TagsSectionProps = {
  tags: string[];
  isExpanded: boolean;
};

function ProjectTags({ tags, isExpanded }: TagsSectionProps) {
  const maxTagsVisible = 6;
  const visibleTags = tags.slice(0, maxTagsVisible);
  const hiddenTags = tags.slice(maxTagsVisible);
  const remaining = hiddenTags.length;
  const tagPillClass = "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600 whitespace-nowrap dark:border-zinc-700 dark:text-zinc-300";

  // If expanded, show all tags
  if (isExpanded) {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, j) => (
          <span key={`${j}-${tag}`} className={tagPillClass}>
            {tag}
          </span>
        ))}
      </div>
    );
  }

  // If not expanded, show limited tags with toggle to show remaining
  return (
    <div className="flex flex-wrap gap-2">
      {visibleTags.map((tag, j) => (
        <span key={`${j}-${tag}`} className={tagPillClass}>
          {tag}
        </span>
      ))}
      {remaining > 0 && <TriggerTagsPanel count={remaining} hiddenTags={hiddenTags} tagStyling={tagPillClass} />}
    </div>
  );
} 

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        {/* Title */}
        <SectionTitle title="Projects" />

        {/* Projects List */}
        <div className="relative flex flex-col">
          {projects.map((project, i) => {
            const hasDetails = Boolean(
              project.description || project.tags.length > 0 || project.url || project.repo
            );
            
            return (
              <AccordionItem
                key={i}
                title={project.title}
                subtitle={project.description}
                disabled={!hasDetails}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                showTimeline={false}
                leftAdornment={
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <MdFolder size={12} />
                  </span>
                }
                preview={
                  project.tags.length > 0 ? (
                    <ProjectTags tags={project.tags} isExpanded={openIndex === i} />
                  ) : null
                }
              >
                {project.url && (
                  <li className="text-sm text-zinc-600 dark:text-zinc-400">
                    Live: {" "}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100"
                    >
                      {project.url}
                    </a>
                  </li>
                )}
                {project.repo && (
                  <li className="text-sm text-zinc-600 dark:text-zinc-400">
                    Code: {" "}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100"
                    >
                      {project.repo}
                    </a>
                  </li>
                )}
              </AccordionItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}