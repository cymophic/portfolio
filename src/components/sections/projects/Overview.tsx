import Breadcrumb from "@/components/ui/BreadCrumb";

export default function ProjectsOverviewSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-20 sm:px-10 sm:py-28">
        <Breadcrumb />
                
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
          Selected work &amp; experiments
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          This page will showcase key projects with links, summaries, and tech
          stacks.
        </p>
      </div>
    </section>
  );
}

