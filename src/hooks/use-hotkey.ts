"use client";
import { useEffect } from "react";

/**
 * اختصار كيبورد. مثال: useHotkey("k", cb, { meta: true })
 * بيتجاهل الاختصار لو المستخدم بيكتب في حقل.
 */
export function useHotkey(
  key: string,
  handler: () => void,
  opts: { meta?: boolean; ignoreInputs?: boolean } = {},
) {
  const { meta = false, ignoreInputs = true } = opts;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      if (meta && !(e.metaKey || e.ctrlKey)) return;
      if (!meta && (e.metaKey || e.ctrlKey || e.altKey)) return;

      if (ignoreInputs) {
        const el = e.target as HTMLElement | null;
        const tag = el?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) {
          // الاختصار بميتا مسموح حتى جوّه الحقول (زي ⌘K)
          if (!meta) return;
        }
      }

      e.preventDefault();
      handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler, meta, ignoreInputs]);
}
