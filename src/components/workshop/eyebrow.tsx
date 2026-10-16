/**
 * Workshop eyebrow — mono, rule, uppercase. Spec: executive workshop type scale.
 */
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: string;
  className?: string;
  onInk?: boolean;
}

export function Eyebrow({ children, className, onInk }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] opacity-60",
        onInk ? "text-ink-muted" : "text-fg-muted",
        className,
      )}
    >
      <span
        className={cn("h-px w-8 shrink-0", onInk ? "bg-ink-border" : "bg-border")}
        aria-hidden
      />
      {children}
    </p>
  );
}
