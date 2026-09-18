"use client";
/** متصفّح الكورسات — بحث + فلترة بالمستوى + ترتيب. */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { Select, Input } from "@/components/ui/field";
import { site } from "@/content/site";
import { EmptyState } from "@/components/shared/empty-state";
import { CourseCard } from "./course-card";
import { formatNumber } from "@/lib/utils";
import type { Course, LevelId } from "@/types";

type SortKey = "default" | "price-asc" | "price-desc" | "hours-asc" | "hours-desc";

const sortLabels: Record<SortKey, string> = {
  default: "الترتيب: المستوى",
  "price-asc": "السعر: من الأقل",
  "price-desc": "السعر: من الأعلى",
  "hours-asc": "المدة: الأقصر",
  "hours-desc": "المدة: الأطول",
};

/** خيارات الترتيب المتاحة — بنشيل السعر لو الأسعار مخفية */
const visibleSortKeys = (Object.keys(sortLabels) as SortKey[]).filter(
  (k) => site.features.showPrices || !k.startsWith("price"),
);

export function CourseBrowser({ courses }: { courses: Course[] }) {
  const [level, setLevel] = useState<LevelId | "all" | "mini">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const tabs: TabItem[] = useMemo(
    () => [
      { value: "all", label: "الكل", count: courses.length },
      { value: "mini", label: "ميني", count: courses.filter((c) => c.kind === "mini").length },
      { value: "beginner", label: "مبتدئ", count: courses.filter((c) => c.level === "beginner").length },
      { value: "intermediate", label: "متوسط", count: courses.filter((c) => c.level === "intermediate").length },
      { value: "advanced", label: "متقدّم", count: courses.filter((c) => c.level === "advanced").length },
    ],
    [courses],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = courses.filter((c) => {
      const matchLevel =
        level === "all" || (level === "mini" ? c.kind === "mini" : c.level === level);
      const matchQuery =
        !q ||
        [c.title, c.tagline, c.summary, ...c.keywords, ...c.tools]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchLevel && matchQuery;
    });

    const sorters: Record<SortKey, ((a: Course, b: Course) => number) | null> = {
      default: null,
      "price-asc": (a, b) => a.price.amount - b.price.amount,
      "price-desc": (a, b) => b.price.amount - a.price.amount,
      "hours-asc": (a, b) => a.hours - b.hours,
      "hours-desc": (a, b) => b.hours - a.hours,
    };
    const sorter = sorters[sort];
    if (sorter) list = [...list].sort(sorter);
    return list;
  }, [courses, level, query, sort]);

  return (
    <div className="flex flex-col gap-8">
      {/* أدوات التصفية */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs
          tabs={tabs}
          value={level}
          onChange={(v) => setLevel(v as LevelId | "all" | "mini")}
          layoutId="browser-tab"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
              aria-hidden
            />
            <label htmlFor="course-search" className="sr-only">
              ابحث في الكورسات
            </label>
            <Input
              id="course-search"
              type="search"
              placeholder="ابحث في الكورسات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pe-11 sm:w-60"
            />
          </div>
          <label htmlFor="course-sort" className="sr-only">
            ترتيب النتائج
          </label>
          <Select
            id="course-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="sm:w-52"
          >
            {visibleSortKeys.map((k) => (
              <option key={k} value={k}>
                {sortLabels[k]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <p className="text-[13px] text-fg-subtle">
        <span className="ltr-nums">{formatNumber(visible.length)}</span> كورس
      </p>

      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.ul layout className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((course) => (
              <motion.li
                key={course.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <CourseCard course={course} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
