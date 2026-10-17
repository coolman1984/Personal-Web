/**
 * لمين العرض — إمتى يناسبك وإمتى تبدأ بخطوة تانية. الصراحة هنا جزء من الثقة.
 */
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Offer, OfferPageContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface OfferFitProps {
  offer: Offer;
  labels: OfferPageContent;
  className?: string;
}

export function OfferFit({ offer, labels, className }: OfferFitProps) {
  return (
    <WorkshopSection className={className}>
      <Eyebrow>{labels.fitTitle}</Eyebrow>
      <div className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-[1.4fr_1fr]">
        <ScrollReveal className="bg-background p-7 md:p-9">
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{labels.fitYes}</h2>
          <ul className="mt-6 space-y-4">
            {offer.fit.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-fg">
                <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal className="bg-secondary/40 p-7 md:p-9" delayMs={60}>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{labels.fitNo}</h2>
          <ul className="mt-6 space-y-4">
            {offer.notFit.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-fg-muted">
                <Minus className="mt-1 size-4 shrink-0 text-fg-muted" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </WorkshopSection>
  );
}
