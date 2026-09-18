"use client";
import { useEffect } from "react";

/** بيمنع تمرير الصفحة لما تكون نافذة أو درج مفتوح. */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) document.body.style.paddingInlineEnd = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = original;
      document.body.style.paddingInlineEnd = "";
    };
  }, [locked]);
}
