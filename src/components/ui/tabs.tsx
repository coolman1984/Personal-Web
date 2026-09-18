"use client";
/** تبويبات بمؤشّر متحرّك. المواصفات: docs/DESIGN.md §5.9 */
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  /** معرّف فريد لمؤشّر الحركة لو فيه أكتر من Tabs في الصفحة */
  layoutId?: string;
  className?: string;
}

export function Tabs({ tabs, value, onChange, layoutId = "tab-pill", className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-full border border-line bg-surface-2 p-1",
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative h-10 rounded-full px-5 text-sm font-bold transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ring)",
              active ? "text-fg" : "text-fg-subtle hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-surface shadow-soft"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
            <span className="relative z-1">
              {tab.label}
              {typeof tab.count === "number" && (
                <span className="ms-1.5 text-[11px] text-fg-subtle ltr-nums">({tab.count})</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
