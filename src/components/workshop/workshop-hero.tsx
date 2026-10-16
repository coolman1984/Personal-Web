/**
 * Workshop hero — ink background, grid texture, primary CTAs.
 */
import Image from "next/image";
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
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center xl:grid-cols-[minmax(0,1fr)_360px]">
        <div id="workshop-content" tabIndex={-1} className="outline-none">
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
            <WorkshopButton
              href={hero.secondaryCta.href}
              variant="secondary"
              className="border-ink-border bg-transparent text-ink-fg hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-fg focus-visible:ring-2 focus-visible:ring-ink-fg focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {hero.secondaryCta.label}
            </WorkshopButton>
          </ScrollReveal>
        </div>
        <Image
          src="/workshop/portrait.webp"
          alt="Mohamed Fawzy"
          width={867}
          height={1200}
          priority
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 320px, 256px"
          className="h-auto w-64 justify-self-center border border-ink-border lg:w-full"
        />
      </div>
    </section>
  );
}
