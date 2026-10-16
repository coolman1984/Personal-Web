/** كل المقالات. */
import { getAllArticles, getArticleTags } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { ArticleList } from "@/components/shared/article-list";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata = buildMetadata({
  title: "المقالات",
  description:
    "مقالات مستخلَصة من الأدلة الخمسة: صياغة الطلب، العقل الثاني، الأتمتة، الأنظمة، والوكلاء. أفكار كاملة تقدر تستفيد منها النهارده.",
  path: "/articles",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "المقالات", href: "/articles" },
];

export default async function ArticlesPage() {
  const [articles, tags] = await Promise.all([getAllArticles(), getArticleTags()]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="المقالات"
        title="أفكار كاملة... مجانًا"
        description="كل مقال هنا مستخلَص من الأدلة اللي بدرّسها. اقرا، طبّق، وقرّر بعدين لو الكورس يناسبك."
      />
      <section className="container-x pb-8">
        <ArticleList articles={articles} tags={tags} />
      </section>
      <Newsletter />
    </>
  );
}
