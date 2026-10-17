/**
 * Workshop landing page copy — edit here, not in components.
 * Facts only; no invented clients, numbers, or prices.
 */
import { publicContact } from "@/lib/public-contact";

export const workshop = {
  owner: {
    name: "Mohamed Fawzy",
    location: "Cairo, Egypt",
  },

  nav: {
    links: [
      { label: "Who it's for", href: "#audience" },
      { label: "Outcomes", href: "#outcomes" },
      { label: "Agenda", href: "#agenda" },
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Book a conversation", href: "#contact" },
  },

  hero: {
    eyebrow: "Executive workshop",
    headline: "Build your AI agent team",
    subcopy:
      "A one-day, hands-on session for managers who want a practical agent workflow—not another slide deck. Leave with roles, prompts, and a plan you can run with free or low-cost tools.",
    primaryCta: { label: "Reserve your seat", href: "#contact" },
    secondaryCta: { label: "See the agenda", href: "#agenda" },
  },

  audience: {
    id: "audience",
    title: "Who it's for",
    intro:
      "Leaders and managers in the Gulf (KSA) and Egypt who need faster analysis, cleaner reporting, and accountable automation—not experimental side projects.",
    bullets: [
      "Department heads and leadership teams responsible for operational or financial reporting",
      "Managers bridging business teams and data systems (ERP, spreadsheets, shared drives)",
      "Leaders who want staff trained on safe, repeatable AI-agent workflows",
      "Teams already sitting on SAP or similar data who need Python/SQL pipelines without a big IT project",
      "Organizations ready to assign owners for each agent role after the workshop",
    ],
  },

  outcomes: {
    id: "outcomes",
    title: "What you leave with",
    intro:
      "Concrete artifacts from a working day—not theory. You will sketch, build, and review agents together.",
    items: [
      {
        title: "Agent team map",
        description:
          "A named roster (Chief of Staff, engineering, domain specialists) with clear hand-offs and review gates.",
      },
      {
        title: "Prompt library starter",
        description:
          "Reusable prompts for planning, critique, and delivery—tuned to your reporting and ops language.",
      },
      {
        title: "Tooling shortlist",
        description:
          "Free and low-cost models and utilities mapped to each agent role, with security notes for corporate use.",
      },
      {
        title: "Automation spine",
        description:
          "A simple Python + SQL pattern for pulling SAP-shaped data into repeatable analysis—aligned with how Mohamed works in manufacturing finance.",
      },
      {
        title: "90-day rollout sketch",
        description:
          "Phased adoption: pilot team, success metrics, and how to cut recurring reporting time without breaking controls.",
      },
    ],
  },

  agenda: {
    id: "agenda",
    title: "Agenda",
    intro: "One full day, morning to afternoon. Laptops open, breaks included.",
    rows: [
      {
        number: "01",
        time: "08:30 – 09:00",
        title: "Arrival & context",
        detail: "Goals, constraints, and how agent teams differ from single-chat workflows.",
      },
      {
        number: "02",
        time: "09:00 – 10:30",
        title: "Roles & governance",
        detail: "Design your agent roster, escalation paths, and human approval points.",
      },
      {
        number: "03",
        time: "10:45 – 12:30",
        title: "Build block 1 — data to insight",
        detail: "Sketch a Python + SQL pipeline on sample SAP-style data; assign an engineering agent.",
      },
      {
        number: "04",
        time: "12:30 – 13:30",
        title: "Lunch",
        detail: "Informal Q&A on Samsung-scale ops and manufacturing finance realities.",
      },
      {
        number: "05",
        time: "13:30 – 15:00",
        title: "Build block 2 — chief of staff",
        detail: "Morning briefings, task routing, and business-case drafts with review loops.",
      },
      {
        number: "06",
        time: "15:15 – 16:45",
        title: "Build block 3 — domain agents",
        detail: "Spin up specialist agents (ops, store, education) using the same review pattern.",
      },
      {
        number: "07",
        time: "16:45 – 17:30",
        title: "Playback & next steps",
        detail: "Team demos, risk check, and your 90-day rollout commitments.",
      },
    ],
  },

  format: {
    id: "format",
    title: "Format",
    paragraphs: [
      "One day, in person or on site at your location.",
      "Built for managers and leadership teams—hands-on, with templates you can reuse.",
      "Available in the Gulf (KSA) and Egypt.",
      "Pricing is shared after a short fit call; nothing is published on this page.",
    ],
  },

  about: {
    id: "about",
    title: "About Mohamed",
    headline:
      "AI & Business Transformation Leader | Enterprise Automation | AI Trainer & Lecturer | Finance | Manufacturing | SAP",
    intro:
      "Mohamed leads AI automation and business transformation initiatives within Samsung Electronics Egypt, connecting AI, automation, finance, manufacturing, supply chain and SAP. He helps organisations turn AI experimentation into measurable business impact: less manual work, better decisions, greater accuracy and measurable value.",
    credentials: [
      {
        title: "14+ years in multinational manufacturing",
        description:
          "Experience in a multinational manufacturing environment, with a background in Finance Business Partnering, FP&A, operations and manufacturing.",
      },
      {
        title: "Enterprise transformation",
        description:
          "Enterprise AI adoption and transformation, business process automation and workflow redesign, and manufacturing and supply-chain transformation.",
      },
      {
        title: "Finance, reporting & enterprise data",
        description:
          "AI-enabled reporting and decision support, finance/FP&A and cost-control automation, and SAP and enterprise data workflows.",
      },
      {
        title: "Governance & business value",
        description:
          "AI governance and validation, business-case development and value measurement.",
      },
      {
        title: "AI Trainer & Lecturer",
        description:
          "Cairo University · 21,689 LinkedIn followers.",
      },
      {
        title: "Measured impact",
        description:
          "Cut recurring analysis and reporting time by 70% using automation and AI-agent workflows.",
      },
    ],
  },

  proof: {
    id: "proof",
    title: "Proof of work",
    intro:
      "Real product and course screenshots, shown with demo or training data only.",
    blocks: [
      {
        title: "Trip Orders",
        description:
          "A daily board for transport trip orders, shown with demo data.",
        image: {
          src: "/workshop/trip-orders.webp",
          alt: "Trip Orders daily board showing transport orders with demo data",
          width: 1280,
          height: 720,
        },
      },
      {
        title: "Store / Mizan",
        description:
          "The store owner's home screen in training mode.",
        image: {
          src: "/workshop/store.webp",
          alt: "Store / Mizan owner home screen in training mode",
          width: 1280,
          height: 543,
        },
      },
      {
        title: "Teachers / Hessa",
        description:
          "Reports for teachers, shown with training data.",
        image: {
          src: "/workshop/teachers.webp",
          alt: "Teachers / Hessa reports screen showing training data",
          width: 1280,
          height: 800,
        },
      },
      {
        title: "AI Academy course",
        description:
          "An illustrated page from the AI Academy course book explaining in Arabic how AI helps at work.",
        image: {
          src: "/workshop/academy.webp",
          alt: "Illustrated AI Academy course book page in Arabic explaining how AI helps at work",
          width: 820,
          height: 1159,
        },
      },
    ],
  },

  // Real systems from public GitHub repos. Evidence = what exists in the code
  // (approximate test counts, measured performance), never client results.
  // Source: Search-Jobs/profile/PROFILE.md (safe evidence list).
  work: {
    id: "work",
    title: "Systems I've built",
    intro:
      "I teach what I ship. Each of these is a working system with its code public on GitHub; the line under each one is evidence you can check in the repo.",
    githubLabel: "All repositories on GitHub",
    githubHref: "https://github.com/coolman1984",
    codeLabel: "Code",
    liveLabel: "Live demo",
    items: [
      {
        title: "AI Academy",
        category: "Training",
        status: "Live",
        summary:
          "An interactive Arabic/English course on AI at work, in a single HTML file that runs offline with no server, linked to its reference book.",
        evidence: "Published online — open it now",
        tech: ["HTML", "JavaScript"],
        repoHref: "https://github.com/coolman1984/Course",
        liveHref: "https://coolman1984.github.io/Course/",
      },
      {
        title: "Multi-company delivery platform",
        category: "Business systems",
        status: "Pilot",
        summary:
          "Order, rider and cash-collection platform for local delivery companies, with a screen for every role and fully isolated data per company.",
        evidence: "~107 automated tests",
        tech: ["TypeScript", "React", "PostgreSQL", "PWA"],
        repoHref: "https://github.com/coolman1984/Delivery-Manager",
      },
      {
        title: "Hessa — tutoring-centre system",
        category: "Business systems",
        status: "In build",
        summary:
          "Front desk in under three clicks, receipts that are never deleted, early warning for students about to leave, and a read-only link for parents. Works offline across several PCs.",
        evidence: "~180 automated tests",
        tech: ["Python", "Offline sync", "AR/EN"],
        repoHref: "https://github.com/coolman1984/Teachers",
      },
      {
        title: "xl2ai — Excel to AI-ready data",
        category: "Excel & data",
        status: "Live",
        summary:
          "Turns large Excel files into a verified SQLite database with catalog, quality checks, KPIs and safe query tools, so AI never has to read the raw workbook.",
        evidence: "~298 tests · 1M rows (57 MB) in ~55 s with full verification",
        tech: ["Python", "SQLite", "MCP"],
        repoHref: "https://github.com/coolman1984/Office-Automation",
      },
      {
        title: "Universal Excel automation engine",
        category: "Excel & data",
        status: "Live",
        summary:
          "One engine an AI agent adapts per department. Staff receive a ZIP: extract, double-click START, use the dashboard. No Python visible to the user.",
        evidence: "~820 automated tests across two engine versions",
        tech: ["Python", "Excel", "Agents"],
        repoHref: "https://github.com/coolman1984/Perfect-Project-Template",
      },
      {
        title: "wad — Windows agent desktop",
        category: "AI agents",
        status: "Live",
        summary:
          "Lets AI agents operate Windows apps through the accessibility tree instead of pixels, with a stable reference for every element and proof that each action worked.",
        evidence: "~84 automated tests",
        tech: ["Python", "UI Automation", "OCR"],
        repoHref: "https://github.com/coolman1984/win-agent-desktop",
      },
      {
        title: "WinSight",
        category: "AI agents",
        status: "Live",
        summary:
          "A ~5 MB executable with 34 tools that find and fix what makes Windows slow or broken. Every fix is reversible, and an MCP server hands agents a ready brief.",
        evidence: "34 tools in one file, no install",
        tech: ["Go", "MCP", "CLI"],
        repoHref: "https://github.com/coolman1984/Performance",
      },
      {
        title: "Personal AI investment office",
        category: "AI agents",
        status: "In build",
        summary:
          "Local system for the Egyptian Exchange: software calculates facts, AI agents research and challenge each other, the human decides.",
        evidence: "~155 automated tests",
        tech: ["Python", "SQLite", "Claude Code", "Codex"],
        repoHref: "https://github.com/coolman1984/Economic",
      },
      {
        title: "Business systems factory",
        category: "Business systems",
        status: "Pilot",
        summary:
          "One core plus a recipe per business type: a generator builds a complete company system from one profile file and keeps it upgradeable.",
        evidence: "~170 tests · two working recipes (retail, service centre)",
        tech: ["React", "Fastify", "PostgreSQL"],
        repoHref: "https://github.com/coolman1984/Business-Template",
      },
      {
        title: "Space planner (2D/3D)",
        category: "Business systems",
        status: "Live",
        summary:
          "Plan any hall, line or warehouse in 2D and 3D and check that everything fits before spending on the build-out. One-click start, portable for locked networks.",
        evidence: "~441 automated tests",
        tech: ["Node.js", "3D", "SQLite"],
        repoHref: "https://github.com/coolman1984/3D-Modeling",
      },
      {
        title: "Rondi — ceramics factory system",
        category: "Business systems",
        status: "In build",
        summary:
          "One Arabic system linking production, quality, sorting, warehouses, maintenance, energy, sales and costing, planned in eight phases.",
        evidence: "Phase 1 done · ~94 tests",
        tech: ["Next.js", "React", "TypeScript"],
        repoHref: "https://github.com/coolman1984/Seramic-Rondi",
      },
      {
        title: "Code-driven film studio",
        category: "Video",
        status: "Live",
        summary:
          "Short motion-graphics ads generated from code: camera, motion, Arabic typography, original music, and automated loudness and safe-area checks.",
        evidence: "Finished films in Reels and 16:9 · ~125 tests",
        tech: ["Node.js", "FFmpeg"],
        repoHref: "https://github.com/coolman1984/Animation",
      },
    ],
  },

  // What Mohamed offers beyond the workshop. No prices on the page.
  // Source: Search-Jobs/profile/SERVICES.md
  services: {
    id: "services",
    title: "Other ways to work together",
    intro:
      "Beyond the workshop, I train teams and build the tool myself, then hand it over working. Send me the task your team repeats every week; I reply with a short plan and a fixed price.",
    cta: { label: "Describe your task", href: "#contact" },
    items: [
      {
        title: "Team AI training",
        description:
          "Half-day, full-day or an 8-session program. Every participant leaves with a working automation for a task from their own job.",
        duration: "Half a day to 8 weeks",
      },
      {
        title: "Excel & report automation",
        description:
          "A one-click tool that reads your files, reconciles the totals and produces the report, with a run log and a guide. No Python install needed.",
        duration: "3 days to 2 weeks per workflow",
      },
      {
        title: "Business systems",
        description:
          "Bilingual systems for clinics, tutoring centres, delivery and service companies: a screen per role, mobile links without an app, daily reports.",
        duration: "First working version in 2–3 weeks",
      },
      {
        title: "AI agents & workflow automation",
        description:
          "A working agent or workflow (n8n, Python or MCP) with a human-approval gate before anything sensitive and a full log of every step.",
        duration: "1 to 4 weeks",
      },
      {
        title: "Finance & operations dashboards",
        description:
          "Agreed KPIs, one source of truth, automatic refresh, and a plain explanation of how every number is calculated.",
        duration: "1 to 3 weeks",
      },
      {
        title: "Motion-graphics ads in code",
        description:
          "15–60 second videos for Reels or 16:9 with original music, correct Arabic typography, a cover image and two revision rounds.",
        duration: "3 to 7 days per video",
      },
    ],
  },

  faq: {
    id: "faq",
    title: "FAQ",
    items: [
      {
        question: "Do we need developers in the room?",
        answer:
          "Managers are the primary audience. We use guided templates; technical teammates are welcome but not required for the core exercises.",
      },
      {
        question: "Which AI tools are used?",
        answer:
          "We focus on free or low-cost models and utilities you can pilot quickly. Exact stack is tailored to your IT policies during the session.",
      },
      {
        question: "Can this run on site in KSA or Egypt?",
        answer:
          "Yes—one day, in person at your office or a venue you provide. Remote delivery is not the default for this workshop.",
      },
      {
        question: "How does this relate to SAP data?",
        answer:
          "Mohamed's day job involves Python + SQL pipelines on SAP data. We use representative samples so you can map the pattern to your landscape.",
      },
      {
        question: "What should we prepare?",
        answer:
          "Bring one recurring report or analysis that eats team time. We will attach agents and automation to that example.",
      },
      {
        question: "How do we get pricing?",
        answer:
          "Use the contact section below. Mohamed shares scope and fees after a short fit call—nothing is listed on this page.",
      },
    ],
  },

  contact: {
    id: "contact",
    title: "Start a conversation",
    body:
      "Tell us about your team, location, and the reporting or ops workflow you want to accelerate. We will follow up with format options and scheduling.",
    email: publicContact.email,
    emailHref: publicContact.mailto,
    linkedIn: { label: publicContact.linkedinLabel, href: publicContact.linkedin },
    primaryCta: { label: "Email Mohamed", href: publicContact.mailto },
  },

  footer: {
    note: "AI Executive Workshop · Mohamed Fawzy · Cairo",
    links: [
      { label: "Courses site", href: "/courses" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;

export type WorkshopContent = typeof workshop;
