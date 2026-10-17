/**
 * بتستلم إيه — المخرجات المكتوبة في Master Profile v3 §4.1، كل واحدة في خانة.
 */
import { cn } from "@/lib/utils";
import type { Offer } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";

interface OfferReceiveProps {
  items: Offer["receive"];
  title: string;
  heading: string;
  className?: string;
}

export function OfferReceive({ items, title, heading, className }: OfferReceiveProps) {
  return (
    <WorkshopSection className={cn("border-t border-border", className)}>
      <Eyebrow>{title}</Eyebrow>
      <ScrollReveal className="mt-6 max-w-3xl">
        <h2 className="font-display text-2xl font-medium leading-snug tracking-tight text-fg md:text-3xl">{heading}</h2>
      </ScrollReveal>
      <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.title} className="bg-background">
            <ScrollReveal className="h-full" delayMs={(index % 3) * 50}>
              <article className="h-full p-7">
                <span className="font-mono text-sm tabular-nums text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </WorkshopSection>
  );
}
