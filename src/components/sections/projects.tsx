/** المشاريع — مخرجات المتدربين. المواصفات: docs/DESIGN.md §12.9 */
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { LevelBadge } from "@/components/course/level-badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/types";

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="المخرجات"
        eyebrowTone="aqua"
        title="مش هتخرج بشهادة... هتخرج بحاجات شغّالة"
        description="دي المخرجات اللي كل متدرّب بيبنيها بإيده خلال البرنامج — من ملفاته هو، مش من تمارين جاهزة."
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const Icon = getIcon(project.icon);
          const accent = accentFor(project.relatedLevel);
          return (
            <Reveal as="li" key={project.slug} delay={i * 0.06} className="h-full">
              <SpotlightCard className="group h-full">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <Badge tone="neutral" size="sm">
                      {project.category}
                    </Badge>
                    <LevelBadge level={project.relatedLevel} showIcon={false} />
                  </div>

                  <span
                    className={cn(
                      "mb-4 grid size-11 place-items-center rounded-xl border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <Icon className="size-5" />
                  </span>

                  <h3 className="text-[17px] font-extrabold leading-snug text-fg">
                    <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.8] text-fg-muted">
                    {project.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-fg-subtle"
                      >
                        {t}
                      </li>
                    ))}
                    {project.tech.length > 3 && (
                      <li className="ltr-nums rounded-md px-2 py-0.5 text-[11px] text-fg-subtle">
                        +{project.tech.length - 3}
                      </li>
                    )}
                  </ul>

                  <p className="mt-auto flex items-start gap-2 rounded-xl bg-surface-2 p-3 pt-3 text-[12.5px] leading-snug text-fg-muted">
                    <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-brand-500" aria-hidden />
                    {project.impact}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button href="/projects" variant="secondary" size="lg" iconAfter={<ArrowLeft />}>
          شوف كل المخرجات
        </Button>
      </Reveal>
    </section>
  );
}
