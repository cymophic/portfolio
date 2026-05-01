  import Link from "next/link";
  import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

  import type { Project } from "@/lib/types/site";

  const tagPillClass =
    "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-700 whitespace-nowrap dark:border-zinc-700 dark:text-zinc-300/80";

  export default function ProjectCard({ project }: { project: Project }) {
    return (
      <Link 
        href={`/projects/${project.slug}`}
        className="h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 hover:dark:border-zinc-500 cursor-pointer group"
      >
        {/* Cover Image */}
        {/* <div className="h-28 bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl" /> */}

        {/* Content */}
        <div className="flex flex-col flex-1 gap-2 p-4">
          {/* Title + Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                {project.title}
              </span>
            </div>

            <IconArrowUpRight size={18} className="inline sm:hidden overflow-clip text-zinc-400 dark:text-zinc-500" />
            <IconArrowRight size={18} className="hidden sm:inline overflow-clip transition-transform group-hover:-rotate-45 duration-180 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0"/>
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
      </Link>
    );
  }