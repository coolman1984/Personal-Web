/**
 * صف حقائق مفصولة بنقط — بديل آمن لكتابة « · » وسط النص.
 *
 * ليه مكوّن مخصّص؟ لأن النقطة المكتوبة كنص جنب رقم بتتنقل لمكان غلط،
 * وشكلها بيتلخبط مع الصفر العربي «٠» (شوف docs/DESIGN.md §10.2).
 * هنا كل حقيقة عنصر مستقل في flex، والنقطة عنصر لوحدها — فمفيش تداخل.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FactRow({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  const visible = items.filter(Boolean);
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      {visible.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {item}
          {i < visible.length - 1 && (
            <span aria-hidden className="text-fg-subtle/60">
              ·
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
