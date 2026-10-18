/**
 * /cases/[slug] — صفحة حالة واحدة بسلسلة الإثبات. بتتولّد للحالات المنشورة بس.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseBySlug, getCasePageContent, getPublishedCases, getSubpageChrome } from "@/lib/queries";
import { breadcrumbJsonLd, subpageMetadata } from "@/lib/seo";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";
import { CaseDetail } from "@/components/cases/case-detail";
import { JsonLd } from "@/components/shared/json-ld";

export const dynamicParams = false;

export async function generateStaticParams() {
  const published = await getPublishedCases();
  return published.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseBySlug(slug);
  if (!study) return {};
  return subpageMetadata({
    title: study.title,
    description: study.problem,
    path: `/cases/${study.slug}`,
    noIndex: study.status !== "published",
  });
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [study, content, chrome] = await Promise.all([
    getCaseBySlug(slug),
    getCasePageContent(),
    getSubpageChrome(),
  ]);
  if (!study) notFound();

  return (
    <div className="workshop-root min-h-screen bg-background text-fg">
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Cases", href: "/cases" },
          { label: study.title, href: `/cases/${study.slug}` },
        ])}
      />
      <WorkshopNav content={chrome} />
      <main>
        <CaseDetail study={study} eyebrow={content.index.eyebrow} content={content.detail} />
      </main>
      <WorkshopFooter content={chrome} />
    </div>
  );
}
