type TechIcon = {
  icon: string;
  light: string;
  dark: string;
};

export const TECH_ICONS: Record<string, TechIcon> = {
  // Frontend
  JavaScript: { icon: "brand-javascript", light: "#F7DF1E", dark: "#F7DF1E" },
  TypeScript: { icon: "brand-typescript", light: "#3178C6", dark: "#3178C6" },
  React: { icon: "brand-react", light: "#61DAFB", dark: "#61DAFB" },
  "Next.js": { icon: "brand-nextjs", light: "#000000", dark: "#FFFFFF" },
  TailwindCSS: { icon: "brand-tailwind", light: "#06B6D4", dark: "#06B6D4" },
  Bootstrap: { icon: "brand-bootstrap", light: "#7952B3", dark: "#A370F7" },
  GSAP: { icon: "keyframes", light: "#88CE02", dark: "#88CE02" },

  // Backend
  Python: { icon: "brand-python", light: "#3776AB", dark: "#4B8BBE" },
  Django: { icon: "brand-django", light: "#092E20", dark: "#44B78B" },
  "Django Ninja": { icon: "brand-django", light: "#092E20", dark: "#44B78B" },
  "REST APIs": { icon: "api", light: "#6366F1", dark: "#818CF8" },

  // Databases
  PostgreSQL: { icon: "brand-postgresql", light: "#4169E1", dark: "#4169E1" },
  SQLite: { icon: "sql", light: "#003B57", dark: "#44A8CC" },
  NeonDB: { icon: "database", light: "#00A86B", dark: "#00E699" },
  Supabase: { icon: "brand-supabase", light: "#1C8C5E", dark: "#3ECF8E" },

  // DevOps
  Docker: { icon: "brand-docker", light: "#2496ED", dark: "#2496ED" },
  Nginx: { icon: "affiliate", light: "#009639", dark: "#00C44F" },
  Gunicorn: { icon: "", light: "#499848", dark: "#6DC96C" },
  Celery: { icon: "", light: "#37814A", dark: "#4CAF6A" },
  Redis: { icon: "brand-redis", light: "#FF4438", dark: "#FF4438" },
  Ansible: { icon: "brand-ansible", light: "#EE0000", dark: "#EE0000" },
  Kubernetes: { icon: "", light: "#326CE5", dark: "#326CE5" },

  // Cloud
  AWS: { icon: "brand-aws", light: "#FF9900", dark: "#FF9900" },
  Cloudflare: { icon: "brand-cloudflare", light: "#F48120", dark: "#F48120" },

  // CI/CD
  Git: { icon: "brand-git", light: "#F05032", dark: "#F05032" },
  "GitHub Actions": { icon: "brand-github", light: "#181717", dark: "#FFFFFF" },

  // Scripting
  Bash: { icon: "codeblock", light: "#4EAA25", dark: "#4EAA25" },
  Makefile: { icon: "file-code", light: "#6D6D6D", dark: "#A0A0A0" },

  // Monitoring
  Sentry: { icon: "brand-sentry", light: "#362D59", dark: "#7B6BE0" },
  "Google Analytics": {
    icon: "brand-google-analytics",
    light: "#E37400",
    dark: "#F9AB00",
  },
  Grafana: { icon: "brand-grafana", light: "#F46800", dark: "#F46800" },
  Prometheus: { icon: "", light: "#E6522C", dark: "#E6522C" },
  Loki: { icon: "", light: "#F0A824", dark: "#F0A824" },

  // Operating Systems
  Linux: { icon: "device-desktop", light: "#4B4B4B", dark: "#FCC624" },
  Windows: { icon: "brand-windows", light: "#0078D4", dark: "#0078D4" },
  MacOS: { icon: "brand-apple", light: "#555555", dark: "#CCCCCC" },
};
