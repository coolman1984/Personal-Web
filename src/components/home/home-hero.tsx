/**
 * هيرو الرئيسية — خلفية فاتحة، النص على جنب والصورة الحقيقية على الجنب التاني،
 * وخط مرسوم باليد تحت «clear decisions». المرجع: Master Profile v3 §3.2 و§6.
 */
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface HomeHeroProps {
  hero: HomeContent["hero"];
  className?: string;
}

export function HomeHero({ hero, className }: HomeHeroProps) {
  return (
    <section className={cn("bg-background pb-28 pt-14 text-fg md:pb-36 md:pt-20 lg:pb-40", className)}>
      <div className="container-ws grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* على الموبايل الصورة فوق العنوان — §6 */}
        <div className="relative order-first justify-self-center lg:order-last lg:justify-self-stretch">
          <div
            className="absolute -inset-3 -z-0 border border-border bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60"
            aria-hidden
          />
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            width={hero.portrait.width}
            height={hero.portrait.height}
            priority
            sizes="(min-width: 1280px) 380px, (min-width: 1024px) 340px, 224px"
            className="relative h-auto w-56 border border-border bg-secondary lg:w-full"
          />
          <span className="absolute -bottom-4 start-4 border border-primary-solid bg-primary-solid px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary-fg">
            {hero.brandTag}
          </span>
        </div>

        <div id="workshop-content" tabIndex={-1} className="outline-none">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="display-xl mt-6 max-w-4xl text-fg">
            {hero.headline}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {hero.headlineHighlight}
              <svg
                className="absolute inset-x-0 -bottom-[0.12em] h-[0.18em] w-full text-primary"
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M3 14 C 60 4, 120 18, 180 9 S 270 6, 297 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <ScrollReveal className="mt-8 max-w-2xl">
            <p className="text-lg font-medium leading-relaxed text-fg md:text-xl">{hero.audience}</p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">{hero.subline}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" delayMs={80}>
            <WorkshopButton href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </WorkshopButton>
            <WorkshopButton href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </WorkshopButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
