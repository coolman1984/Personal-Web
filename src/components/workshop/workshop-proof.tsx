/**
 * Proof of work — ink section with product and training screenshots.
 */
import Image from "next/image";
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
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                loading="lazy"
                sizes="(min-width: 1280px) 592px, (min-width: 1024px) calc((100vw - 6rem) / 2), (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                className="h-auto w-full border border-ink-border"
              />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </WorkshopSection>
  );
}
