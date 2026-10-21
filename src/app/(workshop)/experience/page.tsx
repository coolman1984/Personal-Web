/**
 * /experience — صفحة التوظيف. المحتوى في src/content/experience.ts.
 */
import type { Metadata } from "next";
import { getExperiencePageContent, getHomeContent, getSubpageChrome } from "@/lib/queries";
import { breadcrumbJsonLd, subpageMetadata } from "@/lib/seo";
import { ExperienceLanding } from "@/components/experience/experience-landing";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = subpageMetadata({
  title: "Experience and availability",
  description:
    "AI Workforce Transformation Manager with 14+ years in multinational manufacturing finance and operations. Role directions, skills, public work and CV requests.",
  path: "/experience",
  keywords: ["AI transformation manager", "FP&A", "SAP", "CV"],
});

export default async function ExperiencePage() {
  const [content, chrome, home] = await Promise.all([
    getExperiencePageContent(),
    getSubpageChrome(),
    getHomeContent(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Experience", href: "/experience" },
        ])}
      />
      <ExperienceLanding content={content} chrome={chrome} projects={home.work.items} />
    </>
  );
}
