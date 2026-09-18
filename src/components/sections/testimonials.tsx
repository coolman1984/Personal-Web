/**
 * آراء المتدربين — بيختفي تلقائيًا لو المصفوفة فاضية.
 * السبب: أحسن من عرض آراء مُختلقة. راجع src/content/testimonials.ts
 */
import { Quote } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { levelAccent, levelShortLabel } from "@/lib/tokens";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Testimonial } from "@/types";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[22rem] shrink-0 flex-col gap-4 rounded-[20px] border border-line bg-surface p-6 shadow-soft">
      <Quote className="size-5 text-brand-500/40" aria-hidden />
      <blockquote className="flex-1 text-[14.5px] leading-[1.9] text-fg-muted">
        {t.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-line pt-4">
        <Avatar initials={t.initials} tone={levelAccent[t.level]} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-fg">{t.name}</p>
          <p className="truncate text-[12px] text-fg-subtle">
            {t.role}
            <span aria-hidden className="mx-1.5 opacity-60">
              ·
            </span>
            {levelShortLabel[t.level]}
          </p>
        </div>
        <Rating value={t.rating} />
      </figcaption>
    </figure>
  );
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  // السكشن بيختفي لحد ما يبقى فيه آراء حقيقية
  if (testimonials.length === 0) return null;

  const half = Math.ceil(testimonials.length / 2);
  const first = testimonials.slice(0, half);
  const second = testimonials.slice(half);

  return (
    <section className="overflow-hidden py-14 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="آراء المتدربين"
          title="اللي قالوه بعد ما خلّصوا"
          description="كل رأي هنا من متدرّب حقيقي، منشور بإذنه."
        />
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <Marquee duration={55}>
          {first.map((t) => (
            <TestimonialCard key={t.name + t.quote.slice(0, 12)} t={t} />
          ))}
        </Marquee>
        {second.length > 0 && (
          <Marquee duration={65} reverse>
            {second.map((t) => (
              <TestimonialCard key={t.name + t.quote.slice(0, 12)} t={t} />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
