/**
 * رأس الصفحات الداخلية الموحّد — شريط كحلي بنصّ أبيض.
 * المواصفات: docs/DESIGN.md §14.7
 *
 * ليه فيه `dark` على الـsection؟
 * الخلفية كحلية داكنة دايمًا، حتى في الوضع النهاري. من غير الكلاس ده،
 * أي مكوّن جوّه (شارة، أيقونة، `text-fg`) بياخد ألوان الوضع النهاري
 * الكحلية فبيختفي على الكحلي. الكلاس بيخلّي الجزء ده يتعامل كسطح داكن،
 * فكل الـ`dark:` variants والمتغيّرات الدلالية بتتظبط تلقائيًا.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Aurora } from "@/components/layout/aurora";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeroProps {
  /** النصّ الفوقي الصغير — بيتعرض ذهبي فوق العنوان */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("dark relative isolate overflow-hidden bg-brand-900 text-white", className)}>
      <Aurora className="opacity-70" />
            <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to left, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 80% at 70% 30%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 70% 30%, #000 20%, transparent 80%)",
        }}
      />

      <div className="container-x relative pb-14 pt-24 md:pb-16 md:pt-28">
        {crumbs && <Breadcrumbs items={crumbs} className="mb-6" />}
        <div className="flex max-w-3xl flex-col gap-5">
          {eyebrow && (
            <p className="text-[13px] font-extrabold tracking-[0.12em] text-gold-500">{eyebrow}</p>
          )}
          <h1 className="rule-gold text-[clamp(1.875rem,4vw+0.5rem,3rem)] font-black leading-[1.3] text-white">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-[17px] leading-[2] text-white/70">{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
