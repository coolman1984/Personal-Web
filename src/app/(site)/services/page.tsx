/** الخدمات — تدريب الفرق، أتمتة الإكسل، أنظمة الإدارة، الوكلاء، اللوحات، الإعلانات. */
import Link from "next/link";
import { ArrowLeft, Check, Clock, Users } from "lucide-react";
import { getAllWork, getServices } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getIcon } from "@/lib/icon";
import { accentClasses } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "الخدمات — تدريب وأتمتة وأنظمة ووكلاء ذكاء اصطناعي",
  description:
    "تدريب فرق العمل على الذكاء الاصطناعي العملي، أتمتة الإكسل والتقارير، أنظمة إدارة بالعربي، وكلاء ذكاء اصطناعي ببوابة موافقة بشرية، لوحات متابعة، وإعلانات موشن جرافيك.",
  path: "/services",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
];

export default async function ServicesPage() {
  const [services, work] = await Promise.all([getServices(), getAllWork()]);
  const workTitle = new Map(work.map((w) => [w.slug, w.title]));
  const accent = accentClasses.gold;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="الخدمات"
        title="ابعتلي الشغلانة اللي بتتكرّر عندك"
        description="وأنا أرد عليك بخطة قصيرة وسعر ثابت. ميزتي إني فاهم لغة الفلوس والتشغيل من جوّه المصنع، وفي نفس الوقت ببني الحل بإيدي — فبتستلم حاجة شغّالة، مش عرض تقديمي."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg" iconAfter={<ArrowLeft />}>
            احكيلي عن شغلك
          </Button>
          <Button
            href="/work"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-gold-500 hover:text-gold-500"
          >
            شوف أعمالي الأول
          </Button>
        </div>
      </PageHero>

      <section className="container-x py-12 md:py-16">
        <ul className="flex flex-col gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal as="li" key={service.slug} delay={i * 0.04}>
                <article
                  id={service.slug}
                  className="grid scroll-mt-28 gap-6 rounded-xl border border-line bg-surface p-6 shadow-soft md:grid-cols-[1.1fr_1fr] md:p-8"
                >
                  <div className="flex flex-col gap-3">
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-xl border",
                        accent.bg,
                        accent.border,
                        accent.text,
                      )}
                    >
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h2 className="text-xl font-extrabold leading-snug text-fg">{service.title}</h2>
                    <p className="text-[15px] leading-[1.9] text-fg-muted">{service.pain}</p>
                    <p className="flex items-start gap-2 text-[13.5px] text-fg-subtle">
                      <Users className="mt-0.5 size-4 shrink-0" aria-hidden />
                      {service.audience}
                    </p>
                    <p className="flex items-center gap-2 text-[13.5px] text-fg-subtle">
                      <Clock className="size-4 shrink-0" aria-hidden />
                      {service.duration}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 rounded-lg bg-surface-2 p-5">
                    <h3 className="text-sm font-extrabold text-fg">هتستلم إيه</h3>
                    <ul className="flex flex-col gap-2.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[14px] leading-[1.8] text-fg-muted">
                          <Check className="mt-1 size-3.5 shrink-0 text-gold-600 dark:text-gold-400" strokeWidth={3} aria-hidden />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {service.proof.length > 0 && (
                      <div className="mt-auto border-t border-line pt-4">
                        <p className="mb-2 text-[12.5px] font-bold text-fg-subtle">اتعملت قبل كده في</p>
                        <ul className="flex flex-wrap gap-2">
                          {service.proof.map((slug) => (
                            <li key={slug}>
                              <Link
                                href={`/work#${slug}`}
                                className="inline-block rounded-md border border-line bg-surface px-2.5 py-1 text-[12.5px] font-bold text-fg-muted transition-colors hover:border-gold-500 hover:text-fg"
                              >
                                {workTitle.get(slug) ?? slug}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <FinalCta />
    </>
  );
}
