/**
 * صفحة عرض «program-90» — المحتوى في src/content/offers.ts والتصميم في components/offers.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllOffers, getOfferBySlug, getOfferMailto, getOfferPageContent } from "@/lib/queries";
import { breadcrumbJsonLd, offerJsonLd, offerMetadata } from "@/lib/seo";
import { OfferLanding } from "@/components/offers/offer-landing";
import { JsonLd } from "@/components/shared/json-ld";

const SLUG = "program-90";

export async function generateMetadata(): Promise<Metadata> {
  const offer = await getOfferBySlug(SLUG);
  return offer ? offerMetadata(offer) : {};
}

export default async function Program90Page() {
  const [offer, offers, content] = await Promise.all([
    getOfferBySlug(SLUG),
    getAllOffers(),
    getOfferPageContent(),
  ]);
  if (!offer) notFound();

  return (
    <>
      <JsonLd data={offerJsonLd(offer)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: offer.title, href: `/${offer.slug}` },
        ])}
      />
      <OfferLanding offer={offer} offers={offers} content={content} mailto={getOfferMailto(offer)} />
    </>
  );
}
