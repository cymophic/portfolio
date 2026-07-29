import { Metadata } from "next";
import { profileInfo, projects } from "@/lib/site";
import ProjectCard from "@/components/ui/ProjectCard";

const description =
  "A detailed catalogue of enterprise systems, DevOps tooling, and full-stack applications built by Luis Abhram.";
export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${profileInfo.name}`,
    description,
    url: "/projects",
    type: "website",
  },
};

export default function Projects() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl xl:max-w-6xl flex flex-col gap-14 px-6 sm:px-10">
        {/* Section Title & Description */}
        <div className="mx-auto max-w-xl flex flex-col px-6 sm:px-10 text-center gap-3">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
            Project Catalogue
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Projects I&#39;ve built over the years, from unpolished
            side-projects to full-scale production systems for enterprise
            companies.
          </p>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
          {projects.filter((p) => p.visible !== false).map((project, i) => (
            <div key={i} className="break-inside-avoid">
              <ProjectCard project={project} priority={i <= 4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
