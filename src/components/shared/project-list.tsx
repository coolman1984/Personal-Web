"use client";
/** قائمة المشاريع بفلترة بالتصنيف. */
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { LevelBadge } from "@/components/course/level-badge";
import { EmptyState } from "./empty-state";
import type { Project } from "@/types";

export function ProjectList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [cat, setCat] = useState<string | null>(null);

  const visible = useMemo(
    () => (cat ? projects.filter((p) => p.category === cat) : projects),
    [projects, cat],
  );

  const chip = (active: boolean) =>
    cn(
      "h-9 rounded-full border px-4 text-sm font-bold transition-colors",
      active
        ? "border-brand-500/40 bg-brand-500/12 text-brand-600 dark:text-brand-300"
        : "border-line bg-surface text-fg-subtle hover:text-fg",
    );

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button onClick={() => setCat(null)} aria-pressed={cat === null} className={chip(cat === null)}>
            الكل
          </button>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <button
              onClick={() => setCat(c === cat ? null : c)}
              aria-pressed={c === cat}
              className={chip(c === cat)}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <EmptyState title="مفيش مخرجات في التصنيف ده" description="جرّب تصنيف تاني." />
      ) : (
        <motion.ul layout className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => {
              const Icon = getIcon(project.icon);
              const accent = accentFor(project.relatedLevel);
              return (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <SpotlightCard className="h-full">
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
                      <h2 className="text-[17px] font-extrabold leading-snug text-fg">
                        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-2 line-clamp-3 text-[14px] leading-[1.8] text-fg-muted">
                        {project.summary}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t) => (
                          <li
                            key={t}
                            className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-fg-subtle"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto flex items-start gap-2 rounded-xl bg-surface-2 p-3 pt-3 text-[12.5px] leading-snug text-fg-muted">
                        <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-brand-500" aria-hidden />
                        {project.impact}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
