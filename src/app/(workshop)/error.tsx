"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function WorkshopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[workshop error]", error);
  }, [error]);

  return (
    <main
      className="container-x flex min-h-screen flex-col items-center justify-center py-24 text-center"
      role="alert"
    >
      <h1 className="display-md text-fg">Something went wrong</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
        An unexpected error occurred. Try again, or return to the workshop.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-fg-subtle">Error code: {error.digest}</p>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-primary-solid px-6 text-sm font-medium text-primary-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-[var(--radius)] border border-border bg-secondary px-6 text-sm font-medium text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to the workshop
        </Link>
      </div>
    </main>
  );
}
