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
    <span ref={ref} className={cn("inline-flex items-baseline gap-1", className)}>
      {/* الرقم معزول كنطاق أرقام، واللاحقة العربية بره النطاق
          عشان تفضل على شمال الرقم زي ما المفروض في RTL */}
      <span className="ltr-nums tabular-nums">{formatNumber(current, decimals)}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
