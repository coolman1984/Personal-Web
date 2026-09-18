/** كروت المستويات التلاتة. المواصفات: docs/DESIGN.md §12.4 */
import { ArrowLeft, Check } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Level } from "@/types";

export function Levels({
  levels,
  courseCounts,
}: {
  levels: Level[];
  courseCounts: Record<string, number>;
}) {
  return (
    <section id="levels" className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="ابدأ من مكانك"
        title="تلات مستويات... تبدأ من اللي إنت فيه"
        description="مش لازم تبدأ من الأول. الاختبار بيقولك مستواك في دقيقتين، أو اقرا الوصف واختار بنفسك."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
        {levels.map((level, i) => {
          const Icon = getIcon(level.icon);
          const accent = accentFor(level.id);
          const isMiddle = level.order === 2;

          return (
            <Reveal
              key={level.id}
              delay={i * 0.1}
              className={cn("h-full", isMiddle && "lg:-mt-3")}
            >
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-surface shadow-soft card-hover",
                  isMiddle && "ring-gradient shadow-lift",
                )}
              >
                {/* الشريط اللوني العلوي */}
                <span
                  aria-hidden
                  className={cn("h-1 w-full bg-linear-to-l", accent.gradient)}
                />

                <div className="flex flex-1 flex-col p-7">
                  <span
                    className={cn(
                      "mb-5 grid size-14 place-items-center rounded-2xl border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <Icon className="size-6" />
                  </span>

                  <h3 className="text-2xl font-extrabold text-fg">{level.label}</h3>
                  <p className={cn("mt-1.5 text-[15px] font-bold", accent.text)}>
                    {level.tagline}
                  </p>
                  <p className="mt-4 text-[14.5px] leading-[1.9] text-fg-muted">
                    {level.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {level.outcomes.slice(0, 4).map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-[14px] text-fg-muted">
                        <span
                          className={cn(
                            "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full",
                            accent.bg,
                            accent.text,
                          )}
                        >
                          <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                        </span>
                        <span className="leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <p className="mb-3 text-[13px] text-fg-subtle">
                      <span className="ltr-nums">{formatNumber(courseCounts[level.id] ?? 0)}</span>{" "}
                      كورسات متاحة
                    </p>
                    <Button
                      href={`/levels/${level.id}`}
                      variant={isMiddle ? "primary" : "secondary"}
                      size="lg"
                      fullWidth
                      iconAfter={<ArrowLeft />}
                    >
                      شوف المستوى
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
