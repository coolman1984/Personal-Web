/** صفحة المقال. */
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock } from "lucide-react";
import {
  getAllArticles,
  getArticleBySlug,
  getCourseBySlug,
  getRelatedArticles,
} from "@/lib/queries";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, formatDate, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { ArticleBody } from "@/components/shared/article-body";
import { ShareButtons } from "@/components/shared/share-buttons";
import { ReadingProgress } from "@/components/shared/reading-progress";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return buildMetadata({ title: "المقال مش موجود", description: "", path: "/articles" });

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    keywords: article.tags,
    type: "article",
    publishedAt: article.publishedAt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, relatedCourse] = await Promise.all([
    getRelatedArticles(slug, 3),
    article.relatedCourse ? getCourseBySlug(article.relatedCourse) : Promise.resolve(null),
  ]);

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "المقالات", href: "/articles" },
    { label: article.title, href: `/articles/${article.slug}` },
  ];

  return (
    <>
      <ReadingProgress />
      <JsonLd data={[articleJsonLd(article), breadcrumbJsonLd(crumbs)]} />

      <PageHero crumbs={crumbs} title={article.title} description={article.excerpt}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="brand" size="md">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1.5 text-[13px] text-fg-subtle">
            <Clock className="size-3.5" aria-hidden />
            <span className="ltr-nums">{formatNumber(article.readingMinutes)}</span> دقايق قراءة
          </span>
          <time dateTime={article.publishedAt} className="text-[13px] text-fg-subtle">
            {formatDate(article.publishedAt)}
          </time>
        </div>
      </PageHero>

      <article className="container-x pb-8">
        <div className="mx-auto max-w-3xl">
          <ArticleBody blocks={article.body} />

          <ul className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <li
                key={t}
                className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13px] text-fg-muted"
              >
                #{t}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <ShareButtons url={absoluteUrl(`/articles/${article.slug}`)} title={article.title} />
          </div>

          {/* دعوة للكورس المرتبط */}
          {relatedCourse && (
            <div className="mt-10 rounded-lg border border-line bg-surface p-7 noise ring-gradient">
              <p className="text-[13px] font-bold text-fg-subtle">الكورس اللي بيغطّي ده عمليًا</p>
              <h2 className="mt-2 text-xl font-extrabold text-fg">{relatedCourse.title}</h2>
              <p className="mt-2 text-[14.5px] leading-[1.9] text-fg-muted">
                {relatedCourse.tagline}
              </p>
              <Button
                href={`/courses/${relatedCourse.slug}`}
                size="lg"
                className="mt-5"
                iconAfter={<ArrowLeft />}
              >
                شوف الكورس
              </Button>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-x py-14 md:py-20">
          <h2 className="mb-8 text-2xl font-extrabold text-fg">اقرا كمان</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft card-hover"
                >
                  <Badge tone="neutral" size="sm" className="self-start">
                    {a.category}
                  </Badge>
                  <h3 className="mt-3 text-[16px] font-extrabold leading-snug text-fg">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-fg-muted">
                    {a.excerpt}
                  </p>
                  <ArrowLeft className="mt-auto size-4 pt-4 text-brand-500 transition-transform group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
