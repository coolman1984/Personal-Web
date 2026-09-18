"use client";
/** صفحة الخطأ العامة. */
import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // نسجّل التفاصيل للمطوّر بس — المستخدم بيشوف رسالة بسيطة
    console.error("[app error]", error);
  }, [error]);

  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="grid size-16 place-items-center rounded-2xl border border-gold-500/25 bg-gold-500/10 text-gold-600 dark:text-gold-300">
        <TriangleAlert className="size-7" aria-hidden />
      </span>
      <h1 className="mt-7 text-2xl font-extrabold text-fg">فيه حاجة مش مظبوطة</h1>
      <p className="mt-3 max-w-md text-[16px] leading-[1.9] text-fg-muted">
        حصل خطأ غير متوقّع. جرّب تحدّث الصفحة — ولو المشكلة فضلت، كلّمني على واتساب.
      </p>
      {error.digest && (
        <p className="ltr-nums mt-3 font-mono text-[12px] text-fg-subtle">
          رمز الخطأ: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} size="lg" icon={<RotateCcw />}>
          جرّب تاني
        </Button>
        <Button href="/" variant="secondary" size="lg">
          ارجع للرئيسية
        </Button>
      </div>
    </section>
  );
}
