/**
 * التواصل — زرار للشركات (إيميل بأسئلة الفرز جاهزة) وزرار منفصل للتوظيف.
 * المرجع: Master Profile v3 §3.2 (زرارين منفصلين) و§4.4 (أسئلة الفرز).
 */
import { cn } from "@/lib/utils";
import type { ContactBlockContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface HomeContactProps {
  contact: ContactBlockContent;
  className?: string;
}

export function HomeContact({ contact, className }: HomeContactProps) {
  return (
    <WorkshopSection id={contact.id} className={cn("border-t border-border bg-secondary/30", className)}>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={contact.title} className="display-md mt-6" />
          <ScrollReveal className="mt-6 max-w-2xl">
            <p className="text-lg text-fg-muted">{contact.body}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" delayMs={60}>
            <WorkshopButton href={contact.primaryCta.href} variant="primary">
              {contact.primaryCta.label}
            </WorkshopButton>
            <WorkshopButton href={contact.secondaryCta.href} variant="secondary">
              {contact.secondaryCta.label}
            </WorkshopButton>
          </ScrollReveal>
          <ScrollReveal className="mt-8 flex flex-wrap gap-6 text-sm">
            <a href={contact.emailHref} className="text-fg-muted transition-colors duration-200 hover:text-fg" dir="ltr">
              {contact.email}
            </a>
            <a
              href={contact.linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {contact.linkedIn.label}
            </a>
          </ScrollReveal>
        </div>
        <ScrollReveal className="border border-border bg-background p-7">
          <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
            {contact.checklistTitle}
          </h3>
          <ol className="mt-5 space-y-3">
            {contact.checklist.map((item, index) => (
              <li key={item} className="flex gap-4 text-sm text-fg">
                <span className="font-mono text-xs tabular-nums text-fg-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </WorkshopSection>
  );
}
