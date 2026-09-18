/** منهج الكورس بوحداته ودروسه. */
import { CheckCircle2, Package } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { formatNumber } from "@/lib/utils";
import type { CourseModule } from "@/types";

export function Curriculum({ modules }: { modules: CourseModule[] }) {
  const items: AccordionItem[] = modules.map((m) => ({
    id: `module-${m.order}`,
    title: (
      <span className="flex items-center gap-3">
        <span className="ltr-nums grid size-7 shrink-0 place-items-center rounded-lg bg-brand-500/12 text-[13px] font-black text-brand-600 dark:text-brand-300">
          {formatNumber(m.order)}
        </span>
        <span className="flex flex-col">
          <span>{m.title}</span>
          <span className="text-[12.5px] font-normal text-fg-subtle">{m.summary}</span>
        </span>
      </span>
    ),
    meta: (
      <span>
        <span className="ltr-nums">{formatNumber(m.hours)}</span> ساعة
      </span>
    ),
    content: (
      <div className="flex flex-col gap-4 ps-10">
        <ul className="flex flex-col gap-2.5">
          {m.lessons.map((lesson) => (
            <li key={lesson} className="flex items-start gap-2.5">
              <CheckCircle2
                className="mt-1 size-4 shrink-0 text-brand-500/70"
                aria-hidden
              />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
        {m.project && (
          <p className="flex items-start gap-2.5 rounded-xl border border-gold-500/22 bg-gold-500/8 p-3 text-[13.5px] leading-snug">
            <Package className="mt-0.5 size-4 shrink-0 text-gold-600 dark:text-gold-300" aria-hidden />
            <span>
              <span className="font-bold text-fg">المخرج: </span>
              {m.project}
            </span>
          </p>
        )}
      </div>
    ),
  }));

  return <Accordion items={items} allowMultiple defaultOpen={["module-1"]} />;
}
