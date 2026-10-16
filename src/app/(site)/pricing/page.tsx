/** الأسعار والباقات. */
import { getFaqs, getPricingTiers } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Pricing } from "@/components/sections/pricing";
import { FaqSection } from "@/components/sections/faq-section";
import { CompareTable } from "@/components/course/compare-table";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "الأسعار والباقات",
  description:
    "كورس واحد، أو البرنامج الشامل من ٨ مستويات، أو تدريب مؤسسي مفصّل على عمليات شركتك. كل باقة بمميزاتها والأنسب لمين.",
  path: "/pricing",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "الأسعار", href: "/pricing" },
];

export default async function PricingPage() {
  const [tiers, payFaqs] = await Promise.all([getPricingTiers(), getFaqs("الدفع")]);

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(payFaqs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="الأسعار"
        eyebrowTone="gold"
        title="تسعير واضح... من غير مفاجآت"
        description="الأسعار المعروضة للأفراد. التدريب المؤسسي والفردي المكثّف ليهم تسعير خاص حسب حجم الفريق وعدد الجلسات."
      />
      <Pricing tiers={tiers} />
      <section className="container-x pb-14 md:pb-20">
        <h2 className="mb-8 text-2xl font-extrabold text-fg">أي مستوى يناسبك؟</h2>
        <CompareTable />
      </section>
      <FaqSection faqs={payFaqs} />
      <FinalCta />
    </>
  );
}
