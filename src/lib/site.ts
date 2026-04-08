// Navigation links for the website
export const navLinks = [
  { href: "/", label: "About" },
];

// Profile information
export const profileInfo = {
  name: "Luis Abhram Mata",
  title: "DevOps Engineer",
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
      "Built enterprise CRM in 2 weeks serving 1-2K users with RBAC, REST APIs, and self-hosted deployment.",
      "Deployed B2B lead platform with async processing (Celery/Redis) and CI/CD pipeline.",
      "Migrated customer-facing landing page from Shopify to Django with admin CMS.",
      "Developed 8-module SuiteCRM system for 15-person sales team.",
      "Collaborated with Product Managers using Agile methodology.",
    ],
  },
  {
    company: "Third Generation Holdings Corporation",
    role: "Software Developer Intern",
    start: "March 2024",
    end: "June 2024",
    lines: [
      "Spearheaded development of forms/reporting application, reducing costs by 35% and increasing efficiency by 25%.",
      "Assisted in development of the company's internal messaging application.",
    ],
  },
];

// Education
export const education = [
  {
    school: "STI College Ortigas-Cainta",
    degree: "B.S. in Computer Engineering",
    end: "July 2024",
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
    description: "Enterprise CRM serving 1-2K users with 3-tier location hierarchy, RBAC, 2FA, async PDF generation, and full observability stack.",
    tags: ["Django", "PostgreSQL", "Docker", "Celery", "Grafana", "Ansible"],
    url: null,
    repo: null,
  },
  {
    title: "PMC Business Landing Page",
    description: "B2B lead generation platform with async email processing, CI/CD pipeline, and rate limiting. Live in production.",
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