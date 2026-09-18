/** رأس الصفحات الداخلية الموحّد. */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Aurora } from "@/components/layout/aurora";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import type { Accent } from "@/types";

interface PageHeroProps {
  eyebrow?: string;
  eyebrowTone?: Accent;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  eyebrowTone = "brand",
  title,
  description,
  crumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden noise", className)}>
      <Aurora className="opacity-70" />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />

      <div className="container-x relative pb-14 pt-24 md:pb-16 md:pt-28">
        {crumbs && <Breadcrumbs items={crumbs} className="mb-6" />}
        <div className="flex max-w-3xl flex-col gap-5">
          {eyebrow && (
            <Badge tone={eyebrowTone} size="md" className="self-start">
              {eyebrow}
            </Badge>
          )}
          <h1 className="text-[clamp(1.875rem,4vw+0.5rem,2.75rem)] font-black leading-[1.2] text-fg">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-[17px] leading-[1.9] text-fg-muted">{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
