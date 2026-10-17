/**
 * «المشاكل اللي بحلها» — أربع كروت مرقّمة على خلفية فاتحة.
 * المرجع: Master Profile v3 §7 (البلوك ٣).
 */
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface HomeProblemsProps {
  problems: HomeContent["problems"];
  className?: string;
}

export function HomeProblems({ problems, className }: HomeProblemsProps) {
  return (
    <WorkshopSection id={problems.id} className={className}>
      <Eyebrow>{problems.eyebrow}</Eyebrow>
      <WordReveal as="h2" text={problems.title} className="display-md mt-6" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{problems.intro}</p>
      </ScrollReveal>
      <ol className="mt-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
        {problems.items.map((item, index) => (
          <li
            key={item.title}
            className="border-b border-border md:[&:nth-child(odd)]:border-e lg:border-e lg:last:border-e-0"
          >
            <ScrollReveal className="h-full" delayMs={index * 50}>
              <article className="h-full p-7">
                <span className="font-mono text-sm tabular-nums text-fg-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-base">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </WorkshopSection>
  );
}
