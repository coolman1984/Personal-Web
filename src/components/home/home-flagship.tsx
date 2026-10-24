/**
 * Digital Factory تحت الهيرو على طول — المصنع الحي نفسه جوه الصفحة (بيبدأ بالعرض)، والكلام تحته.
 */
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { digitalFactory } from "@/content/digital-factory";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { LivePlant } from "@/components/shared/live-plant";

export function HomeFlagship({ className }: { className?: string }) {
  const df = digitalFactory;
  return (
    <section
      id={df.id}
      aria-labelledby="digital-factory-title"
      className={cn("-mt-16 bg-background pb-20 md:-mt-20 md:pb-28", className)}
    >
      <div className="container-ws">
        <LivePlant content={df.live} />
        <ScrollReveal>
          <article className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <Eyebrow>{df.eyebrow}</Eyebrow>
              <h2 id="digital-factory-title" className="display-md mt-4 text-fg">
                {df.title}
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-fg">{df.tagline}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-base leading-relaxed text-fg-muted">{df.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {df.highlights.map((h) => (
                  <li
                    key={h}
                    className="border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-fg-muted"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={df.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius)] border border-primary-solid bg-primary-solid px-6 text-sm font-medium text-primary-fg transition-[filter] duration-200 hover:brightness-[1.06] focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
                >
                  {df.ctaLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <p className="text-xs text-fg-muted">{df.note}</p>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
