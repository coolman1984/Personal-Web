/**
 * صفحة العرض الكاملة — نفس الهيدر والفوتر والتواصل بتوع الرئيسية.
 * الترتيب: هيرو → حقائق → لمين → بتستلم إيه → الخطوات → الشروط → السلّم → تواصل.
 */
import { cn } from "@/lib/utils";
import type { Offer, OfferPageContent } from "@/types";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";
import { HomeContact } from "@/components/home/home-contact";
import { OfferHero } from "./offer-hero";
import { OfferFacts } from "./offer-facts";
import { OfferFit } from "./offer-fit";
import { OfferReceive } from "./offer-receive";
import { OfferSteps } from "./offer-steps";
import { OfferTerms } from "./offer-terms";
import { OfferLadder } from "./offer-ladder";

interface OfferLandingProps {
  offer: Offer;
  offers: Offer[];
  content: OfferPageContent;
  mailto: string;
  className?: string;
}

export function OfferLanding({ offer, offers, content, mailto, className }: OfferLandingProps) {
  return (
    <div className={cn("workshop-root min-h-screen bg-background text-fg", className)}>
      <WorkshopNav content={content} />
      <main>
        <OfferHero offer={offer} labels={content} mailto={mailto} />
        <OfferFacts facts={offer.facts} label={offer.title} />
        <OfferFit offer={offer} labels={content} />
        <OfferReceive items={offer.receive} title={content.receiveTitle} heading={offer.summary} />
        <OfferSteps title={offer.stepsTitle} steps={offer.steps} />
        <OfferTerms offer={offer} labels={content} />
        <OfferLadder current={offer} offers={offers} labels={content} />
        <HomeContact contact={{ ...content.contact, primaryCta: { label: offer.ctaLabel, href: mailto } }} />
      </main>
      <WorkshopFooter content={content} />
    </div>
  );
}
