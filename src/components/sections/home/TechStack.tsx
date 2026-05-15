// src/components/sections/home/TechStack.tsx
import { techStack } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Tooltip from "@/components/ui/Tooltip";

export default function TechStack() {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-6 px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <SectionTitle title="Tech Stack" />

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            A collection of tools and technologies I&#39;ve worked with. Hover
            over each to see the name.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {techStack.map(({ category, items }, i) => (
            <div
              key={category}
              className={`flex flex-col gap-3 rounded-2xl p-4 border border-zinc-300 dark:border-zinc-600
                ${i === techStack.length - 1 && techStack.length % 2 !== 0 ? "hidden sm:flex" : ""}`}
            >
              {/* Category Title */}
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {category}
              </span>

              {/* Tech Items */}
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <Tooltip key={tech} content={tech}>
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 cursor-default">
                      {tech.slice(0, 2)}
                    </span>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
