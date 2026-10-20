/**
 * كارت Digital Factory تحت الهيرو على طول — أقوى دليل شغال الناس تقدر تفتحه.
 */
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { digitalFactory } from "@/content/digital-factory";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";

export function HomeFlagship({ className }: { className?: string }) {
  const df = digitalFactory;
  return (
    <section
      id={df.id}
      aria-labelledby="digital-factory-title"
      className={cn("-mt-16 bg-background pb-20 md:-mt-20 md:pb-28", className)}
    >
      <div className="container-ws">
        <ScrollReveal>
          <article className="grid grid-cols-1 overflow-hidden border border-border bg-secondary lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <a
              href={df.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden
              className="group relative block min-w-0 border-b border-border lg:border-b-0 lg:border-e"
            >
              <Image
                src={df.image.src}
                alt=""
                width={df.image.width}
                height={df.image.height}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute start-3 top-3 inline-flex items-center gap-2 border border-border bg-background/90 px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-fg">
                <span className="size-2 animate-pulse rounded-full bg-green-500" />
                Live
              </span>
            </a>
            <div className="flex flex-col p-6 md:p-10">
              <Eyebrow>{df.eyebrow}</Eyebrow>
              <h2 id="digital-factory-title" className="display-md mt-4 text-fg">
                {df.title}
              </h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-fg">{df.tagline}</p>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">{df.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {df.highlights.map((h) => (
                  <li
                    key={h}
                    className="border border-border bg-background px-2.5 py-1 font-mono text-xs text-fg-muted"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href={df.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius)] border border-primary-solid bg-primary-solid px-6 text-sm font-medium text-primary-fg transition-[filter] duration-200 hover:brightness-[1.06] focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
                >
                  {df.ctaLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <p className="mt-3 text-xs text-fg-muted">{df.note}</p>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
