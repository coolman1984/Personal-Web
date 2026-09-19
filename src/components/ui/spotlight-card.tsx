"use client";
/** كارت بإضاءة بتتبع الماوس. المواصفات: docs/DESIGN.md §8.7 */
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** لون الإضاءة الخام */
  color?: string;
}

export function SpotlightCard({
  children,
  className,
  color = "oklch(0.71 0.17 288 / 0.14)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-surface shadow-soft card-hover",
        className,
      )}
    >
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 62%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
