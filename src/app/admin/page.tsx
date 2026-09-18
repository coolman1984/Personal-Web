/** لوحة الإدارة — نظرة سريعة. */
import Link from "next/link";
import { ArrowLeft, KeyRound, Users } from "lucide-react";
import { listAllAccess } from "@/lib/access";
import { getAllCourses } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { formatDate, formatNumber } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";

export const metadata = buildMetadata({
  title: "لوحة الإدارة",
  description: "",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage() {
  const [access, courses] = await Promise.all([listAllAccess(), getAllCourses()]);

  const uniqueStudents = new Set(access.map((a) => a.email)).size;
  const byCourse = courses
    .map((c) => ({
      course: c,
      count: access.filter((a) => a.course_slug === c.slug).length,
    }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count);

  const stats = [
    { icon: Users, label: "متدرّب", value: uniqueStudents },
    { icon: KeyRound, label: "وصول مفتوح", value: access.length },
  ];

  return (
    <>
      <PageHero
        eyebrow="إدارة"
        title="لوحة التحكّم"
        description="نظرة سريعة على الوصول المفتوح."
      >
        <Link
          href="/admin/access"
          className="group inline-flex items-center gap-2 self-start rounded-xl bg-linear-to-bl from-brand-600 to-brand-500 px-5 py-3 text-sm font-bold text-white"
        >
          افتح وصول جديد
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      </PageHero>

      <section className="container-x pb-14">
        <ul className="mb-8 grid gap-4 sm:grid-cols-2">
          {stats.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-4 rounded-[20px] border border-line bg-surface p-6 shadow-soft"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-500/12 text-brand-500">
                <s.icon className="size-5" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="ltr-nums text-2xl font-black text-fg">
                  {formatNumber(s.value)}
                </span>
                <span className="text-[13px] text-fg-subtle">{s.label}</span>
              </span>
            </li>
          ))}
        </ul>

        {byCourse.length > 0 && (
          <div className="rounded-[20px] border border-line bg-surface p-6 shadow-soft">
            <h2 className="mb-4 text-base font-extrabold text-fg">التوزيع على الكورسات</h2>
            <ul className="flex flex-col gap-3">
              {byCourse.map(({ course, count }) => (
                <li key={course.slug} className="flex items-center justify-between gap-3">
                  <span className="truncate text-[14px] text-fg-muted">{course.title}</span>
                  <span className="ltr-nums shrink-0 text-sm font-bold text-fg">
                    {formatNumber(count)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {access.length > 0 && (
          <div className="mt-6 rounded-[20px] border border-line bg-surface p-6 shadow-soft">
            <h2 className="mb-4 text-base font-extrabold text-fg">آخر ٥ إضافات</h2>
            <ul className="flex flex-col gap-3">
              {access.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 text-[13.5px]">
                  <span className="truncate text-fg-muted" dir="ltr">
                    {a.email}
                  </span>
                  <span className="shrink-0 text-fg-subtle">{formatDate(a.created_at)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
