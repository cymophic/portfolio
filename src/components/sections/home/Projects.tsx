import Link from "next/link";

import { projects } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  const pinned = projects.filter((p) => p.pinned);

  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-6 px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <SectionTitle title="Projects" href="/projects" />

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Here are my featured works. Check out the full list in the{" "}
            <Link
              href="/projects"
              className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              project catalogue
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch auto-rows-[1fr]">
          {pinned.map((project, i) => (
            <ProjectCard key={i} project={project} showImage={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
