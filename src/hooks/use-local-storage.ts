"use client";
import { useCallback, useEffect, useState } from "react";

/** حالة محفوظة في المتصفّح — بتتعامل بأمان مع الوضع الخاص والتخزين المقفول. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // التخزين مش متاح — نكمّل بالقيمة الافتراضية
    }
    setReady(true);
  }, [key]);

  const update = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // تجاهل بصمت
      }
    },
    [key],
  );

  return { value, setValue: update, ready } as const;
}
