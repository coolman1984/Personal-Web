/** أهم الأسئلة الشائعة. */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Faq } from "@/types";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const items: AccordionItem[] = faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: <p>{f.answer}</p>,
  }));

  return (
    <section className="container-x py-14 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading
          align="start"
          eyebrow="أسئلة شائعة"
          title="أكتر حاجات بتتسأل"
          description="لو سؤالك مش هنا، كلّمني على واتساب وهرد عليك."
          className="lg:sticky lg:top-28"
        >
          <Link
            href="/faq"
            className="group mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-300"
          >
            شوف كل الأسئلة
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </SectionHeading>

        <Reveal delay={0.1}>
          <Accordion items={items} defaultOpen={["faq-0"]} />
        </Reveal>
      </div>
    </section>
  );
}
