import { techStack } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";

export default function TechStack() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-6 px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <SectionTitle title="Tech Stack" />

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            A collection of tools and technologies I&#39;ve worked with. You can
            hover over each item to see the name.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map(({ category, items }, i) => (
            <div
              key={category}
              className={`flex flex-col gap-3 rounded-2xl p-4 border border-zinc-300 dark:border-zinc-600
                ${i === techStack.length - 1 && techStack.length % 2 !== 0 ? "hidden md:flex" : ""}`}
            >
              {/* Category Title */}
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {category}
              </span>

              {/* Tech Items */}
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span className="inline-flex items-center rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs text-zinc-700 whitespace-nowrap dark:border-zinc-600 dark:text-zinc-300/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
