/**
 * صفحة /demo — «The 10-Minute Report Rebuild». المرجع: Master Profile v3 §4.3.
 * الأرقام في report-rebuild-results.json جاية من تشغيل حقيقي لـdemo/report-rebuild/rebuild.py
 * على بيانات تجريبية. لتحديثها: python rebuild.py --site-json ../../src/content/report-rebuild-results.json
 */
import { publicContact } from "@/lib/public-contact";
import results from "./report-rebuild-results.json";

const bookMailto = `${publicContact.mailto}?subject=${encodeURIComponent(
  "Live demo: The 10-Minute Report Rebuild",
)}`;

export const reportRebuild = {
  hero: {
    eyebrow: "Signature demo",
    badge: "Demo data",
    title: "The 10-Minute Report Rebuild",
    intro:
      "A messy recurring plant report, rebuilt live into a checked Python and SQL pipeline. An AI reviewer explains what the checks found, a person approves, and the room compares the result with how long the report takes them today.",
    primaryCta: { label: "Book the demo for your team", href: bookMailto },
    secondaryCta: {
      label: "See the code",
      href: "https://github.com/coolman1984/Personal-Web/tree/main/demo/report-rebuild",
    },
  },

  factsLabel: "The demo in numbers",
  facts: {
    files: "Messy input files",
    rows: "Rows read",
    run: "Pipeline run, seconds",
    checks: "Automatic checks",
  },

  before: {
    eyebrow: "Before",
    title: "Four files, four layouts, one recurring headache",
    intro:
      "The inputs are invented, but every problem in them is one that shows up in real monthly reports.",
    fileLabel: "File",
    problemLabel: "What is wrong with it",
    files: [
      { name: "Plant A daily output (CSV)", problem: "Day-first dates and thousands separators inside the numbers." },
      {
        name: "Plant B export (Excel)",
        problem: "Different headers, mixed-case line codes, one day pasted twice, and a manual TOTAL row.",
      },
      { name: "Standard scrap cost (CSV)", problem: "Costs typed as text with a currency suffix." },
      { name: "Cost-centre map (Excel)", problem: "One production line is missing, so its scrap cannot be charged." },
    ],
  },

  pipeline: {
    eyebrow: "The rebuild",
    title: "Seven steps, each one checked",
    msLabel: "ms",
  },

  after: {
    eyebrow: "After",
    title: "A report you can trust, and the questions worth asking",
    checksTitle: "Automatic checks",
    findingsTitle: "What the review packet hands to the AI reviewer",
    tableTitle: "Monthly totals from the rebuilt report",
    monthLabel: "Month",
    goodLabel: "Good units",
    scrapLabel: "Scrap units",
    costLabel: "Scrap cost (EGP, demo)",
    passLabel: "Passed",
    failLabel: "Needs attention",
  },

  compare: {
    eyebrow: "Before and after",
    title: "The baseline comes from the room",
    body: "The pipeline time below is measured. The manual time is not guessed here: in every live session the audience says how long the report takes them, and that is the number we compare against.",
    pipelineLabel: "Pipeline run on a laptop",
    manualLabel: "Manual time today",
    manualValue: "Measured live with your team",
    videoTitle: "Two-minute recording",
    videoStatus: "Recording in preparation", // 👈 غيّر ده — حط الفيديو لما يتسجّل
  },

  limits: {
    title: "What this demo does not prove",
    items: [
      "It runs on clean, invented inputs. Real data needs a scan, access rules and a baseline measured on site.",
      "One report is not a transformation. The next step is a scoped pilot with a written success criterion.",
      "Pipeline seconds are not saved money. Review and running time are counted before any claim is made.",
    ],
  },

  next: {
    title: "Want this on one of your reports?",
    body: "Start with a free 90-minute scan, or book the demo as a 30–60 minute talk for your leadership team.",
    primary: { label: "Start with the free scan", href: "/#contact" },
    secondary: { label: "See the pilot", href: "/pilot" },
  },

  results,
};

export type ReportRebuildContent = typeof reportRebuild;
