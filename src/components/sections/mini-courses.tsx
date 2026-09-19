/**
 * سكشن الميني كورسات — نتيجة واحدة محدّدة في وقت قصير.
 * ده باب الدخول الأسهل للموقع: سعر صغير، التزام صغير، نتيجة واضحة.
 */
import { ArrowLeft, Clock, PackageCheck, Users, Zap } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Course } from "@/types";

export function MiniCourses({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <section id="mini" className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="ميني كورسات"
        eyebrowTone="gold"
        title="عندك مشكلة واحدة؟ خدها في أسبوعين"
        description="مش كل حد محتاج برنامج كامل. الميني كورس بيحلّ مشكلة واحدة محدّدة، وبتخرج منه بحاجة شغّالة — والشرح مباشر معايا، والمراجعة بتفضل معاك على الموقع."
      />

      <ul className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
        {courses.map((course, i) => {
          const Icon = getIcon(course.icon);
          const accent = accentFor(course.level);
          return (
            <Reveal as="li" key={course.slug} delay={i * 0.08} className="h-full">
              <SpotlightCard
                className="group h-full"
                color="oklch(0.76 0.14 80 / 0.12)"
              >
                <div className="flex h-full flex-col p-7">
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <Badge tone="gold" size="md" icon={<Zap />}>
                      ميني كورس
                    </Badge>
                    <span className="ltr-nums text-[13px] font-bold text-fg-subtle">
                      {formatNumber(course.hours)} ساعات
                    </span>
                  </div>

                  <span
                    className={cn(
                      "mb-5 grid size-14 place-items-center rounded-lg border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <Icon className="size-6" />
                  </span>

                  <h3 className="text-[22px] font-extrabold leading-snug text-fg">
                    <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
                      {course.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.85] text-fg-muted">
                    {course.tagline}
                  </p>

                  {course.promise && (
                    <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-gold-500/22 bg-gold-500/8 p-3.5 text-[13.5px] leading-snug text-fg-muted">
                      <PackageCheck
                        className="mt-0.5 size-4 shrink-0 text-gold-700 dark:text-gold-300"
                        aria-hidden
                      />
                      <span>
                        <span className="font-bold text-fg">هتخرج بـ: </span>
                        {course.promise}
                      </span>
                    </p>
                  )}

                  <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-fg-subtle">
                    <li className="flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden />
                      {course.duration}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Zap className="size-3.5" aria-hidden />
                      <span className="ltr-nums">{formatNumber(course.sessions)}</span> جلسات
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Users className="size-3.5" aria-hidden />
                      حتى <span className="ltr-nums">{formatNumber(course.groupSize)}</span>
                    </li>
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-6">
                    <span
                      className={cn(
                        "font-extrabold text-fg",
                        site.features.showPrices ? "ltr-nums text-2xl" : "text-base",
                      )}
                    >
                      {site.features.showPrices
                        ? formatPrice(course.price)
                        : site.priceHidden.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-gold-700 dark:text-gold-300">
                      التفاصيل
                      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={0.16} className="mt-10">
        <p className="mx-auto max-w-2xl text-center text-[14.5px] leading-[1.9] text-fg-muted">
          الميني كورس بيحلّ مشكلة واحدة.{" "}
          <Link href="/courses/ai-essentials" className="font-bold text-fg underline underline-offset-4">
            البرنامج الشامل
          </Link>{" "}
          بيبني نظام عمل كامل — وبيطلع أوفر من إنك تاخد الميني كورسات واحد واحد.
        </p>
      </Reveal>
    </section>
  );
}
