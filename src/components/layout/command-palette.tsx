"use client";
/** لوحة أوامر شاملة بـ⌘K. المواصفات: docs/DESIGN.md §5.12 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { getIcon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import type { SearchItem, SearchKind } from "@/types";

const kindLabels: Record<SearchKind, string> = {
  course: "كورس",
  article: "مقال",
  project: "مشروع",
  page: "صفحة",
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items
      .filter((item) =>
        [item.title, item.description, ...item.keywords]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 12);
  }, [query, items]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(1, results.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === "Enter") {
        const item = results[active];
        if (item) {
          e.preventDefault();
          router.push(item.href);
          onClose();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, active, router, onClose]);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <Dialog open={open} onClose={onClose} align="top" className="max-w-[40rem]">
      <div className="flex items-center gap-3 border-b border-line px-5">
        <Search className="size-5 shrink-0 text-fg-subtle" aria-hidden />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في الكورسات والمقالات والصفحات..."
          aria-label="بحث"
          className="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-subtle"
        />
        <kbd className="hidden shrink-0 rounded-md border border-line bg-surface-2 px-2 py-1 text-[11px] font-bold text-fg-subtle sm:block">
          ESC
        </kbd>
      </div>

      <ul ref={listRef} className="max-h-[22rem] overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-fg-subtle">
            مفيش نتائج للبحث ده. جرّب كلمة تانية.
          </li>
        )}
        {results.map((item, i) => {
          const Icon = getIcon(item.icon);
          const selected = i === active;
          return (
            <li key={item.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-start transition-colors",
                  selected ? "bg-surface-2" : "hover:bg-surface-2/60",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg border border-line",
                    selected ? "bg-brand-500/12 text-brand-400" : "text-fg-subtle",
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[15px] font-bold text-fg">{item.title}</span>
                  <span className="truncate text-[13px] text-fg-subtle">{item.description}</span>
                </span>
                <span className="shrink-0 rounded-md border border-line px-2 py-0.5 text-[10.5px] font-bold text-fg-subtle">
                  {kindLabels[item.kind]}
                </span>
                {selected && (
                  <CornerDownLeft className="size-4 shrink-0 text-fg-subtle" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[11.5px] text-fg-subtle">
        <span className="flex items-center gap-3">
          <span>↑↓ للتنقّل</span>
          <span>Enter للفتح</span>
        </span>
        <span className="ltr-nums">{results.length} نتيجة</span>
      </div>
    </Dialog>
  );
}
