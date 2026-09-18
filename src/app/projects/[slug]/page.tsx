/** صفحة المشروع. */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Target, TrendingUp, Wrench } from "lucide-react";
import { getAllProjects, getCoursesByLevel, getProjectBySlug } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { LevelBadge } from "@/components/course/level-badge";
import { CourseCard } from "@/components/course/course-card";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "مش موجود", description: "", path: "/projects" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: project.tech,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const courses = await getCoursesByLevel(project.relatedLevel);
  const accent = accentFor(project.relatedLevel);

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "المشاريع", href: "/projects" },
    { label: project.title, href: `/projects/${project.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero crumbs={crumbs} title={project.title} description={project.summary}>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral" size="md">
            {project.category}
          </Badge>
          <LevelBadge level={project.relatedLevel} size="md" />
        </div>
      </PageHero>

      <section className="container-x pb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[20px] border border-[oklch(0.55_0.2_25/0.2)] bg-[oklch(0.55_0.2_25/0.05)] p-6">
              <h2 className="mb-3 flex items-center gap-2.5 text-lg font-extrabold text-fg">
                <Target className="size-5 text-[oklch(0.55_0.2_25)] dark:text-[oklch(0.75_0.19_25)]" aria-hidden />
                المشكلة
              </h2>
              <p className="text-[15px] leading-[2] text-fg-muted">{project.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-[20px] border border-[oklch(0.58_0.15_150/0.25)] bg-[oklch(0.58_0.15_150/0.06)] p-6">
              <h2 className="mb-3 flex items-center gap-2.5 text-lg font-extrabold text-fg">
                <Check
                  className="size-5 text-[oklch(0.45_0.15_150)] dark:text-[oklch(0.78_0.16_150)]"
                  strokeWidth={3}
                  aria-hidden
                />
                الحل
              </h2>
              <p className="text-[15px] leading-[2] text-fg-muted">{project.solution}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="rounded-[20px] border border-line bg-surface p-6">
            <h2 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold text-fg">
              <Check className={cn("size-5", accent.text)} strokeWidth={3} aria-hidden />
              أهم اللي بتتعلّمه
            </h2>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] leading-[1.9] text-fg-muted">
                  <Check className={cn("mt-1 size-4 shrink-0", accent.text)} strokeWidth={3} aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[20px] border border-line bg-surface p-6">
              <h2 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold text-fg">
                <Wrench className="size-5 text-fg-subtle" aria-hidden />
                الأدوات
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col justify-center rounded-[20px] border border-line bg-surface p-6 noise ring-gradient">
              <h2 className="mb-2 flex items-center gap-2.5 text-lg font-extrabold text-fg">
                <TrendingUp className="size-5 text-brand-500" aria-hidden />
                الأثر
              </h2>
              <p className="text-[15px] leading-[1.9] text-fg-muted">{project.impact}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {courses.length > 0 && (
        <section className="container-x py-14 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-fg">
              الكورسات اللي بتبني المخرج ده
            </h2>
            <Button href={`/levels/${project.relatedLevel}`} variant="link" iconAfter={<ArrowLeft className="size-4" />}>
              كل كورسات {levelShortLabel[project.relatedLevel]}
            </Button>
          </div>
          <ul className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((c) => (
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
