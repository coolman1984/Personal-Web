/** الشارة — ٣ مقاسات وألوان دلالية. المواصفات: docs/DESIGN.md §5.2 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/types";

type Tone = Accent | "neutral" | "success" | "warn" | "danger";

const tones: Record<Tone, string> = {
  brand: "bg-brand-500/12 text-brand-700 dark:text-brand-300 border-brand-500/25",
  aqua: "bg-aqua-500/12 text-aqua-600 dark:text-aqua-300 border-aqua-500/25",
  gold: "bg-gold-500/14 text-gold-600 dark:text-gold-300 border-gold-500/28",
  neutral: "bg-surface-2 text-fg-muted border-line",
  success:
    "bg-[oklch(0.58_0.15_150/0.12)] text-[oklch(0.45_0.15_150)] dark:text-[oklch(0.78_0.16_150)] border-[oklch(0.58_0.15_150/0.25)]",
  warn: "bg-gold-500/12 text-gold-600 dark:text-gold-300 border-gold-500/25",
  danger:
    "bg-[oklch(0.55_0.20_25/0.12)] text-[oklch(0.5_0.2_25)] dark:text-[oklch(0.75_0.19_25)] border-[oklch(0.55_0.20_25/0.25)]",
};

const sizes = {
  sm: "h-[22px] px-2 text-[11px] gap-1 [&_svg]:size-3",
  md: "h-7 px-3 text-xs gap-1.5 [&_svg]:size-3.5",
  lg: "h-[34px] px-4 text-[13px] gap-2 [&_svg]:size-4",
} as const;

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  size?: keyof typeof sizes;
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  tone = "neutral",
  size = "md",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-bold whitespace-nowrap",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
