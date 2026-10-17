/**
 * Home — English (LTR) positioning page for companies and recruiters.
 * المرجع: Master Profile v3 §3 و§7.
 */
import type { Metadata } from "next";
import { home } from "@/content/home";
import { getHomeContent } from "@/lib/queries";
import { buildMetadata, homeJsonLd, WORKSHOP_OG_IMAGE } from "@/lib/seo";
import { HomeLanding } from "@/components/home/home-landing";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Mohamed Fawzy — From scattered files to clear decisions",
  description:
    "AI and process automation for manufacturers and operations-heavy companies in Saudi Arabia, the Gulf and Egypt. 14+ years inside multinational manufacturing: diagnosis, build, training and measured results.",
  path: "/",
  locale: "en_US",
  ogImage: WORKSHOP_OG_IMAGE,
  authorName: home.owner.name,
  siteName: home.owner.name,
  mergeSiteKeywords: false,
  keywords: [
    "AI transformation",
    "process automation",
    "manufacturing",
    "FP&A automation",
    "SAP reporting",
    "KSA",
    "GCC",
    "Egypt",
  ],
});

export default async function HomePage() {
  const content = await getHomeContent();
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <HomeLanding content={content} />
    </>
  );
}
