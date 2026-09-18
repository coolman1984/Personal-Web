"use client";
/**
 * نافذة نية الخروج — بتظهر مرة واحدة بس لما الزائر يطلّع الماوس فوق الشاشة.
 * بتتحفظ في المتصفّح عشان ما تزهّقش الزائر بتكرارها.
 */
import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import { site } from "@/content/site";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useIsDesktop } from "@/hooks/use-media-query";
import { Dialog } from "@/components/ui/dialog";
import { NewsletterForm } from "./newsletter-form";

const STORAGE_KEY = "exit-intent-seen";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const { value: seen, setValue: setSeen, ready } = useLocalStorage(STORAGE_KEY, false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!site.features.exitIntent || !ready || seen || !isDesktop) return;

    // بنستنى ٢٠ ثانية الأول — عشان ما نقاطعش حد لسه داخل
    const armAt = Date.now() + 20_000;

    function onLeave(e: MouseEvent) {
      // الماوس خرج من فوق الشاشة = نية إغلاق التبويب
      if (e.clientY > 8 || Date.now() < armAt) return;
      setOpen(true);
      setSeen(true);
      document.removeEventListener("mouseout", onLeave);
    }

    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [ready, seen, isDesktop, setSeen]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="max-w-lg">
      <div className="flex flex-col items-center gap-5 p-8 text-center noise">
        <span className="grid size-14 place-items-center rounded-2xl border border-gold-500/25 bg-gold-500/12 text-gold-600 dark:text-gold-300">
          <Gift className="size-6" aria-hidden />
        </span>

        <div>
          <h2 className="text-xl font-extrabold text-fg">قبل ما تمشي...</h2>
          <p className="mt-2.5 text-[15px] leading-[1.9] text-fg-muted">
            خُد <span className="font-bold text-fg">{site.leadMagnet.title}</span> مجانًا.
            البرومبتات اللي بستخدمها فعليًا في التنظيم والتحليل والقرار.
          </p>
        </div>

        <NewsletterForm className="w-full" />

        <button
          onClick={() => setOpen(false)}
          className="text-[13px] text-fg-subtle underline underline-offset-4 transition-colors hover:text-fg"
        >
          لأ شكرًا، كمّل تصفّح
        </button>
      </div>
    </Dialog>
  );
}
