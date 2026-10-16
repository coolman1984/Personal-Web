/**
 * الهيرو — تخطيط مؤسسي: خلفية كحلية، عنوان ضخم، لمسات ذهبية.
 * المواصفات: docs/DESIGN.md §12.1
 */
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { getIcon } from "@/lib/icon";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
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
    <section className="relative isolate overflow-hidden bg-brand-900 text-white">
      <Aurora className="opacity-90" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to left, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 70% 30%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 70% 30%, #000 20%, transparent 80%)",
        }}
      />

      <div className="container-x relative pb-16 pt-20 sm:pb-36 sm:pt-24 md:pb-44 md:pt-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_0.5fr]">
          {/* المحتوى */}
          <div className="flex flex-col items-start">
            <Reveal>
              <p className="flex items-center gap-2 text-[13px] font-extrabold tracking-[0.12em] text-gold-500">
                <Sparkles className="size-4" aria-hidden />
                {hero.badge}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[clamp(2rem,4.2vw+0.5rem,3.75rem)] font-black leading-[1.28] tracking-tight">
                {hero.titleLead}
                <br />
                {hero.titleMid}{" "}
                <span className="text-gold-500">{hero.titleGradient}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-2xl text-[clamp(1.0625rem,1vw+0.8rem,1.25rem)] leading-[1.95] text-white/70">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href={hero.primaryCta.href} size="xl" iconAfter={<ArrowLeft />}>
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:border-gold-500 hover:text-gold-500"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
                {hero.chips.map((chip) => (
                  <li key={chip} className="flex items-center gap-2 text-[13.5px] text-white/65">
                    <Check className="size-4 shrink-0 text-gold-500" strokeWidth={3} aria-hidden />
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* البطاقة الجانبية — المعادلة الحاكمة */}
          <Reveal delay={0.4} className="w-full lg:mt-14">
            <div className="rounded-lg border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
              <p className="mb-5 text-[12px] font-extrabold tracking-[0.1em] text-gold-500">
                {formula.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {formula.parts.map((part, i) => (
                  <li key={part} className="flex items-center gap-3">
                    <span className="ltr-nums grid size-7 shrink-0 place-items-center rounded-md bg-gold-500/15 text-[12px] font-black text-gold-500">
                      {formatNumber(i + 1)}
                    </span>
                    <span className="text-[15px] font-bold text-white/90">{part}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-md bg-gold-500 px-4 py-3 text-center text-[14.5px] font-extrabold text-brand-900">
                {formula.result}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* شريط المستويات — عادي في الموبايل، ومتداخل مع أسفل الهيرو من sm وفوق */}
      <div className="container-x relative pb-4 sm:pb-0">
        <Reveal delay={0.48}>
          <ul className="grid divide-y divide-line rounded-lg border border-line bg-surface shadow-lift sm:absolute sm:inset-x-5 sm:bottom-0 sm:translate-y-1/2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:inset-x-8">
            {levels.map((level) => {
              const Icon = getIcon(level.icon);
              const accent = accentFor(level.id);
              return (
                <li key={level.id} className="flex items-center gap-4 p-6">
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-md border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[15px] font-extrabold text-fg">
                      {levelShortLabel[level.id]}
                    </span>
                    <span className="mt-0.5 truncate text-[12.5px] text-fg-subtle">
                      {level.tagline}
                    </span>
                    <span className="mt-1 text-[11.5px] font-bold text-gold-700 dark:text-gold-400">
                      <span className="ltr-nums">{formatNumber(courseCounts[level.id] ?? 0)}</span>{" "}
                      كورسات
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
      {/* مساحة تعويض ارتفاع البطاقة المتداخلة */}
      <div aria-hidden className="h-10 sm:h-16" />
    </section>
  );
}
