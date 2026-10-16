/**
 * Proof of work — ink section with placeholder media blocks.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopProofProps {
  proof: WorkshopContent["proof"];
}

export function WorkshopProof({ proof }: WorkshopProofProps) {
  return (
    <WorkshopSection id={proof.id} variant="ink" grid>
      <WordReveal as="h2" text={proof.title} className="display-md text-ink-fg" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-ink-muted">{proof.intro}</p>
      </ScrollReveal>
      <div className="mt-14 flex flex-col gap-16">
        {proof.blocks.map((block, index) => (
          <ScrollReveal key={block.title} delayMs={index * 60}>
            <article className="grid gap-8 border-t border-ink-border pt-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink-fg">
                  {block.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">{block.description}</p>
              </div>
              <div
                className="flex aspect-video items-center justify-center border border-ink-border bg-white/[0.03] p-6 text-center text-sm text-ink-muted"
                role="img"
                aria-label={block.imageLabel}
              >
                {block.imageLabel}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </WorkshopSection>
  );
}
