/**
 * صفحة /ecosystem — «المنظومة»: كل الأنظمة اللي بنيتها على طريق واحد، من التعلّم للتشغيل للعرض.
 * القاعدة: المكان اسمه «مصنع عالمي»، من غير اسم الشركة. كل البيانات المعروضة تجريبية أو محاكاة.
 * الصور في public/ecosystem/ لقطات حقيقية من البرامج على شركاتها التجريبية (2026-10-23).
 * الأرقام: «515 أمر شغل» من عرض الشركة الكاملة لتلات شهور (complete-company/README.md).
 * الأنظمة اللي مالهاش رابط عام بتقول «Ask for a demo by email» (بيفتح الإيميل) لحد ما يبقى ليها رابط.
 */
import { publicContact } from "@/lib/public-contact";
import { digitalFactory } from "./digital-factory";

const walkthroughMailto = `${publicContact.mailto}?subject=${encodeURIComponent(
  "Walk-through: the AI transformation ecosystem",
)}`;

const walkthrough = { label: "Ask for a demo by email", href: walkthroughMailto };

export type EcosystemStatus = "Live" | "Installable" | "On request";

export interface EcosystemSystem {
  id: string;
  layer: string;
  name: string;
  status: EcosystemStatus;
  oneLine: string;
  body: string;
  inside: readonly string[];
  link: { label: string; href: string };
  image?: { src: string; alt: string; width: number; height: number };
  /** لقطة تانية للبرامج اللي فيها 3D جنب الـ2D */
  view3d?: { src: string; alt: string; width: number; height: number };
}

export interface EcosystemShot {
  label: string;
  /** لو موجود، الصورة بتفتح الصفحة دي */
  href?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ecosystem = {
  hero: {
    eyebrow: "The ecosystem",
    badge: "Simulated and demo data",
    title: "One connected path from learning AI to running a company on it",
    intro:
      "Built while leading AI transformation inside a global manufacturer: a live twin of a whole plant with nine AI agents, a company suite for accounts, production and people, an academy for every team, a planner for the floor, an AI agent team, and a film and web studio. Each piece works on its own; together they take a company from first prompt to an automated operation.",
    primaryCta: walkthrough,
    secondaryCta: { label: "Open the 3D plant", href: digitalFactory.href },
  },

  factsLabel: "The ecosystem in numbers",
  facts: [
    { label: "Connected systems", value: "9" },
    { label: "Apps that run as one company", value: "4" },
    { label: "Work orders in the 3-month demo", value: "515" },
    { label: "Languages, side by side", value: "2" },
  ],

  flagship: {
    id: "digital-factory",
    eyebrow: "The flagship",
    badge: "Live · simulated plant",
    title: "Digital Factory: a whole TV plant, live, in 3D and on the boards",
    intro:
      "The largest thing I have built. One model of a whole plant runs every second: six main assembly lines and every line that feeds them, the stores, the vehicles and the people. Managers see it in 3D or on command-room boards; nine AI agents simulate each option on the plant before they recommend one, and a person approves.",
    points: [
      { title: "See the whole plant", body: "Walk it, fly through it, or present it shot by shot to a customer." },
      { title: "Decide before the line stops", body: "Agents rank each option by its value in money and show what they simulated." },
      { title: "One truth from floor to office", body: "SAP and GMES layers, S&OP, MRP, quality, maintenance and energy on the same model." },
      { title: "Nothing changes silently", body: "Every decision is audited and the time machine replays any moment." },
    ],
    hero: {
      label: "3D · the whole plant",
      href: digitalFactory.href,
      src: "/ecosystem/df-3d-plant.webp",
      alt: "Digital Factory in 3D: the whole plant from above, six main assembly lines with their feeding lines, stores and offices, in presentation mode",
      width: 1600,
      height: 670,
    } satisfies EcosystemShot,
    pair: [
      {
        label: "2D · the command room",
        href: digitalFactory.commandRoomHref,
        src: "/ecosystem/df-2d-command-room.webp",
        alt: "Digital Factory command room: plant OEE, units packed, chance to hit plan, first-pass yield, alarms and the live plant mimic of all lines",
        width: 1280,
        height: 720,
      },
      {
        label: "3D and 2D together · a decision waiting",
        href: digitalFactory.href,
        src: "/ecosystem/digital-factory.webp",
        alt: "Digital Factory live plant: stoppages marked on the 3D floor, shift figures across the top and an AI agent's recommended decision on the side",
        width: 1280,
        height: 720,
      },
    ] satisfies EcosystemShot[],
    closeups: [
      {
        label: "3D · SMD and main boards",
        href: digitalFactory.href,
        src: "/ecosystem/df-3d-smd.webp",
        alt: "Digital Factory 3D close-up: the SMD hall with printers, mounters and operators at the lines",
        width: 1280,
        height: 536,
      },
      {
        label: "3D · robot cells",
        href: digitalFactory.href,
        src: "/ecosystem/df-3d-robots.webp",
        alt: "Digital Factory 3D close-up: a six-axis robot behind welded-mesh guarding with its station screen",
        width: 1280,
        height: 536,
      },
    ] satisfies EcosystemShot[],
    primary: { label: "Open the 3D plant", href: digitalFactory.href },
    secondary: { label: "Open the command room", href: digitalFactory.commandRoomHref },
  },

  path: {
    eyebrow: "How it fits together",
    title: "Learn, plan, automate, operate, run, build, show",
    intro:
      "Most AI programmes stall between a training day and a working system. Here every step has a working tool, and each one hands over to the next.",
    steps: [
      { step: "Learn", detail: "Every department learns AI on its own work, in Arabic and English.", system: "AI Academy", target: "academy" },
      { step: "Plan", detail: "Lay out the line, the store or the hall with real measures before spending money.", system: "Space Planner", target: "space-planner" },
      { step: "Automate", detail: "Rebuild the recurring reports and workflows as checked pipelines.", system: "Report rebuild", target: "report-rebuild" },
      { step: "Operate", detail: "Run the company: accounts, purchasing, stock, production, quality and people.", system: "Company suite", target: "suite" },
      { step: "Run", detail: "See the whole plant live; AI agents simulate each option before they recommend one.", system: "Digital Factory", target: "digital-factory" },
      { step: "Build", detail: "A team of AI agents, led by one, builds and maintains every system.", system: "AI agent team", target: "agent-team" },
      { step: "Show", detail: "Films, sites and presentations that explain the change to people and customers.", system: "Studio", target: "studio" },
    ],
  },

  suite: {
    id: "suite",
    eyebrow: "The company suite",
    title: "Four applications that run a factory, alone or together",
    intro:
      "Accounting, manufacturing execution, people and space planning. Each one owns its own data and runs on the factory's own network, without the internet. Connected, they pass every fact to the one that owns it, so one sales order flows all the way to cash and payroll.",
    chainLabel: "One order, end to end, in the connected demo",
    chain: [
      "Sales and operations plan",
      "Sales order",
      "Planning",
      "Purchasing",
      "Receiving and inspection",
      "Production",
      "Packing and dispatch",
      "Invoice and payment",
      "Staffing gap to HR",
    ],
    insideLabel: "Inside",
    planLabel: "2D · a production line",
    view3dLabel: "3D · a container load",
    items: [
      {
        id: "mizan",
        layer: "Accounts and supply",
        name: "Mizan",
        status: "Installable",
        oneLine: "Double-entry accounting with purchasing, stock, costing and planning.",
        body: "The company's books and its supply side in one place: general ledger and statements, sales and purchasing, warehouses and stock value, production orders with their real cost, fixed assets, cheques, budgets and a monthly sales and operations plan. Payroll totals arrive from HR and are booked here.",
        inside: ["General ledger", "Sales and purchasing", "Stock and costing", "Production cost", "S&OP", "Fixed assets", "Arabic and English"],
        link: walkthrough,
        image: {
          src: "/ecosystem/mizan.webp",
          alt: "Mizan dashboard for a demo electronics factory: cash, receivables, payables, profit and a twelve-month revenue and expense chart",
          width: 1280,
          height: 613,
        },
      },
      {
        id: "itqan",
        layer: "Manufacturing execution",
        name: "Itqan",
        status: "Installable",
        oneLine: "The factory floor as it happens: work orders, quality, OEE and shipping.",
        body: "Every movement on the floor is a fact in a ledger that is never rewritten: a part entering a station, leaving it, scrap, a hold, a release. Office screens, an operator station and a line board for the big screen show the same truth, and finished goods reach accounting on their own.",
        inside: ["Work orders", "Operator station", "Line boards", "Quality and holds", "OEE", "Traceability", "Packing and shipping"],
        link: walkthrough,
        image: {
          src: "/ecosystem/itqan.webp",
          alt: "Itqan plant overview: good output, OEE, scrap rate, lines running and the status of nine production lines with their work orders",
          width: 1280,
          height: 666,
        },
      },
      {
        id: "hr-system",
        layer: "People",
        name: "HR-System",
        status: "Installable",
        oneLine: "The one source of truth for people, from hiring to pay.",
        body: "Employees and the organisation, shifts and schedules, attendance, leave, overtime, training that qualifies, recruitment and payroll with four-eyes approval. Manufacturing tells HR the crew it needs; only pay totals leave HR for the books. Installs on Windows in one file.",
        inside: ["Employees and structure", "Shifts and attendance", "Leave and overtime", "Training and skills", "Payroll", "Audit and backups"],
        link: walkthrough,
        image: {
          src: "/ecosystem/hr.webp",
          alt: "HR-System home for a demo company: employees, people on leave, departments, positions filled and people by department",
          width: 1280,
          height: 560,
        },
      },
      {
        id: "space-planner",
        layer: "Space",
        name: "Space Planner",
        status: "Installable",
        oneLine: "Know whether it fits and works before you spend money.",
        body: "Lay out a production line, a warehouse, an office or a hall with real dimensions. It measures flow length, checks aisles and exits, counts pallet places and containers from a production plan, routes forklifts, and an AI planner can design the layout while you watch.",
        inside: ["Production lines", "Warehouses and racks", "Containers from the plan", "Forklift routes", "Client report", "AI planner"],
        link: walkthrough,
        image: {
          src: "/ecosystem/planner.webp",
          alt: "Space Planner plan of a final assembly hall: two mirrored lines of 36 stations with their material flow, flow length and a passed review",
          width: 1280,
          height: 775,
        },
        view3d: {
          src: "/ecosystem/planner-3d.webp",
          alt: "Space Planner 3D view of a 40-foot container loaded with TV and soundbar cartons, with volume, payload and floor use",
          width: 1280,
          height: 775,
        },
      },
    ] satisfies EcosystemSystem[],
  },

  systems: {
    eyebrow: "Teach, automate, build and show",
    title: "Four more systems you can open, not slides about them",
    insideLabel: "Inside",
    items: [
      {
        id: "academy",
        layer: "Learn",
        name: "AI Academy",
        status: "Live",
        oneLine: "AI at work for people with no programming background.",
        body: "A full course in Arabic and English that runs offline from one file: story decks, hands-on labs, a quiz and Excel projects from a factory's production and purchasing files, one per lesson.",
        inside: ["8 units", "Story decks", "Excel projects", "Prompt library", "Presenter mode", "Works offline"],
        link: { label: "Open the academy", href: "https://coolman1984.github.io/Course/" },
        image: {
          src: "/ecosystem/academy.webp",
          alt: "AI Academy home page in Arabic with the course units, a lesson list and an Excel automation example",
          width: 1280,
          height: 800,
        },
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
        link: walkthrough,
      },
      {
        id: "studio",
        layer: "Show",
        name: "Film and web studio",
        status: "On request",
        oneLine: "Product films, explainers and websites, made in code.",
        body: "A studio where films and sites are written as code: Arabic captions, narration, licensed sound and a quality check before every delivery. It turns a transformation into something people understand and customers remember.",
        inside: ["Product films", "Explainer videos", "Websites", "Arabic captions", "Narration"],
        link: walkthrough,
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
      { department: "Finance and FP&A", learn: "Report automation, checks before numbers go up", tool: "Mizan, report rebuild" },
      { department: "Manufacturing", learn: "Reading the line, losses and decisions", tool: "Itqan, Digital Factory" },
      { department: "Supply chain and logistics", learn: "Plans, materials orders, stock", tool: "Mizan S&OP and purchasing, Space Planner" },
      { department: "Quality", learn: "Defects, holds, root cause", tool: "Itqan quality, Digital Factory" },
      { department: "Maintenance", learn: "Predicting failures before the line stops", tool: "Digital Factory" },
      { department: "HR and training", learn: "Shifts, skills, pay, AI at work", tool: "HR-System, AI Academy" },
      { department: "Marketing and leadership", learn: "Explaining the change and its value", tool: "Studio, live plant show" },
    ],
  },

  honesty: {
    title: "What you are looking at",
    items: [
      "Every screen shows simulated or demo data for invented companies. No employer or client data appears anywhere.",
      "The plants are fictional. They are modelled on how a large electronics plant works, not copied from one.",
      "Live means you can open it now. Installable means it runs on your own network; On request means a live demo, booked by email.",
    ],
  },

  next: {
    title: "See it on your own operation",
    body: "A walk-through takes an hour: the company suite, the live plant, one department's path, and where a first pilot would pay back for you.",
    primary: walkthrough,
    secondary: { label: "See the services", href: "/#offers" },
  },
};

export type EcosystemContent = typeof ecosystem;
