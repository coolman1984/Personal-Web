/** صفحة الكورس التفصيلية. */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  BookMarked,
  Check,
  CircleDot,
  Package,
  Radio,
  Sparkles,
  Wrench,
} from "lucide-react";
import {
  getAllCourses,
  getCourseBySlug,
  getLevelById,
  getRelatedCourses,
} from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd, courseJsonLd, faqJsonLd } from "@/lib/seo";
import { accentFor } from "@/lib/tokens";
import { cn, countLessons, formatNumber, sumHours } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { FactRow } from "@/components/shared/fact-row";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Reveal } from "@/components/motion/reveal";
import { LevelBadge } from "@/components/course/level-badge";
import { PriceBox } from "@/components/course/price-box";
import { hasAccess } from "@/lib/access";
import { Curriculum } from "@/components/course/curriculum";
import { CourseCard } from "@/components/course/course-card";
import { absoluteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return buildMetadata({ title: "الكورس مش موجود", description: "", path: "/courses" });

  return buildMetadata({
    title: course.title,
    description: course.summary,
    path: `/courses/${course.slug}`,
    keywords: course.keywords,
  });
}

/** بلوك موحّد لقوائم النقاط */
function PointList({
  title,
  icon: Icon,
  items,
  tone = "brand",
}: {
  title: string;
  icon: typeof Check;
  items: string[];
  tone?: "brand" | "aqua" | "gold";
}) {
  const colors = {
    brand: "text-brand-500",
    aqua: "text-aqua-500",
    gold: "text-gold-500",
  } as const;

  return (
    <div className="rounded-[20px] border border-line bg-surface p-6">
      <h3 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold text-fg">
        <Icon className={cn("size-5", colors[tone])} aria-hidden />
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-[1.8] text-fg-muted">
            <Check className={cn("mt-1 size-4 shrink-0", colors[tone])} strokeWidth={3} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const [level, related, enrolled] = await Promise.all([
    getLevelById(course.level),
    getRelatedCourses(slug, 3),
    hasAccess(slug),
  ]);

  const accent = accentFor(course.level);
  const totalLessons = countLessons(course.curriculum);
  const totalHours = sumHours(course.curriculum);

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "الكورسات", href: "/courses" },
    { label: course.title, href: `/courses/${course.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[courseJsonLd(course), breadcrumbJsonLd(crumbs), faqJsonLd(
          course.faqs.map((f) => ({ ...f, category: "الكورسات" as const })),
        )]}
      />

      <PageHero
        crumbs={crumbs}
        title={course.title}
        description={course.summary}
      >
        <div className="flex flex-wrap items-center gap-2">
          <LevelBadge level={course.level} size="md" />
          {course.kind === "mini" && (
            <Badge tone="gold" size="md">
              ميني كورس
            </Badge>
          )}
          <Badge tone="neutral" size="md">
            {course.duration}
          </Badge>
          <Badge tone="neutral" size="md">
            <span className="ltr-nums">{formatNumber(course.hours)}</span>&nbsp;ساعة
          </Badge>
          {course.certificate && (
            <Badge tone="gold" size="md">
              شهادة إتمام
            </Badge>
          )}
          {course.format.map((f) => (
            <Badge key={f} tone="neutral" size="md">
              {f}
            </Badge>
          ))}
        </div>
        <p className={cn("text-[17px] font-bold", accent.text)}>{course.tagline}</p>
        {course.promise && (
          <p className="flex items-start gap-2.5 rounded-2xl border border-gold-500/25 bg-gold-500/8 p-4 text-[15px] leading-snug text-fg-muted">
            <Package className="mt-0.5 size-4.5 shrink-0 text-gold-600 dark:text-gold-300" aria-hidden />
            <span>
              <span className="font-extrabold text-fg">هتخرج بـ: </span>
              {course.promise}
            </span>
          </p>
        )}
      </PageHero>

      <div className="container-x pb-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* العمود الرئيسي */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="rounded-[20px] border border-line bg-surface p-6">
                <p className="text-[16px] leading-[2] text-fg-muted">{course.description}</p>
              </div>
            </Reveal>

            {/* نموذج التسليم — بيوضّح إيه مباشر وإيه مراجعة */}
            {course.delivery && (
              <Reveal>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[20px] border border-brand-500/25 bg-brand-500/6 p-6">
                    <h3 className="mb-2 flex items-center gap-2.5 text-base font-extrabold text-fg">
                      <Radio className="size-5 text-brand-500" aria-hidden />
                      الشرح — مباشر معايا
                    </h3>
                    <p className="text-[14.5px] leading-[1.9] text-fg-muted">
                      {course.delivery.live}
                    </p>
                    <p className="mt-3 text-[13px] leading-snug text-fg-subtle">
                      التطبيق بيتعمل على ملفك إنت، مش على تمرين جاهز.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-gold-500/25 bg-gold-500/6 p-6">
                    <h3 className="mb-3 flex items-center gap-2.5 text-base font-extrabold text-fg">
                      <BookMarked className="size-5 text-gold-600 dark:text-gold-300" aria-hidden />
                      المراجعة — على الموقع
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {course.delivery.review.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[13.5px] leading-snug text-fg-muted"
                        >
                          <Check
                            className="mt-0.5 size-3.5 shrink-0 text-gold-600 dark:text-gold-300"
                            strokeWidth={3}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[13px] leading-snug text-fg-subtle">
                      بتتفتح بعد الحجز، وبتفضل معاك.
                    </p>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal>
              <PointList
                title="هتخرج قادر على"
                icon={Sparkles}
                items={course.outcomes}
                tone="brand"
              />
            </Reveal>

            {/* المنهج */}
            <Reveal>
              <section>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="text-2xl font-extrabold text-fg">المنهج بالتفصيل</h2>
                  <FactRow
                    className="text-[13px] text-fg-subtle"
                    items={[
                      <>
                        <span className="ltr-nums">{formatNumber(course.curriculum.length)}</span>{" "}
                        وحدات
                      </>,
                      <>
                        <span className="ltr-nums">{formatNumber(totalLessons)}</span> درس
                      </>,
                      <>
                        <span className="ltr-nums">{formatNumber(totalHours)}</span> ساعة
                      </>,
                    ]}
                  />
                </div>
                <Curriculum modules={course.curriculum} />
              </section>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <Reveal>
                <PointList
                  title="الكورس ده لمين؟"
                  icon={CircleDot}
                  items={course.audience}
                  tone="aqua"
                />
              </Reveal>
              <Reveal delay={0.06}>
                <PointList
                  title="المطلوب قبل ما تبدأ"
                  icon={Wrench}
                  items={course.prerequisites}
                  tone="gold"
                />
              </Reveal>
            </div>

            <Reveal>
              <PointList
                title="اللي هتاخده معاك"
                icon={Package}
                items={course.deliverables}
                tone="brand"
              />
            </Reveal>

            {/* الأدوات */}
            <Reveal>
              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h3 className="mb-4 text-lg font-extrabold text-fg">الأدوات اللي هتشتغل بيها</h3>
                <ul className="flex flex-wrap gap-2">
                  {course.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* أسئلة الكورس */}
            {course.faqs.length > 0 && (
              <Reveal>
                <section>
                  <h2 className="mb-5 text-2xl font-extrabold text-fg">أسئلة عن الكورس ده</h2>
                  <Accordion
                    items={course.faqs.map((f, i) => ({
                      id: `cfaq-${i}`,
                      title: f.question,
                      content: <p>{f.answer}</p>,
                    }))}
                  />
                </section>
              </Reveal>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <ShareButtons
                url={absoluteUrl(`/courses/${course.slug}`)}
                title={course.title}
              />
              {level && (
                <Button href={`/levels/${level.id}`} variant="link" iconAfter={<ArrowLeft className="size-4" />}>
                  شوف كل كورسات {level.shortLabel}
                </Button>
              )}
            </div>
          </div>

          {/* العمود الجانبي */}
          <PriceBox course={course} enrolled={enrolled} />
        </div>
      </div>

      {/* كورسات مقترحة */}
      {related.length > 0 && (
        <section className="container-x py-14 md:py-20">
          <h2 className="mb-8 text-2xl font-extrabold text-fg">كورسات ممكن تناسبك كمان</h2>
          <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <li key={c.slug} className="h-full">
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
