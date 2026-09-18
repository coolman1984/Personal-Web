/** خلفية Aurora — ٣ دوائر متدرّجة ضبابية. المواصفات: docs/DESIGN.md §8.1 */
import { cn } from "@/lib/utils";

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -top-40 end-[8%] size-[600px] rounded-full opacity-22 blur-[120px] dark:opacity-45"
        style={{
          background: "radial-gradient(circle, oklch(0.63 0.21 288), transparent 70%)",
          animation: "aurora 22s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -top-20 start-[18%] size-[520px] rounded-full opacity-18 blur-[140px] dark:opacity-35"
        style={{
          background: "radial-gradient(circle, oklch(0.70 0.15 197), transparent 70%)",
          animation: "aurora 22s ease-in-out 7s infinite alternate",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-[-10%] mx-auto size-[420px] rounded-full opacity-12 blur-[130px] dark:opacity-25"
        style={{
          background: "radial-gradient(circle, oklch(0.76 0.14 80), transparent 70%)",
          animation: "aurora 22s ease-in-out 14s infinite alternate",
        }}
      />
    </div>
  );
}
