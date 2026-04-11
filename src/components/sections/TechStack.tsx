"use client";

import { techStack } from "@/lib/site";
import SectionTitle from "./common/SectionTitle";
import { useTechMarquee } from "@/hooks/animations/useTechMarquee";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiBootstrap, SiGreensock, SiPython, SiDjango, SiPostgresql, SiSqlite,
  SiSupabase, SiDocker, SiNginx, SiRedis, SiCelery, SiAnsible,
  SiKubernetes, SiTerraform, SiCloudflare, SiGit,
  SiGithubactions, SiGrafana, SiPrometheus, SiSentry,
  SiGoogleanalytics, SiLinux, SiApple,
} from "react-icons/si";
import { MdTerminal, MdCloud, MdWindow, MdStorage } from "react-icons/md";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  JavaScript:         SiJavascript,
  TypeScript:         SiTypescript,
  React:              SiReact,
  "Next.js":          SiNextdotjs,
  TailwindCSS:        SiTailwindcss,
  Bootstrap:          SiBootstrap,
  GSAP:               SiGreensock,
  Python:             SiPython,
  Django:             SiDjango,
  PostgreSQL:         SiPostgresql,
  SQLite:             SiSqlite,
  NeonDB:             MdStorage,
  Supabase:           SiSupabase,
  Docker:             SiDocker,
  Nginx:              SiNginx,
  Redis:              SiRedis,
  Celery:             SiCelery,
  Ansible:            SiAnsible,
  Kubernetes:         SiKubernetes,
  AWS:                MdCloud,
  Terraform:          SiTerraform,
  Cloudflare:         SiCloudflare,
  Git:                SiGit,
  "GitHub Actions":   SiGithubactions,
  Bash:               MdTerminal,
  Grafana:            SiGrafana,
  Prometheus:         SiPrometheus,
  Sentry:             SiSentry,
  "Google Analytics": SiGoogleanalytics,
  Linux:              SiLinux,
  Windows:            MdWindow,
  MacOS:              SiApple,
  Makefile:           MdTerminal,
  Loki:               SiGrafana,
};

const colorMap: Record<string, { light: string; dark: string }> = {
  JavaScript:         { light: "#F7DF1E", dark: "#F7DF1E" },
  TypeScript:         { light: "#3178C6", dark: "#3178C6" },
  React:              { light: "#61DAFB", dark: "#61DAFB" },
  "Next.js":          { light: "#000000", dark: "#ffffff" },
  TailwindCSS:        { light: "#06B6D4", dark: "#06B6D4" },
  Bootstrap:          { light: "#7952B3", dark: "#7952B3" },
  GSAP:               { light: "#88CE02", dark: "#88CE02" },
  Python:             { light: "#3776AB", dark: "#3776AB" },
  Django:             { light: "#092E20", dark: "#44B78B" },
  PostgreSQL:         { light: "#4169E1", dark: "#4169E1" },
  SQLite:             { light: "#003B57", dark: "#57A8D3" },
  NeonDB:             { light: "#00E599", dark: "#00E599" },
  Supabase:           { light: "#3FCF8E", dark: "#3FCF8E" },
  Docker:             { light: "#2496ED", dark: "#2496ED" },
  Nginx:              { light: "#009639", dark: "#009639" },
  Redis:              { light: "#FF4438", dark: "#FF4438" },
  Celery:             { light: "#37814A", dark: "#37814A" },
  Ansible:            { light: "#EE0000", dark: "#EE0000" },
  Kubernetes:         { light: "#326CE5", dark: "#326CE5" },
  AWS:                { light: "#FF9900", dark: "#FF9900" },
  Terraform:          { light: "#844FBA", dark: "#844FBA" },
  Cloudflare:         { light: "#F48120", dark: "#F48120" },
  Git:                { light: "#F05032", dark: "#F05032" },
  "GitHub Actions":   { light: "#2088FF", dark: "#2088FF" },
  Bash:               { light: "#4EAA25", dark: "#4EAA25" },
  Grafana:            { light: "#F46800", dark: "#F46800" },
  Prometheus:         { light: "#E6522C", dark: "#E6522C" },
  Sentry:             { light: "#362D59", dark: "#9B8ECE" },
  "Google Analytics": { light: "#E37400", dark: "#E37400" },
  Linux:              { light: "#FCC624", dark: "#FCC624" },
  Windows:            { light: "#0078D4", dark: "#0078D4" },
  MacOS:              { light: "#000000", dark: "#ffffff" },
  Makefile:           { light: "#6b7280", dark: "#9ca3af" },
  Loki:               { light: "#F46800", dark: "#F46800" },
};

const allTechs = [...new Set(Object.values(techStack).flat())].filter(
  (tech) => iconMap[tech] && colorMap[tech]
);

function TechItem({ label }: { label: string }) {
  const Icon = iconMap[label];
  const color = colorMap[label];
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0 select-none"
      style={{
        ["--brand-light" as string]: color.light,
        ["--brand-dark" as string]: color.dark,
      }}
    >
      <Icon size={14} className="text-(--brand-light) dark:text-(--brand-dark) shrink-0" />
      <span className="text-xs text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function TechStack() {
  const { trackRef } = useTechMarquee();

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Tech Stack" />
      </div>

      <div
        className="relative mt-8 max-w-210 mx-auto w-full overflow-hidden cursor-grab active:cursor-grabbing px-6"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex w-max gap-3 py-2">
          {[...allTechs, ...allTechs].map((tech, i) => (
            <TechItem key={`${tech}-${i}`} label={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}