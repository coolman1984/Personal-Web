"use client";
/** تبديل الوضع الليلي/النهاري/التلقائي. */
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
      className={cn(
        "grid size-10 place-items-center rounded-xl border border-line bg-surface",
        "text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ring)",
        className,
      )}
    >
      {/* قبل التحميل بنعرض أيقونة ثابتة عشان نتجنّب اختلاف السيرفر والمتصفّح */}
      {!mounted ? (
        <Sun className="size-[18px] opacity-0" />
      ) : isDark ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
    </button>
  );
}
