/**
 * Digital Factory — الإنجاز الرئيسي في أول الصفحة وفي قائمة الأنظمة.
 * ملف منفصل عن home.ts عشان ميتعارضش مع PR #13. الموقع الحي بس، من غير ريبو.
 */
export const digitalFactory = {
  id: "digital-factory",
  eyebrow: "Flagship system",
  title: "Digital Factory",
  tagline: "A live digital twin of a plant, with AI that acts before the line stops.",
  summary:
    "A running simulation of an electronics SMT line with live dashboards: OEE, units per shift and failure risk for every machine, updated every second. Six AI agents for maintenance, quality, logistics, energy, planning and safety turn alarm floods into one root cause and rank each action by its value in money.",
  highlights: [
    "Live command room",
    "Predictive maintenance",
    "AI agent crew",
    "Scenario lab & time machine",
  ],
  note: "Concept demonstration. All plant data is simulated.",
  ctaLabel: "Open Digital Factory",
  href: "https://digital-factory-1sm.pages.dev",
  image: {
    src: "/workshop/digital-factory.webp",
    alt: "Digital Factory live dashboard: an SMT line with six stations, line OEE, units this shift and a failure-risk alert on one machine",
    width: 1280,
    height: 800,
  },
  /** نفس شكل كروت «Systems I've built» */
  workItem: {
    title: "Digital Factory",
    category: "Manufacturing AI",
    status: "Live",
    summary:
      "A live digital twin of an electronics line: dashboards updated every second, predictive maintenance, alarm-flood root cause and six AI agents that rank decisions by value.",
    evidence: "Nine capabilities you can open now · all plant data simulated",
    tech: ["Digital twin", "AI agents", "Live dashboards"],
  },
} as const;
