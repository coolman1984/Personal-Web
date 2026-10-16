/** English loading state inside the workshop document. */
export default function WorkshopLoading() {
  return (
    <div className="container-x py-28" aria-busy="true" aria-live="polite">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-fg-muted">Loading</p>
      <div className="mt-8 flex flex-col gap-5">
        <div className="h-4 w-40 animate-pulse rounded-[var(--radius)] bg-secondary" />
        <div className="h-20 w-4/5 animate-pulse rounded-[var(--radius)] bg-secondary" />
        <div className="h-6 w-1/2 animate-pulse rounded-[var(--radius)] bg-secondary" />
        <div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse border-b border-e border-border bg-secondary/60" />
          ))}
        </div>
      </div>
    </div>
  );
}
