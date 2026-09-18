/** الأسئلة الشائعة — مصنّفة وقابلة للبحث. */
import { getFaqCategories, getFaqs } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { FaqBrowser } from "@/components/shared/faq-browser";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "الأسئلة الشائعة",
  description:
    "إجابات واضحة على أكتر الأسئلة تكرارًا عن الكورسات والتقييم والدفع والمتطلبات التقنية وسرّية البيانات.",
  path: "/faq",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "الأسئلة الشائعة", href: "/faq" },
];

export default async function FaqPage() {
  const [faqs, categories] = await Promise.all([getFaqs(), getFaqCategories()]);

  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="أسئلة شائعة"
        title="كل اللي ممكن تسأل عنه"
        description="لو سؤالك مش هنا، كلّمني على واتساب وهرد عليك شخصيًا."
      />
      <section className="container-x pb-8">
        <FaqBrowser faqs={faqs} categories={categories} />
      </section>
      <FinalCta />
    </>
  );
}
