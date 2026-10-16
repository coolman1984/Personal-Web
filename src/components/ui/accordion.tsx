"use client";
/** أكورديون — للمنهج والأسئلة. المواصفات: docs/DESIGN.md §5.8 */
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  /** نص صغير على يسار العنوان */
  meta?: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  /** العناصر المفتوحة من البداية */
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  function toggle(id: string) {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  }

  return (
    <div className={cn("divide-y divide-line rounded-lg border border-line bg-surface", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                className={cn(
                  "flex w-full items-center gap-4 px-5 py-4 text-start",
                  "min-h-15 transition-colors hover:bg-surface-2",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--ring)",
                  isOpen && "bg-surface-2",
                )}
              >
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-fg-subtle transition-transform duration-300",
                    isOpen && "rotate-180 text-brand-500",
                  )}
                  aria-hidden
                />
                <span className="flex-1 text-base font-bold text-fg">{item.title}</span>
                {item.meta && (
                  <span className="shrink-0 text-[13px] text-fg-subtle">{item.meta}</span>
                )}
              </button>
            </h3>
            <div
              id={`panel-${item.id}`}
              role="region"
              // `hidden` بيفرض `display:none` (من preflight Tailwind)، وده كان
              // بيمنع حركة `grid-template-rows` من الأساس — القفل بيحصل فجأة
              // من غير أي انتقال. `inert` بيقفل التفاعل والوصولية للمحتوى
              // المقفول من غير ما يكسر الـCSS transition.
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-[15px] leading-[1.85] text-fg-muted">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
