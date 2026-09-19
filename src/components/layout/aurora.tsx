/**
 * توهّج الخلفية — ذهبي هادي على الكحلي.
 * استُبدل التدرّج البنفسجي القديم باللوحة الجديدة. المواصفات: docs/DESIGN.md §8.1
 */
import { cn } from "@/lib/utils";

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -top-32 end-[6%] size-[560px] rounded-full opacity-[0.18] blur-[130px]"
        style={{
          background: "radial-gradient(circle, oklch(0.7859 0.1674 70), transparent 70%)",
          animation: "aurora 24s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-40 start-[10%] size-[520px] rounded-full opacity-[0.14] blur-[140px]"
        style={{
          background: "radial-gradient(circle, oklch(0.535 0.058 264), transparent 70%)",
          animation: "aurora 24s ease-in-out 8s infinite alternate",
        }}
      />
    </div>
  );
}
