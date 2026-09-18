/**
 * الزر — ٦ أشكال و٤ مقاسات. المواصفات الكاملة: docs/DESIGN.md §5.1
 * الأيقونة بتيجي على الشمال من النص تلقائيًا في RTL.
 */
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "gold"
  | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-linear-to-bl from-brand-600 to-brand-500 text-white",
    "shadow-[0_4px_20px_-6px_oklch(0.55_0.23_288/0.55)]",
    "hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-8px_oklch(0.55_0.23_288/0.65)]",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  secondary: cn(
    "bg-surface text-fg border border-line",
    "hover:bg-surface-2 hover:border-line-strong hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
  outline: cn(
    "border border-brand-500/40 text-brand-600 dark:text-brand-300",
    "hover:bg-brand-500/10 hover:border-brand-500/60 hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  gold: cn(
    "bg-linear-to-bl from-gold-500 to-gold-400 text-ink-950 font-extrabold",
    "shadow-[0_4px_20px_-6px_oklch(0.76_0.14_80/0.55)]",
    "hover:brightness-105 hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  link: "text-brand-600 dark:text-brand-300 underline underline-offset-4 hover:opacity-80 px-0!",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-[10px] gap-2 [&_svg]:size-4",
  md: "h-11 px-[22px] text-[15px] rounded-xl gap-2 [&_svg]:size-[18px]",
  lg: "h-13 px-7 text-base rounded-[14px] gap-2.5 [&_svg]:size-5",
  xl: "h-15 px-9 text-[17px] rounded-2xl gap-2.5 [&_svg]:size-[22px]",
};

const base = cn(
  "inline-flex items-center justify-center font-bold whitespace-nowrap",
  "transition-[transform,box-shadow,background-color,border-color,filter] duration-250",
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--ring)",
  "disabled:opacity-45 disabled:pointer-events-none disabled:translate-y-0",
  "select-none",
);

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  /** الأيقونة بعد النص بدل قبله */
  iconAfter?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps | "href"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconAfter,
    loading,
    fullWidth,
    className,
    children,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  const content = (
    <>
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : icon}
      {children}
      {iconAfter}
    </>
  );

  if (typeof props.href === "string") {
    const { href, ...linkRest } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading as boolean | undefined} {...(rest as object)}>
      {content}
    </button>
  );
}
