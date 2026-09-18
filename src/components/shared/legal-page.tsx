/** قالب موحّد للصفحات القانونية. */
import { PageHero } from "./page-hero";
import { ArticleBody } from "./article-body";
import type { ArticleBlock } from "@/types";

export function LegalPage({
  title,
  description,
  path,
  updatedAt,
  blocks,
}: {
  title: string;
  description: string;
  path: string;
  updatedAt: string;
  blocks: ArticleBlock[];
}) {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: title, href: path },
        ]}
        title={title}
        description={description}
      >
        <p className="text-[13px] text-fg-subtle">آخر تحديث: {updatedAt}</p>
      </PageHero>
      <section className="container-x pb-14 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <ArticleBody blocks={blocks} />
        </div>
      </section>
    </>
  );
}
