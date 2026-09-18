"use client";
/** الباقات بمبدّل فردي/مجموعة. المواصفات: docs/DESIGN.md §12.11 */
import { useState } from "react";
import { Check, X } from "lucide-react";
import { accentClasses } from "@/lib/tokens";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { PricingTier } from "@/types";

export function Pricing({ tiers }: { tiers: PricingTier[] }) {
  const [group, setGroup] = useState(false);
  const hasGroupPricing = tiers.some((t) => t.groupPrice);

  return (
    <section id="pricing" className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="الأسعار"
        eyebrowTone="gold"
        title="اختار اللي يناسبك"
        description="الأسعار للأفراد. التدريب المؤسسي ليه تسعير خاص حسب حجم الفريق."
      >
        {hasGroupPricing && (
          <div className="mt-4 inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 p-1">
            {[
              { label: "فردي", value: false },
              { label: "مجموعة (٣+)", value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setGroup(opt.value)}
                aria-pressed={group === opt.value}
                className={cn(
                  "h-9 rounded-full px-5 text-sm font-bold transition-all",
                  group === opt.value
                    ? "bg-surface text-fg shadow-soft"
                    : "text-fg-subtle hover:text-fg",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </SectionHeading>

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
        {tiers.map((tier, i) => {
          const accent = accentClasses[tier.accent];
          const price = group && tier.groupPrice ? tier.groupPrice : tier.price;

          return (
            <Reveal
              key={tier.id}
              delay={i * 0.08}
              className={cn("h-full", tier.highlighted && "lg:-mt-4")}
            >
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[24px] border border-line bg-surface p-7 shadow-soft",
                  tier.highlighted && "ring-gradient shadow-lift",
                )}
              >
                {tier.badge && (
                  <span className="absolute -top-3 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2">
                    <Badge tone="gold" size="md">
                      {tier.badge}
                    </Badge>
                  </span>
                )}

                <h3 className="text-xl font-extrabold text-fg">{tier.name}</h3>
                <p className={cn("mt-1 text-sm font-bold", accent.text)}>{tier.tagline}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="ltr-nums text-[clamp(2rem,4vw,3rem)] font-black leading-none text-fg">
                    {formatPrice(price)}
                  </span>
                  {price.compareAt && (
                    <span className="ltr-nums pb-1 text-sm text-fg-subtle line-through">
                      {formatNumber(price.compareAt)}
                    </span>
                  )}
                </div>
                {price.note && (
                  <p className="mt-1.5 text-[13px] text-fg-subtle">{price.note}</p>
                )}

                <p className="mt-5 rounded-xl bg-surface-2 p-3 text-[13px] leading-snug text-fg-muted">
                  <span className="font-bold text-fg">الأنسب لـ:</span> {tier.bestFor}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li
                      key={f.text}
                      className={cn(
                        "flex items-start gap-2.5 text-[14px] leading-snug",
                        f.included ? "text-fg-muted" : "text-fg-subtle/70",
                      )}
                    >
                      {f.included ? (
                        <Check
                          className={cn("mt-0.5 size-4 shrink-0", accent.text)}
                          strokeWidth={3}
                          aria-hidden
                        />
                      ) : (
                        <X className="mt-0.5 size-4 shrink-0 text-fg-subtle/50" aria-hidden />
                      )}
                      <span className={cn(!f.included && "line-through")}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Button
                    href={tier.ctaHref}
                    variant={tier.highlighted ? "primary" : "secondary"}
                    size="lg"
                    fullWidth
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
