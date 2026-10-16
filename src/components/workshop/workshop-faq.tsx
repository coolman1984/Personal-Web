/**
 * FAQ — native details/summary accordion.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopFaqProps {
  faq: WorkshopContent["faq"];
}

export function WorkshopFaq({ faq }: WorkshopFaqProps) {
  return (
    <WorkshopSection id={faq.id}>
      <WordReveal as="h2" text={faq.title} className="display-md" />
      <ScrollReveal className="mt-12 divide-y divide-border border-y border-border">
        {faq.items.map((item) => (
          <details key={item.question} className="group py-1">
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius)] py-6 text-base font-medium text-fg transition-colors duration-200 hover:text-fg md:text-lg [&::-webkit-details-marker]:hidden"
            >
              <span>{item.question}</span>
              <span
                className="font-mono text-xs text-fg-muted transition-transform duration-200 group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="pb-6 pe-8 text-sm leading-relaxed text-fg-muted md:text-base">
              {item.answer}
            </div>
          </details>
        ))}
      </ScrollReveal>
    </WorkshopSection>
  );
}
