/** المنهج — شبكة Bento. المواصفات: docs/DESIGN.md §4.5 و §12.5 */
import { getIcon } from "@/lib/icon";
import { accentClasses } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { MethodPillar } from "@/types";

/**
 * تخطيط الشبكة — مرصوص بالترتيب عشان ما يسيبش فراغات.
 * الترتيب ده بيملا ٦ أعمدة × ٣ صفوف بالظبط:
 *
 *   ┌──────────────┬──────────────┐
 *   │              │      ٢       │   الصف ١
 *   │      ١       ├──────────────┤
 *   │   (٣×٢)      │      ٣       │   الصف ٢
 *   ├───────┬──────┴──────┬───────┤
 *   │   ٤   │      ٥      │   ٦   │   الصف ٣
 *   └───────┴─────────────┴───────┘
 */
const lgSpans = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function Method({ pillars }: { pillars: MethodPillar[] }) {
  return (
    <section className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="منهجي"
        eyebrowTone="gold"
        title="ليه الشرح بتاعي بيفرق؟"
        description="مش وعود عامة. دي ستّ قواعد بمشي عليها في كل جلسة، وكلها ليها أثر تقدر تشوفه."
      />

      <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-6">
        {pillars.map((pillar, i) => {
          const Icon = getIcon(pillar.icon);
          const accent = accentClasses[pillar.accent];
          const isLarge = i === 0;

          return (
            <Reveal
              key={pillar.title}
              delay={i * 0.06}
              className={cn(
                "h-full",
                i === 0 ? "md:col-span-2" : "md:col-span-1",
                lgSpans[i] ?? "lg:col-span-2",
              )}
            >
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface shadow-soft card-hover noise",
                  isLarge ? "p-8" : "p-6",
                  isLarge && "ring-gradient",
                )}
              >
                <span
                  className={cn(
                    "mb-4 grid place-items-center rounded-2xl border",
                    accent.bg,
                    accent.border,
                    accent.text,
                    isLarge ? "size-14" : "size-11",
                  )}
                >
                  <Icon className={isLarge ? "size-6" : "size-5"} />
                </span>

                <h3
                  className={cn(
                    "font-extrabold leading-snug text-fg",
                    isLarge ? "text-2xl" : "text-[17px]",
                  )}
                >
                  {pillar.title}
                </h3>
                <p
                  className={cn(
                    "mt-2.5 leading-[1.9] text-fg-muted",
                    isLarge ? "text-[15.5px]" : "text-[14px]",
                  )}
                >
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
