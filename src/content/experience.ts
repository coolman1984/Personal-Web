/**
 * صفحة /experience — مسار التوظيف، منفصل عن صفحات الخدمات.
 * المرجع: Master Profile v3 §5.4. الحقائق من profile/cv/CV_automation_job.en.md في مستودع Search-Jobs.
 * الاتجاهات الوظيفية بتتعرض كاتجاهات مش كاستحقاقات. نسخ الـCV التلاتة لسه [SUPPLY]،
 * فزرار كل اتجاه بيفتح إيميل طلب بدل ملف.
 */
import { publicContact } from "@/lib/public-contact";
import { recruiterMailto } from "./intake";

/** إيميل طلب CV بعنوان الاتجاه الوظيفي */
function cvMailto(direction: string): string {
  return `${publicContact.mailto}?subject=${encodeURIComponent(`CV request: ${direction}`)}`;
}

export const experiencePage = {
  hero: {
    eyebrow: "For hiring managers and recruiters",
    title: "AI and automation transformation, led from inside manufacturing",
    intro:
      "Fourteen years in finance and operations at a multinational manufacturing plant, now leading AI automation and transformation, and building the software myself. This page covers experience and availability; services for companies are on a separate page.",
    primaryCta: { label: "Request my CV", href: recruiterMailto },
    secondaryCta: { label: "LinkedIn profile", href: publicContact.linkedin },
  },

  facts: [
    { label: "Experience", value: "14+ years, multinational manufacturing" },
    { label: "Current role", value: "AI Workforce Transformation Manager" },
    { label: "Based in", value: "Cairo, Egypt" },
    { label: "Open to", value: "Egypt, KSA/GCC and remote" }, // 👈 غيّر ده — أكّد المواقع
  ],
  factsLabel: "Key facts",

  directions: {
    eyebrow: "Role directions",
    title: "Where I can contribute",
    intro:
      "Three directions that fit what I have done. They describe where my experience points, not titles I expect by default.",
    ctaLabel: "Request this CV",
    items: [
      {
        title: "AI & Automation Transformation Leadership",
        body: "Leading AI adoption across finance, operations and supply chain: choosing what to automate, governing it, measuring it and training the people who run it.",
        cvHref: cvMailto("AI & Automation Transformation Leadership"),
      },
      {
        title: "Process Improvement & Analytics",
        body: "Mapping recurring reports and hand-offs, rebuilding them as verified pipelines on SAP and Excel data, and turning the output into decisions.",
        cvHref: cvMailto("Process Improvement & Analytics"),
      },
      {
        title: "AI Enablement",
        body: "Role-based AI training on people's own work, built from an eleven-course curriculum and university lecturing.",
        cvHref: cvMailto("AI Enablement"),
      },
    ],
  },

  history: {
    eyebrow: "Experience",
    title: "One employer, two roles",
    // قرار صاحب الموقع (2026-10-23): من غير اسم الشركة في أي مكان
    employer: "A global electronics manufacturer, Egypt",
    employerPeriod: "Dec 2012 – present",
    roles: [
      {
        title: "AI Workforce Transformation Manager",
        period: "Jan 2026 – present",
        points: [
          "Lead AI automation and transformation initiatives that turn manufacturing, finance, supply-chain and SAP processes into reliable, governed and measurable solutions.",
          "Drive AI adoption: workflow redesign, AI-enabled reporting and decision support, governance and validation, employee enablement and business cases.",
        ],
      },
      {
        title: "Finance Business Partner, Operations & Supply Chain · Finance Controlling Assistant Manager (Team Leader)",
        period: "Dec 2012 – present",
        points: [
          "Finance controlling, cost control and FP&A for manufacturing operations and supply chain.",
          "Daily work in SAP FI, business-case development and value measurement.",
        ],
      },
    ],
    // 👈 غيّر ده — §5.4: المسؤوليات بالحجم الحقيقي (فريق، ميزانية، نطاق) لما تبعتها
  },

  skills: {
    eyebrow: "Skills",
    title: "Finance judgement and hands-on build",
    groups: [
      {
        title: "Finance & operations",
        items: ["FP&A", "Cost control", "Finance business partnering", "SAP FI", "Business cases and value measurement"],
      },
      {
        title: "Automation",
        items: ["Excel and Office automation", "Browser automation", "Windows desktop automation", "Scheduled jobs with verification"],
      },
      {
        title: "AI agents",
        items: ["Human-in-the-loop approval", "MCP servers", "Tool design", "Evidence-first outputs"],
      },
      {
        title: "Data",
        items: ["Python", "SQL and SQLite", "Excel to verified pipelines", "Reconciliation of totals", "KPIs and dashboards"],
      },
      {
        title: "Business systems",
        items: ["TypeScript", "Offline-first apps", "Role-based permissions", "Arabic and English interfaces"],
      },
      {
        title: "Enablement",
        items: ["AI trainer and lecturer", "Eleven-course AI curriculum", "Arabic and English delivery"],
      },
    ],
  },

  projects: {
    eyebrow: "Public work",
    title: "Built and tested in the open",
    intro: "A selection of the systems on GitHub. Every line below can be checked in the repository.",
    allLabel: "All twelve systems",
    allHref: "/#work",
    codeLabel: "Code",
    count: 6,
  },

  cases: {
    eyebrow: "Cases",
    title: "Documented with the proof chain",
    body: "Three workplace cases are being written up with a baseline, my role, a measured result and its limits. They appear only once the evidence is ready and publication is approved.",
    linkLabel: "See how cases are documented",
    href: "/cases",
  },

  background: {
    eyebrow: "Background",
    items: [
      { label: "Education", value: "Cairo University" },
      { label: "Languages", value: "Arabic (native), English (professional working proficiency)" },
      { label: "Teaching", value: "AI lecturer at Cairo University; author of an AI academy on three levels" },
    ],
  },

  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Talk about a role",
    body: "Send the role, the company and the location. I reply with the CV variant that fits and my availability.",
    checklistTitle: "Helpful to include",
    checklist: ["Role title and level", "Company and sector", "Location and work model", "Who the role reports to", "Timeline"],
    primaryCta: { label: "Request my CV", href: recruiterMailto },
    secondaryCta: { label: "Services for companies", href: "/#offers" },
    email: publicContact.email,
    emailHref: publicContact.mailto,
    linkedIn: { label: publicContact.linkedinLabel, href: publicContact.linkedin },
  },
};

export type ExperiencePageContent = typeof experiencePage;
