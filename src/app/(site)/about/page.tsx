/** صفحة «عني». */
import { ArrowLeft, Check, Quote } from "lucide-react";
import { site } from "@/content/site";
import { getComparison, getMethodPillars, getStats, getTimeline, getTools } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd, personJsonLd } from "@/lib/seo";
import { getIcon } from "@/lib/icon";
import { cn, whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Stats } from "@/components/sections/stats";
import { Method } from "@/components/sections/method";
import { WhyDifferent } from "@/components/sections/why-different";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: `عن ${site.name}`,
  description: site.bio,
  path: "/about",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "عني", href: "/about" },
];

/** الأدلة الخمسة — المصدر: docs/SOURCE-MATERIAL.md §3 */
const guides = [
  { n: "١", title: "من البرومبت إلى نظام عمل كامل", pages: "١٠ صفحات", note: "أكتر من ٤٠ برومبت جاهز" },
  { n: "٢", title: "بناء أدوات وأنظمة عمل ببايثون", pages: "٧ صفحات", note: "من أتمتة لمحرك تحليل لعرض إداري" },
  { n: "٣", title: "من المحرر إلى تطبيق ويب متكامل", pages: "٦ صفحات", note: "بيئة العمل والواجهة والخادم" },
  { n: "٤", title: "GitHub والنماذج والنظام والفريق الرقمي", pages: "٩ صفحات", note: "محدَّث حتى سبتمبر ٢٠٢٦" },
  { n: "٥", title: "من جدول البيانات إلى لوحة معلومات", pages: "صفحتان", note: "مسار من ٨ مراحل" },
];

export default async function AboutPage() {
  const [timeline, stats, pillars, comparison, tools] = await Promise.all([
    getTimeline(),
    getStats(),
    getMethodPillars(),
    getComparison(),
    getTools(),
  ]);

  return (
    <>
      <JsonLd data={[personJsonLd(), breadcrumbJsonLd(crumbs)]} />

      <PageHero
        crumbs={crumbs}
        eyebrow="عني"
        title={site.name}
        description={site.bio}
      >
        <p className="text-[15px] font-bold text-gold-500">{site.role}</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/quiz" size="lg" iconAfter={<ArrowLeft />}>
            حدّد مستواك
          </Button>
          <Button
            href={whatsappLink(site.whatsapp, `السلام عليكم ${site.shortName}،`)}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-gold-500 hover:text-gold-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            كلّمني مباشرة
          </Button>
        </div>
      </PageHero>

      <Stats stats={stats} />

      {/* الفلسفة */}
      <section className="container-x py-14 md:py-20">
        <Reveal>
          <blockquote className="mx-auto max-w-3xl rounded-xl border border-line bg-surface p-8 text-center noise ring-gradient md:p-12">
            <Quote className="mx-auto mb-5 size-7 text-brand-500/50" aria-hidden />
            <p className="text-[clamp(1.25rem,2.5vw+0.5rem,1.75rem)] font-extrabold leading-[1.7] text-fg">
              الهدف مش إنك تستخدم أدوات الذكاء الاصطناعي، بل إنك تشوف شغلك كنظام
              متكامل — وتعرف فين التقنية ممكن تعمل أثر حقيقي.
            </p>
            <footer className="mt-5 text-sm text-fg-subtle">— {site.name}</footer>
          </blockquote>
        </Reveal>
      </section>

      {/* المسيرة */}
      <section className="container-x py-14 md:py-20">
        <h2 className="mb-10 text-2xl font-extrabold text-fg">المسيرة</h2>
        <ol className="relative flex flex-col gap-8">
          <div
            aria-hidden
            className="absolute inset-y-2 start-[19px] w-px bg-linear-to-b from-aqua-500/50 via-brand-500/50 to-gold-500/50"
          />
          {timeline.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal as="li" key={item.year} delay={i * 0.06} className="relative flex gap-5">
                <span className="relative z-1 grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-brand-500">
                  <Icon className="size-[18px]" />
                </span>
                <div className="flex-1 pt-1">
                  <Badge tone="neutral" size="sm" className="mb-2">
                    {item.year}
                  </Badge>
                  <h3 className="text-lg font-extrabold text-fg">{item.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[15px] leading-[1.9] text-fg-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* الأدلة الخمسة */}
      <section className="container-x py-14 md:py-20">
        <h2 className="mb-3 text-2xl font-extrabold text-fg">الأدلة الخمسة</h2>
        <p className="mb-8 max-w-2xl text-[15.5px] leading-[1.9] text-fg-muted">
          كل اللي بدرّسه مجمّع في خمسة أدلة عملية بالعربي — ٣٤ صفحة، مكتوبة بالعربي
          من الأساس مش مترجمة، والمصطلح التقني بيتفكّ أول مرة يتقال.
        </p>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal as="li" key={g.n} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft card-hover">
                <span className="ltr-nums mb-4 grid size-10 place-items-center rounded-xl bg-brand-500/12 text-base font-black text-brand-600 dark:text-brand-300">
                  {g.n}
                </span>
                <h3 className="text-[16px] font-extrabold leading-snug text-fg">{g.title}</h3>
                <p className="mt-2 text-[13.5px] text-fg-muted">{g.note}</p>
                <p className="mt-auto pt-4 text-[12.5px] text-fg-subtle">{g.pages}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <Method pillars={pillars} />
      <WhyDifferent rows={comparison} />

      {/* الأدوات */}
      <section className="container-x py-14 md:py-20">
        <h2 className="mb-8 text-2xl font-extrabold text-fg">الأدوات اللي بشتغل وبدرّس بيها</h2>
        <ul className="flex flex-wrap gap-2.5">
          {tools.map((t) => (
            <li
              key={t.name}
              className={cn(
                "flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5",
                "text-sm font-bold text-fg-muted transition-colors hover:border-line-strong hover:text-fg",
              )}
            >
              <Check className="size-3.5 text-brand-500" strokeWidth={3} aria-hidden />
              {t.name}
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  );
}
