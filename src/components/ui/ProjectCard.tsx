  import Link from "next/link";
  import { IconArrowRight } from "@tabler/icons-react";

  import type { Project } from "@/lib/types/site";
  import Tooltip from "@/components/ui/Tooltip"

  const tagPillClass =
    "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-700 whitespace-nowrap dark:border-zinc-700 dark:text-zinc-300/80";

  export default function ProjectCard({ project }: { project: Project }) {
    return (
      <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:scale-102 transition-transform duration-100 cursor-pointer group">
        {/* Cover placeholder */}
        <div className="h-28 bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl" />

        {/* Content */}
        <div className="flex flex-col flex-1 gap-2 p-4">
          {/* Title + Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                {project.title}
              </span>
            </div>
            <Tooltip content="View Project Details">
              <Link 
                href={`/projects/${project.slug}`}
                className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors shrink-0"
              >
                <IconArrowRight size={18} className="overflow-clip transition-transform group-hover:-rotate-45 duration-280"/>
              </Link>
            </Tooltip>
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
                <span key={i} className={tagPillClass}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }