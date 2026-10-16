/** مسار التنقّل — السهم بيشاور لليسار (الاتجاه الصح في العربي). */
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="مسار التنقّل" className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-white/50">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-white/80">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="transition-colors hover:text-gold-500">
                    {item.label}
                  </Link>
                  <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
