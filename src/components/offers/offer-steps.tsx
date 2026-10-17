/**
 * العرض بيمشي إزاي — خطوات أو مراحل أو مستويات حسب العرض.
 */
import { cn } from "@/lib/utils";
import type { OfferStep } from "@/types";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface OfferStepsProps {
  title: string;
  steps: OfferStep[];
  className?: string;
}

export function OfferSteps({ title, steps, className }: OfferStepsProps) {
  return (
    <WorkshopSection className={cn("border-t border-border bg-secondary/30", className)}>
      <WordReveal as="h2" text={title} className="display-md" />
      <ol
        className={cn(
          "mt-12 grid gap-px border border-border bg-border md:grid-cols-2",
          steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="bg-background">
            <ScrollReveal className="h-full" delayMs={index * 60}>
              <article className="h-full p-7">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{step.label}</p>
                <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-fg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </WorkshopSection>
  );
}
