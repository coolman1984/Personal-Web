"use client";
/** قائمة الأعمال بفلترة بالتصنيف — صفحة /work. نفس نمط components/shared/project-list.tsx */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { WorkCard } from "./work-card";
import type { WorkItemView } from "@/types";

interface WorkListProps {
  items: WorkItemView[];
  categories: string[];
  className?: string;
}

export function WorkList({ items, categories, className }: WorkListProps) {
  const [cat, setCat] = useState<string | null>(null);

  const visible = useMemo(
    () => (cat ? items.filter((w) => w.category === cat) : items),
    [items, cat],
  );

  const chip = (active: boolean) =>
    cn(
      "h-9 rounded-full border px-4 text-sm font-bold transition-colors",
      active
        ? "border-brand-500/40 bg-brand-500/12 text-brand-600 dark:text-brand-300"
        : "border-line bg-surface text-fg-subtle hover:text-fg",
    );

  return (
    <div className={cn("flex flex-col gap-8", className)}>
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

      <motion.ul layout className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <WorkCard item={item} detailed headingLevel="h2" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
