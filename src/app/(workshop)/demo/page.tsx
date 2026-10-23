/**
 * /demo — «The 10-Minute Report Rebuild». المحتوى في src/content/report-rebuild.ts.
 */
import type { Metadata } from "next";
import { getReportRebuildContent, getSubpageChrome } from "@/lib/queries";
import { breadcrumbJsonLd, subpageMetadata } from "@/lib/seo";
import { ReportRebuildLanding } from "@/components/demo/report-rebuild-landing";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = subpageMetadata({
  title: "The 10-Minute Report Rebuild",
  description:
    "A live demo on demo data: a messy monthly plant report rebuilt into a checked Python and SQL pipeline, with an AI review step and a human approver.",
  path: "/demo",
  keywords: ["live demo", "report automation", "Python", "SQL", "keynote"],
});

export default async function DemoPage() {
  const [content, chrome] = await Promise.all([getReportRebuildContent(), getSubpageChrome()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "The 10-Minute Report Rebuild", href: "/demo" },
        ])}
      />
      <ReportRebuildLanding content={content} chrome={chrome} />
    </>
  );
}
