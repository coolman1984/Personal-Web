/**
 * Home — AI executive workshop landing (English, LTR).
 */
import type { Metadata } from "next";
import { getWorkshopContent } from "@/lib/queries";
import { buildMetadata, workshopJsonLd, WORKSHOP_OG_IMAGE } from "@/lib/seo";
import { WorkshopLanding } from "@/components/workshop/workshop-landing";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Build your AI agent team — Executive workshop with Mohamed Fawzy",
  description:
    "A one-day, hands-on workshop for managers in the Gulf and Egypt. Leave with agent roles, prompts, and a rollout plan using free or low-cost tools.",
  path: "/",
  locale: "en_US",
  ogImage: WORKSHOP_OG_IMAGE,
  mergeSiteKeywords: false,
  keywords: [
    "AI workshop",
    "executive training",
    "agent team",
    "Samsung",
    "manufacturing finance",
    "KSA",
    "Egypt",
  ],
});

export default async function HomePage() {
  const content = await getWorkshopContent();
  return (
    <>
      <JsonLd data={workshopJsonLd()} />
      <WorkshopLanding content={content} />
    </>
  );
}
