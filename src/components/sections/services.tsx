/**
 * الخدمات — مختصر في الرئيسية، والتفاصيل في /services.
 * بيقول للزائر إن الكورسات مش الحاجة الوحيدة: فيه تدريب شركات وأتمتة وأنظمة.
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getIcon } from "@/lib/icon";
import { accentClasses } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/types";

interface ServicesProps {
  services: Service[];
  className?: string;
}

export function Services({ services, className }: ServicesProps) {
  if (services.length === 0) return null;
  const accent = accentClasses.gold;

  return (
    <section className={cn("bg-surface-2/60 py-14 md:py-24", className)}>
      <div className="container-x">
        <SectionHeading
          eyebrow="الخدمات"
          title="إزاي أقدر أساعدك أنت أو شركتك"
          description="غير الكورسات، بشتغل مع الشركات والأفراد مباشرة: بدرّب الفريق، أو ببني الأداة بنفسي وأسلّمها شغّالة."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal as="li" key={service.slug} delay={i * 0.05} className="h-full">
                <div className="relative flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-soft card-hover">
                  <span
                    className={cn(
                      "mb-4 grid size-11 place-items-center rounded-xl border",
                      accent.bg,
                      accent.border,
                      accent.text,
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-[17px] font-extrabold leading-snug text-fg">
                    <Link href={`/services#${service.slug}`} className="after:absolute after:inset-0">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-fg-muted">{service.pain}</p>
                  <p className="mt-auto pt-4 text-[12.5px] text-fg-subtle">{service.duration}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href="/services" variant="navy" size="lg" iconAfter={<ArrowLeft />}>
            تفاصيل الخدمات
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
