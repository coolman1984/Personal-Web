/**
 * Workshop landing page copy — edit here, not in components.
 * Facts only; no invented clients, numbers, or prices.
 */

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
      { label: "Format", href: "#format" },
      { label: "About", href: "#about" },
      { label: "Proof", href: "#proof" },
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
    email: "mflma2030@gmail.com",
    emailHref: "mailto:mflma2030@gmail.com",
    linkedIn: { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamedfawzy1984/" },
    primaryCta: { label: "Email Mohamed", href: "mailto:mflma2030@gmail.com" },
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
