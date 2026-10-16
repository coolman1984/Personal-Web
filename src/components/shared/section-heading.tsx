/**
 * عنوان السكشن الموحّد — نصّ فوقي ذهبي + عنوان + خط ذهبي قصير.
 * الشكل مأخوذ من المرجع البصري المؤسسي. المواصفات: docs/DESIGN.md §5.13
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  /** اللون مش مستخدم بعد التوحيد على الذهبي — متسايب للتوافق */
  eyebrowTone?: "brand" | "aqua" | "gold";
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  /** نصّ فاتح على خلفية داكنة */
  onDark?: boolean;
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  onDark = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[13px] font-extrabold tracking-[0.12em]",
            onDark ? "text-gold-500" : "text-gold-700 dark:text-gold-400",
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "text-[clamp(1.75rem,3.6vw+0.7rem,2.75rem)] font-black leading-[1.3]",
          onDark ? "text-white" : "text-fg",
          align === "center" ? "rule-gold-center max-w-3xl" : "rule-gold",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-6 text-[17px] leading-[2]",
            onDark ? "text-white/70" : "text-fg-muted",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </Reveal>
  );
}
