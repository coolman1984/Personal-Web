/** اختبار تحديد المستوى. */
import { getAllCourses, getQuizQuestions } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { QuizRunner } from "@/components/shared/quiz-runner";

export const metadata = buildMetadata({
  title: "حدّد مستواك في دقيقتين",
  description:
    "ثمانية أسئلة قصيرة بتقولك تبدأ منين بالظبط، وترشّحلك الكورس المناسب لمستواك الحالي وهدفك.",
  path: "/quiz",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "حدّد مستواك", href: "/quiz" },
];

export default async function QuizPage() {
  const [questions, courses] = await Promise.all([getQuizQuestions(), getAllCourses()]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="اختبار سريع"
        title="مش عارف تبدأ منين؟"
        description="ثمانية أسئلة، دقيقتين، وهتعرف مستواك والكورس اللي يناسبك. مفيش صح وغلط — بس كن صادق مع نفسك عشان النتيجة تطلع مفيدة."
      />
      <section className="container-x pb-14 md:pb-20">
        <QuizRunner questions={questions} courses={courses} />
      </section>
    </>
  );
}
