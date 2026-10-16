"use client";
/** القائمة الكبيرة للكورسات. المواصفات: docs/DESIGN.md §5.5 */
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { site } from "@/content/site";
import { cn, formatPrice } from "@/lib/utils";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import type { Course, Level } from "@/types";

interface MegaMenuProps {
  open: boolean;
  levels: Level[];
  coursesByLevel: Record<string, Course[]>;
  onNavigate: () => void;
}

export function MegaMenu({ open, levels, coursesByLevel, onNavigate }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full start-1/2 z-50 w-[min(42rem,calc(100vw-3rem))] ltr:-translate-x-1/2 rtl:translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-lg border border-line glass p-6 shadow-lift">
            <div className="grid gap-5 md:grid-cols-3">
              {levels.map((level) => {
                const Icon = getIcon(level.icon);
                const accent = accentFor(level.id);
                const list = coursesByLevel[level.id] ?? [];
                return (
                  <div key={level.id} className="flex flex-col gap-3">
                    <Link
                      href={`/levels/${level.id}`}
                      onClick={onNavigate}
                      className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-lg border",
                          accent.bg,
                          accent.border,
                          accent.text,
                        )}
                      >
                        <Icon className="size-[18px]" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-extrabold text-fg">
                          {levelShortLabel[level.id]}
                        </span>
                        <span className="mt-0.5 text-[12px] leading-snug text-fg-subtle">
                          {level.tagline}
                        </span>
                      </span>
                    </Link>

                    <ul className="flex flex-col gap-1 border-t border-line pt-2">
                      {list.slice(0, 3).map((course) => (
                        <li key={course.slug}>
                          <Link
                            href={`/courses/${course.slug}`}
                            onClick={onNavigate}
                            className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                          >
                            <span className="line-clamp-1">{course.title}</span>
                            {site.features.showPrices && (
                              <span className="ltr-nums shrink-0 text-[11px] font-bold text-fg-subtle">
                                {formatPrice(course.price)}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <Link
              href="/courses"
              onClick={onNavigate}
              className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-3 text-sm font-bold text-fg transition-colors hover:border-line-strong"
            >
              شوف كل الكورسات
              <ArrowLeft className="size-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
