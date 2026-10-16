/** آخر المقالات. */
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Article } from "@/types";

export function Articles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="المقالات"
        title="مقالات مستخلَصة من الأدلة"
        description="أفكار كاملة تقدر تستفيد منها النهارده — من غير ما تحجز حاجة."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal as="li" key={article.slug} delay={i * 0.08} className="h-full">
            <article
              className={cn(
                "group relative flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft card-hover",
              )}
            >
              <div className="mb-4 flex items-center gap-2">
                <Badge tone="brand" size="sm">
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1 text-[12px] text-fg-subtle">
                  <Clock className="size-3" aria-hidden />
                  <span className="ltr-nums">{formatNumber(article.readingMinutes)}</span> دقايق
                </span>
              </div>

              <h3 className="text-[17px] font-extrabold leading-snug text-fg">
                <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.85] text-fg-muted">
                {article.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 pt-6">
                <time
                  dateTime={article.publishedAt}
                  className="text-[12.5px] text-fg-subtle"
                >
                  {formatDate(article.publishedAt)}
                </time>
                <ArrowLeft className="size-4 text-brand-500 transition-transform group-hover:-translate-x-1" />
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button href="/articles" variant="secondary" size="lg" iconAfter={<ArrowLeft />}>
          كل المقالات
        </Button>
      </Reveal>
    </section>
  );
}
