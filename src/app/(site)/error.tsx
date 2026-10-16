"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site error]", error);
  }, [error]);

  return (
    <section
      className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center"
      role="alert"
    >
      <h1 className="text-2xl font-extrabold text-fg">فيه حاجة مش مظبوطة</h1>
      <p className="mt-3 max-w-md text-[16px] leading-[1.9] text-fg-muted">
        حصل خطأ غير متوقّع. جرّب تاني، ولو فضل الحال زي ما هو ارجع للكورسات.
      </p>
      {error.digest ? (
        <p className="ltr-nums mt-3 font-mono text-[12px] text-fg-subtle">رمز الخطأ: {error.digest}</p>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary-solid px-7 text-base font-bold text-primary-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          جرّب تاني
        </button>
        <Link
          href="/courses"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-surface px-7 text-base font-bold text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          ارجع للكورسات
        </Link>
      </div>
    </section>
  );
}
