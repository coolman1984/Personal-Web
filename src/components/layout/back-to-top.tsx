"use client";
/** زر العودة لأعلى — بيظهر بعد تمرير ٦٠٠ بكسل. */
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useScrolledPast } from "@/hooks/use-scroll-progress";

export function BackToTop() {
  const visible = useScrolledPast(600);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="العودة لأعلى الصفحة"
          className="fixed bottom-6 start-5 z-40 grid size-11 place-items-center rounded-full border border-line glass text-fg-muted shadow-soft transition-colors hover:text-fg"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
