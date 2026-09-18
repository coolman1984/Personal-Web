/** صفحة الشكر بعد الحجز. */
import { CheckCircle2, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { getCourseBySlug } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/layout/aurora";

export const metadata = buildMetadata({
  title: "شكرًا",
  description: "وصلنا طلبك.",
  path: "/thank-you",
  noIndex: true,
});

const steps = [
  "هتواصل معاك خلال ٢٤ ساعة لتأكيد الحجز وموعد المجموعة",
  "هبعتلك الأدلة والمواد قبل الجلسة الأولى",
  "جهّز ملف Excel حقيقي من شغلك (غير سرّي) — هنشتغل عليه طول الكورس",
  "هتنضمّ لمجموعة المتدربين قبل البداية بيومين",
];

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; ref?: string }>;
}) {
  const { course: slug, ref } = await searchParams;
  const course = slug ? await getCourseBySlug(slug) : null;

  return (
    <section className="relative isolate overflow-hidden noise">
      <Aurora />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-[oklch(0.58_0.15_150/0.3)] bg-[oklch(0.58_0.15_150/0.12)]">
          <CheckCircle2
            className="size-8 text-[oklch(0.5_0.15_150)] dark:text-[oklch(0.78_0.16_150)]"
            aria-hidden
          />
        </span>

        <h1 className="mt-7 text-[clamp(1.75rem,4vw+0.5rem,2.75rem)] font-black text-fg">
          وصلني طلبك 👌
        </h1>
        {course && (
          <p className="mt-3 text-[17px] text-fg-muted">
            كورس <span className="font-bold text-fg">{course.title}</span>
          </p>
        )}
        {ref && (
          <p className="mt-2 text-[13px] text-fg-subtle">
            رقم المرجع: <span className="ltr-nums font-mono">{ref}</span>
          </p>
        )}

        <div className="mt-10 w-full max-w-lg rounded-[24px] border border-line bg-surface p-6 text-start shadow-soft">
          <h2 className="mb-4 text-base font-extrabold text-fg">الخطوات الجاية</h2>
          <ol className="flex flex-col gap-3.5">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-[14.5px] leading-snug text-fg-muted">
                <span className="ltr-nums grid size-6 shrink-0 place-items-center rounded-full bg-brand-500/12 text-[12px] font-black text-brand-600 dark:text-brand-300">
                  {new Intl.NumberFormat("ar-EG").format(i + 1)}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            href={whatsappLink(
              site.whatsapp,
              course
                ? `السلام عليكم ${site.shortName}، سجّلت في «${course.title}».`
                : `السلام عليكم ${site.shortName}،`,
            )}
            size="lg"
            icon={<MessageCircle />}
            target="_blank"
            rel="noopener noreferrer"
          >
            كلّمني على واتساب
          </Button>
          <Button href="/articles" variant="secondary" size="lg">
            اقرا مقال لحد ما نبدأ
          </Button>
        </div>
      </div>
    </section>
  );
}
