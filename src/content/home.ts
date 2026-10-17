/**
 * Home page copy (English, LTR) — edit here, not in components.
 * المرجع: Master Profile v3 (/mnt/project-files/research/master-profile-v3.pdf) §3–§7.
 * Facts only: no invented clients, numbers, or prices. Anything still missing from
 * the owner is marked // 👈 غيّر ده and shown as an honest placeholder.
 */
import { publicContact } from "@/lib/public-contact";
import { companyMailto, recruiterMailto } from "./intake";

export const home = {
  owner: {
    name: "Mohamed Fawzy",
    location: "Cairo, Egypt",
  },

  nav: {
    links: [
      { label: "Problems", href: "#problems" },
      { label: "Cases", href: "#cases" },
      { label: "Services", href: "#offers" },
      { label: "Method", href: "#method" },
      { label: "Experience", href: "#experience" },
      { label: "Workshop", href: "/workshop" },
      { label: "Academy", href: "/courses" },
    ],
    cta: { label: "Discuss your challenge", href: "#contact" },
  },

  hero: {
    brandTag: "Plant-to-P&L",
    eyebrow: "AI & process automation for manufacturers",
    headline: "From scattered files to",
    headlineHighlight: "clear decisions.",
    audience:
      "For manufacturers and operations-heavy companies in Saudi Arabia, the Gulf and Egypt.",
    subline:
      "Operations, finance and SAP experience from 14+ years inside multinational manufacturing: diagnosis, build, training and measured results.",
    primaryCta: { label: "Discuss your challenge", href: "#contact" },
    secondaryCta: { label: "See my experience", href: "#experience" },
    portrait: {
      src: "/workshop/portrait.webp",
      alt: "Mohamed Fawzy",
      width: 867,
      height: 1200,
    },
  },

  // شريط المؤهلات الكحلي — النسخة الآمنة من §3.3. رقم الـ70% متأجّل لحد ما يبقى له كارت دليل.
  credentials: {
    label: "Credentials",
    items: [
      {
        value: "14+ years",
        label: "Multinational manufacturing: finance business partnering, FP&A, operations",
      },
      { value: "SAP · Python · SQL", label: "The day-job stack" },
      { value: "Cairo University", label: "AI trainer & lecturer" },
      { value: "21.6K+", label: "LinkedIn followers" }, // 👈 غيّر ده — حدّث الرقم من لينكدإن
    ],
  },

  problems: {
    id: "problems",
    eyebrow: "Problems I solve",
    title: "Where the time goes",
    intro:
      "I start where your team loses hours: the recurring report, the spreadsheet hand-off, the number nobody trusts.",
    items: [
      {
        title: "Manual reports",
        description:
          "The same report is rebuilt by hand every week or month, copied out of SAP and stitched together in Excel.",
      },
      {
        title: "Scattered data",
        description:
          "Numbers live in many files and systems, and nobody fully trusts the total that reaches management.",
      },
      {
        title: "Slow follow-up",
        description:
          "Waste, variance and delays surface after the month closes, when it is too late to act on them.",
      },
      {
        title: "Hard to scale",
        description:
          "The process depends on one person, and AI pilots stay as experiments instead of becoming daily work.",
      },
    ],
  },

  // الحالات التلاتة من §1.1 — لحد ما الأدلة توصل، بنعرض المشكلة بس ومكتوب إن الكتابة الكاملة جاية.
  cases: {
    id: "cases",
    eyebrow: "Cases",
    title: "Measured the audit-ready way",
    intro:
      "Every case on this site follows one proof chain, with a visible note on how it was measured. Full write-ups are being prepared; results appear only once they are measured and approved for publication.",
    chainLabel: "Proof chain",
    chain: [
      "Problem",
      "Baseline",
      "My role",
      "What changed",
      "Measured result",
      "Limits of the result",
      "Evidence",
    ],
    statusLabel: "Write-up in preparation",
    items: [
      // 👈 غيّر ده — ضيف الأدلة والأرقام لكل حالة لما تبقى جاهزة وموافق على نشرها
      {
        title: "Consolidating factory-system reports",
        problem:
          "Reports pulled from several plant systems were combined by hand before every review.",
      },
      {
        title: "Waste and scrap tracking dashboard",
        problem:
          "Scrap and waste were visible only after month-end, too late to correct the line.",
      },
      {
        title: "Automating a recurring financial report",
        problem:
          "A recurring finance report took hours of copy-paste and manual checks every cycle.",
      },
    ],
    rules: [
      "Gross time saved is shown separately from net time, after review and running effort.",
      "Hours are never converted to money or headcount unless the client measured it.",
      "Team results are credited to the team, with my role stated.",
    ],
  },

  work: {
    id: "work",
    eyebrow: "Open-source proof",
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


  offers: {
    id: "offers",
    eyebrow: "Services",
    title: "How companies work with me",
    intro:
      "Start small, measure, then decide. Each step ends with something you can use, and the next step is your choice.",
    forLabel: "For",
    receiveLabel: "You receive",
    formatLabel: "Format",
    priceLabel: "Price",
    items: [
      {
        step: "01",
        title: "Free 90-minute Scan",
        for: "Leaders who sense waste but don't know where to start.",
        receive:
          "A one-page list of your top three automation bets and a recommendation for the right next step.",
        format: "Call plus a short intake form",
        price: "Free",
        highlight: true,
      },
      {
        step: "02",
        title: "Agent Team Day",
        for: "Leadership teams.",
        receive:
          "An agent roster, prompt library, tooling shortlist, automation spine and a 90-day sketch.",
        format: "One day on site, KSA or Egypt",
        price: "Quoted after the scan", // 👈 غيّر ده — سعر «يبدأ من»
        href: "/workshop",
        hrefLabel: "See the workshop",
      },
      {
        step: "03",
        title: "Plant-to-P&L Diagnostic",
        for: "Teams ready to pay for clarity before building.",
        receive:
          "A short process map, problems and data, ranked opportunities, a value and cost estimate, and an initial 90-day plan.",
        format: "1–2 weeks, fixed price for an agreed scope",
        price: "Fixed price after the scan", // 👈 غيّر ده
        href: "/diagnostic",
        hrefLabel: "Details",
      },
      {
        step: "04",
        title: "One-Department Automation Pilot",
        for: "A department with one clear recurring report or flow.",
        receive:
          "One working solution with tests, a before/after measurement, a run guide, training and handover.",
        format: "3–6 weeks, defined deliverables",
        price: "Fixed price per scope", // 👈 غيّر ده
        href: "/pilot",
        hrefLabel: "Details",
      },
      {
        step: "05",
        title: "90-Day Transformation Program",
        for: "Organisations scaling a proven pilot.",
        receive:
          "Shared priorities, automations and analytics, training, access rights and monitoring, with a review and a stop gate.",
        format: "90 days, acceptance gates per phase",
        price: "Quoted per program", // 👈 غيّر ده
        href: "/program-90",
        hrefLabel: "Details",
      },
      {
        step: "06",
        title: "Fractional AI Transformation Lead",
        for: "Firms that need recurring senior guidance alongside an internal owner.",
        receive:
          "Leadership meetings, initiative reviews, unblocking, performance measurement and team coaching.",
        format: "Monthly: Advisor ~2 days/month · Lead ~1 day/week · Embedded ~2 days/week",
        price: "Agreed time, authority and scope", // 👈 غيّر ده
        href: "/fractional",
        hrefLabel: "Details",
      },
    ],
    extras: [
      {
        title: "Team Enablement",
        description:
          "Role-based AI training on your team's own work, with a before/after assessment. Sold separately from implementation.",
        href: "/courses",
        hrefLabel: "Visit the Academy",
      },
      {
        title: "Keynote & live demo",
        description:
          "\"From Scattered Files to Clear Decisions\": a 30–60 minute talk with a live report rebuild on demo data.",
        href: "#contact",
        hrefLabel: "Ask about a date",
      },
    ],
    startCta: { label: "Start with the free 90-minute scan", href: "#contact" },
  },

  method: {
    id: "method",
    eyebrow: "Method",
    title: "Scan, Build, Run, Decide",
    intro:
      "The 90-day program runs in four phases. It ends with a real choice: scale, improve, or stop. Offering to stop is part of the deal.",
    phases: [
      {
        days: "Days 1–15",
        title: "Scan",
        output:
          "Internal owner named, process mapped, baseline measured, data checked. Ranked opportunities and one pilot chosen with a written success criterion.",
      },
      {
        days: "Days 16–45",
        title: "Build",
        output:
          "Pilot built and tested, failure cases and a review owner defined, running and maintenance time logged.",
      },
      {
        days: "Days 46–75",
        title: "Run",
        output:
          "Monitored live use, named users trained, documentation handed over, reliable indicators in place.",
      },
      {
        days: "Days 76–90",
        title: "Decide",
        output:
          "Net impact after running cost and a reliability review, then a decision to scale, improve or stop, with a management report.",
      },
    ],
    principlesTitle: "How I handle your data and your team",
    principles: [
      "Access only to the data the agreed scope needs; workshops and demos use demo data.",
      "Your team is trained to run what we build, and every phase ends with a handover.",
      "No tool is chosen before the data, the steps and the decision are mapped.",
      "Success is defined in writing before the build starts.",
    ],
  },

  experience: {
    id: "experience",
    eyebrow: "Experience",
    title: "Operations, finance and hands-on build, in one person",
    intro:
      "For hiring managers and recruiters: the short version of what I have done and the roles I am open to discussing.",
    items: [
      {
        label: "Now",
        title: "AI automation & business transformation",
        description:
          "Leading AI automation and business transformation initiatives within Samsung Electronics Egypt, building Python + SQL pipelines on SAP data and AI-agent workflows.",
      },
      {
        label: "14+ years",
        title: "Multinational manufacturing finance & operations",
        description:
          "Finance business partnering, FP&A, cost control and operations, working daily with SAP.",
      },
      {
        label: "Teaching",
        title: "AI trainer & lecturer",
        description:
          "Cairo University lecturer and author of an AI academy with courses on three levels, in Arabic and English.",
      },
      {
        label: "Building",
        title: "12 public systems",
        description:
          "Business systems, Excel automation engines and AI agents, with code and automated tests public on GitHub.",
      },
    ],
    rolesTitle: "Role directions",
    roles: [
      "AI & Automation Transformation Leadership",
      "Process Improvement & Analytics",
      "AI Enablement",
    ],
    availability: "Based in Cairo. Open to Egypt and KSA/GCC.", // 👈 غيّر ده — أكّد المواقع
    cta: { label: "Request my CV", href: recruiterMailto },
  },

  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Start with one recurring report",
    body:
      "Tell me which report or workflow eats your team's time. The email below opens with the few questions I ask before a free 90-minute scan.",
    checklistTitle: "What I'll ask",
    checklist: [
      "Sector and department",
      "The problem and how often it happens",
      "Time it takes today",
      "Systems involved",
      "Who owns the decision",
      "Data-access limits",
    ],
    primaryCta: { label: "Email your challenge", href: companyMailto },
    secondaryCta: { label: "Hiring? Request my CV", href: recruiterMailto },
    email: publicContact.email,
    emailHref: publicContact.mailto,
    linkedIn: { label: publicContact.linkedinLabel, href: publicContact.linkedin },
  },

  footer: {
    note: "Mohamed Fawzy · Plant-to-P&L · Cairo",
    links: [
      { label: "Workshop", href: "/workshop" },
      { label: "Academy", href: "/courses" },
      { label: "LinkedIn", href: publicContact.linkedin },
    ],
  },
} as const;

export type HomeContent = typeof home;
