"use client";
/** متصفّح الأسئلة — بحث + تصنيفات. */
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Input } from "@/components/ui/field";
import { cn, formatNumber } from "@/lib/utils";
import { EmptyState } from "./empty-state";
import type { Faq, FaqCategory } from "@/types";

export function FaqBrowser({ faqs, categories }: { faqs: Faq[]; categories: FaqCategory[] }) {
  const [cat, setCat] = useState<FaqCategory | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (!cat || f.category === cat) &&
        (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)),
    );
  }, [faqs, cat, query]);

  const items: AccordionItem[] = visible.map((f, i) => ({
    id: `faq-${i}-${f.question.slice(0, 8)}`,
    title: f.question,
    meta: f.category,
    content: <p>{f.answer}</p>,
  }));

  const chip = (active: boolean) =>
    cn(
      "h-9 rounded-full border px-4 text-sm font-bold transition-colors",
      active
        ? "border-brand-500/40 bg-brand-500/12 text-brand-600 dark:text-brand-300"
        : "border-line bg-surface text-fg-subtle hover:text-fg",
    );

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
          aria-hidden
        />
        <label htmlFor="faq-search" className="sr-only">
          ابحث في الأسئلة
        </label>
        <Input
          id="faq-search"
          type="search"
          placeholder="ابحث في الأسئلة..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pe-11"
        />
      </div>

      <ul className="flex flex-wrap gap-2">
        <li>
          <button onClick={() => setCat(null)} aria-pressed={cat === null} className={chip(cat === null)}>
            الكل
          </button>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <button
              onClick={() => setCat(c === cat ? null : c)}
              aria-pressed={c === cat}
              className={chip(c === cat)}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>

      <p className="text-[13px] text-fg-subtle">
        <span className="ltr-nums">{formatNumber(visible.length)}</span> سؤال
      </p>

      {items.length === 0 ? (
        <EmptyState
          title="مفيش سؤال مطابق"
          description="جرّب كلمة تانية، أو كلّمني على واتساب مباشرة."
        />
      ) : (
        <Accordion items={items} allowMultiple />
      )}
    </div>
  );
}
