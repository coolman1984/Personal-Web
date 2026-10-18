/**
 * صفحة /cases — سلسلة الإثبات بالشرح، قواعد الأرقام، وقايمة الحالات بحالة كل واحدة.
 * المرجع: Master Profile v3 §3.4 و§7 (/cases/*).
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CasePageContent, CaseStudy } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface CasesIndexProps {
  content: CasePageContent["index"];
  cases: CaseStudy[];
  /** الحالات اللي ليها صفحة فعلًا (منشورة أو في وضع المعاينة) */
  linkable: string[];
  className?: string;
}

export function CasesIndex({ content, cases, linkable, className }: CasesIndexProps) {
  return (
    <>
      <section className={cn("bg-background pb-16 pt-14 text-fg md:pb-20 md:pt-20", className)}>
        <div id="workshop-content" tabIndex={-1} className="container-ws outline-none">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="display-lg mt-6 max-w-4xl text-fg">{content.title}</h1>
          <ScrollReveal className="mt-8 max-w-3xl">
            <p className="text-lg leading-relaxed text-fg-muted">{content.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      <WorkshopSection variant="ink" grid>
        <Eyebrow onInk>{content.chainLabel}</Eyebrow>
        <ol className="mt-10 grid gap-px border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
          {content.chain.map((step, index) => (
            <li key={step.title} className="bg-ink">
              <ScrollReveal className="h-full" delayMs={(index % 4) * 50}>
                <article className="h-full p-6">
                  <span className="font-mono text-sm tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 font-display text-lg font-medium tracking-tight text-ink-fg">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </article>
              </ScrollReveal>
            </li>
          ))}
          <li className="bg-ink p-6">
            <h2 className="font-display text-lg font-medium tracking-tight text-ink-fg">{content.rulesTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted">
              {content.rules.map((rule) => (
                <li key={rule} className="border-s-2 border-primary ps-3">
                  {rule}
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </WorkshopSection>

      <WorkshopSection>
        <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
          {content.listTitle}
        </h2>
        <ul className="mt-6 grid border-t border-border md:grid-cols-3">
          {cases.map((c, index) => {
            const href = linkable.includes(c.slug) ? `/cases/${c.slug}` : null;
            return (
              <li key={c.slug} className="border-b border-border md:border-e md:last:border-e-0">
                <ScrollReveal className="h-full" delayMs={index * 50}>
                  <article className="flex h-full flex-col p-7">
                    <span className="font-mono text-sm tabular-nums text-fg-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-base">{c.problem}</p>
                    {href ? (
                      <Link
                        href={href}
                        className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
                      >
                        {content.publishedLabel}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    ) : (
                      <p className="mt-auto pt-6 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                        <span className="me-2 inline-block size-1.5 rounded-full bg-primary align-middle" aria-hidden />
                        {content.draftLabel}
                      </p>
                    )}
                  </article>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
        {cases.some((c) => c.status === "draft") && (
          <ScrollReveal className="mt-10 flex flex-col gap-6 border border-border bg-secondary/40 p-7 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">{content.draftNote}</p>
            <WorkshopButton href={content.draftCta.href} variant="secondary" className="shrink-0">
              {content.draftCta.label}
            </WorkshopButton>
          </ScrollReveal>
        )}
      </WorkshopSection>
    </>
  );
}
