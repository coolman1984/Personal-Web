/** نجوم التقييم. */
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

interface RatingProps {
  value: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
}

export function Rating({ value, size = "sm", showValue, className }: RatingProps) {
  const starSize = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`التقييم ${value} من ٥`}
    >
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.round(value)
                ? "fill-gold-400 text-gold-400"
                : "fill-transparent text-line-strong",
            )}
          />
        ))}
      </span>
      {showValue && (
        <span className="ltr-nums text-[13px] font-bold text-fg-muted">
          {formatNumber(value, value % 1 === 0 ? 0 : 1)}
        </span>
      )}
    </span>
  );
}
