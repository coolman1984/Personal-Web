"use client";

import { useEffect } from "react";
import "./globals.css";
import { latinFontClassName } from "@/lib/fonts";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en" className={latinFontClassName}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <main className="container-x flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center">
          <h1 className="text-2xl font-medium text-fg">Something went wrong</h1>
          <p className="mt-3 max-w-md text-base text-fg-muted">
            The page could not be shown. Try again.
          </p>
          <p className="mt-2 max-w-md text-base text-fg-muted" lang="ar" dir="rtl">
            الصفحة متعملتش. جرّب تاني.
          </p>
          {error.digest ? (
            <p className="mt-3 font-mono text-xs text-fg-subtle">Error code: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-primary-solid px-6 text-sm font-medium text-primary-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
