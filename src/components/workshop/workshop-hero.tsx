/**
 * Workshop hero — ink background, grid texture, primary CTAs.
 */
import type { WorkshopContent } from "@/types";
import { Eyebrow } from "./eyebrow";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopButton } from "./workshop-button";

interface WorkshopHeroProps {
  hero: WorkshopContent["hero"];
}

export function WorkshopHero({ hero }: WorkshopHeroProps) {
  return (
    <section className="section-pad ink-grid-bg bg-ink text-ink-fg">
      <div className="container-x">
        <Eyebrow onInk>{hero.eyebrow}</Eyebrow>
        <WordReveal
          as="h1"
          text={hero.headline}
          className="display-xl mt-6 max-w-5xl text-ink-fg"
          staggerMs={55}
        />
        <ScrollReveal className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-muted md:text-xl">{hero.subcopy}</p>
        </ScrollReveal>
        <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" delayMs={80}>
          <WorkshopButton href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </WorkshopButton>
          <WorkshopButton href={hero.secondaryCta.href} variant="secondary" className="border-ink-border bg-transparent text-ink-fg hover:bg-white/5">
            {hero.secondaryCta.label}
          </WorkshopButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
