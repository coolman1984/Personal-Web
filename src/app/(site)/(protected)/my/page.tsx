/** كورساتي — اللي مفتوح للمتدرّب. */
import Link from "next/link";
import { ArrowLeft, BookOpen, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { getMyCourses } from "@/lib/access";
import { getUserEmail } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber, whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { LevelBadge } from "@/components/course/level-badge";

export const metadata = buildMetadata({
  title: "كورساتي",
  description: "مواد المراجعة للكورسات المفتوحة ليك.",
  path: "/my",
  noIndex: true,
});

export default async function MyCoursesPage() {
  const [courses, email] = await Promise.all([getMyCourses(), getUserEmail()]);

  return (
    <>
      <PageHero
        eyebrow="منطقتك"
        title="كورساتي"
        description="هنا مواد المراجعة بتاعت كل كورس حجزته — البرومبتات والقوالب والقوايم. بتفضل معاك."
      >
        {email && (
          <p className="text-[13px] text-fg-subtle" dir="ltr">
            {email}
          </p>
        )}
      </PageHero>

      <section className="container-x pb-14 md:pb-20">
        {courses.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-lg border border-dashed border-line-strong p-8 text-center">
            <BookOpen className="mx-auto mb-4 size-8 text-fg-subtle" aria-hidden />
            <h2 className="text-lg font-extrabold text-fg">لسه مفيش كورسات مفتوحة</h2>
            <p className="mt-2.5 text-[14.5px] leading-[1.9] text-fg-muted">
              لو حجزت بالفعل، يمكن تكون دخلت بإيميل غير اللي حجزت بيه. كلّمني
              وهظبّطها في دقيقة.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/courses" size="md" iconAfter={<ArrowLeft />}>
                شوف الكورسات
              </Button>
              <Button
                href={whatsappLink(
                  site.whatsapp,
                  `السلام عليكم ${site.shortName}، دخلت بإيميل ${email ?? ""} ومش لاقي كورساتي.`,
                )}
                variant="secondary"
                size="md"
                icon={<MessageCircle />}
                target="_blank"
                rel="noopener noreferrer"
              >
                كلّمني
              </Button>
            </div>
          </div>
        ) : (
          <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const Icon = getIcon(course.icon);
              const accent = accentFor(course.level);
              return (
                <li key={course.slug} className="h-full">
                  <Link
                    href={`/my/${course.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft card-hover"
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <LevelBadge level={course.level} />
                      {course.kind === "mini" && (
                        <Badge tone="gold" size="sm">
                          ميني
                        </Badge>
                      )}
                    </div>
                    <span
                      className={cn(
                        "mb-4 grid size-12 place-items-center rounded-xl border",
                        accent.bg,
                        accent.border,
                        accent.text,
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <h2 className="text-[17px] font-extrabold leading-snug text-fg">
                      {course.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-fg-muted">
                      {course.tagline}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-5 text-[13px] text-fg-subtle">
                      <span>
                        <span className="ltr-nums">{formatNumber(course.sessions)}</span> جلسات
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-300">
                        افتح المراجعة
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
