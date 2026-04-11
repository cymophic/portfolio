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
  { label: "GitHub", link: "https://github.com/cymophic" },
  { label: "LinkedIn", link: "https://linkedin.com/in/luisabhram" },
  { label: "Instagram", link: "https://instagram.com/cymophic" },
  { label: "Email", link: "mailto:work.luisabhram@gmail.com" },
];

// Tech stack
export const techStack = {
  os: ["Linux", "Windows", "MacOS"],
  frontend: ["JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS", "Bootstrap", "GSAP"],
  backend: ["Python", "Django", "Django Ninja", "REST APIs"],
  databases: ["PostgreSQL", "SQLite", "NeonDB", "Supabase"],
  devops: ["Docker", "Nginx", "Gunicorn", "Celery", "Redis", "Ansible", "Ansible Vault", "Kubernetes"],
  cloud: ["AWS S3", "AWS CloudFront", "AWS Certificate Manager", "Terraform", "Cloudflare"],
  cicd: ["Git", "GitHub Actions"],
  scripting: ["Python", "Bash", "Makefile"],
  monitoring: ["Sentry", "Google Analytics", "Grafana", "Prometheus", "Loki"],
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
    tags: ["Live", "Open Source", "CI/CD", "IaC", "Cloud", "Monitoring"],
    url: "https://luisabhram.dev",
    repo: "https://github.com/cymophic/portfolio",
  },
  {
    title: "L2C Portal",
    description: "An internal Lead-to-Cash (L2C) platform built for Power Mac Center to centralize retail lead tracking and digitize post-sale service workflows across all 100+ branches in the Philippines.",
    tags: ["Live", "Enterprise", "CI/CD", "Containerized", "Self-Hosted", "Monitoring", "Scheduled Tasks"],
    url: "https://rsoconnect.powermaccenter.com",
    repo: null,
  },
  {
    title: "PMC Enterprise & Education",
    description: "The official lead generation website of Power Mac Center for business-level clients.",
    tags: ["Live", "Enterprise", "CI/CD", "Self-Hosted"],
    url: "https://business.powermaccenter.com",
    repo: null,
  },
  {
    title: "Mobile Care PH",
    description: "The official service portal of Power Mac Center for after-sales support and real-time status tracking.",
    tags: ["Live", "Enterprise", "Migration", "Self-Hosted"],
    url: "https://mobilecareph.com",
    repo: null,
  },
  {
    title: "Cymo GPT",
    description: "A simple Discord AI bot powered by GPT-4o for personal use.",
    tags: ["Open Source", "AI Integration"],
    url: null,
    repo: "https://github.com/cymophic/cymo-gpt",
  },
];

// Easter egg messages for the portfolio URL
export const portfolioEasterEggMessages = [
  { text: "It's this website, you're already here." },
  { text: "Nope, it's still this page." },
  { text: "Have you tried scrolling instead?" },
  { text: "Clicking won't take you anywhere new." },
  { text: "You're very persistent, aren't you?" },
  { text: "Okay, I admire the dedication." },
  { text: "You have a lot of time in your hands." },
  { text: "Wait, I'm running out of things to say." },
  { text: "Okay, I'll just ignore you from now on." },
  { text: "leaves", type: "action" },
];