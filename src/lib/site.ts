// Navigation links for the website
export const navLinks: { href: string; label: string }[] = [
];

// Profile information
export const profileInfo = {
  name: "Luis Abhram",
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
    lines: [],
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
    title: "Personal Portfolio",
    description: "The website where you're currently reading this right now.",
    tags: ["AWS S3", "AWS CM", "AWS CloudFront", "Terraform", "Cloudflare", "Sentry", "Next.js", "React", "Git", "GitHub Actions", "Google Analytics"],
    url: "https://luisabhram.dev",
    repo: "https://github.com/cymophic/portfolio",
  },
  {
    title: "L2C Portal",
    description: "Enterprise CRM developed to support Power Mac Center's retail team efforts and streamline their sales process.",
    tags: ["Linux", "Docker", "Ansible", "CloudFlare", "Sentry", "Git", "GitHub Actions", "Grafana", "Prometheus", "Django", "PostgreSQL", "Celery", "Redis", "TailwindCSS", "GSAP"],
    url: "https://rsoconnect.powermaccenter.com",
    repo: null,
  },
  {
    title: "PMC Business",
    description: "PMC's B2B lead generation platform.",
    tags: ["Linux", "Celery", "Redis", "Nginx", "Git","GitHub Actions", "Django", "Bootstrap"],
    url: "https://business.powermaccenter.com",
    repo: null,
  },
  {
    title: "Mobile Care",
    description: "Service and repair portal migration from Shopify to Django.",
    tags: ["Linux", "Django", "Bootstrap", "Git", "Linux"],
    url: "https://mobilecareph.com",
    repo: null,
  },
];