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
  title: "الباقات",
  description:
    "كورس واحد، أو البرنامج الشامل من ٨ مستويات، أو تدريب مؤسسي مفصّل على عمليات شركتك. كل باقة بمميزاتها والأنسب لمين.",
  path: "/pricing",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "الباقات", href: "/pricing" },
];

export default async function PricingPage() {
  const [tiers, payFaqs] = await Promise.all([getPricingTiers(), getFaqs("الدفع")]);

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(payFaqs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="الباقات"
        title="اختار الشكل اللي يناسبك"
        description="تلات طرق تشتغل معايا بيها: كورس واحد، أو البرنامج الشامل، أو تدريب مفصّل على عمليات شركتك. السعر بيتحدّد بعد ما نتكلّم — عشان يبقى مبني على حالتك مش على قايمة."
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
