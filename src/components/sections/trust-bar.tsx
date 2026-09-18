/** شريط الأدوات المتحرّك. المواصفات: docs/DESIGN.md §12.2 */
import { Marquee } from "@/components/motion/marquee";
import type { Tool } from "@/types";

export function TrustBar({ tools }: { tools: Tool[] }) {
  return (
    <section
      className="border-y border-line bg-bg-subtle py-6"
      aria-label="الأدوات والتقنيات اللي بتتدرّس"
    >
      <p className="container-x mb-4 text-center text-[11px] font-bold tracking-wider text-fg-subtle">
        الأدوات والتقنيات اللي هتشتغل بيها
      </p>
      <Marquee duration={45}>
        {tools.map((tool) => (
          <span
            key={tool.name}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[15px] font-bold text-fg-muted"
          >
            <span className="size-1.5 rounded-full bg-brand-500/50" aria-hidden />
            {tool.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
