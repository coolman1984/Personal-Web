/** صفحة التواصل. */
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { getFaqs } from "@/lib/queries";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactForm } from "@/components/shared/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "تواصل معايا",
  description:
    "احجز كورس، أو اسأل عن التدريب المؤسسي، أو خُد استشارة. بيتم الرد خلال ٢٤ ساعة، وواتساب أسرع.",
  path: "/contact",
});

const crumbs = [
  { label: "الرئيسية", href: "/" },
  { label: "تواصل", href: "/contact" },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const faqs = await getFaqs("عام");

  const defaultSubject = topic === "corporate" ? "تدريب مؤسسي لشركة" : undefined;

  const channels = [
    {
      icon: MessageCircle,
      label: "واتساب",
      value: "أسرع طريقة للرد",
      href: whatsappLink(site.whatsapp, `السلام عليكم ${site.shortName}،`),
      external: true,
    },
    { icon: Mail, label: "الإيميل", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "التليفون", value: site.phoneDisplay, href: undefined },
    { icon: MapPin, label: "المكان", value: site.location, href: undefined },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow="تواصل"
        title="قوللي إنت عايز إيه بالظبط"
        description="كل ما توصف وضعك بدقة أكتر، كل ما ترشيحي يبقى أفيد. الرد خلال ٢٤ ساعة، وواتساب أسرع."
      />

      <section className="container-x pb-14 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <Reveal>
            <div className="rounded-lg border border-line bg-surface p-6 shadow-soft md:p-8">
              <ContactForm defaultSubject={defaultSubject} />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <Reveal delay={0.08}>
              <ul className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-6 shadow-soft">
                {channels.map((c) => {
                  const inner = (
                    <>
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-brand-500">
                        <c.icon className="size-[18px]" aria-hidden />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[12.5px] text-fg-subtle">{c.label}</span>
                        <span className="truncate text-sm font-bold text-fg" dir="auto">
                          {c.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a
                          href={c.href}
                          {...(c.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 p-2">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div>
                <h2 className="mb-3 text-base font-extrabold text-fg">أسئلة سريعة</h2>
                <Accordion items={faqs.slice(0, 4).map((f, i) => ({
                  id: `cq-${i}`,
                  title: f.question,
                  content: <p>{f.answer}</p>,
                }))} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
