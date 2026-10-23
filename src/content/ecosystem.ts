/**
 * صفحة /ecosystem — «المنظومة»: كل الأنظمة اللي بنيتها على طريق واحد، من التعلّم للتشغيل للعرض.
 * القاعدة: المكان اسمه «مصنع عالمي»، من غير اسم الشركة. كل البيانات المعروضة تجريبية أو محاكاة.
 * الروابط اللي مش منشورة لسه بتقول «Walk-through on request» لحد ما يبقى ليها رابط عام.
 */
import { publicContact } from "@/lib/public-contact";
import { digitalFactory } from "./digital-factory";

const walkthroughMailto = `${publicContact.mailto}?subject=${encodeURIComponent(
  "Walk-through: the AI transformation ecosystem",
)}`;

export type EcosystemStatus = "Live" | "Desktop app" | "On request";

export interface EcosystemSystem {
  id: string;
  layer: string;
  name: string;
  status: EcosystemStatus;
  oneLine: string;
  body: string;
  inside: readonly string[];
  link: { label: string; href: string };
}

export const ecosystem = {
  hero: {
    eyebrow: "The ecosystem",
    badge: "Simulated and demo data",
    title: "One connected path from learning AI to running a plant on it",
    intro:
      "Built while leading AI transformation inside a global manufacturer: a plant twin with its SAP, GMES and department layers, an academy for every team, a planner for the floor, an AI agent team, a film and web studio, and live demos. Each piece works on its own; together they take a company from first prompt to an automated operation.",
    primaryCta: { label: "Book a walk-through", href: walkthroughMailto },
    secondaryCta: { label: "Open the live plant", href: digitalFactory.href },
  },

  factsLabel: "The ecosystem in numbers",
  facts: [
    { label: "Connected systems", value: "6" },
    { label: "Main lines in the plant twin", value: "6" },
    { label: "AI agents running the plant", value: "9" },
    { label: "Languages, side by side", value: "2" },
  ],

  path: {
    eyebrow: "How it fits together",
    title: "Learn, plan, automate, run, show",
    intro:
      "Most AI programmes stall between a training day and a working system. Here every step has a working tool, and each one hands over to the next.",
    steps: [
      { step: "Learn", detail: "Every department learns AI on its own work, in Arabic and English.", system: "Academy", target: "academy" },
      { step: "Plan", detail: "Lay out the floor, the store or the hall with real measures before spending money.", system: "Space Planner", target: "space-planner" },
      { step: "Automate", detail: "Rebuild the recurring reports and workflows as checked pipelines.", system: "Report rebuild", target: "report-rebuild" },
      { step: "Run", detail: "Operate the plant with SAP, GMES and nine AI agents that simulate before they recommend.", system: "Digital Factory", target: "digital-factory" },
      { step: "Build", detail: "A team of AI agents, led by one, builds and maintains every system.", system: "AI agent team", target: "agent-team" },
      { step: "Show", detail: "Films, sites and presentations that explain the change to people and customers.", system: "Studio", target: "studio" },
    ],
  },

  systems: {
    eyebrow: "The systems",
    title: "Six systems you can open, not slides about them",
    insideLabel: "Inside",
    items: [
      {
        id: "digital-factory",
        layer: "Run",
        name: "Digital Factory",
        status: "Live",
        oneLine: "A live twin of a whole TV plant, with SAP, GMES and nine AI agents.",
        body: "Six main assembly lines and every line feeding them, in 3D and on command-room boards. The agents simulate each option on a model of the plant before they recommend one, and a person approves. Every change is audited and can be replayed.",
        inside: [
          "Command room",
          "SAP and data flow",
          "GMES boards",
          "S&OP and MRP",
          "Quality, maintenance, energy",
          "Skills matrix",
          "9 AI agents",
          "Customer show",
        ],
        link: { label: "Open the live plant", href: digitalFactory.href },
      },
      {
        id: "academy",
        layer: "Learn",
        name: "AI Academy",
        status: "Live",
        oneLine: "AI at work for people with no programming background.",
        body: "A full course in Arabic and English that runs offline from one file: story decks, hands-on labs, a quiz and Excel projects from a factory's production and purchasing files, one per lesson.",
        inside: ["8 units", "Story decks", "Excel projects", "Prompt library", "Presenter mode", "Works offline"],
        link: { label: "Open the academy", href: "https://coolman1984.github.io/Course/" },
      },
      {
        id: "space-planner",
        layer: "Plan",
        name: "Space Planner",
        status: "Desktop app",
        oneLine: "Know whether it fits and works before you spend money.",
        body: "Lay out a warehouse, a production line, an office or a hall with real dimensions. It checks aisles, exits and clearances, counts storage places and containers from a production plan, routes forklifts, and an AI agent can design the layout while you watch.",
        inside: ["Warehouse and racks", "Production line", "Containers from the plan", "Forklift routes", "Client report", "AI designer"],
        link: { label: "Book a walk-through", href: walkthroughMailto },
      },
      {
        id: "report-rebuild",
        layer: "Automate",
        name: "The 10-Minute Report Rebuild",
        status: "Live",
        oneLine: "A messy monthly report rebuilt as a checked pipeline.",
        body: "Four messy plant files become one report through seven checked steps in Python and SQL, with an AI reviewer and a human approver. It runs live in front of the team.",
        inside: ["Python and SQL", "Automatic checks", "AI review", "Human approval"],
        link: { label: "See the demo", href: "/demo" },
      },
      {
        id: "agent-team",
        layer: "Build",
        name: "AI agent team",
        status: "On request",
        oneLine: "One lead agent directing the others on one workstation.",
        body: "A working setup where a lead coding agent hands tasks to other AI agents from different providers, checks their work and keeps them running in the background. It is how every system on this page is built and kept up to date.",
        inside: ["Lead agent", "Several providers", "Task hand-off", "Review before merge"],
        link: { label: "Book a walk-through", href: walkthroughMailto },
      },
      {
        id: "studio",
        layer: "Show",
        name: "Film and web studio",
        status: "On request",
        oneLine: "Product films, explainers and websites, made in code.",
        body: "A studio where films and sites are written as code: Arabic captions, narration, licensed sound and a quality check before every delivery. It turns a transformation into something people understand and customers remember.",
        inside: ["Product films", "Explainer videos", "Websites", "Arabic captions", "Narration"],
        link: { label: "Book a walk-through", href: walkthroughMailto },
      },
    ] satisfies EcosystemSystem[],
  },

  departments: {
    eyebrow: "Every department",
    title: "One path for every team",
    intro: "Each department gets training on its own work and a working tool, not a general AI talk.",
    departmentLabel: "Department",
    learnLabel: "Learns",
    toolLabel: "Works with",
    rows: [
      { department: "Finance and FP&A", learn: "Report automation, checks before numbers go up", tool: "Report rebuild, SAP layer" },
      { department: "Manufacturing", learn: "Reading the line, losses and decisions", tool: "Digital Factory: GMES, OEE, agents" },
      { department: "Supply chain and logistics", learn: "Plans, materials orders, stock", tool: "S&OP and MRP, Space Planner" },
      { department: "Quality", learn: "Defects, root cause, 8D", tool: "Digital Factory: SPC, NCR and 8D" },
      { department: "Maintenance", learn: "Predicting failures before the line stops", tool: "Digital Factory: work orders, risk" },
      { department: "HR and training", learn: "Skills, training paths, AI at work", tool: "Academy, skills matrix" },
      { department: "Marketing and leadership", learn: "Explaining the change and its value", tool: "Studio, live plant show" },
    ],
  },

  honesty: {
    title: "What you are looking at",
    items: [
      "Everything shown runs on simulated or demo data. No employer or client data appears anywhere.",
      "The plant is fictional. It is modelled on how a large electronics plant works, not copied from one.",
      "Live means you can open it now. Desktop app and On request mean a guided walk-through.",
    ],
  },

  next: {
    title: "See it on your own operation",
    body: "A walk-through takes an hour: the live plant, one department's path, and where a first pilot would pay back for you.",
    primary: { label: "Book a walk-through", href: walkthroughMailto },
    secondary: { label: "See the services", href: "/#offers" },
  },
};

export type EcosystemContent = typeof ecosystem;
