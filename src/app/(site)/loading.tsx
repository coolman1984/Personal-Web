/** Arabic loading state inside the course-site document. */
export default function SiteLoading() {
  return (
    <div className="container-x py-28" aria-busy="true" aria-live="polite">
      <p className="text-sm font-medium text-fg-muted">جارٍ التحميل</p>
      <div className="mt-6 flex flex-col gap-6">
        <div className="h-8 w-32 animate-pulse rounded-full bg-surface-2" />
        <div className="h-14 w-3/4 animate-pulse rounded-lg bg-surface-2" />
        <div className="h-6 w-1/2 animate-pulse rounded-xl bg-surface-2" />
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-lg bg-surface-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
