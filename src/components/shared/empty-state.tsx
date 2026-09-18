/** حالة «مفيش نتائج». */
import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title = "مفيش نتائج للبحث ده",
  description = "جرّب كلمة تانية، أو شيل الفلاتر.",
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-strong px-6 py-16 text-center">
      <SearchX className="size-8 text-fg-subtle" aria-hidden />
      <p className="text-base font-bold text-fg">{title}</p>
      <p className="max-w-sm text-sm text-fg-muted">{description}</p>
      {children}
    </div>
  );
}
