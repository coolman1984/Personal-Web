/** الدعوة الأخيرة. المواصفات: docs/DESIGN.md §12.13 */
import { ArrowLeft, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/layout/aurora";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden band-navy">
      <Reveal>
        <div className="relative px-6 py-20 text-center md:py-24">
          <Aurora className="opacity-90" />
          <div aria-hidden className="absolute inset-0 dots-bg opacity-30" />

          <div className="container-x relative mx-auto flex max-w-3xl flex-col items-center">
            <h2 className="rule-gold-center text-[clamp(1.875rem,4vw+0.5rem,3rem)] font-black leading-[1.3] text-white">
              خلّي أول أتمتة ليك <span className="text-gold-500">الأسبوع الجاي</span>
            </h2>
            <p className="mt-6 text-[17px] leading-[2] text-white/70">
              ابدأ بالاختبار — ٨ أسئلة في دقيقتين هيقولوك تبدأ منين بالظبط،
              ويرشّحولك الكورس المناسب لمستواك.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/quiz" variant="primary" size="xl" iconAfter={<ArrowLeft />}>
                حدّد مستواك دلوقتي
              </Button>
              <Button
                href="/courses"
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:border-gold-500 hover:text-gold-500"
              >
                استعرض الكورسات
              </Button>
            </div>

            <a
              href={whatsappLink(
                site.whatsapp,
                `السلام عليكم ${site.shortName}، حابب أستشيرك في المستوى المناسب ليا.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition-colors hover:text-gold-500"
            >
              <MessageCircle className="size-4" aria-hidden />
              أو كلّمني على واتساب مباشرة
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
