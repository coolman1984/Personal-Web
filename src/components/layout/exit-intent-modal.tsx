"use client";
/**
 * نافذة نية الخروج — بتظهر لما الزائر يطلّع الماوس فوق برّه الشاشة،
 * وبتعرض الهدية المجانية قبل ما يمشي.
 * المواصفات: docs/PLAN.md §7.3 — البند ٦٧.
 *
 * قواعد الظهور:
 * ١) مرة واحدة بس لكل زائر — بنفتكر ده في تخزين المتصفّح.
 * ٢) مش قبل ما يقضّي ٢٠ ثانية في الصفحة — عشان ما نزعّجش اللي لسه داخل.
 * ٣) مش على الشاشات الصغيّرة (مفيش ماوس يطلع برّه أصلًا).
 */
import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import { site } from "@/content/site";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useIsDesktop } from "@/hooks/use-media-query";

const STORAGE_KEY = "exit-intent-seen";
/** مهلة الأمان قبل ما نسمح للنافذة تظهر (بالملّي ثانية) */
const GRACE_MS = 20_000;

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const { value: seen, setValue: setSeen, ready } = useLocalStorage(STORAGE_KEY, false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!ready || seen || !isDesktop) return;

    let armed = false;
    const arm = window.setTimeout(() => {
      armed = true;
    }, GRACE_MS);

    // الماوس طلع من أعلى النافذة = الزائر رايح للتاب أو لشريط العنوان
    const onLeave = (e: MouseEvent) => {
      if (!armed || e.clientY > 0 || e.relatedTarget) return;
      setOpen(true);
      setSeen(true);
    };

    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(arm);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [ready, seen, isDesktop, setSeen]);

  const copy = site.exitIntent;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title={copy.title} className="max-w-lg">
      <div className="flex flex-col items-center gap-5 p-6 text-center md:p-8">
        <span className="grid size-14 place-items-center rounded-lg border border-gold-500/25 bg-gold-500/12 text-gold-700 dark:text-gold-300">
          <Gift className="size-6" />
        </span>

        <div>
          <p className="text-[12.5px] font-bold tracking-wide text-brand-600 dark:text-brand-300">
            {copy.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-fg">{site.leadMagnet.title}</h3>
          <p className="mt-3 text-[15px] leading-[1.9] text-fg-muted">{copy.description}</p>
        </div>

        <NewsletterForm className="w-full" />

        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          {copy.dismiss}
        </Button>

        <p className="text-[12.5px] text-fg-subtle">{copy.note}</p>
      </div>
    </Dialog>
  );
}
