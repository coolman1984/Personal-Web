/**
 * Agenda — numbered rows in a three-column grid.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopAgendaProps {
  agenda: WorkshopContent["agenda"];
}

export function WorkshopAgenda({ agenda }: WorkshopAgendaProps) {
  return (
    <WorkshopSection id={agenda.id}>
      <WordReveal as="h2" text={agenda.title} className="display-md" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{agenda.intro}</p>
      </ScrollReveal>
      <div className="mt-14 border-t border-border">
        {agenda.rows.map((row, index) => (
          <ScrollReveal key={row.number} delayMs={index * 40}>
            <div
              className="grid gap-4 border-b border-border py-7 transition-colors duration-200 hover:bg-secondary md:grid-cols-[5rem_1fr_1.2fr] md:items-start md:gap-8 md:py-8"
            >
              <span className="font-mono text-sm font-medium tabular-nums text-fg-muted">
                {row.number}
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">
                  {row.time}
                </p>
                <h3 className="mt-1 font-display text-lg font-medium text-fg md:text-xl">
                  {row.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-fg-muted md:text-base">{row.detail}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </WorkshopSection>
  );
}
