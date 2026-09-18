"use client";
/** قائمة المقالات بفلترة بالوسوم. */
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Clock } from "lucide-react";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "./empty-state";
import type { Article } from "@/types";

export function ArticleList({ articles, tags }: { articles: Article[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);

  const visible = useMemo(
    () => (tag ? articles.filter((a) => a.tags.includes(tag)) : articles),
    [articles, tag],
  );

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={cn(
              "h-9 rounded-full border px-4 text-sm font-bold transition-colors",
              tag === null
                ? "border-brand-500/40 bg-brand-500/12 text-brand-600 dark:text-brand-300"
                : "border-line bg-surface text-fg-subtle hover:text-fg",
            )}
          >
            الكل
          </button>
        </li>
        {tags.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTag(t === tag ? null : t)}
              aria-pressed={t === tag}
              className={cn(
                "h-9 rounded-full border px-4 text-sm font-bold transition-colors",
                t === tag
                  ? "border-brand-500/40 bg-brand-500/12 text-brand-600 dark:text-brand-300"
                  : "border-line bg-surface text-fg-subtle hover:text-fg",
              )}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <EmptyState title="مفيش مقالات في الوسم ده" description="جرّب وسم تاني." />
      ) : (
        <motion.ul layout className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((article) => (
              <motion.li
                key={article.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <article className="group relative flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 shadow-soft card-hover">
                  <div className="mb-4 flex items-center gap-2">
                    <Badge tone="brand" size="sm">
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[12px] text-fg-subtle">
                      <Clock className="size-3" aria-hidden />
                      <span className="ltr-nums">{formatNumber(article.readingMinutes)}</span> دقايق
                    </span>
                  </div>
                  <h2 className="text-[17px] font-extrabold leading-snug text-fg">
                    <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.85] text-fg-muted">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-6">
                    <time dateTime={article.publishedAt} className="text-[12.5px] text-fg-subtle">
                      {formatDate(article.publishedAt)}
                    </time>
                    <ArrowLeft className="size-4 text-brand-500 transition-transform group-hover:-translate-x-1" />
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
