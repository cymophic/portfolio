import { notFound } from "next/navigation";

import { projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl flex flex-col px-6 sm:px-10 text-center gap-3">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
          {project.title}
        </h1>

        {project.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
        )}
      </div>
    </section>
  );
}
