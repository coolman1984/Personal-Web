/**
 * صفحات العروض (/diagnostic و/pilot و/program-90 و/fractional) — كل النصوص هنا.
 * المرجع: Master Profile v3 §4.1 (السلّم) و§4.2 (المراحل) و§4.4 (هيكل العرض) و§4.5 (حدود القائد الجزئي).
 * مفيش أسعار أو عملاء أو أرقام مخترعة: الناقص من صاحب الموقع معلّم عليه // 👈 غيّر ده.
 */
import { publicContact } from "@/lib/public-contact";
import { intakeMailto, recruiterMailto } from "./intake";

export type OfferSlug = "diagnostic" | "pilot" | "program-90" | "fractional";

export interface OfferStep {
  label: string;
  title: string;
  body: string;
}

export interface Offer {
  slug: OfferSlug;
  step: string;
  title: string;
  /** سطر قصير للبطاقة وللـmeta description */
  summary: string;
  headline: string;
  intro: string;
  facts: { label: string; value: string }[];
  fit: string[];
  notFit: string[];
  receive: { title: string; body: string }[];
  stepsTitle: string;
  steps: OfferStep[];
  provide: string[];
  /** حدود العرض — بتظهر بس لو موجودة */
  guardrails?: { title: string; items: string[] };
  nextStep: { title: string; body: string; href: string; label: string };
  ctaLabel: string;
  mailSubject: string;
}

const offers: Offer[] = [
  {
    slug: "diagnostic",
    step: "03",
    title: "Plant-to-P&L Diagnostic",
    summary:
      "A 1–2 week, fixed-scope study that maps one area, checks the data and ranks where automation pays back before anything is built.",
    headline: "Clarity before you build.",
    intro:
      "For leaders who already sense the waste and are ready to pay for a clear picture. In one to two weeks we map how the work really flows, check the data behind it, and rank the opportunities by value and effort, so the first build is chosen on evidence, not enthusiasm.",
    facts: [
      { label: "Duration", value: "1–2 weeks" },
      { label: "Model", value: "Fixed price for an agreed scope" },
      { label: "Price", value: "Quoted after the free scan" }, // 👈 غيّر ده — سعر «يبدأ من»
    ],
    fit: [
      "You know time is lost in recurring reports or hand-offs, but not exactly where or how much.",
      "Several teams want automation and you need one ranked list before you fund anything.",
      "You want a value and cost estimate you can take to the decision owner.",
    ],
    notFit: [
      "You already know the exact report to automate. Start with the pilot instead.",
      "You need a tool selected this week. The diagnostic maps the work first, then the tools.",
    ],
    receive: [
      {
        title: "Short process map",
        body: "How the work flows today across people, files and systems, kept to what decisions need.",
      },
      {
        title: "Problems and data",
        body: "Where time, errors and rework appear, and what state the underlying data is in.",
      },
      {
        title: "Ranked opportunities",
        body: "Each one scored on value, effort and risk, with the reasoning written down.",
      },
      {
        title: "Value and cost estimate",
        body: "A range for each top opportunity, with the assumptions stated so they can be checked.",
      },
      {
        title: "Initial 90-day plan",
        body: "The pilot to start with, its written success criterion, and what follows if it works.",
      },
      {
        title: "KSA: link to SIRI",
        body: "Where a Saudi factory already has a SIRI plan, the opportunities are mapped against it.",
      },
    ],
    stepsTitle: "How the two weeks run",
    steps: [
      {
        label: "Step 1",
        title: "Scope and intake",
        body: "We agree the area, the questions to answer, the data I may see and who owns the decision.",
      },
      {
        label: "Step 2",
        title: "Map and measure",
        body: "Short sessions with the people who do the work, plus a look at the files and systems they use.",
      },
      {
        label: "Step 3",
        title: "Rank and estimate",
        body: "Opportunities scored and costed, with the baseline each one would be measured against.",
      },
      {
        label: "Step 4",
        title: "Readout",
        body: "A working session with the decision owner on findings, the ranked list and the 90-day plan.",
      },
    ],
    provide: [
      "A named internal owner and a decision owner",
      "Short sessions with the people who run the process",
      "Read access to the files and reports in scope",
      "Any data-access limits, agreed in writing up front",
    ],
    nextStep: {
      title: "What usually follows",
      body: "The top-ranked opportunity becomes a one-department pilot with a measured before and after.",
      href: "/pilot",
      label: "See the pilot",
    },
    ctaLabel: "Ask about a diagnostic",
    mailSubject: "Plant-to-P&L Diagnostic enquiry",
  },
  {
    slug: "pilot",
    step: "04",
    title: "One-Department Automation Pilot",
    summary:
      "3–6 weeks to automate one recurring report or flow in one department, with tests, a before/after measurement and a full handover.",
    headline: "One working solution, measured.",
    intro:
      "The lowest-risk way to start building. We take one recurring report or flow in one department, automate it properly, and measure the before and after. Your team runs it at the end, with tests, a run guide and training.",
    facts: [
      { label: "Duration", value: "3–6 weeks" },
      { label: "Model", value: "Defined deliverables, fixed scope" },
      { label: "Price", value: "Fixed price per scope" }, // 👈 غيّر ده
    ],
    fit: [
      "One department has a clear recurring report or flow that eats hours every cycle.",
      "The people who run it today are willing to test and own the new version.",
      "You want proof on your own work before committing to a wider program.",
    ],
    notFit: [
      "There is no agreed process yet. Map it first in a diagnostic.",
      "The aim is a company-wide rollout from day one. Prove one pilot, then scale.",
    ],
    receive: [
      {
        title: "One working solution",
        body: "The report or flow rebuilt, typically with Python, SQL and an AI review step where it helps.",
      },
      {
        title: "Tests and comparison",
        body: "Checks against the old output so numbers can be trusted before the switch.",
      },
      {
        title: "Before/after measurement",
        body: "Time and error rate measured against the baseline agreed at the start.",
      },
      {
        title: "Run guide",
        body: "How to run it, what to check, what to do when an input changes.",
      },
      {
        title: "Training",
        body: "The named users run it themselves before handover is signed off.",
      },
      {
        title: "Handover",
        body: "Code, documentation and access passed to your internal owner.",
      },
    ],
    stepsTitle: "How the pilot runs",
    steps: [
      {
        label: "Week 1",
        title: "Scope and baseline",
        body: "Agree the deliverables and the written success criterion, and measure today's time and errors.",
      },
      {
        label: "Weeks 2–4",
        title: "Build and test",
        body: "Build the solution, compare it with the current output, and define failure cases and a review owner.",
      },
      {
        label: "Weeks 4–5",
        title: "Run alongside",
        body: "Run old and new side by side on live cycles until the results match and users are confident.",
      },
      {
        label: "Final week",
        title: "Measure and hand over",
        body: "Before/after measurement, run guide, training and handover to the internal owner.",
      },
    ],
    provide: [
      "A named internal owner who will run it afterwards",
      "Access to the inputs, systems and past outputs in scope",
      "A few hours a week from the people who run the process",
      "Sign-off on the success criterion before the build starts",
    ],
    nextStep: {
      title: "If the pilot works",
      body: "A 90-day program scales what worked, with acceptance gates and a stop gate at the end.",
      href: "/program-90",
      label: "See the 90-day program",
    },
    ctaLabel: "Propose a pilot",
    mailSubject: "One-department automation pilot",
  },
  {
    slug: "program-90",
    step: "05",
    title: "90-Day Transformation Program",
    summary:
      "A phased 90-day program, Scan, Build, Run, Decide, that scales a proven pilot with acceptance gates and a real choice to stop.",
    headline: "Scale what worked, with a stop gate.",
    intro:
      "For organisations that have proven one pilot and want to scale it with discipline. Four phases, each with an acceptance gate. The program ends with a real decision: scale, improve or stop. Offering to stop is part of the deal.",
    facts: [
      { label: "Duration", value: "90 days, four phases" },
      { label: "Model", value: "Acceptance gates per phase" },
      { label: "Price", value: "Quoted per program" }, // 👈 غيّر ده
    ],
    fit: [
      "A pilot has worked and leadership wants it extended across teams or sites.",
      "You need shared priorities across departments, not a set of disconnected tools.",
      "You want a management report that says plainly whether to continue.",
    ],
    notFit: [
      "Nothing has been piloted yet. Start with one department.",
      "You want a fixed-scope project with no review points. Gates are the point here.",
    ],
    receive: [
      {
        title: "Shared priorities",
        body: "One ranked list agreed across the departments involved, with an owner for each item.",
      },
      {
        title: "Automations and analytics",
        body: "The pilot extended, and further automations built against the same standards.",
      },
      {
        title: "Training",
        body: "Named users trained on their own work, with documentation handed over.",
      },
      {
        title: "Access rights and monitoring",
        body: "Who can run, change and see what, plus indicators that show when something breaks.",
      },
      {
        title: "Return review",
        body: "Net impact after running cost, and a reliability review of everything built.",
      },
      {
        title: "Management report",
        body: "The decision to scale, improve or stop, and the next-phase plan if you continue.",
      },
    ],
    stepsTitle: "Scan, Build, Run, Decide",
    steps: [
      {
        label: "Days 1–15",
        title: "Scan",
        body: "Internal owner named, process mapped, baseline measured, data checked. Ranked opportunities and one pilot chosen with a written success criterion.",
      },
      {
        label: "Days 16–45",
        title: "Build",
        body: "Pilot built and tested, failure cases and a review owner defined, running and maintenance time logged.",
      },
      {
        label: "Days 46–75",
        title: "Run",
        body: "Monitored live use, named users trained, documentation handed over, reliable indicators in place.",
      },
      {
        label: "Days 76–90",
        title: "Decide",
        body: "Net impact after running cost and a reliability review, then a decision to scale, improve or stop, with a management report.",
      },
    ],
    provide: [
      "An executive sponsor and a named internal owner",
      "Decision owners available at each acceptance gate",
      "Access to the systems and data in scope, agreed in writing",
      "Time from named users for testing and training",
    ],
    nextStep: {
      title: "After the program",
      body: "Where you want ongoing senior guidance alongside your internal owner, a fractional seat can follow.",
      href: "/fractional",
      label: "See the fractional seat",
    },
    ctaLabel: "Discuss a 90-day program",
    mailSubject: "90-Day Transformation Program",
  },
  {
    slug: "fractional",
    step: "06",
    title: "Fractional AI Transformation Lead",
    summary:
      "Recurring senior guidance on AI and automation transformation, alongside your internal owner, on agreed time, authority and scope.",
    headline: "Senior guidance, on agreed terms.",
    intro:
      "For firms that need recurring senior leadership on AI and process automation without a full-time hire. I work alongside your internal owner: leadership meetings, initiative reviews, unblocking, performance measurement and team coaching. Time, decision rights and scope are written down before we start.",
    facts: [
      { label: "Model", value: "Monthly engagement" },
      { label: "Levels", value: "Advisor, Lead or Embedded" },
      { label: "Terms", value: "Agreed time, authority and scope" }, // 👈 غيّر ده — سعر شهري
    ],
    fit: [
      "You have AI and automation initiatives running, and no senior owner to steer them.",
      "An internal owner exists, and needs a senior partner to review, unblock and coach.",
      "You want progress measured and reported to leadership on a regular rhythm.",
    ],
    notFit: [
      "You need a CIO or CTO. This seat covers AI and automation transformation only.",
      "There is no internal owner. Someone inside must own the work day to day.",
    ],
    receive: [
      {
        title: "Leadership meetings",
        body: "A standing slot with leadership on priorities, progress and decisions.",
      },
      {
        title: "Initiative reviews",
        body: "Each initiative checked against its success criterion and its running cost.",
      },
      {
        title: "Unblocking",
        body: "Data, access and cross-team issues raised and settled with the right owner.",
      },
      {
        title: "Performance measurement",
        body: "Indicators that show whether what was built is used and paying back.",
      },
      {
        title: "Team coaching",
        body: "Your internal owner and team grow the skills to run the work without me.",
      },
    ],
    stepsTitle: "Three levels of involvement",
    steps: [
      {
        label: "Advisor",
        title: "About 2 days a month",
        body: "Leadership meetings and initiative reviews, with your internal owner running delivery.",
      },
      {
        label: "Lead",
        title: "About 1 day a week",
        body: "Hands-on steering: reviews, unblocking, measurement and regular coaching.",
      },
      {
        label: "Embedded",
        title: "About 2 days a week",
        body: "Working inside the team on priorities, delivery and the operating rhythm.",
      },
    ],
    provide: [
      "A named internal owner with time to own the work",
      "Written decision rights for the seat",
      "Access to leadership and to the initiatives in scope",
      "An agreed review point for the engagement itself",
    ],
    guardrails: {
      title: "Scope of the seat",
      items: [
        "AI and process automation transformation leadership only, not a CIO or CTO role.",
        "Time, decision rights and the internal owner are written into the contract.",
        "Availability is confirmed case by case before any engagement starts.", // 👈 غيّر ده — §4.5
      ],
    },
    nextStep: {
      title: "Not ready for a seat?",
      body: "A diagnostic gives you a ranked plan in one to two weeks, with no ongoing commitment.",
      href: "/diagnostic",
      label: "See the diagnostic",
    },
    ctaLabel: "Discuss a fractional seat",
    mailSubject: "Fractional AI Transformation Lead",
  },
];

/** النصوص المشتركة بين صفحات العروض */
export const offerPage = {
  owner: { name: "Mohamed Fawzy" },

  // نفس قايمة الرئيسية بس بروابط كاملة عشان تشتغل من أي صفحة
  nav: {
    links: [
      { label: "Problems", href: "/#problems" },
      { label: "Cases", href: "/cases" },
      { label: "Services", href: "/#offers" },
      { label: "Method", href: "/#method" },
      { label: "Experience", href: "/#experience" },
      { label: "Workshop", href: "/workshop" },
      { label: "Academy", href: "/courses" },
    ],
    cta: { label: "Discuss your challenge", href: "#contact" },
  },

  backLabel: "All services",
  backHref: "/#offers",
  stepLabel: "Step",
  fitTitle: "Who it's for",
  fitYes: "A good fit when",
  fitNo: "Not the right step when",
  receiveTitle: "What you receive",
  provideTitle: "What your side provides",
  quoteTitle: "How the proposal is written",
  quoteNote: "The number comes last.",
  quoteSteps: [
    "Goal",
    "Scope",
    "Deliverables",
    "What you provide",
    "Schedule",
    "Acceptance test",
    "Training and follow-up",
    "Cost",
    "Change-request rule",
  ],
  ladderTitle: "Other ways to work together",
  ladderCurrent: "You are here",
  freeScan: {
    step: "01",
    title: "Free 90-minute Scan",
    summary: "A call and a short intake form. You leave with your top three automation bets.",
    href: "#contact",
  },
  workshopStep: {
    step: "02",
    title: "Agent Team Day",
    summary: "One day on site for a leadership team: agent roster, prompt library and a 90-day sketch.",
    href: "/workshop",
  },

  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Start with a free 90-minute scan",
    body: "Every engagement starts with the same short conversation. The email below opens with the few questions I ask first, so the scan uses your time well.",
    checklistTitle: "What I'll ask",
    checklist: [
      "Sector and department",
      "The problem and how often it happens",
      "Time it takes today",
      "Systems involved",
      "Who owns the decision",
      "Data-access limits",
    ],
    secondaryCta: { label: "Hiring? Request my CV", href: recruiterMailto },
    email: publicContact.email,
    emailHref: publicContact.mailto,
    linkedIn: { label: publicContact.linkedinLabel, href: publicContact.linkedin },
  },

  footer: {
    note: "Mohamed Fawzy · Plant-to-P&L · Cairo",
    links: [
      { label: "Home", href: "/" },
      { label: "Workshop", href: "/workshop" },
      { label: "Academy", href: "/courses" },
      { label: "LinkedIn", href: publicContact.linkedin },
    ],
  },
};

export type OfferPageContent = typeof offerPage;

/** إيميل العرض — نفس أسئلة الفرز بعنوان العرض */
export function offerMailto(offer: Offer): string {
  return intakeMailto(offer.mailSubject);
}

export { offers };
