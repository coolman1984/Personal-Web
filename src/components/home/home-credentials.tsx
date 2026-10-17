/**
 * شريط المؤهلات — الشريط الكحلي الوحيد في الصفحة، راكب على أسفل الهيرو.
 * المرجع: Master Profile v3 §3.3 و§6.
 */
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";

interface HomeCredentialsProps {
  credentials: HomeContent["credentials"];
  className?: string;
}

export function HomeCredentials({ credentials, className }: HomeCredentialsProps) {
  return (
    <div className={cn("container-ws relative z-10 -mt-16 md:-mt-20", className)}>
      <ScrollReveal>
        <dl
          aria-label={credentials.label}
          className="ink-grid-bg grid border border-ink-border text-ink-fg sm:grid-cols-2 lg:grid-cols-4"
        >
          {credentials.items.map((item) => (
            <div
              key={item.value}
              className="border-b border-ink-border p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-e lg:border-b-0 lg:border-e lg:last:border-e-0 md:p-8"
            >
              <dt className="font-display text-2xl font-medium tracking-tight text-ink-fg md:text-3xl">
                {item.value}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </div>
  );
}
