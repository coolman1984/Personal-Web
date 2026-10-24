/**
 * Digital Factory — الإنجاز الرئيسي في أول الصفحة وفي قائمة الأنظمة.
 * ملف منفصل عن home.ts عشان ميتعارضش مع PR #13. الروابط على GitHub Pages (بيتنشر لوحده مع كل دمج في main)،
 * مش النسخة القديمة على pages.dev.
 */
export const digitalFactory = {
  id: "digital-factory",
  eyebrow: "Flagship system",
  title: "Digital Factory",
  tagline: "A whole TV plant, live in 3D and on command-room boards, with AI that acts before the line stops.",
  summary:
    "One model of a whole plant runs every second: six main assembly lines and every line that feeds them, the stores, the vehicles and the people. Walk it in 3D or run it from the command room; nine AI agents simulate each option on the plant before they recommend one, and a person approves.",
  highlights: [
    "Whole plant in 3D",
    "Live command room",
    "Nine AI agents",
    "SAP and GMES layers",
  ],
  note: "Concept demonstration. All plant data is simulated.",
  ctaLabel: "Open the 3D plant",
  /** المصنع الـ3D مباشرة */
  href: "https://coolman1984.github.io/Digital-Factory/plant.html",
  /** غرفة التحكم 2D */
  commandRoomHref: "https://coolman1984.github.io/Digital-Factory/app.html",
  image: {
    src: "/ecosystem/df-3d-plant.webp",
    alt: "Digital Factory in 3D: the whole plant from above, six main assembly lines with their feeding lines, stores and offices",
    width: 1600,
    height: 670,
  },
  /** نفس شكل كروت «Systems I've built» */
  workItem: {
    title: "Digital Factory",
    category: "Manufacturing AI",
    status: "Live",
    summary:
      "A live twin of a whole TV plant in 3D and on command-room boards: six main lines and every line feeding them, and nine AI agents that rank decisions by value.",
    evidence: "Nine capabilities you can open now · all plant data simulated",
    tech: ["Digital twin", "AI agents", "Live dashboards"],
  },
} as const;
