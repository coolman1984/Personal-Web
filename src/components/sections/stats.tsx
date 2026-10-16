/**
 * شريط الأرقام — شريط كحلي بعرض الشاشة زي المرجع.
 * المواصفات: docs/DESIGN.md §12.3
 */
import { getIcon } from "@/lib/icon";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Stat } from "@/types";

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="band-navy">
      <div className="container-x py-14 md:py-16">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = getIcon(stat.icon);
            return (
              <StaggerItem
                key={stat.label}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <Icon className="size-7 text-gold-500" aria-hidden />
                <p className="text-[clamp(2rem,3.4vw+0.6rem,3rem)] font-black leading-none text-white">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-[13.5px] leading-snug text-white/65">{stat.label}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
