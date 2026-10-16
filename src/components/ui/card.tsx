/** الكارت — الأساس لكل الكروت. المواصفات: docs/DESIGN.md §5.3 */
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  /** يرتفع ويتظلّل عند المرور */
  interactive?: boolean;
  /** إطار متدرّج رفيع */
  ringGradient?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  className?: string;
}

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
} as const;

export function Card({
  children,
  as: Tag = "div",
  interactive,
  ringGradient,
  padding = "md",
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-lg border border-line bg-surface shadow-soft",
        paddings[padding],
        interactive && "card-hover",
        ringGradient && "ring-gradient",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
