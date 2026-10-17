/** أعمالي — أنظمة حقيقية بناها صاحب الموقع، وكودها منشور على GitHub. */
import { ArrowLeft } from "lucide-react";
import { getAllWork, getWorkCategories, githubProfileUrl } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { GitHubIcon } from "@/components/shared/social-icons";
import { WorkList } from "@/components/work/work-list";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "أعمالي — أنظمة حقيقية بكودها",
  description:
    "منصة توصيل، نظام سناتر، أتمتة إكسل بمئات الاختبارات، وكلاء ذكاء اصطناعي لويندوز، ومخطّط مساحات ثلاثي الأبعاد — كلها مبنية بإيدي ومنشورة على GitHub.",
  path: "/work",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "أعمالي", href: "/work" },
];

export default async function WorkPage() {
  const [items, categories] = await Promise.all([getAllWork(), getWorkCategories()]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="أعمالي"
        title="اللي بدرّسه... بشتغل بيه"
        description="أكتر من ١٤ سنة في المالية والتكاليف جوّه مصنع، وبعدها بقيت أبني الحل بإيدي: من شيت الإكسل لحد نظام كامل. كل مشروع هنا كوده مفتوح، والرقم اللي تحته موجود في الكود نفسه."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/services" size="lg" iconAfter={<ArrowLeft />}>
            محتاج حاجة زي دي؟
          </Button>
          <Button
            href={githubProfileUrl()}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-gold-500 hover:text-gold-500"
            target="_blank"
            rel="noopener noreferrer"
            icon={<GitHubIcon />}
          >
            حسابي على GitHub
          </Button>
        </div>
      </PageHero>
      <section className="container-x py-12 md:py-16">
        <WorkList items={items} categories={categories} />
      </section>
      <FinalCta />
    </>
  );
}
