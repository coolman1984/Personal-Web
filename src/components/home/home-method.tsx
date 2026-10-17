/**
 * الطريقة — أربع مراحل للبرنامج (٩٠ يوم) ببوابة إيقاف، ومبادئ البيانات والتسليم.
 * المرجع: Master Profile v3 §4.2. خلفية فاتحة عشان الشريط الكحلي يفضل واحد بس (§6).
 */
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface HomeMethodProps {
  method: HomeContent["method"];
  className?: string;
}

export function HomeMethod({ method, className }: HomeMethodProps) {
  return (
    <WorkshopSection id={method.id} className={cn("border-t border-border bg-secondary/30", className)}>
      <Eyebrow>{method.eyebrow}</Eyebrow>
      <WordReveal as="h2" text={method.title} className="display-md mt-6" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{method.intro}</p>
      </ScrollReveal>

      <ol className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {method.phases.map((phase, index) => (
          <li key={phase.title} className="bg-background">
            <ScrollReveal className="h-full" delayMs={index * 60}>
              <article className="h-full p-7">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{phase.days}</p>
                <h3 className="mt-2 flex items-baseline gap-3 font-display text-2xl font-medium tracking-tight text-fg">
                  <span className="font-mono text-sm tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{phase.output}</p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>

      <ScrollReveal className="mt-14 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <h3 className="font-display text-xl font-medium text-fg">{method.principlesTitle}</h3>
        <ul className="grid gap-3 text-sm leading-relaxed text-fg-muted md:grid-cols-2">
          {method.principles.map((principle) => (
            <li key={principle} className="border-s-2 border-primary ps-3">
              {principle}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </WorkshopSection>
  );
}
