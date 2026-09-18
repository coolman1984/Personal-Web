/** شريط الأرقام بعدّادات متحرّكة. المواصفات: docs/DESIGN.md §12.3 */
import { getIcon } from "@/lib/icon";
import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Stat } from "@/types";

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="container-x py-14 md:py-20">
      <Reveal>
        <Stagger className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-3xl border border-line bg-surface p-8 shadow-soft md:grid-cols-4 md:divide-x md:divide-x-reverse md:divide-line">
          {stats.map((stat) => {
            const Icon = getIcon(stat.icon);
            return (
              <StaggerItem
                key={stat.label}
                className="flex flex-col items-center gap-2 px-2 text-center"
              >
                <Icon className="size-5 text-brand-500" aria-hidden />
                <p className="text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] font-black leading-none text-gradient">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-[13px] leading-snug text-fg-muted">{stat.label}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Reveal>
    </section>
  );
}
