/**
 * Who it's for — bulleted list for Gulf / Egypt leadership.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopAudienceProps {
  audience: WorkshopContent["audience"];
}

export function WorkshopAudience({ audience }: WorkshopAudienceProps) {
  return (
    <WorkshopSection id={audience.id}>
      <WordReveal as="h2" text={audience.title} className="display-md" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{audience.intro}</p>
      </ScrollReveal>
      <ScrollReveal className="mt-12" delayMs={60}>
        <ul className="divide-y divide-border border-y border-border">
          {audience.bullets.map((item) => (
            <li
              key={item}
              className="py-7 text-base leading-relaxed text-fg transition-colors duration-200 hover:bg-secondary md:py-8 md:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </WorkshopSection>
  );
}
