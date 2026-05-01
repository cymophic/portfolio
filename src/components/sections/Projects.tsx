import { projects } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  const pinned = projects.filter((p) => p.pinned);

  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Projects" href="/projects" tooltip="View All Projects" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch auto-rows-[1fr]">
          {pinned.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}