/**
 * /ecosystem — «المنظومة»: كل الأنظمة على طريق واحد. المحتوى في src/content/ecosystem.ts.
 */
import type { Metadata } from "next";
import { getEcosystemContent, getSubpageChrome } from "@/lib/queries";
import { breadcrumbJsonLd, subpageMetadata } from "@/lib/seo";
import { EcosystemLanding } from "@/components/ecosystem/ecosystem-landing";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = subpageMetadata({
  title: "The AI transformation ecosystem",
  description:
    "Nine connected systems from learning AI to running a company on it: accounting, manufacturing execution, HR and space planning that work as one company, a live plant twin with AI agents, an academy, report automation, an AI agent team and a film and web studio.",
  path: "/ecosystem",
  keywords: ["AI transformation", "digital twin", "accounting", "MES", "HR", "AI agents", "academy", "automation"],
});

export default async function EcosystemPage() {
  const [content, chrome] = await Promise.all([getEcosystemContent(), getSubpageChrome()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "The ecosystem", href: "/ecosystem" },
        ])}
      />
      <EcosystemLanding content={content} chrome={chrome} />
    </>
  );
}
