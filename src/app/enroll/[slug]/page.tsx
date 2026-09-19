/** صفحة الحجز. */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { getAllCourses, getCourseBySlug } from "@/lib/queries";
import { hasRealPayments } from "@/lib/payments";
import { buildMetadata } from "@/lib/seo";
import { formatNumber, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { EnrollForm } from "@/components/shared/enroll-form";
import { LevelBadge } from "@/components/course/level-badge";

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
  return buildMetadata({
    title: course ? `احجز مكانك — ${course.title}` : "الحجز",
    description: course?.summary ?? "",
    path: `/enroll/${slug}`,
    noIndex: true,
  });
}

export default async function EnrollPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const paymentsEnabled = site.features.payments && hasRealPayments();

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "الكورسات", href: "/courses" },
    { label: course.title, href: `/courses/${course.slug}` },
    { label: "الحجز", href: `/enroll/${course.slug}` },
  ];

  const facts = [
    { label: "المدة", value: course.duration },
    { label: "الجلسات", value: `${formatNumber(course.sessions)} جلسة` },
    { label: "الساعات", value: `${formatNumber(course.hours)} ساعة` },
    ...(course.nextCohort ? [{ label: "أقرب مجموعة", value: course.nextCohort }] : []),
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="الحجز"
        title={`احجز مكانك في «${course.title}»`}
        description="اكتب بياناتك وهتواصل معاك لتأكيد الحجز وموعد المجموعة."
      />

      <section className="container-x pb-14 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-lg border border-line bg-surface p-6 shadow-soft md:p-8">
            <EnrollForm courseSlug={course.slug} paymentsEnabled={paymentsEnabled} />
          </div>

          {/* ملخّص الطلب */}
          <aside className="rounded-lg border border-line bg-surface p-6 shadow-soft ring-gradient lg:sticky lg:top-24">
            <p className="text-[13px] font-bold text-fg-subtle">ملخّص الحجز</p>
            <h2 className="mt-2 text-lg font-extrabold leading-snug text-fg">{course.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <LevelBadge level={course.level} />
              {course.certificate && (
                <Badge tone="gold" size="sm">
                  شهادة إتمام
                </Badge>
              )}
            </div>

            <ul className="mt-5 flex flex-col gap-2.5 border-y border-line py-5 text-sm">
              {facts.map((f) => (
                <li key={f.label} className="flex items-center justify-between gap-3">
                  <span className="text-fg-subtle">{f.label}</span>
                  <span className="font-bold text-fg">{f.value}</span>
                </li>
              ))}
            </ul>

            {site.features.showPrices ? (
              <div className="mt-5 flex items-end justify-between gap-3">
                <span className="text-sm text-fg-subtle">الإجمالي</span>
                <span className="ltr-nums text-2xl font-black text-fg">
                  {formatPrice(course.price)}
                </span>
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-surface-2 p-3 text-[13.5px] leading-relaxed text-fg-muted">
                {site.priceHidden.hint}
              </p>
            )}

            <ul className="mt-5 flex flex-col gap-2">
              {site.guarantees.map((g) => (
                <li
                  key={g}
                  className="flex items-start gap-2 text-[12.5px] leading-snug text-fg-muted"
                >
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-brand-500"
                    strokeWidth={3}
                    aria-hidden
                  />
                  {g}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
