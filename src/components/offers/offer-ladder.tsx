/**
 * السلّم — الخطوة اللي بعدها، وكل طرق الشغل التانية مع تمييز الصفحة الحالية.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Offer, OfferPageContent } from "@/types";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface OfferLadderProps {
  current: Offer;
  offers: Offer[];
  labels: OfferPageContent;
  className?: string;
}

export function OfferLadder({ current, offers, labels, className }: OfferLadderProps) {
  const rungs = [
    labels.freeScan,
    labels.workshopStep,
    ...offers.map((o) => ({ step: o.step, title: o.title, summary: o.summary, href: `/${o.slug}` })),
  ];

  return (
    <WorkshopSection className={cn("border-t border-border bg-secondary/30", className)}>
      <ScrollReveal className="grid gap-6 border border-border bg-background p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{current.nextStep.title}</h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-muted">{current.nextStep.body}</p>
        </div>
        <WorkshopButton href={current.nextStep.href} variant="secondary">
          {current.nextStep.label}
        </WorkshopButton>
      </ScrollReveal>

      <h2 className="mt-16 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
        {labels.ladderTitle}
      </h2>
      <ol className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {rungs.map((rung) => {
          const isCurrent = rung.href === `/${current.slug}`;
          return (
            <li key={rung.title} className={cn("bg-background", isCurrent && "bg-secondary/70")}>
              <Link
                href={rung.href}
                aria-current={isCurrent ? "page" : undefined}
                className="group relative flex h-full flex-col p-6 transition-colors duration-200 hover:bg-secondary/60"
              >
                {isCurrent && <span className="absolute inset-x-0 top-0 h-0.5 bg-primary" aria-hidden />}
                <span className="flex items-center justify-between gap-3 font-mono text-xs tabular-nums text-fg-muted">
                  {rung.step}
                  {isCurrent ? (
                    <span className="uppercase tracking-[0.14em] text-primary">{labels.ladderCurrent}</span>
                  ) : (
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  )}
                </span>
                <span className="mt-3 font-display text-lg font-medium tracking-tight text-fg">{rung.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-fg-muted">{rung.summary}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </WorkshopSection>
  );
}
