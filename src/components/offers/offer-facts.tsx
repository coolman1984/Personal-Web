/**
 * شريط الحقائق — المدة والنموذج والسعر في الشريط الكحلي الوحيد بالصفحة،
 * راكب على الهيرو زي شريط الخبرات في الرئيسية. المرجع: Master Profile v3 §6.
 */
import { cn } from "@/lib/utils";
import type { Offer } from "@/types";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";

interface OfferFactsProps {
  facts: Offer["facts"];
  label: string;
  className?: string;
}

export function OfferFacts({ facts, label, className }: OfferFactsProps) {
  return (
    <div className={cn("container-ws relative z-10 -mt-16 md:-mt-20", className)}>
      <ScrollReveal>
        <dl
          aria-label={label}
          className="ink-grid-bg grid border border-ink-border text-ink-fg md:grid-cols-3"
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-ink-border p-6 last:border-b-0 md:border-b-0 md:border-e md:last:border-e-0 md:p-8"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{fact.label}</dt>
              <dd className="mt-3 font-display text-xl font-medium tracking-tight text-ink-fg md:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </div>
  );
}
