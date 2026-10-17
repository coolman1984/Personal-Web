/**
 * الحالات — سلسلة الإثبات + تلات حالات (المشكلة بس لحد ما الأدلة توصل).
 * المرجع: Master Profile v3 §3.4 و§7 (البلوك ٤).
 */
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface HomeCasesProps {
  cases: HomeContent["cases"];
  className?: string;
}

export function HomeCases({ cases, className }: HomeCasesProps) {
  return (
    <WorkshopSection id={cases.id} className={cn("border-t border-border bg-secondary/30", className)}>
      <Eyebrow>{cases.eyebrow}</Eyebrow>
      <WordReveal as="h2" text={cases.title} className="display-md mt-6" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{cases.intro}</p>
      </ScrollReveal>

      <ScrollReveal className="mt-10">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
          {cases.chainLabel}
        </p>
        <ol className="mt-4 flex flex-wrap gap-2">
          {cases.chain.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm text-fg"
            >
              <span className="font-mono text-xs tabular-nums text-fg-muted">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <div className="mt-12 grid border-t border-border bg-background md:grid-cols-3">
        {cases.items.map((item, index) => (
          <ScrollReveal
            key={item.title}
            delayMs={index * 50}
            className="border-b border-border md:border-e md:last:border-e-0"
          >
            <article className="flex h-full flex-col p-7">
              <h3 className="font-display text-xl font-medium tracking-tight text-fg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-base">{item.problem}</p>
              <p className="mt-auto pt-6 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                <span className="me-2 inline-block size-1.5 rounded-full bg-primary align-middle" aria-hidden />
                {cases.statusLabel}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-10 max-w-3xl">
        <ul className="space-y-2 text-sm leading-relaxed text-fg-muted">
          {cases.rules.map((rule) => (
            <li key={rule} className="border-s-2 border-primary ps-3">
              {rule}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </WorkshopSection>
  );
}
