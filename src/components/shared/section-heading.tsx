/** عنوان السكشن الموحّد — شارة + عنوان + وصف. */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import type { Accent } from "@/types";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowTone?: Accent;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  eyebrowTone = "brand",
  title,
  description,
  align = "center",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow && (
        <Badge tone={eyebrowTone} size="md">
          {eyebrow}
        </Badge>
      )}
      <h2
        className={cn(
          "text-[clamp(1.625rem,3.2vw+0.6rem,2.25rem)] font-extrabold text-fg",
          align === "center" && "max-w-3xl",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-[17px] leading-[1.9] text-fg-muted",
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
