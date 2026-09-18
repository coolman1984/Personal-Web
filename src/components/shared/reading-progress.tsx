"use client";
/** شريط تقدّم القراءة — بيظهر فوق في صفحات المقالات. */
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ReadingProgress() {
  const progress = useScrollProgress();
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-61 h-1 bg-transparent">
      <div
        className="h-full bg-linear-to-l from-brand-500 to-aqua-500 transition-[width] duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
