"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconExternalLink,
  IconCodeblock,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { toast } from "sonner";

import type { Project } from "@/lib/types/site";
import { websiteURL, portfolioEasterEggMessages } from "@/lib/site";
import Tooltip from "@/components/ui/Tooltip";
import Skeleton from "@/components/ui/Skeleton";
import Pill from "@/components/ui/Pill";
import { useIsMobile } from "@/hooks/utils/useEnvironment";

export default function ProjectCard({
  project,
  showImage = true,
  priority,
}: {
  project: Project;
  showImage?: boolean;
  priority?: boolean;
}) {
  const router = useRouter();

  // Navigates to the detail page if it has one
  const handleClick = () => {
    if (project.page) router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`h-full flex flex-col gap-4 rounded-2xl group ${project.page ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Cover Image */}
      {project.cover && (
        <div className={showImage ? "" : "hidden"}>
          <CoverImage
            src={project.cover}
            title={project.title}
            priority={priority}
          />
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col flex-1 justify-center gap-2`}>
        {/* Title + Links */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              {project.title}
            </span>
            <div className="flex items-center gap-1 mb-0.5">
              {project.url && <LiveLink project={project} />}
              {project.repo && <RepoLink project={project} />}
            </div>
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
        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <Pill key={i} text={tag} />
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

  if (!project.url) return null;

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
        aria-label={`View ${project.title} live`}
        href={project.url!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`transition-colors text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 ${disabled ? "pointer-events-none" : ""}`}
      >
        {disabled ? (
          <span className="text-base leading-none select-none">💥</span>
        ) : (
          <IconExternalLink size={20} className="overflow-clip" />
        )}
      </a>
    </Tooltip>
  );
}

// GitHub repository link of the project
function RepoLink({ project }: { project: Project }) {
  const isMobile = useIsMobile();

  if (!project.repo) return null;

  return (
    <Tooltip content="View Source Code" disabled={isMobile}>
      <a
        aria-label={`View ${project.title} repository`}
        href={project.repo!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="transition-colors text-zinc-400 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
      >
        <IconCodeblock size={20} className="overflow-clip" />
      </a>
    </Tooltip>
  );
}

// Cover image of the project
function CoverImage({
  src,
  title,
  priority,
}: {
  src: string;
  title: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="hidden sm:block rounded-xl"
      style={{ aspectRatio: "16/9" }}
    >
      {!loaded && (
        <Skeleton
          shape="pill"
          className="w-full h-full rounded-xl"
        />
      )}
      <Image
        src={src}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        alt={`${title} cover image`}
        width={800}
        height={450}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-xl ${loaded ? "visible" : "invisible absolute inset-0"}`}
      />
    </div>
  );
}
