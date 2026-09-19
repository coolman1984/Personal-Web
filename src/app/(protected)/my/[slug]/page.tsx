/**
 * صفحة مراجعة الكورس — المحتوى اللي بيتفتح بعد الدفع.
 *
 * ⚠️ الطبقة التانية من الحماية: حتى لو المتدرّب داخل بحساب صحيح،
 *    الكورس اللي مش مفتوح ليه بيرجّع ٤٠٤.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked, Download, ListChecks, MessageCircle, Play } from "lucide-react";
import { site } from "@/content/site";
import { hasAccess } from "@/lib/access";
import { getCourseBySlug } from "@/lib/queries";
import { promptsForCourse } from "@/content/prompts";
import { buildMetadata } from "@/lib/seo";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber, whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { PromptLibrary } from "@/components/course/prompt-library";

export const metadata: Metadata = buildMetadata({
  title: "مراجعة الكورس",
  description: "",
  path: "/my",
  noIndex: true,
});

export default async function CourseReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // الفحص ده هو اللي بيمنع فتح كورس مش مدفوع بكتابة الرابط بالإيد
  const allowed = await hasAccess(slug);
  if (!allowed) notFound();

  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const coursePrompts = promptsForCourse(slug);
  const Icon = getIcon(course.icon);
  const accent = accentFor(course.level);

  return (
    <>
      {/* رأس الصفحة */}
      <section className="border-b border-line bg-bg-subtle">
        <div className="container-x py-10">
          <Link
            href="/my"
            className="mb-5 inline-flex items-center gap-1.5 text-[13px] text-fg-subtle transition-colors hover:text-fg"
          >
            <ArrowRight className="size-3.5" aria-hidden />
            كل كورساتي
          </Link>

          <div className="flex flex-wrap items-start gap-4">
            <span
              className={cn(
                "grid size-14 shrink-0 place-items-center rounded-lg border",
                accent.bg,
                accent.border,
                accent.text,
              )}
            >
              <Icon className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <Badge tone="success" size="sm" className="mb-2">
                مفتوح ليك
              </Badge>
              <h1 className="text-[clamp(1.375rem,3vw+0.5rem,2rem)] font-extrabold leading-snug text-fg">
                {course.title}
              </h1>
              <p className="mt-1.5 text-[14.5px] text-fg-muted">{course.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <div className="flex flex-col gap-10">
            {course.slug === "excel-automation" && (
              <section className="rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-brand-600 dark:text-brand-300">المعمل العملي الكامل</p>
                    <h2 className="mt-1 text-xl font-extrabold text-fg">من أربع ملفات إلى تقرير كامل بزر واحد</h2>
                    <p className="mt-2 max-w-2xl text-[13.5px] leading-7 text-fg-muted">
                      شرح ذاتي خطوة بخطوة: الملفات، الربط، أخطاء البيانات، البرومبتات، بناء VBA، الاختبارات، وسجل التشغيل. ارجع له في أي وقت حتى بعد انتهاء الكورس.
                    </p>
                  </div>
                  <Button href={`/my/${course.slug}/guide`} variant="primary" size="md">
                    افتح الشرح العملي
                  </Button>
                </div>
              </section>
            )}

            {/* مكتبة البرومبتات — الأولوية رقم ١ */}
            {coursePrompts.length > 0 && (
              <section>
                <h2 className="mb-2 flex items-center gap-2.5 text-xl font-extrabold text-fg">
                  <BookMarked className="size-5 text-brand-500" aria-hidden />
                  مكتبة البرومبتات
                </h2>
                <p className="mb-6 text-[14px] leading-relaxed text-fg-muted">
                  <span className="ltr-nums">{formatNumber(coursePrompts.length)}</span> برومبت
                  جاهز. انسخه، وغيّر اللي بين الأقواس المربعة بمعطياتك.
                </p>
                <PromptLibrary prompts={coursePrompts} />
              </section>
            )}

            {/* المنهج كقائمة مراجعة */}
            <section>
              <h2 className="mb-2 flex items-center gap-2.5 text-xl font-extrabold text-fg">
                <ListChecks className="size-5 text-aqua-500" aria-hidden />
                قوايم المراجعة
              </h2>
              <p className="mb-6 text-[14px] leading-relaxed text-fg-muted">
                كل جلسة ونقاطها — ارجعلها لما تنسى خطوة.
              </p>
              <Accordion
                items={course.curriculum.map((m) => ({
                  id: `rev-${m.order}`,
                  title: (
                    <span className="flex items-center gap-3">
                      <span className="ltr-nums grid size-7 shrink-0 place-items-center rounded-lg bg-brand-500/12 text-[13px] font-black text-brand-600 dark:text-brand-300">
                        {formatNumber(m.order)}
                      </span>
                      {m.title}
                    </span>
                  ),
                  content: (
                    <div className="flex flex-col gap-3 ps-10">
                      <ul className="flex flex-col gap-2">
                        {m.lessons.map((l) => (
                          <li key={l} className="flex items-start gap-2">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500/50" />
                            {l}
                          </li>
                        ))}
                      </ul>
                      {m.project && (
                        <p className="rounded-xl border border-gold-500/22 bg-gold-500/8 p-3 text-[13.5px]">
                          <span className="font-bold text-fg">المخرج: </span>
                          {m.project}
                        </p>
                      )}
                    </div>
                  ),
                }))}
                allowMultiple
              />
            </section>

            {/* الفيديوهات — مكان جاهز */}
            <section>
              <h2 className="mb-2 flex items-center gap-2.5 text-xl font-extrabold text-fg">
                <Play className="size-5 text-gold-500" aria-hidden />
                تسجيلات الجلسات
              </h2>
              <div className="rounded-lg border border-dashed border-line-strong p-8 text-center">
                <p className="text-[14.5px] leading-relaxed text-fg-muted">
                  تسجيل جلستك بيتحطّ هنا خلال ٤٨ ساعة من الجلسة.
                </p>
                <p className="mt-2 text-[12.5px] text-fg-subtle">
                  {/* 👈 للمطوّر: ضيف الروابط في course.delivery أو جدول lessons */}
                  لو عدّى الوقت ومحطّتش، كلّمني.
                </p>
              </div>
            </section>
          </div>

          {/* العمود الجانبي */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-lg border border-line bg-surface p-6 shadow-soft">
              <h2 className="mb-4 flex items-center gap-2.5 text-base font-extrabold text-fg">
                <Download className="size-4.5 text-fg-subtle" aria-hidden />
                اللي معاك
              </h2>
              <ul className="flex flex-col gap-2.5">
                {course.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-[13.5px] leading-snug text-fg-muted"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500/50" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-line bg-surface p-6 shadow-soft">
              <h2 className="mb-3 text-base font-extrabold text-fg">وقفت في حاجة؟</h2>
              <p className="mb-4 text-[13.5px] leading-relaxed text-fg-muted">
                ابعتلي على واتساب. لو السؤال بيتكرّر، بيتحوّل لنقطة في جلسة العيادة الجاية.
              </p>
              <Button
                href={whatsappLink(
                  site.whatsapp,
                  `السلام عليكم ${site.shortName}، عندي سؤال في كورس «${course.title}».`,
                )}
                variant="secondary"
                size="md"
                fullWidth
                icon={<MessageCircle />}
                target="_blank"
                rel="noopener noreferrer"
              >
                اسأل على واتساب
              </Button>
            </div>

            <Link
              href={`/courses/${course.slug}`}
              className="text-center text-[13px] text-fg-subtle underline underline-offset-4 transition-colors hover:text-fg"
            >
              صفحة الكورس العامة
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
