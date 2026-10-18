/**
 * /cases — سلسلة الإثبات وقايمة دراسات الحالة. المحتوى في src/content/cases.ts.
 */
import type { Metadata } from "next";
import { getAllCases, getCasePageContent, getPublishedCases, getSubpageChrome } from "@/lib/queries";
import { breadcrumbJsonLd, subpageMetadata } from "@/lib/seo";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";
import { CasesIndex } from "@/components/cases/cases-index";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = subpageMetadata({
  title: "Cases: measured the audit-ready way",
  description:
    "How every case is documented: problem, baseline, my role, what changed, measured result, limits and evidence. Gross and net time shown separately.",
  path: "/cases",
});

export default async function CasesPage() {
  const [all, published, content, chrome] = await Promise.all([
    getAllCases(),
    getPublishedCases(),
    getCasePageContent(),
    getSubpageChrome(),
  ]);

  return (
    <div className="workshop-root min-h-screen bg-background text-fg">
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Cases", href: "/cases" },
        ])}
      />
      <WorkshopNav content={chrome} />
      <main>
        <CasesIndex content={content.index} cases={all} linkable={published.map((c) => c.slug)} />
      </main>
      <WorkshopFooter content={chrome} />
    </div>
  );
}
