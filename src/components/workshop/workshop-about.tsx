/**
 * About Mohamed — professional headline and credential cards.
 */
import type { WorkshopContent } from "@/types";
import { cn } from "@/lib/utils";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopAboutProps {
  about: WorkshopContent["about"];
}

const gridCellBorder =
  "h-full border-b border-e border-border max-sm:border-e-0 sm:[&:nth-child(2n)]:border-e-0 sm:last:border-e-0";

export function WorkshopAbout({ about }: WorkshopAboutProps) {
  return (
    <WorkshopSection id={about.id}>
      <div className="max-w-5xl">
        <WordReveal as="h2" text={about.title} className="display-md" />
        <ScrollReveal className="mt-6 max-w-3xl">
          <p className="font-display text-xl font-medium leading-relaxed text-fg">{about.headline}</p>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">{about.intro}</p>
        </ScrollReveal>
        <div className="mt-12 grid border-t border-border sm:grid-cols-2">
          {about.credentials.map((card, index) => (
            <div key={card.title} className={cn(gridCellBorder)}>
              <ScrollReveal className="h-full" delayMs={index * 45}>
                <article
                  className="group relative h-full p-7 transition-colors duration-200 hover:bg-secondary"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                  <h3 className="font-display text-base font-medium text-fg">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{card.description}</p>
                </article>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </WorkshopSection>
  );
}
