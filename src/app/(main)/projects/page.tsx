import { projects } from "@/lib/site";
import ProjectCard from "@/components/ui/ProjectCard";
import { AnimatedSection } from "@/components/ui/PageAnimator";
import TechStack from "@/components/sections/TechStack";

export default function Projects() {
  const isOdd = projects.length % 2 !== 0;
  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl flex flex-col gap-18 px-6 sm:px-10">
        {/* Section Title & Description */}
        <AnimatedSection className="mx-auto max-w-xl flex flex-col px-6 sm:px-10 text-center gap-3">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
            Projects
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Projects I&#39;ve built over the years, from small personal side-projects to full-scale production systems for enterprise companies. 
          </p>
        </AnimatedSection>

        {/* Tech Stack */}
        <AnimatedSection className="-my-8">
          <TechStack />
        </AnimatedSection>

        {/* Projects */}
        <div className={`grid gap-6 items-stretch auto-rows-[1fr] ${isOdd ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 sm:grid-cols-2"}`}>
          {projects.map((project, i) => (
            <AnimatedSection key={i}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}