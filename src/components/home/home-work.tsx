/**
 * أنظمة مبنية فعلًا وكودها على GitHub — شبكة كروت بخطوط رفيعة على خلفية فاتحة.
 * المرجع: Master Profile v3 §7 (دليل الشغل بجانب الحالات).
 */
import { ArrowUpRight } from "lucide-react";
import type { HomeContent } from "@/types";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";
import { digitalFactory } from "@/content/digital-factory";

interface HomeWorkProps {
  work: HomeContent["work"];
  className?: string;
}

const gridCellBorder =
  "h-full border-b border-border max-md:border-e-0 md:border-e md:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:[&:nth-child(3n)]:border-e-0 last:border-e-0";

const linkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline";

export function HomeWork({ work, className }: HomeWorkProps) {
  return (
    <WorkshopSection id={work.id} className={className}>
      <Eyebrow>{work.eyebrow}</Eyebrow>
      <WordReveal as="h2" text={work.title} className="display-md mt-6" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{work.intro}</p>
      </ScrollReveal>
      <div className="mt-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
        {/* Digital Factory أول كارت — رابط الموقع الحي بس */}
        <div className={cn(gridCellBorder)}>
          <ScrollReveal className="h-full">
            <article className="group relative flex h-full flex-col bg-secondary p-7">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary" aria-hidden />
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                {digitalFactory.workItem.category} · {digitalFactory.workItem.status} · Flagship
              </p>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">
                {digitalFactory.workItem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{digitalFactory.workItem.summary}</p>
              <p className="mt-4 border-s-2 border-primary ps-3 text-sm text-fg">{digitalFactory.workItem.evidence}</p>
              <p className="mt-4 font-mono text-xs text-fg-muted">{digitalFactory.workItem.tech.join(" · ")}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
                <a href={digitalFactory.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {work.liveLabel}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </article>
          </ScrollReveal>
        </div>
        {work.items.map((item, index) => (
          <div key={item.title} className={cn(gridCellBorder)}>
            <ScrollReveal className="h-full" delayMs={((index + 1) % 3) * 50}>
              <article className="group relative flex h-full flex-col p-7 transition-colors duration-200 hover:bg-secondary">
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                  {item.category} · {item.status}
                </p>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.summary}</p>
                <p className="mt-4 border-s-2 border-primary ps-3 text-sm text-fg">{item.evidence}</p>
                <p className="mt-4 font-mono text-xs text-fg-muted">{item.tech.join(" · ")}</p>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
                  {"repoHref" in item && item.repoHref && (
                    <a href={item.repoHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {work.codeLabel}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                  {"liveHref" in item && item.liveHref && (
                    <a href={item.liveHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {work.liveLabel}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              </article>
            </ScrollReveal>
          </div>
        ))}
      </div>
      <ScrollReveal className="mt-10">
        <WorkshopButton href={work.githubHref} variant="secondary">
          {work.githubLabel}
        </WorkshopButton>
      </ScrollReveal>
    </WorkshopSection>
  );
}
