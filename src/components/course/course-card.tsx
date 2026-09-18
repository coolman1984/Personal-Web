/** كارت الكورس. المواصفات الكاملة بالمقاسات: docs/DESIGN.md §5.3 */
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, PackageCheck, Users, Zap } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { accentFor } from "@/lib/tokens";
import { cn, discountPercent, formatNumber, formatPrice } from "@/lib/utils";
import { site } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { LevelBadge } from "./level-badge";
import type { Course } from "@/types";

const statusTone = {
  متاح: "success",
  "الأماكن محدودة": "warn",
  "قريبًا": "neutral",
  مكتمل: "danger",
} as const;

export function CourseCard({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) {
  const Icon = getIcon(course.icon);
  const accent = accentFor(course.level);
  const discount = discountPercent(course.price);

  return (
    <SpotlightCard className={cn("flex h-full flex-col", className)}>
      <div className="flex h-full flex-col p-6">
        {/* الصف العلوي: المستوى والحالة */}
        <div className="mb-5 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <LevelBadge level={course.level} />
            {course.kind === "mini" && (
              <Badge tone="gold" size="sm" icon={<Zap />}>
                ميني
              </Badge>
            )}
          </span>
          <Badge tone={statusTone[course.status]} size="sm">
            {course.status}
          </Badge>
        </div>

        {/* الأيقونة */}
        <span
          className={cn(
            "mb-4 grid size-14 place-items-center rounded-2xl border",
            accent.bg,
            accent.border,
            accent.text,
          )}
        >
          <Icon className="size-6" />
        </span>

        {/* العنوان والوصف */}
        <h3 className="mb-2 line-clamp-2 text-xl font-extrabold leading-snug text-fg">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
            {course.title}
          </Link>
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-[1.8] text-fg-muted">
          {course.tagline}
        </p>

        {/* الوعد — بيظهر في الميني كورسات بس، لأنه مخرج واحد واضح */}
        {course.promise && (
          <p className="mb-4 flex items-start gap-2 rounded-xl border border-gold-500/22 bg-gold-500/8 p-3 text-[12.5px] leading-snug text-fg-muted">
            <PackageCheck
              className="mt-0.5 size-3.5 shrink-0 text-gold-600 dark:text-gold-300"
              aria-hidden
            />
            <span>
              <span className="font-bold text-fg">هتخرج بـ: </span>
              {course.promise}
            </span>
          </p>
        )}

        {/* الميتا */}
        <ul className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-fg-subtle">
          <li className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            <span>{course.duration}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" aria-hidden />
            <span><span className="ltr-nums">{formatNumber(course.sessions)}</span> جلسة</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden />
            <span>حتى <span className="ltr-nums">{formatNumber(course.groupSize)}</span></span>
          </li>
        </ul>

        {course.studentsCount > 0 && (
          <div className="mb-5">
            <Rating value={course.rating} showValue />
          </div>
        )}

        {/* السعر والزر — mt-auto عشان الكروت تتساوى */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-5">
          <div className="flex flex-col">
            {site.features.showPrices ? (
              <>
                <span className="ltr-nums text-xl font-extrabold text-fg">
                  {formatPrice(course.price)}
                </span>
              </>
            ) : (
              <span className="text-[15px] font-bold text-fg">
                {site.priceHidden.label}
              </span>
            )}
            {site.features.showPrices && course.price.compareAt && (
              <span className="mt-1 flex items-center gap-2">
                <span className="ltr-nums text-[13px] text-fg-subtle line-through">
                  {formatNumber(course.price.compareAt)}
                </span>
                {discount && (
                  <span className="text-[11px] font-bold text-gold-600 dark:text-gold-300">
                    وفّر <span className="ltr-nums">{formatNumber(discount)}٪</span>
                  </span>
                )}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-300">
            التفاصيل
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
