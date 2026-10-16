/**
 * Final CTA + contact placeholders.
 */
import type { WorkshopContent } from "@/types";
import { WordReveal } from "./motion/word-reveal";
import { ScrollReveal } from "./motion/scroll-reveal";
import { WorkshopSection } from "./workshop-section";
import { WorkshopButton } from "./workshop-button";

interface WorkshopContactProps {
  contact: WorkshopContent["contact"];
}

export function WorkshopContact({ contact }: WorkshopContactProps) {
  return (
    <WorkshopSection id={contact.id} className="border-t border-border bg-secondary/30">
      <WordReveal as="h2" text={contact.title} className="display-md" />
      <ScrollReveal className="mt-6 max-w-2xl">
        <p className="text-lg text-fg-muted">{contact.body}</p>
      </ScrollReveal>
      <ScrollReveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
        <WorkshopButton href={contact.primaryCta.href} variant="primary">
          {contact.primaryCta.label}
        </WorkshopButton>
        <a
          href={contact.emailHref}
          className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
          dir="ltr"
        >
          {contact.email}
        </a>
        <a
          href={contact.linkedIn.href}
          className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
        >
          {contact.linkedIn.label}
        </a>
      </ScrollReveal>
    </WorkshopSection>
  );
}
