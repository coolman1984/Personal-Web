/**
 * Format — delivery details, no pricing.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";

interface WorkshopFormatProps {
  format: WorkshopContent["format"];
}

export function WorkshopFormat({ format }: WorkshopFormatProps) {
  return (
    <WorkshopSection id={format.id} className="bg-secondary/50">
      <WordReveal as="h2" text={format.title} className="display-md" />
      <ScrollReveal className="mt-10 max-w-3xl space-y-4">
        {format.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-fg-muted">
            {paragraph}
          </p>
        ))}
      </ScrollReveal>
    </WorkshopSection>
  );
}
