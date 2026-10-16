/**
 * Workshop section shell — light / ink variants, shared padding.
 */
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface WorkshopSectionProps {
  id?: string;
  variant?: "light" | "ink";
  className?: string;
  children: ReactNode;
  grid?: boolean;
}

export function WorkshopSection({
  id,
  variant = "light",
  className,
  children,
  grid = false,
}: WorkshopSectionProps) {
  const isInk = variant === "ink";

  return (
    <section
      id={id}
      className={cn(
        "section-pad",
        isInk ? "bg-ink text-ink-fg" : "bg-background text-fg",
        grid && isInk && "ink-grid-bg",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
