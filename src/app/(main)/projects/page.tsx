import { projects } from "@/lib/site";
import ProjectCard from "@/components/ui/ProjectCard";
import { AnimatedSection } from "@/components/ui/PageAnimator";

export default function Projects() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl flex flex-col gap-12 px-6 sm:px-10">
        <AnimatedSection className="mx-auto max-w-xl flex flex-col px-6 sm:px-10 text-center gap-3">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
            Projects
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Projects I&#39;ve built over the years, from small personal side-projects to full-scale production systems for enterprise companies. 
          </p>
        </AnimatedSection>
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch auto-rows-[1fr]">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}