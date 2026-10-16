/** معرض المشاريع (مخرجات المتدربين). */
import { getAllProjects, getProjectCategories } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { ProjectList } from "@/components/shared/project-list";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "المخرجات — مش هتخرج بشهادة بس",
  description:
    "المخرجات اللي كل متدرّب بيبنيها بإيده خلال البرنامج: مكتبة برومبتات، دفتر معرفة، أتمتة، أداة، لوحة معلومات، تطبيق، خريطة نظام، وفريق رقمي.",
  path: "/projects",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "المشاريع", href: "/projects" },
];

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([getAllProjects(), getProjectCategories()]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="المخرجات"
        eyebrowTone="aqua"
        title="اللي هتخرج بيه فعلًا"
        description="كل مخرج هنا مطلوب إلزاميًا في البرنامج — بيتبني من ملفاتك إنت، مش من تمارين جاهزة، وبيبقى قابل للاستخدام نفس الأسبوع."
      />
      <section className="container-x pb-8">
        <ProjectList projects={projects} categories={categories} />
      </section>
      <FinalCta />
    </>
  );
}
