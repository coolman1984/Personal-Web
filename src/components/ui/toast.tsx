"use client";
/** رسائل النجاح والخطأ — مزوّد بسيط بدون مكتبات. */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "error" | "info";
interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

const ToastContext = createContext<{
  push: (message: string, tone?: ToastTone) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast لازم يتستخدم جوّه ToastProvider");
  return ctx;
}

const icons: Record<ToastTone, ReactNode> = {
  success: <CheckCircle2 className="size-5 text-[oklch(0.65_0.16_150)]" />,
  error: <AlertCircle className="size-5 text-[oklch(0.65_0.19_25)]" />,
  info: <Info className="size-5 text-brand-400" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, tone, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-5 start-5 z-200 flex flex-col gap-3"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -16, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-line",
                "glass px-4 py-3 shadow-lift",
              )}
            >
              <span className="mt-0.5 shrink-0">{icons[t.tone]}</span>
              <p className="flex-1 text-sm leading-relaxed text-fg">{t.message}</p>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                aria-label="إغلاق التنبيه"
                className="shrink-0 text-fg-subtle transition-colors hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
