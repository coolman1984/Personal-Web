/** خريطة التعلّم — المسار الكامل من ٨ مستويات. */
import { ArrowLeft, Package } from "lucide-react";
import { site } from "@/content/site";
import { getAllLevels, getCoursesByLevel, getCourseBySlug } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
import { getIcon } from "@/lib/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { CourseCard } from "@/components/course/course-card";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "خريطة التعلّم — من مساعد شخصي لفريق رقمي",
  description:
    "المسار الكامل في ٨ مستويات متتابعة: مساعد شخصي، عقل ثانٍ، موظف رقمي، أتمتة، أداة، تطبيق، نظام، وفريق رقمي ذكي. كل مستوى بيبني على اللي قبله.",
  path: "/roadmap",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "خريطة التعلّم", href: "/roadmap" },
];

/** المخرج الإلزامي لكل مستوى — المصدر: docs/SOURCE-MATERIAL.md §2.1 */
const deliverables: Record<number, string> = {
  1: "٣ برومبتات شخصية مُعاد صياغتها من طلبات عمل حقيقية",
  2: "دفتر معرفة شغّال مبني من ٥ مستندات حقيقية من قسمك",
  3: "ملخّص تنفيذي لمشكلة حقيقية في قسمك",
  4: "أتمتة شغّالة لمهمة أسبوعية متكرّرة",
  5: "أداة صغيرة بسجلّ تشغيل و٥ حالات اختبار",
  6: "لوحة معلومات تفاعلية مبنية من ملفك إنت",
  7: "خريطة عملية + أول خطة أتمتة لعملية حقيقية",
  8: "عرض المشروع النهائي + الوقت الموفَّر مقيسًا",
};

/** أي مستوى من التلاتة بيغطّي كل درجة في السلّم */
function levelForStep(step: number) {
  if (step <= 3) return "beginner" as const;
  if (step <= 6) return "intermediate" as const;
  return "advanced" as const;
}

export default async function RoadmapPage() {
  const [levels, flagship] = await Promise.all([
    getAllLevels(),
    getCourseBySlug("ai-essentials"),
  ]);

  const coursesByLevel = Object.fromEntries(
    await Promise.all(levels.map(async (l) => [l.id, await getCoursesByLevel(l.id)] as const)),
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow="المسار الكامل"
        title="من مساعد شخصي... لفريق رقمي بيشتغل نيابة عنك"
        description="ثمانية مستويات متتابعة. كل مستوى بيخلّيك قادر على اللي بعده، وكل مستوى بيخلص بمخرج ملموس في إيدك — مش شهادة حضور."
      />

      {/* السلّم بالتفصيل */}
      <section className="container-x pb-8">
        <ol className="relative flex flex-col gap-6">
          <div
            aria-hidden
            className="absolute inset-y-4 start-[27px] w-px bg-linear-to-b from-aqua-500/60 via-brand-500/60 to-gold-500/60"
          />
          {site.ladder.map((item, i) => {
            const levelId = levelForStep(item.step);
            const accent = accentFor(levelId);
            return (
              <Reveal as="li" key={item.step} delay={i * 0.04} className="relative flex gap-5">
                <span
                  className={cn(
                    "relative z-1 grid size-14 shrink-0 place-items-center rounded-full border-2 bg-bg",
                    accent.border,
                  )}
                >
                  <span className={cn("ltr-nums text-base font-black", accent.text)}>
                    {formatNumber(item.step)}
                  </span>
                </span>

                <div className="flex-1 rounded-lg border border-line bg-surface p-5 shadow-soft">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-extrabold text-fg">{item.title}</h2>
                    <Badge
                      tone={levelId === "beginner" ? "aqua" : levelId === "intermediate" ? "brand" : "gold"}
                      size="sm"
                    >
                      {levels.find((l) => l.id === levelId)?.shortLabel}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-[14.5px] leading-[1.9] text-fg-muted">{item.subtitle}</p>
                  <p className="mt-3 flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-[13px] leading-snug text-fg-muted">
                    <Package className="mt-0.5 size-3.5 shrink-0 text-gold-500" aria-hidden />
                    <span>
                      <span className="font-bold text-fg">المخرج: </span>
                      {deliverables[item.step]}
                    </span>
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* البرنامج الشامل */}
      {flagship && (
        <section className="container-x py-14 md:py-20">
          <Reveal>
            <div className="rounded-xl border border-line bg-surface p-7 noise ring-gradient md:p-10">
              <Badge tone="gold" size="md" className="mb-4">
                المسار كامل في برنامج واحد
              </Badge>
              <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2rem)] font-extrabold text-fg">
                {flagship.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[16px] leading-[1.9] text-fg-muted">
                {flagship.summary}
              </p>
              <Button href={`/courses/${flagship.slug}`} size="lg" className="mt-6" iconAfter={<ArrowLeft />}>
                شوف البرنامج
              </Button>
            </div>
          </Reveal>
        </section>
      )}

      {/* الكورسات حسب المستوى */}
      {levels.map((level) => {
        const list = coursesByLevel[level.id] ?? [];
        const Icon = getIcon(level.icon);
        const accent = accentFor(level.id);
        if (list.length === 0) return null;
        return (
          <section key={level.id} className="container-x py-10">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl border",
                  accent.bg,
                  accent.border,
                  accent.text,
                )}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-fg">{level.label}</h2>
                <p className="text-[13.5px] text-fg-subtle">{level.tagline}</p>
              </div>
            </div>
            <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <li key={c.slug} className="h-full">
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <FinalCta />
    </>
  );
}
