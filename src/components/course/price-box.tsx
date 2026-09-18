/** صندوق السعر اللاصق في صفحة الكورس. المواصفات: docs/DESIGN.md §9.2 */
import { CalendarDays, Check, Clock, GraduationCap, Users } from "lucide-react";
import { site } from "@/content/site";
import { cn, discountPercent, formatNumber, formatPrice, whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";

export function PriceBox({ course }: { course: Course }) {
  const discount = discountPercent(course.price);
  const soldOut = course.status === "مكتمل";

  const facts = [
    { icon: Clock, label: "المدة", value: course.duration },
    { icon: GraduationCap, label: "الجلسات", value: `${formatNumber(course.sessions)} جلسة` },
    { icon: Clock, label: "الساعات", value: `${formatNumber(course.hours)} ساعة` },
    { icon: Users, label: "حجم المجموعة", value: `حتى ${formatNumber(course.groupSize)}` },
    ...(course.nextCohort
      ? [{ icon: CalendarDays, label: "أقرب مجموعة", value: course.nextCohort }]
      : []),
  ];

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-[24px] border border-line bg-surface p-6 shadow-soft ring-gradient">
        {/* السعر */}
        <div className="flex items-end gap-3">
          <span className="ltr-nums text-[2.25rem] font-black leading-none text-fg">
            {formatPrice(course.price)}
          </span>
          {course.price.compareAt && (
            <span className="ltr-nums pb-1 text-sm text-fg-subtle line-through">
              {formatNumber(course.price.compareAt)}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {course.price.note && (
            <span className="text-[13px] text-fg-subtle">{course.price.note}</span>
          )}
          {discount && (
            <Badge tone="gold" size="sm">
              خصم <span className="ltr-nums">{formatNumber(discount)}٪</span>
            </Badge>
          )}
        </div>

        {/* الحقائق */}
        <ul className="mt-6 flex flex-col gap-3 border-y border-line py-5">
          {facts.map((f) => (
            <li key={f.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-fg-subtle">
                <f.icon className="size-4" aria-hidden />
                {f.label}
              </span>
              <span className="font-bold text-fg">{f.value}</span>
            </li>
          ))}
        </ul>

        {/* الأماكن المتبقية */}
        {typeof course.seatsLeft === "number" && !soldOut && (
          <p className="mt-4 rounded-xl border border-gold-500/25 bg-gold-500/10 p-3 text-center text-[13px] font-bold text-gold-600 dark:text-gold-300">
            آخر <span className="ltr-nums">{formatNumber(course.seatsLeft)}</span> أماكن في
            المجموعة الجاية
          </p>
        )}

        {/* الأزرار */}
        <div className="mt-5 flex flex-col gap-2.5">
          <Button
            href={soldOut ? "/contact" : `/enroll/${course.slug}`}
            size="lg"
            fullWidth
            variant={soldOut ? "secondary" : "primary"}
          >
            {soldOut ? "سجّل في قائمة الانتظار" : "احجز مكانك"}
          </Button>
          <Button
            href={whatsappLink(
              site.whatsapp,
              `السلام عليكم ${site.shortName}، حابب أسأل عن كورس «${course.title}».`,
            )}
            variant="secondary"
            size="lg"
            fullWidth
            target="_blank"
            rel="noopener noreferrer"
          >
            اسأل على واتساب
          </Button>
        </div>

        {/* الضمانات */}
        <ul className="mt-5 flex flex-col gap-2">
          {site.guarantees.slice(0, 3).map((g) => (
            <li key={g} className="flex items-start gap-2 text-[12.5px] leading-snug text-fg-muted">
              <Check className="mt-0.5 size-3.5 shrink-0 text-brand-500" strokeWidth={3} aria-hidden />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
