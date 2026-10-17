/**
 * هيرو صفحة العرض — رابط رجوع للسلّم، رقم الخطوة، الاسم، الوعد، وزرار التواصل.
 * المرجع: Master Profile v3 §7 (صفحة لكل عرض: لمين، بتستلم إيه، المدة، زرار تواصل).
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Offer, OfferPageContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface OfferHeroProps {
  offer: Offer;
  labels: OfferPageContent;
  mailto: string;
  className?: string;
}

export function OfferHero({ offer, labels, mailto, className }: OfferHeroProps) {
  return (
    <section className={cn("bg-background pb-28 pt-10 text-fg md:pb-36 md:pt-14", className)}>
      <div id="workshop-content" tabIndex={-1} className="container-ws outline-none">
        <Link
          href={labels.backHref}
          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
          {labels.backLabel}
        </Link>
        <Eyebrow className="mt-10">{`${labels.stepLabel} ${offer.step}`}</Eyebrow>
        <h1 className="display-lg mt-6 max-w-4xl text-fg">{offer.title}</h1>
        <p className="mt-5 max-w-3xl font-display text-2xl font-medium tracking-tight text-primary md:text-3xl">
          {offer.headline}
        </p>
        <ScrollReveal className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed text-fg-muted">{offer.intro}</p>
        </ScrollReveal>
        <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" delayMs={80}>
          <WorkshopButton href={mailto} variant="primary">
            {offer.ctaLabel}
          </WorkshopButton>
          <WorkshopButton href={labels.backHref} variant="secondary">
            {labels.backLabel}
          </WorkshopButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
