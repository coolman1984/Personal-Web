/**
 * الشروط — المطلوب من ناحية العميل، هيكل العرض المكتوب (§4.4)، وحدود العرض لو موجودة (§4.5).
 */
import { cn } from "@/lib/utils";
import type { Offer, OfferPageContent } from "@/types";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface OfferTermsProps {
  offer: Offer;
  labels: OfferPageContent;
  className?: string;
}

export function OfferTerms({ offer, labels, className }: OfferTermsProps) {
  return (
    <WorkshopSection className={cn("border-t border-border", className)}>
      <div className="grid gap-12 lg:grid-cols-2">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{labels.provideTitle}</h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-fg-muted">
            {offer.provide.map((item) => (
              <li key={item} className="border-s-2 border-primary ps-3">
                {item}
              </li>
            ))}
          </ul>
          {offer.guardrails && (
            <div className="mt-10 border border-border bg-secondary/40 p-6">
              <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                {offer.guardrails.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg">
                {offer.guardrails.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </ScrollReveal>
        <ScrollReveal delayMs={60}>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{labels.quoteTitle}</h2>
          <ol className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            {labels.quoteSteps.map((step, index) => (
              <li
                key={step}
                className={cn(
                  "flex items-baseline gap-3 bg-background px-4 py-3 text-sm text-fg",
                  index === labels.quoteSteps.length - 2 && "bg-secondary/60",
                )}
              >
                <span className="font-mono text-xs tabular-nums text-fg-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-primary">{labels.quoteNote}</p>
        </ScrollReveal>
      </div>
    </WorkshopSection>
  );
}
