/** هيكل التحميل. */
export default function Loading() {
  return (
    <div className="container-x py-28">
      <div className="flex flex-col gap-6">
        <div className="h-8 w-32 animate-pulse rounded-full bg-surface-2" />
        <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-surface-2" />
        <div className="h-6 w-1/2 animate-pulse rounded-xl bg-surface-2" />
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-[20px] bg-surface-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
