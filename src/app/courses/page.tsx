/** كل الكورسات. */
import { getAllCourses } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { CourseBrowser } from "@/components/course/course-browser";
import { CompareTable } from "@/components/course/compare-table";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "كل الكورسات — من الصفر للمستوى المتقدّم",
  description:
    "تسع كورسات على ثلاث مستويات: مبتدئ، متوسط، ومتقدّم. كل كورس بيبدأ من مشكلة حقيقية في الشغل وبينتهي بحاجة شغّالة في إيدك.",
  path: "/courses",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "الكورسات", href: "/courses" },
];

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="الكورسات"
        title="اختار الكورس اللي بيحلّ مشكلتك"
        description="مش لازم تبدأ من الأول. كل كورس مستقلّ وبيحلّ مشكلة محدّدة، والبرنامج الشامل بيجمعهم كلهم في مسار واحد."
      />

      <section className="container-x pb-8">
        <CourseBrowser courses={courses} />
      </section>

      <section className="container-x py-14 md:py-20">
        <h2 className="mb-8 text-2xl font-extrabold text-fg">قارن بين المستويات التلاتة</h2>
        <CompareTable />
      </section>

      <FinalCta />
    </>
  );
}
