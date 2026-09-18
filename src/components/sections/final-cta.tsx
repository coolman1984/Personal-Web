/** الدعوة الأخيرة. المواصفات: docs/DESIGN.md §12.13 */
import { ArrowLeft, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/layout/aurora";

export function FinalCta() {
  return (
    <section className="container-x pb-8 pt-16 md:pt-20">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[32px] border border-line bg-ink-950 px-6 py-16 text-center noise md:px-12 md:py-20">
          <Aurora className="opacity-90" />
          <div aria-hidden className="absolute inset-0 dots-bg opacity-30" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-black leading-tight text-white">
              خلّي أول أتمتة ليك <span className="text-gradient">الأسبوع الجاي</span>
            </h2>
            <p className="mt-5 text-[16.5px] leading-[1.9] text-white/70">
              ابدأ بالاختبار — ٨ أسئلة في دقيقتين هيقولوك تبدأ منين بالظبط،
              ويرشّحولك الكورس المناسب لمستواك.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/quiz" variant="gold" size="xl" iconAfter={<ArrowLeft />}>
                حدّد مستواك دلوقتي
              </Button>
              <Button href="/courses" variant="secondary" size="xl">
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
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition-colors hover:text-white"
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
