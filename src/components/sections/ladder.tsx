/**
 * السلّم التصاعدي — الثمانية مستويات من «مساعد شخصي» لـ«فريق رقمي ذكي».
 * ده العمود الفقري للبرنامج. المصدر: docs/SOURCE-MATERIAL.md §2.1
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { cn, formatNumber } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";

/** لون كل خطوة — بيتدرّج من الفيروزي للبنفسجي للذهبي حسب موقعها */
function toneFor(step: number) {
  if (step <= 3) return { dot: "bg-aqua-500", ring: "border-aqua-500/40", text: "text-aqua-600 dark:text-aqua-300" };
  if (step <= 6) return { dot: "bg-brand-500", ring: "border-brand-500/40", text: "text-brand-600 dark:text-brand-300" };
  return { dot: "bg-gold-500", ring: "border-gold-500/40", text: "text-gold-700 dark:text-gold-300" };
}

export function Ladder() {
  return (
    <section className="relative overflow-hidden py-14 md:py-24">
      <div aria-hidden className="absolute inset-0 dots-bg opacity-50" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="المسار الكامل"
          title="ثمانية مستويات... كل واحد بيبني على اللي قبله"
          description="مش ٨ مواضيع منفصلة. ده سلّم: كل درجة بتخليك قادر على اللي بعدها، وكل درجة بتخلص بمخرج شغّال في إيدك."
        />

        <div className="relative mt-14">
          {/* الخط الواصل */}
          <div
            aria-hidden
            className="absolute inset-y-0 start-[27px] w-px bg-linear-to-b from-aqua-500/60 via-brand-500/60 to-gold-500/60 md:inset-x-0 md:inset-y-auto md:top-[27px] md:h-px md:w-full md:bg-linear-to-l"
          />

          <ol className="relative grid gap-6 md:grid-cols-4 md:gap-5 lg:grid-cols-8 lg:gap-3">
            {site.ladder.map((item, i) => {
              const tone = toneFor(item.step);
              return (
                <Reveal
                  as="li"
                  key={item.step}
                  delay={i * 0.06}
                  className="flex items-start gap-4 md:flex-col md:items-stretch md:gap-3"
                >
                  {/* الدائرة */}
                  <span
                    className={cn(
                      "relative z-1 grid size-14 shrink-0 place-items-center rounded-full border-2 bg-bg",
                      tone.ring,
                    )}
                  >
                    <span className={cn("ltr-nums text-base font-black", tone.text)}>
                      {formatNumber(item.step)}
                    </span>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -end-0.5 size-3 rounded-full ring-3 ring-bg",
                        tone.dot,
                      )}
                      aria-hidden
                    />
                  </span>

                  <div className="min-w-0 flex-1 pt-1 md:pt-0">
                    <h3 className="text-[15px] font-extrabold leading-tight text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-snug text-fg-subtle">
                      {item.subtitle}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            href="/roadmap"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-6 py-4 text-sm font-bold text-fg shadow-soft transition-all hover:-translate-y-0.5 hover:border-line-strong"
          >
            شوف خريطة التعلّم كاملة
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
