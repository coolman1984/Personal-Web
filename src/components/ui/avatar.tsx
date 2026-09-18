/** أڤاتار نصّي — بالحروف الأولى، من غير صور. */
import { cn } from "@/lib/utils";
import { accentClasses } from "@/lib/tokens";
import type { Accent } from "@/types";

export function Avatar({
  initials,
  tone = "brand",
  size = "md",
  className,
}: {
  initials: string;
  tone?: Accent;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-14 text-base",
  } as const;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border font-extrabold",
        accentClasses[tone].bg,
        accentClasses[tone].text,
        accentClasses[tone].border,
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
