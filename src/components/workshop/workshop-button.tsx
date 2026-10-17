/**
 * Workshop CTAs — sharp radius, 200–300ms color transitions.
 */
import Link from "next/link";
import { cn } from "@/lib/utils";

type WorkshopButtonVariant = "primary" | "secondary" | "ghost";

interface WorkshopButtonProps {
  href: string;
  children: string;
  variant?: WorkshopButtonVariant;
  className?: string;
}

const variants: Record<WorkshopButtonVariant, string> = {
  primary:
    "bg-primary-solid text-primary-fg border border-primary-solid hover:border-primary hover:brightness-[1.06] focus-visible:ring-2 focus-visible:ring-primary",
  secondary:
    "bg-secondary text-fg border border-border hover:bg-secondary/80 hover:border-border",
  ghost:
    "bg-transparent text-fg border border-transparent hover:bg-secondary hover:border-border",
};

export function WorkshopButton({
  href,
  children,
  variant = "primary",
  className,
}: WorkshopButtonProps) {
  const classes = cn(
    "inline-flex h-11 items-center justify-center rounded-[var(--radius)] px-6 text-sm font-medium transition-[background-color,border-color,filter] duration-200",
    variants[variant],
    className,
  );

  // مسارات التطبيق بس تعدّي على next/link. mailto و# والروابط الخارجية
  // لازم تفضل <a> عادي عشان متتكسرش مع راوتر Next.
  if (!href.startsWith("/")) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
