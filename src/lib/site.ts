import type { Career, Education, Project } from "@/lib/types/site";

// Site details
export const websiteURL = "https://luisabhram.dev";
export const timezone = "Asia/Manila";
export const country = "Philippines";

// Navigation links for the website
export const navLinks: { href: string; label: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
];

// Profile information
export const profileInfo = {
  name: "Luis Abhram",
  title: "Full-Stack DevOps Engineer",
  location: "Pasig City, Philippines",
  tagline: "In coding, simplicity is the ultimate sophistication",
  bio: [
    "I'm an engineer experienced in full-stack development and owning full end-to-end deployment pipelines.",

    "I got into programming at 16 when I enrolled in a beginner course in high school, where I grew an interest in systems and how they're made. What started as a tiny curiosity grew to become an interest, then a hobby, and eventually a career path.",

    "Now at 23, I know how to navigate through the whole development lifecycle: designing frontends, building backends, automating deployments, and keeping systems running in production. Along the way, I've landed on a simple belief: code should be as clean as it is functional.",

    "When not building, you'll find me taking photos, hanging out with friends & family, gaming, or traveling when I get the chance. I also enjoy long walks, making pixel art, trying out new food, and spending time with my cats.",
  ],
  birthday: "2003/03/26",
  image: "/avatar.png",
  emails: ["contact@luisabhram.dev"],
  socials: [
    { label: "GitHub", link: "https://github.com/cymophic" },
    { label: "LinkedIn", link: "https://linkedin.com/in/luisabhram" },
    { label: "Instagram", link: "https://instagram.com/cymophic" },
    {
      label: "Spotify",
      link: "https://open.spotify.com/user/m3ej0vdb558lib2vmmpm77wqr?si=1102a92486e24076",
    },
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
        honor: ["Magna Cum Laude", "President's Lister (2020-2024)"],
        awards: ["Best Capstone Research", "Best in Communication"],
        grade: "1.18 GWA",
        clubs: [
          "Institute of Computer Engineers of the Philippines (ISCpE)",
          "STI Engineering Community",
        ],
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
      about:
        "Power Mac Center is the largest Apple Premium Reseller in the Philippines, operating 100+ branches nationwide.",
      scope:
        "Served as a DevOps engineer with full-stack responsibilities. Successfully developed and deployed internal production systems, working closely with project management and cybersecurity teams.",
    },
    {
      company: "Third Generation Holdings Co.",
      logo: "/logos/work_tghc.png",
      role: "Software Developer",
      type: "Internship",
      start: "Mar 2024",
      end: "Jun 2024",
      about:
        "Third Generation Holdings is a Filipino conglomerate with business interests in security, manpower, and facilities management.",
      scope:
        "Joined as an intern software developer, contributing to internal development processes. Gained experience in SDLC and cross-functional collaboration within an enterprise environment.",
    },
    {
      company: "Gingersnaps PH",
      website: "https://gingersnaps.com.ph/",
      logo: "/logos/work_gk.png",
      role: "QA Analyst",
      type: "Internship",
      start: "Nov 2019",
      end: "Dec 2019",
      about:
        "Gingersnaps is a Filipino children's fashion brand known for its playful and colorful clothing line.",
      scope:
        "Served as a QA intern, conducting inventory checks and developing error reports from quality checks.",
    },
  ] as Career[],
};

// Tech stack
export const techStack = {
  os: ["Linux", "Windows", "MacOS"],
  frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "TailwindCSS",
    "Bootstrap",
    "GSAP",
  ],
  backend: ["Python", "Django", "Django Ninja", "REST APIs"],
  databases: ["PostgreSQL", "SQLite", "NeonDB", "Supabase"],
  devops: [
    "Docker",
    "Nginx",
    "Gunicorn",
    "Celery",
    "Redis",
    "Ansible",
    "Kubernetes",
  ],
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
export const projects: Project[] = [
  {
    title: "Digital Portfolio",
    slug: "digital-portfolio",
    pinned: true,
    description: "The website where you're currently reading this right now.",
    tags: ["Live", "Personal"],
    url: "https://luisabhram.dev",
    repo: "https://github.com/cymophic/portfolio",
    cover: "/projects/digital-portfolio/cover.png",
  },
  {
    title: "L2C Portal",
    slug: "l2c-portal",
    pinned: true,
    description:
      "A Lead-to-Cash (L2C) platform built to digitize retail lead and post-sale service tracking.",
    tags: ["Live", "Enterprise"],
    url: "https://rsoconnect.powermaccenter.com",
    repo: null,
    cover: "/projects/l2c-portal/cover.png",
  },
  {
    title: "PMC Business",
    slug: "pmc-business",
    pinned: true,
    description:
      "The official lead generation website of Power Mac Center for business-level clients.",
    tags: ["Live", "Enterprise"],
    url: "https://business.powermaccenter.com",
    repo: null,
    cover: "/projects/pmc-business/cover.png",
  },
  {
    title: "Mobile Care PH",
    slug: "mobilecare-ph",
    pinned: true,
    description:
      "A service portal for after-sales support and real-time status tracking.",
    tags: ["Live", "Enterprise"],
    url: "https://mobilecareph.com",
    repo: null,
    cover: "/projects/mobilecare-ph/cover.png",
  },
  {
    title: "Cymo GPT",
    slug: "cymo-gpt",
    pinned: false,
    description: "A simple Discord AI bot powered by GPT-4o for personal use.",
    tags: ["Personal", "AI"],
    url: null,
    repo: "https://github.com/cymophic/cymo-gpt",
    cover: "/projects/cymo-gpt/cover.png",
  },
  {
    title: "Guessing Game",
    slug: "number-guesser",
    pinned: false,
    description: "A quick number guessing game I spun in my early years.",
    tags: ["Live", "Personal", "Game"],
    url: "https://cymophic.github.io/number-guesser/",
    repo: "https://github.com/cymophic/number-guesser",
  },
  {
    title: "Hangman",
    slug: "hangman",
    pinned: false,
    description:
      "A simple hangman game with GUI created using Java Swing for practicing Java.",
    tags: ["Personal", "Game"],
    url: "https://cymophic.itch.io/hangman-game",
    repo: "https://github.com/cymophic/hangman",
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
