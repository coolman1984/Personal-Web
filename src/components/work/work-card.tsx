/**
 * كارت عمل حقيقي — بيظهر في سكشن «أعمالي» في الرئيسية وفي صفحة /work.
 * نفس شكل كارت المخرجات (docs/DESIGN.md §12.9) + روابط المستودع والنسخة الشغّالة.
 */
import { ExternalLink, FlaskConical } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { accentClasses } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GitHubIcon } from "@/components/shared/social-icons";
import type { WorkItemView, WorkStatus } from "@/types";

/** لون شارة الحالة — الأخضر للشغّال، والذهبي للي لسه بيتبني */
const statusTone: Record<WorkStatus, "success" | "aqua" | "warn"> = {
  "شغّال": "success",
  "نسخة تجريبية": "aqua",
  "تحت البناء": "warn",
};

interface WorkCardProps {
  item: WorkItemView;
  /** يعرض المشكلة والحل — في صفحة /work */
  detailed?: boolean;
  /** مستوى العنوان — h3 في الرئيسية، h2 في صفحة الأعمال */
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function WorkCard({ item, detailed = false, headingLevel = "h3", className }: WorkCardProps) {
  const Icon = getIcon(item.icon);
  const accent = accentClasses.brand;
  const Heading = headingLevel;

  return (
    <SpotlightCard className={cn("h-full", className)}>
      <article id={item.slug} className="flex h-full scroll-mt-28 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Badge tone="neutral" size="sm">
            {item.category}
          </Badge>
          <Badge tone={statusTone[item.status]} size="sm">
            {item.status}
          </Badge>
        </div>

        <span
          className={cn(
            "mb-4 grid size-11 place-items-center rounded-xl border",
            accent.bg,
            accent.border,
            accent.text,
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>

        <Heading className="text-[17px] font-extrabold leading-snug text-fg">{item.title}</Heading>
        <p className={cn("mt-2 text-[14px] leading-[1.8] text-fg-muted", !detailed && "line-clamp-3")}>
          {item.summary}
        </p>

        {detailed && (
          <dl className="mt-4 flex flex-col gap-3 text-[13.5px] leading-[1.8]">
            <div>
              <dt className="font-extrabold text-fg">المشكلة</dt>
              <dd className="text-fg-muted">{item.problem}</dd>
            </div>
            <div>
              <dt className="font-extrabold text-fg">الحل</dt>
              <dd className="text-fg-muted">{item.solution}</dd>
            </div>
          </dl>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-fg-subtle"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 pt-5">
          <p className="flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-[12.5px] leading-snug text-fg-muted">
            <FlaskConical className="mt-0.5 size-3.5 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden />
            {item.evidence}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-bold">
            <a
              href={item.repoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fg transition-colors hover:text-gold-700 dark:hover:text-gold-400"
            >
              <GitHubIcon className="size-4" aria-hidden />
              الكود على GitHub
            </a>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold-700 transition-colors hover:opacity-80 dark:text-gold-400"
              >
                <ExternalLink className="size-4" aria-hidden />
                جرّبها أونلاين
              </a>
            )}
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
