"use client";
/** رقم بيعدّ من صفر لقيمته لما يظهر. */
import { useCounter } from "@/hooks/use-counter";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function Counter({ value, suffix, decimals = 0, className }: CounterProps) {
  const { ref, value: current } = useCounter(value);
  return (
    <span ref={ref} className={cn("ltr-nums tabular-nums", className)}>
      {formatNumber(current, decimals)}
      {suffix}
    </span>
  );
}
