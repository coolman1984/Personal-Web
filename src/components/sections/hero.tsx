/** الهيرو. المواصفات الكاملة بالتخطيط: docs/DESIGN.md §12.1 */
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { getIcon } from "@/lib/icon";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/layout/aurora";
import type { Level } from "@/types";

export function Hero({
  levels,
  courseCounts,
}: {
  levels: Level[];
  courseCounts: Record<string, number>;
}) {
  const { hero, formula } = site;

  return (
    <section className="relative isolate overflow-hidden noise">
      <Aurora />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />

      <div className="container-x relative pb-20 pt-28 md:pb-28 md:pt-32">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Badge tone="brand" size="lg" icon={<Sparkles />}>
              {hero.badge}
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 max-w-4xl text-[clamp(2.25rem,5.2vw+0.5rem,4.25rem)] font-black leading-[1.22] tracking-tight text-fg">
              {hero.titleLead}
              <br />
              {hero.titleMid} <span className="text-gradient">{hero.titleGradient}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[clamp(1rem,1vw+0.75rem,1.125rem)] leading-[1.9] text-fg-muted">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} size="xl" iconAfter={<ArrowLeft />}>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="xl">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {hero.chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-[13px] text-fg-muted">
                  <span className="grid size-4 place-items-center rounded-full bg-brand-500/15 text-brand-500">
                    <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                  </span>
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* المعادلة الحاكمة — من الدليل الأول */}
        <Reveal delay={0.4} className="mt-14">
          <div className="mx-auto max-w-3xl rounded-3xl border border-line glass p-5 ring-gradient md:p-6">
            <p className="mb-4 text-center text-[11px] font-bold tracking-wider text-fg-subtle">
              {formula.title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {formula.parts.map((part, i) => (
                <span key={part} className="flex items-center gap-2 md:gap-3">
                  <span className="rounded-xl border border-line bg-surface px-3 py-2 text-[13px] font-bold text-fg md:text-sm">
                    {part}
                  </span>
                  <span className="text-lg font-black text-fg-subtle" aria-hidden>
                    {i < formula.parts.length - 1 ? "+" : "="}
                  </span>
                </span>
              ))}
              <span className="rounded-xl border border-brand-500/30 bg-brand-500/10 px-3 py-2 text-[13px] font-extrabold text-brand-600 md:text-sm dark:text-brand-300">
                {formula.result}
              </span>
            </div>
          </div>
        </Reveal>

        {/* كروت المستويات العائمة */}
        <Reveal delay={0.48} className="mt-10">
          <ul className="grid gap-4 sm:grid-cols-3">
            {levels.map((level, i) => {
              const Icon = getIcon(level.icon);
              const accent = accentFor(level.id);
              return (
                <li
                  key={level.id}
                  className={cn(
                    "rounded-2xl border border-line bg-surface p-5 shadow-soft",
                    "transition-transform duration-500 hover:-translate-y-1.5",
                  )}
                  style={{
                    animation: `float 7s ease-in-out ${i * 1.4}s infinite`,
                  }}
                >
                  <span
                    className={cn(
                      "mb-3 grid size-10 place-items-center rounded-xl border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <p className="text-sm font-extrabold text-fg">
                    {levelShortLabel[level.id]}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-fg-subtle">
                    {level.tagline}
                  </p>
                  <p className="mt-3 text-[11px] font-bold text-fg-subtle">
                    <span className="ltr-nums">{formatNumber(courseCounts[level.id] ?? 0)}</span>{" "}
                    كورسات
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
