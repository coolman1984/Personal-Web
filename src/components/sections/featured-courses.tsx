"use client";
/** الكورسات المميّزة بفلترة بالمستوى. المواصفات: docs/DESIGN.md §12.6 */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { CourseCard } from "@/components/course/course-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Course, LevelId } from "@/types";

export function FeaturedCourses({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState<LevelId | "all">("all");

  const tabs: TabItem[] = useMemo(
    () => [
      { value: "all", label: "الكل", count: courses.length },
      {
        value: "beginner",
        label: "مبتدئ",
        count: courses.filter((c) => c.level === "beginner").length,
      },
      {
        value: "intermediate",
        label: "متوسط",
        count: courses.filter((c) => c.level === "intermediate").length,
      },
      {
        value: "advanced",
        label: "متقدّم",
        count: courses.filter((c) => c.level === "advanced").length,
      },
    ],
    [courses],
  );

  const visible = useMemo(
    () => (filter === "all" ? courses : courses.filter((c) => c.level === filter)),
    [courses, filter],
  );

  return (
    <section id="courses" className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="الكورسات"
        title="اختار الكورس اللي بيحلّ مشكلتك"
        description="كل كورس بيبدأ من مشكلة حقيقية في الشغل، وبينتهي بحاجة شغّالة في إيدك."
      >
        <div className="mt-4">
          <Tabs
            tabs={tabs}
            value={filter}
            onChange={(v) => setFilter(v as LevelId | "all")}
            layoutId="featured-courses-tab"
          />
        </div>
      </SectionHeading>

      <motion.ul layout className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((course) => (
            <motion.li
              key={course.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <CourseCard course={course} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button href="/courses" variant="secondary" size="lg" iconAfter={<ArrowLeft />}>
          شوف كل الكورسات
        </Button>
      </Reveal>
    </section>
  );
}
