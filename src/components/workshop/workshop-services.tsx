/**
 * Services — other engagements beyond the workshop, numbered rows on ink.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";
import { WorkshopButton } from "./workshop-button";

interface WorkshopServicesProps {
  services: WorkshopContent["services"];
}

export function WorkshopServices({ services }: WorkshopServicesProps) {
  return (
    <WorkshopSection id={services.id} variant="ink" grid>
      <WordReveal as="h2" text={services.title} className="display-md text-ink-fg" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-ink-muted">{services.intro}</p>
      </ScrollReveal>
      <ol className="mt-14 border-t border-ink-border">
        {services.items.map((item, index) => (
          <li key={item.title} className="border-b border-ink-border">
            <ScrollReveal delayMs={index * 40}>
              <article className="grid gap-3 py-7 md:grid-cols-[4rem_1fr_14rem] md:gap-8">
                <span className="font-mono text-sm text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                    {item.description}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted md:pt-1.5 md:text-end">
                  {item.duration}
                </p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
      <ScrollReveal className="mt-10">
        <WorkshopButton href={services.cta.href} variant="primary">
          {services.cta.label}
        </WorkshopButton>
      </ScrollReveal>
    </WorkshopSection>
  );
}
