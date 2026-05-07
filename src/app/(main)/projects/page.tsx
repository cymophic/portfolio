import { projects } from "@/lib/site";
import ProjectCard from "@/components/ui/ProjectCard";
import { AnimatedSection } from "@/components/ui/PageAnimator";
import TechStack from "@/components/sections/home/TechStack";

export default function Projects() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl xl:max-w-6xl flex flex-col gap-18 sm:gap-16 px-6 sm:px-10">
        {/* Section Title & Description */}
        <AnimatedSection className="mx-auto max-w-xl flex flex-col px-6 sm:px-10 text-center gap-3">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
            Project Catalogue
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Projects I&#39;ve built over the years, from unpolished
            side-projects to full-scale production systems for enterprise
            companies.
          </p>
        </AnimatedSection>

        {/* Tech Stack */}
        <AnimatedSection className="-my-16 sm:-my-12">
          <TechStack />
        </AnimatedSection>

        {/* Projects */}
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={i} className="break-inside-avoid mb-6">
              <ProjectCard project={project} priority={i === 0} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
