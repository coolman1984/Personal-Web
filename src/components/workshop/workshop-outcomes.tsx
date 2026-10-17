/**
 * Outcomes — bordered card grid with hover primary line.
 */
import type { WorkshopContent } from "@/types";
import { cn } from "@/lib/utils";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopOutcomesProps {
  outcomes: WorkshopContent["outcomes"];
}

const gridCellBorder =
  "h-full border-b border-ink-border max-md:border-e-0 md:border-e md:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:[&:nth-child(3n)]:border-e-0 last:border-e-0";

export function WorkshopOutcomes({ outcomes }: WorkshopOutcomesProps) {
  return (
    <WorkshopSection id={outcomes.id} variant="ink" grid>
      <WordReveal as="h2" text={outcomes.title} className="display-md text-ink-fg" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-ink-muted">{outcomes.intro}</p>
      </ScrollReveal>
      <div className="mt-14 grid border-t border-ink-border md:grid-cols-2 lg:grid-cols-3">
        {outcomes.items.map((item, index) => (
          <div key={item.title} className={cn(gridCellBorder)}>
            <ScrollReveal className="h-full" delayMs={index * 50}>
              <article
                className="group relative h-full p-7 transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
                <h3 className="font-display text-xl font-medium tracking-tight text-ink-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </WorkshopSection>
  );
}
