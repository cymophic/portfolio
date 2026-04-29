"use client";

import { useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { IconFolderFilled, IconChevronLeft, IconWorldShare } from "@tabler/icons-react";
import { toast } from "sonner";

import { projects, portfolioEasterEggMessages } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import { useExpandTags } from "@/hooks/animations/useExpandTags";
import Tooltip from "@/components/ui/Tooltip";
import useIsMobile from "@/hooks/utils/useIsMobile";

type TagsSectionProps = {
  tags: string[];
};

function ProjectTags({ tags }: TagsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const maxTagsVisible = 6;
  const visibleTags = tags.slice(0, maxTagsVisible);
  const hiddenTags = tags.slice(maxTagsVisible);
  const remaining = hiddenTags.length;

  const tagPillClass =
    "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-700 whitespace-nowrap dark:border-zinc-700 dark:text-zinc-300/80";

  useExpandTags(containerRef, isExpanded);

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2 mt-1.5">
      {visibleTags.map((tag, j) => (
        <span key={`visible-${j}`} className={tagPillClass}>
          {tag}
        </span>
      ))}

      {hiddenTags.map((tag, j) => (
        <span
          key={`hidden-${j}`}
          className={`${tagPillClass} animate-tag`}
          style={{ display: "none", opacity: 0 }}
        >
          {tag}
        </span>
      ))}

      {remaining > 0 && isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className={`${tagPillClass} cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors py-0.75!`}
        >
          <IconChevronLeft size={14} className="overflow-clip text-zinc-400" />
        </button>
      )}

      {remaining > 0 && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`${tagPillClass} tag-counter text-zinc-500 dark:text-zinc-300 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors`}
        >
          <span className="text-[11px]">+{remaining}</span>
        </button>
      )}
    </div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();
  const [easterEggIndex, setEasterEggIndex] = useState(0);
  const [easterEggDisabled, setEasterEggDisabled] = useState(false);

  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Projects" />

        <div className="relative flex flex-col">
          {projects.map((project, i) => (
            <div key={i} className="relative pb-10 last:pb-0 pl-8">
              {/* Left Adornment */}
              <div className="absolute left-1.75 top-0.5 -translate-x-1/2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <IconFolderFilled size={12} className="overflow-clip" />
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                  {project.title}
                </span>
                {project.url && (
                  <Tooltip content="View live" disabled={project.title === "Personal Portfolio" || isMobile}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.title === "Personal Portfolio") {
                          e.preventDefault();
                          const current = portfolioEasterEggMessages[easterEggIndex];
                          if (current.type === "action") {
                            toast(
                              <span className="font-sans italic text-sm text-zinc-400 dark:text-zinc-500">
                                {current.text}
                              </span>
                            );
                            setEasterEggDisabled(true);
                            return;
                          }
                          toast(
                            <span className="font-sans text-sm">
                              {current.text}
                            </span>
                          );
                          setEasterEggIndex((prev) => prev + 1);
                        }
                      }}
                      className={
                        easterEggDisabled && project.title === "Personal Portfolio"
                          ? "text-zinc-400 dark:text-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors pointer-events-none"
                          : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                      }
                    >
                      {easterEggDisabled && project.title === "Personal Portfolio"
                        ? <span className="text-base leading-none">💥</span>
                        : <IconWorldShare size={18} className="overflow-clip" />
                      }
                    </a>
                  </Tooltip>
                )}
                {project.repo && (
                  <Tooltip content="View repository" disabled={isMobile}>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer"
                      className="transition-colors
                        text-zinc-400 dark:text-zinc-500 
                        hover:text-zinc-500 dark:hover:text-zinc-300"
                      >
                      <FaGithub size={16} className="overflow-clip" />
                    </a>
                  </Tooltip>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <p className="mt-0.5 max-w-100 sm:max-w-[calc(100%-4rem)] text-sm text-zinc-600 dark:text-zinc-400 wrap-break-word">
                  {project.description}
                </p>
              )}

              {/* Tags */}
              {project.tags.length > 0 && (
                <ProjectTags tags={project.tags} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}