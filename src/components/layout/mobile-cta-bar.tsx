"use client";
/** شريط CTA سفلي — موبايل فقط. المواصفات: docs/DESIGN.md §5.11 */
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { useScrolledPast } from "@/hooks/use-scroll-progress";
import { Button } from "@/components/ui/button";

export function MobileCtaBar() {
  const visible = useScrolledPast(400);
  if (!site.features.mobileCtaBar) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line glass md:hidden"
        >
          <div className="flex h-17 items-center justify-between gap-3 px-4">
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] text-fg-subtle">مش عارف تبدأ منين؟</span>
              <span className="text-[13px] font-extrabold text-fg">٨ أسئلة في دقيقتين</span>
            </div>
            <Button href="/quiz" size="md">
              حدّد مستواك
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
