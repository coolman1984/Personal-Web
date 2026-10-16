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
  | "navy"
  | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * أشكال الأزرار — مبنية على المرجع البصري:
 *   الذهبي = الدعوة الأساسية (زي "APPLY NOW")
 *   الكحلي = الإجراء الثانوي الصلب (زي "EXPLORE PROGRAMS")
 * المواصفات: docs/DESIGN.md §5.1
 */
const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-gold-500 text-brand-900 font-extrabold",
    "shadow-[0_2px_12px_-4px_oklch(0.7859_0.1674_70/0.5)]",
    "hover:bg-gold-400 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-6px_oklch(0.7859_0.1674_70/0.6)]",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  secondary: cn(
    "bg-surface text-fg border border-line-strong",
    "hover:border-gold-500 hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
  outline: cn(
    "border border-fg/25 text-fg",
    "hover:border-gold-500 hover:text-gold-700 dark:hover:text-gold-400 hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  /** الزر الكحلي الصلب — أقوى إجراء على خلفية فاتحة */
  navy: cn(
    "bg-solid text-solid-fg font-extrabold",
    "hover:brightness-125 hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.985]",
  ),
  link: "text-gold-700 dark:text-gold-400 underline underline-offset-4 hover:opacity-80 px-0!",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-md gap-2 [&_svg]:size-4",
  md: "h-11 px-6 text-[15px] rounded-md gap-2 [&_svg]:size-[18px]",
  lg: "h-13 px-8 text-[16.5px] rounded-md gap-2.5 [&_svg]:size-5",
  xl: "h-15 px-10 text-[18px] rounded-md gap-2.5 [&_svg]:size-[22px]",
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
