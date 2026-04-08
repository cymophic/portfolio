// Navigation links for the website
export const navLinks: { href: string; label: string }[] = [
];

// Profile information
export const profileInfo = {
  name: "Luis Abhram Mata",
  title: "DevOps Engineer / Full-Stack Developer",
  location: "Pasig City, Philippines",
  bio: "DevOps Engineer who can provide end-to-end ownership. I build, deploy, and scale resilient systems that stay running.",
  image: "https://github.com/cymophic.png",
}

// Social media links
export const socialLinks = [
  { label: "GitHub", link: "https://github.com/cymophic", color: { light: "#333", dark: "#fff" } },
  { label: "LinkedIn", link: "https://linkedin.com/in/luisabhram", color: { light: "#0A66C2", dark: "#0A66C2" } },
  { label: "Instagram", link: "https://instagram.com/cymophic", color: { light: "#E1306C", dark: "#E1306C" } },
  { label: "Email", link: "mailto:work.luisabhram@gmail.com", color: { light: "#71717a", dark: "#d4d4d8" } },
];

// Tech stack
export const techStack = {
  devops: ["Docker", "GitHub Actions", "Nginx", "Gunicorn", "Celery", "Redis", "Linux", "Ansible"],
  monitoring: ["Sentry", "Grafana", "Prometheus", "Loki"],
  backend: ["Python", "Django", "Django Ninja", "REST APIs"],
  databases: ["PostgreSQL", "SQLite", "NeonDB", "Supabase"],
  frontend: ["JavaScript", "TailwindCSS", "Bootstrap", "React", "Next.js"],
};

// Work experience
export const workExperience = [
  {
    company: "Power Mac Center",
    role: "DevOps Engineer",
    start: "Nov 2024",
    end: "Present",
    lines: [
      "Deployed a full-stack Django app on bare-metal Linux serving 1-2K daily users, owning backend, infrastructure, and CI/CD.",
      "Built a 3-environment CI/CD pipeline with GitHub Actions, self-hosted runners, and zero manual deployments.",
      "Provisioned Linux servers with Docker, Nginx w/ SSL, Gunicorn, and permission hardening via Ansible.",
      "Set up structured logging, Sentry error tracking, and a full observability stack (Grafana, Prometheus, Loki).",
      "Automated PostgreSQL backups via Celery Beat with tiered retention and a scheduled weekly usage report by email.",
      "Collaborated with PMs, QA, and cybersecurity teams, producing enterprise-level documentation in an Agile environment.",
    ],
  },
  {
    company: "Third Generation Holdings Corporation",
    role: "Software Developer Intern",
    start: "Mar 2024",
    end: "Jun 2024",
    lines: [
      "Spearheaded development of the company's forms and reporting application, automating data collection and reducing costs by 35% while increasing operational efficiency by 25% through interactive dashboards and real-time reporting.",
      "Contributed to the development of the company's internal messaging application and evaluated project requirements to propose cost-effective technical solutions.",
    ],
  },
];

// Education
export const education = [
  {
    school: "STI College Ortigas-Cainta",
    degree: "B.S. in Computer Engineering",
    end: "Jul 2024",
    honors: ["Magna Cum Laude", "Consistent President's Lister", "Best Capstone Research"],
  },
];

// Certifications
export const certifications = [
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "Dec 2023",
  },
];

// Projects
export const projects = [
  {
    title: "L2C Portal (Lead-to-Cash CRM)",
    description: "Enterprise CRM built with Django and Django Ninja, serving 1-2K users across a 3-tier location hierarchy with 4 permission levels controlling dashboard views and data access.",
    tags: ["Django", "PostgreSQL", "Docker", "Celery", "Grafana", "Ansible"],
    url: null,
    repo: null,
  },
  {
    title: "PMC Business Landing Page",
    description: "B2B lead generation platform deployed on bare-metal Linux with Nginx and Gunicorn - intentionally kept lightweight for a single-service deployment.",
    tags: ["Django", "Celery", "Redis", "Nginx", "GitHub Actions"],
    url: "https://business.powermaccenter.com",
    repo: null,
  },
  {
    title: "MobileCare Frontend Migration",
    description: "Migrated customer-facing service portal from Shopify to Django with admin CMS and responsive Bootstrap UI.",
    tags: ["Django", "Bootstrap", "CSS"],
    url: "https://mobilecareph.com",
    repo: null,
  },
];