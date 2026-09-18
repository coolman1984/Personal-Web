"use client";
/**
 * شريط متحرّك لا نهائي. بيكرّر المحتوى مرتين عشان الحركة تبقى سلسة.
 * المواصفات: docs/DESIGN.md §12.2
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** مدة الدورة الكاملة بالثواني */
  duration?: number;
  reverse?: boolean;
  /** يقف عند مرور الماوس */
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  duration = 42,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center gap-10 will-change-transform",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden={false}
      >
        {children}
        <span className="flex shrink-0 items-center gap-10" aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  );
}
