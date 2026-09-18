/** الشعار — نصّي بتدرّج لوني. */
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — الصفحة الرئيسية`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-linear-to-bl from-brand-600 to-aqua-500 text-[15px] font-black text-white shadow-[0_4px_14px_-4px_oklch(0.55_0.23_288/0.6)]">
        <span className="relative z-1">{site.initials}</span>
        <span className="absolute inset-0 shine opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold text-fg">{site.shortName}</span>
        <span className="mt-0.5 text-[10.5px] font-medium text-fg-subtle">
          كورسات الذكاء الاصطناعي
        </span>
      </span>
    </Link>
  );
}
