import { projects } from "@/lib/site";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl flex flex-col gap-10 px-6 sm:px-10">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
          Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch auto-rows-[1fr]">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}