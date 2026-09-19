/**
 * الشعار — مربّع كحلي بحروف ذهبية + اسم.
 * المواصفات: docs/DESIGN.md §14.6
 * `onDark` بتتستخدم فوق الشرايط الكحلية (الفوتر) — من غيرها النصّ بيختفي.
 */
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — الصفحة الرئيسية`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative grid size-9 place-items-center overflow-hidden rounded-md text-[15px] font-black",
          onDark
            ? "bg-gold-500 text-brand-900"
            : "bg-brand-900 text-gold-500 shadow-[0_4px_14px_-4px_oklch(0.2522_0.0562_264/0.45)]",
        )}
      >
        <span className="relative z-1">{site.initials}</span>
        <span className="absolute inset-0 shine opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="flex flex-col gap-1 leading-none">
        <span className={cn("text-[15px] font-extrabold", onDark ? "text-white" : "text-fg")}>
          {site.shortName}
        </span>
        <span
          className={cn(
            "text-[10.5px] font-medium leading-none",
            onDark ? "text-white/70" : "text-fg-subtle",
          )}
        >
          كورسات الذكاء الاصطناعي
        </span>
      </span>
    </Link>
  );
}
