"use client";

import { useTheme } from "@wrksz/themes/client";

import { techStack } from "@/lib/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Pill from "@/components/ui/Pill";

export default function TechStack() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col gap-6 px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <SectionTitle title="Tech Stack" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            A collection of tools and technologies I&#39;ve worked with.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map(({ category, items }, i) => (
            <div
              key={category}
              className={`flex flex-col gap-3 rounded-2xl p-4 border border-zinc-300 dark:border-zinc-600
                ${i === techStack.length - 1 && techStack.length % 2 !== 0 ? "hidden md:flex" : ""}`}
            >
              <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => {
                  const color = getStackColor(tech, isDark);
                  return <Pill key={tech} text={tech} color={color} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getStackColor(tech: string, isDark: boolean): string | undefined {
  const colors: Record<string, { light: string; dark: string }> = {
    // Frontend
    JavaScript: { light: "#b59100", dark: "#F7DF1E" },
    TypeScript: { light: "#2563b0", dark: "#5a9fd4" },
    React: { light: "#0891b2", dark: "#61DAFB" },
    "Next.js": { light: "#171717", dark: "#FFFFFF" },
    TailwindCSS: { light: "#0369a1", dark: "#38bdf8" },
    Bootstrap: { light: "#6d28d9", dark: "#A370F7" },
    GSAP: { light: "#4a7c00", dark: "#88CE02" },

    // Backend
    Python: { light: "#1d4ed8", dark: "#4B8BBE" },
    Django: { light: "#065f46", dark: "#44B78B" },
    "Django Ninja": { light: "#065f46", dark: "#44B78B" },
    "REST APIs": { light: "#4338ca", dark: "#818CF8" },

    // Databases
    PostgreSQL: { light: "#1d4ed8", dark: "#4f8ef7" },
    SQLite: { light: "#0369a1", dark: "#44A8CC" },
    NeonDB: { light: "#047857", dark: "#00E699" },
    Supabase: { light: "#15803d", dark: "#3ECF8E" },

    // DevOps
    Docker: { light: "#0369a1", dark: "#2496ED" },
    Nginx: { light: "#166534", dark: "#00C44F" },
    Gunicorn: { light: "#166534", dark: "#6DC96C" },
    Celery: { light: "#15803d", dark: "#4CAF6A" },
    Redis: { light: "#b91c1c", dark: "#FF6B6B" },
    Ansible: { light: "#b91c1c", dark: "#EE0000" },
    Terraform: { light: "#5b21b6", dark: "#a78bfa" },
    Kubernetes: { light: "#1d4ed8", dark: "#6b9ff7" },

    // Cloud
    AWS: { light: "#b45309", dark: "#FF9900" },
    Cloudflare: { light: "#c2410c", dark: "#F48120" },

    // CI/CD
    Git: { light: "#c2410c", dark: "#F05032" },
    "GitHub Actions": { light: "#171717", dark: "#FFFFFF" },

    // Scripting
    Bash: { light: "#166534", dark: "#4EAA25" },
    Makefile: { light: "#4b5563", dark: "#A0A0A0" },

    // Monitoring
    Sentry: { light: "#4c1d95", dark: "#7B6BE0" },
    "Google Analytics": { light: "#b45309", dark: "#F9AB00" },
    Grafana: { light: "#c2410c", dark: "#F46800" },
    Prometheus: { light: "#c2410c", dark: "#E6522C" },
    Loki: { light: "#b45309", dark: "#F0A824" },

    // Operating Systems
    Linux: { light: "#374151", dark: "#FCC624" },
    Windows: { light: "#1d4ed8", dark: "#0078D4" },
    MacOS: { light: "#374151", dark: "#CCCCCC" },
  };
  return colors[tech]?.[isDark ? "dark" : "light"];
}
