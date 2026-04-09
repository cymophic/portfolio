// Navigation links for the website
export const navLinks: { href: string; label: string }[] = [
];

// Profile information
export const profileInfo = {
  name: "Luis Abhram Mata",
  title: "DevOps Engineer / Full-Stack Developer",
  location: "Pasig City, Philippines",
  bio: "DevOps Engineer with full-stack experience. I build, deploy, and maintain scalable systems end to end.",
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
    company: "Power Mac Center Inc.",
    role: "DevOps Engineer",
    start: "Nov 2024",
    end: "Apr 2026",
    lines: [
      "Built and maintained a custom CRM using Django, serving 1-2K users with a 3-tier location hierarchy and 4 permission levels.",
    ],
  },
  {
    company: "Third Generation Holdings Co.",
    role: "Software Developer Intern",
    start: "Mar 2024",
    end: "Jun 2024",
    lines: [],
  },
];

// Education
export const education = [
  {
    school: "STI College",
    degree: "B.S. in Computer Engineering",
    start: "Sep 2020",
    end: "Jul 2024",
    honors: [],
  },
  {
    school: "STI College",
    degree: "Mobile App & Web Development",
    start: "Jun 2018",
    end: "Mar 2020",
    honors: [],
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
    tags: ["Django", "PostgreSQL", "Docker", "Celery", "Grafana", "Ansible", "GitHub Actions", "Sentry", "Prometheus", "Loki", "TailwindCSS", "Nginx", "Gunicorn"],
    url: null,
    repo: "https://github.com/PMC-ESS/rbt-l2c-portal",
  },
  {
    title: "PMC Business Landing Page",
    description: "B2B lead generation platform deployed on bare-metal Linux with Nginx and Gunicorn, intentionally kept lightweight for a single-service deployment.",
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