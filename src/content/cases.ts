/**
 * دراسات الحالة (/cases و/cases/[slug]) — كل حالة بتمشي على سلسلة الإثبات:
 * المشكلة ← خط الأساس ← دوري ← اللي اتغيّر ← النتيجة المقاسة ← حدود النتيجة ← الدليل.
 * المرجع: Master Profile v3 §3.4.
 *
 * ⚠️ الحالة مش بتتنشر غير لما `status` يبقى "published" — يعني الأدلة جاهزة والنشر متوافق عليه.
 * أي حقل لسه ناقص بيفضل `null` ومعلّم عليه // 👈 غيّر ده. ممنوع تخترع أرقام.
 */

export type CaseStatus = "draft" | "published";

export interface CaseStudy {
  slug: string;
  status: CaseStatus;
  title: string;
  /** القطاع والقسم — من غير اسم الشركة لو مفيش موافقة */
  context: string | null;
  period: string | null;
  problem: string;
  baseline: string | null;
  role: string | null;
  team: string | null;
  changed: string[] | null;
  /** الوقت الموفّر قبل خصم المراجعة والتشغيل */
  grossResult: string | null;
  /** الصافي بعد المراجعة والتشغيل — §3.4 */
  netResult: string | null;
  howMeasured: string | null;
  limits: string[] | null;
  evidence: { label: string; href?: string }[] | null;
  stack: string[];
}

export const cases: CaseStudy[] = [
  // 👈 غيّر ده — املا الحقول الفاضية وغيّر status لـ"published" بعد موافقة النشر
  {
    slug: "factory-report-consolidation",
    status: "draft",
    title: "Consolidating factory-system reports",
    context: null,
    period: null,
    problem:
      "Reports pulled from several plant systems were combined by hand before every review.",
    baseline: null,
    role: null,
    team: null,
    changed: null,
    grossResult: null,
    netResult: null,
    howMeasured: null,
    limits: null,
    evidence: null,
    stack: [],
  },
  {
    slug: "waste-scrap-dashboard",
    status: "draft",
    title: "Waste and scrap tracking dashboard",
    context: null,
    period: null,
    problem:
      "Scrap and waste were visible only after month-end, too late to correct the line.",
    baseline: null,
    role: null,
    team: null,
    changed: null,
    grossResult: null,
    netResult: null,
    howMeasured: null,
    limits: null,
    evidence: null,
    stack: [],
  },
  {
    slug: "recurring-finance-report",
    status: "draft",
    title: "Automating a recurring financial report",
    context: null,
    period: null,
    problem:
      "A recurring finance report took hours of copy-paste and manual checks every cycle.",
    baseline: null,
    role: null,
    team: null,
    changed: null,
    grossResult: null,
    netResult: null,
    howMeasured: null,
    limits: null,
    evidence: null,
    stack: [],
  },
];

/** النصوص الثابتة لصفحات الحالات */
export const casePage = {
  index: {
    eyebrow: "Cases",
    title: "Measured the audit-ready way",
    intro:
      "Every case here follows one proof chain, with a visible note on how it was measured and where the result stops. A case is published only once its evidence is ready and its owner has agreed to publication.",
    chainLabel: "Proof chain",
    chain: [
      { title: "Problem", body: "What was going wrong, in the words of the people who lived it." },
      { title: "Baseline", body: "How long it took, how often, and how many errors, before anything changed." },
      { title: "My role", body: "What I did myself, and what the team did." },
      { title: "What changed", body: "The process, data and tools after the change." },
      { title: "Measured result", body: "Gross time saved, then net time after review and running effort." },
      { title: "Limits of the result", body: "What the number does not show, and where it may not repeat." },
      { title: "Evidence", body: "What a reviewer can check: documents, screenshots, sign-offs or code." },
    ],
    rulesTitle: "House rules for every number",
    rules: [
      "Gross time saved is shown separately from net time, after review and running effort.",
      "Hours are never converted to money or headcount unless the client measured it.",
      "Team results are credited to the team, with my role stated.",
      "Client and employer names appear only with written approval.",
    ],
    listTitle: "Case files",
    draftLabel: "Write-up in preparation",
    publishedLabel: "Read the case",
    draftNote:
      "Evidence is being gathered and approved for publication. Until then, the open-source systems on the home page are the proof you can check today.",
    draftCta: { label: "See the open-source systems", href: "/#work" },
  },
  detail: {
    backLabel: "All cases",
    backHref: "/cases",
    contextLabel: "Context",
    periodLabel: "Period",
    stackLabel: "Tools",
    problemTitle: "Problem",
    baselineTitle: "Baseline",
    roleTitle: "My role",
    teamLabel: "Team",
    changedTitle: "What changed",
    resultTitle: "Measured result",
    grossLabel: "Gross",
    netLabel: "Net, after review and running effort",
    howMeasuredTitle: "How measured",
    limitsTitle: "Limits of the result",
    evidenceTitle: "Evidence",
    missing: "To be documented",
    cta: {
      title: "Have a report like this?",
      body: "Most cases start with one recurring report. A free 90-minute scan tells you whether yours is worth automating.",
      label: "Start with the free scan",
      href: "/#contact",
    },
  },
};

export type CasePageContent = typeof casePage;
