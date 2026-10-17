/**
 * سلّم العروض — من جلسة الفرز المجانية لحد القائد الجزئي، وتحتهم التدريب والمحاضرات.
 * المرجع: Master Profile v3 §4.1.
 */
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface HomeOffersProps {
  offers: HomeContent["offers"];
  className?: string;
}

const linkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline";

export function HomeOffers({ offers, className }: HomeOffersProps) {
  return (
    <WorkshopSection id={offers.id} className={className}>
      <Eyebrow>{offers.eyebrow}</Eyebrow>
      <WordReveal as="h2" text={offers.title} className="display-md mt-6" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{offers.intro}</p>
      </ScrollReveal>

      <ol className="mt-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
        {offers.items.map((item, index) => (
          <li
            key={item.title}
            className="border-b border-border md:border-e md:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:[&:nth-child(3n)]:border-e-0"
          >
            <ScrollReveal className="h-full" delayMs={(index % 3) * 50}>
              <article
                className={cn(
                  "relative flex h-full flex-col p-7",
                  "highlight" in item && item.highlight && "bg-secondary/60",
                )}
              >
                {"highlight" in item && item.highlight && (
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-primary" aria-hidden />
                )}
                <span className="font-mono text-sm tabular-nums text-fg-muted">{item.step}</span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">
                  {item.title}
                </h3>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-medium text-fg">{offers.forLabel}</dt>
                    <dd className="text-fg-muted">{item.for}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-fg">{offers.receiveLabel}</dt>
                    <dd className="text-fg-muted">{item.receive}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-fg">{offers.formatLabel}</dt>
                    <dd className="text-fg-muted">{item.format}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-fg">
                    <span className="sr-only">{offers.priceLabel}: </span>
                    {item.price}
                  </p>
                  {"href" in item && item.href && (
                    <a href={item.href} className={linkClass}>
                      {item.hrefLabel}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
        {offers.extras.map((extra) => (
          <ScrollReveal key={extra.title} className="bg-background">
            <article className="flex h-full flex-col p-7">
              <h3 className="font-display text-lg font-medium text-fg">{extra.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{extra.description}</p>
              <a href={extra.href} className={cn(linkClass, "mt-4")}>
                {extra.hrefLabel}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-10">
        <WorkshopButton href={offers.startCta.href} variant="primary">
          {offers.startCta.label}
        </WorkshopButton>
      </ScrollReveal>
    </WorkshopSection>
  );
}
