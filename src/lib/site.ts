import type { Career, Education } from "@/lib/types/site";

// Navigation links for the website
export const navLinks: { href: string; label: string }[] = [
];

// Profile information
export const profileInfo = {
  name: "Luis Abhram",
  title: "DevOps Engineer",
  location: "Pasig City, Philippines",
  tagline: "In coding, simplicity is the ultimate sophistication",
  bio: [
    "Hi! I'm Luis, a DevOps engineer with a background in software engineering based in Philippines. I build, deploy, and maintain systems end to end, from the code to the infrastructure it runs on.",

    "In my previous work, I've managed on-premise deployments, deploying even the applications I built myself. I've continuously refined my craft by learning from other engineers, studying well-built systems, and pushing my own standards higher with every project I ship. Currently, I'm expanding into cloud & infrastructure, exploring how to bring that same end-to-end ownership to cloud environments.",

    "When not building, you'll find me taking photos, hanging out with friends & family, gaming, or traveling when I get the chance. I also enjoy long walks, making pixel art, trying out new food, and spending time with my cats.",
  ],
  birthDate: "2003/03/26",
  image: "/avatar.png",
  emails: [
    "work.luisabhram@gmail.com"
  ],
  socialLinks: [
    { label: "GitHub", link: "https://github.com/cymophic" },
    { label: "LinkedIn", link: "https://linkedin.com/in/luisabhram" },
    { label: "Instagram", link: "https://instagram.com/cymophic" },
  ],
  education: [
    {
      school: "Systems Technology Institute College",
      website: "https://sti.edu/",
      logo: "/logos/edu_sti.png",
      degree: "B.S. in Computer Engineering",
      start: "Sep 2020",
      end: "Jul 2024",
      details: {
        honor: ["President's Lister (2020-2024)", "Magna Cum Laude"],
        awards: ["Best Capstone Research", "Best in Communication"],
        grade: "1.18 GWA",
        clubs: ["Institute of Computer Engineers of the Philippines (ISCpE)", "STI Engineering Community"],
      },
    },
    {
      school: "Systems Technology Institute College",
      website: "https://sti.edu/",
      logo: "/logos/edu_sti.png",
      degree: "Mobile App & Web Development",
      start: "Jun 2018",
      end: "Mar 2020",
      details: {  
        honor: ["High Honors"],
        clubs: ["Developers of Next Advanced Technology (DoNAT)"],
      },
    },
  ] as Education[],
  career: [
    {
      company: "Power Mac Center Inc.",
      website: "https://powermaccenter.com/",
      logo: "/logos/work_pmc.png",
      role: "DevOps Engineer",
      type: "Full-time",
      start: "Nov 2024",
      end: "Apr 2026",
      about: "Power Mac Center is the largest Apple Premium Reseller in the Philippines, operating 100+ branches nationwide.",
      scope: "Served as a DevOps engineer, developing and deploying production systems on-premise and supporting thousands of employees across 100+ branches with minimal to no downtime.",
    },
    {
      company: "Third Generation Holdings Co.",
      logo: "/logos/work_tghc.png",
      role: "Software Developer",
      type: "Internship",
      start: "Mar 2024",
      end: "Jun 2024",
      about: "Third Generation Holdings is a Filipino conglomerate with business interests in security, manpower, and facilities management.",
      scope: "Served as an intern software developer, building a forms and time log app for the security and roving team.",
    },
    {
      company: "Gingersnaps PH",
      website: "https://gingersnaps.com.ph/",
      logo: "/logos/work_gk.png",
      role: "QA Analyst",
      type: "Internship",
      start: "Nov 2019",
      end: "Dec 2019",
      about: "Gingersnaps is a Filipino children's fashion brand known for its playful and colorful clothing line.",
      scope: "Served as a QA intern, conducting inventory checks and developing error reports from quality checks.",
    },
  ] as Career[],
}

// Tech stack
export const techStack = {
  os: ["Linux", "Windows", "MacOS"],
  frontend: ["JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS", "Bootstrap", "GSAP"],
  backend: ["Python", "Django", "Django Ninja", "REST APIs"],
  databases: ["PostgreSQL", "SQLite", "NeonDB", "Supabase"],
  devops: ["Docker", "Nginx", "Gunicorn", "Celery", "Redis", "Ansible", "Kubernetes"],
  cloud: ["AWS", "Cloudflare"],
  cicd: ["Git", "GitHub Actions"],
  scripting: ["Python", "Bash", "Makefile"],
  monitoring: ["Sentry", "Google Analytics", "Grafana", "Prometheus", "Loki"],
};

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
    tags: ["Live", "Enterprise", "CI/CD", "Self-Hosted", "Containerization", "Monitoring", "Scheduled Tasks"],
    url: "https://rsoconnect.powermaccenter.com",
    repo: null,
  },
  {
    title: "PMC Business",
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
  { text: "You can stop now." },
  { text: "Stop, it's gonna break." },
  { text: "Explodes to countless fragments", type: "action" },
];