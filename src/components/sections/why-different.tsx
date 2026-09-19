/** المقارنة: الطريقة التقليدية مقابل طريقتي. المواصفات: docs/DESIGN.md §12.8 */
import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { ComparisonRow } from "@/types";

export function WhyDifferent({ rows }: { rows: ComparisonRow[] }) {
  return (
    <section className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="الفرق"
        title="نظرتي مختلفة — وده الفرق بالظبط"
        description="مش انتقاد لحد. ده بس توضيح للاختيار اللي إنت بتعمله."
      />

      <Reveal delay={0.1} className="mt-14">
        <div className="grid gap-5 md:grid-cols-2">
          {/* التقليدي */}
          <div className="rounded-lg border border-[oklch(0.55_0.2_25/0.22)] bg-[oklch(0.55_0.2_25/0.05)] p-7">
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-extrabold text-fg">
              <span className="grid size-7 place-items-center rounded-full bg-[oklch(0.55_0.2_25/0.15)] text-[oklch(0.55_0.2_25)] dark:text-[oklch(0.75_0.19_25)]">
                <X className="size-4" strokeWidth={3} aria-hidden />
              </span>
              الطريقة التقليدية
            </h3>
            <ul className="flex flex-col gap-4">
              {rows.map((row) => (
                <li key={row.traditional} className="flex items-start gap-3 text-[14.5px] leading-snug text-fg-muted">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-[oklch(0.55_0.2_25)] dark:text-[oklch(0.75_0.19_25)]"
                    aria-hidden
                  />
                  {row.traditional}
                </li>
              ))}
            </ul>
          </div>

          {/* طريقتي */}
          <div className="rounded-lg border border-[oklch(0.58_0.15_150/0.25)] bg-[oklch(0.58_0.15_150/0.06)] p-7 ring-gradient">
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-extrabold text-fg">
              <span className="grid size-7 place-items-center rounded-full bg-[oklch(0.58_0.15_150/0.16)] text-[oklch(0.45_0.15_150)] dark:text-[oklch(0.78_0.16_150)]">
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              طريقتي
            </h3>
            <ul className="flex flex-col gap-4">
              {rows.map((row) => (
                <li key={row.mine} className="flex items-start gap-3 text-[14.5px] font-medium leading-snug text-fg">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[oklch(0.45_0.15_150)] dark:text-[oklch(0.78_0.16_150)]"
                    strokeWidth={3}
                    aria-hidden
                  />
                  {row.mine}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
