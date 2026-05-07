"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconWorldShare,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";

import type { Project } from "@/lib/types/site";
import { websiteURL, portfolioEasterEggMessages } from "@/lib/site";
import Tooltip from "@/components/ui/Tooltip";
import { useIsMobile } from "@/hooks/utils/useEnvironment";

const tagPillClass =
  "inline-flex items-center rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs text-zinc-700 whitespace-nowrap dark:border-zinc-600 dark:text-zinc-300/80";

export default function ProjectCard({
  project,
  showImage = true,
}: {
  project: Project;
  showImage?: boolean;
}) {
  const router = useRouter();

  // Navigates to the detail page if it has one
  const handleClick = () => {
    if (project.page) router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`h-full flex flex-col rounded-2xl border border-zinc-300 dark:border-zinc-600 group ${project.page ? "cursor-pointer hover:border-zinc-400 hover:dark:border-zinc-500" : "cursor-default"}`}
    >
      {/* Cover Image */}
      {showImage && project.cover && (
        <div className="hidden sm:block">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            width={800}
            height={450}
            className="hidden sm:block rounded-t-2xl w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 justify-center gap-2 p-6 -mt-1">
        {/* Title + Links */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              {project.title}
            </span>
            {project.url && <LiveLink project={project} />}
            {project.repo && <RepoLink project={project} />}
          </div>

          {project.page && (
            <>
              <IconArrowUpRight
                size={20}
                className={`inline sm:hidden overflow-clip text-zinc-400 dark:text-zinc-500`}
              />
              <IconArrowRight
                size={20}
                className={`hidden sm:inline overflow-clip transition-transform group-hover:-rotate-45 duration-180 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0`}
              />
            </>
          )}
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className={tagPillClass}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Live site link of the project
function LiveLink({ project }: { project: Project }) {
  const isMobile = useIsMobile();
  const isPortfolio = project.url === websiteURL;
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Shows the next easter egg toast
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (isPortfolio) {
      e.preventDefault();
      const current = trigger();
      if (current.type === "action") {
        toast(
          <span className="font-sans italic text-sm text-zinc-400 dark:text-zinc-500">
            {current.text}
          </span>,
        );
      } else {
        toast(<span className="font-sans text-sm">{current.text}</span>);
      }
    }
  };
  // Gets the next easter egg message; disables the button on action type
  const trigger = () => {
    const current = portfolioEasterEggMessages[index];
    if (current.type === "action") {
      setDisabled(true);
      return current;
    }
    setIndex((prev) => prev + 1);
    return current;
  };

  return (
    <Tooltip content="View Live" disabled={isPortfolio || isMobile}>
      <a
        href={project.url!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`transition-colors text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 ${disabled ? "pointer-events-none" : ""}`}
      >
        {disabled ? (
          <span className="text-base leading-none">💥</span>
        ) : (
          <IconWorldShare size={18} className="overflow-clip" />
        )}
      </a>
    </Tooltip>
  );
}

// GitHub repository link of the project
function RepoLink({ project }: { project: Project }) {
  const isMobile = useIsMobile();

  return (
    <Tooltip content="View Code" disabled={isMobile}>
      <a
        href={project.repo!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="transition-colors text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
      >
        <FaGithub size={17} className="overflow-clip" />
      </a>
    </Tooltip>
  );
}
