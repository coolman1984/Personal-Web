"use client";
/** شريط تقدّم التمرير أعلى الصفحة. */
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-60 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-right bg-linear-to-l from-brand-500 via-aqua-500 to-gold-400 transition-[width] duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
