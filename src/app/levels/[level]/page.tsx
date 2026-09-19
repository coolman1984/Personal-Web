/** صفحة المستوى الواحد. */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, CircleDot, Sparkles, Wrench } from "lucide-react";
import {
  getAllLevels,
  getCoursesByLevel,
  getLevelById,
  getProjectsByLevel,
  getTools,
} from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { accentFor } from "@/lib/tokens";
import { cn, formatNumber } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { CourseCard } from "@/components/course/course-card";
import { FinalCta } from "@/components/sections/final-cta";
import type { LevelId } from "@/types";

export async function generateStaticParams() {
  const levels = await getAllLevels();
  return levels.map((l) => ({ level: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level: id } = await params;
  const level = await getLevelById(id as LevelId);
  if (!level) return buildMetadata({ title: "مش موجود", description: "", path: "/courses" });

  return buildMetadata({
    title: `${level.label} — ${level.tagline}`,
    description: level.description,
    path: `/levels/${level.id}`,
  });
}

function Panel({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string;
  icon: typeof Check;
  items: string[];
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <h2 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold text-fg">
        <Icon className={cn("size-5", tone)} aria-hidden />
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-[1.8] text-fg-muted">
            <Check className={cn("mt-1 size-4 shrink-0", tone)} strokeWidth={3} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level: id } = await params;
  const level = await getLevelById(id as LevelId);
  if (!level) notFound();

  const [courses, projects, tools] = await Promise.all([
    getCoursesByLevel(level.id),
    getProjectsByLevel(level.id),
    getTools(level.id),
  ]);

  const accent = accentFor(level.id);
  const totalHours = courses.reduce((s, c) => s + c.hours, 0);

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "الكورسات", href: "/courses" },
    { label: level.label, href: `/levels/${level.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={`المستوى ${formatNumber(level.order)} من ٣`}
        title={level.label}
        description={level.description}
      >
        <p className="text-[17px] font-bold text-gold-500">{level.tagline}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral" size="md">
            <span className="ltr-nums">{formatNumber(courses.length)}</span>&nbsp;كورسات
          </Badge>
          <Badge tone="neutral" size="md">
            <span className="ltr-nums">{formatNumber(totalHours)}</span>&nbsp;ساعة تدريبية
          </Badge>
        </div>
      </PageHero>

      <section className="container-x pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <Panel title="هتطلع بإيه؟" icon={Sparkles} items={level.outcomes} tone={accent.text} />
          </Reveal>
          <Reveal delay={0.06}>
            <Panel title="المستوى ده لمين؟" icon={CircleDot} items={level.audience} tone={accent.text} />
          </Reveal>
          <Reveal delay={0.12}>
            <Panel
              title="المطلوب قبل ما تبدأ"
              icon={Wrench}
              items={level.prerequisites}
              tone={accent.text}
            />
          </Reveal>
        </div>
      </section>

      {/* كورسات المستوى */}
      <section className="container-x py-14 md:py-20">
        <h2 className="mb-8 text-2xl font-extrabold text-fg">كورسات {level.shortLabel}</h2>
        <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <li key={c.slug} className="h-full">
              <CourseCard course={c} />
            </li>
          ))}
        </ul>
      </section>

      {/* الأدوات والمخرجات */}
      <section className="container-x pb-14 md:pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-6">
            <h2 className="mb-4 text-lg font-extrabold text-fg">الأدوات في المستوى ده</h2>
            <ul className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <li
                  key={t.name}
                  className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg-muted"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>

          {projects.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-6">
              <h2 className="mb-4 text-lg font-extrabold text-fg">المخرجات اللي هتبنيها</h2>
              <ul className="flex flex-col gap-3">
                {projects.map((p) => (
                  <li key={p.slug} className="flex items-start gap-2.5 text-[14.5px] text-fg-muted">
                    <Check className={cn("mt-1 size-4 shrink-0", accent.text)} strokeWidth={3} aria-hidden />
                    <span>
                      <span className="font-bold text-fg">{p.title}</span> — {p.impact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
