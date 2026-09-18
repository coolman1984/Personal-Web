/** حقول الإدخال. المواصفات: docs/DESIGN.md §5.7 */
import { cloneElement, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const fieldBase = cn(
  "w-full rounded-xl border border-line bg-surface px-4 text-[15px] text-fg",
  "placeholder:text-fg-subtle",
  "transition-[border-color,box-shadow] duration-200",
  "focus:border-brand-500 focus:outline-none focus:ring-3 focus:ring-brand-500/20",
  "disabled:opacity-50",
);

interface WrapProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FieldWrap({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: WrapProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  // بنحقن `aria-invalid` و`aria-describedby` على عنصر الإدخال تلقائيًا،
  // عشان رسالة الخطأ (خصوصًا اللي راجعة من السيرفر) توصل لقارئ الشاشة —
  // من غير ما نطلب من كل فورم يكررها يدويًا مع كل حقل.
  const field =
    isValidElement(children) && (error || hint)
      ? cloneElement(children as ReactElement<ComponentProps<"input">>, {
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : hint ? hintId : undefined,
        })
      : children;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-fg">
        {label}
        {required && (
          <span className="ms-1 text-brand-500" aria-hidden>
            *
          </span>
        )}
      </label>
      {field}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-[13px] font-medium text-[oklch(0.55_0.2_25)] dark:text-[oklch(0.75_0.19_25)]"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[13px] text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea className={cn(fieldBase, "min-h-35 py-3 leading-relaxed", className)} {...props} />
  );
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(fieldBase, "h-12 cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}
