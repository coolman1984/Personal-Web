"use client";
/**
 * مكتبة البرومبتات — أهم مكوّن في منطقة المتدرّب.
 * بحث فوري + نسخ بضغطة، لأن ده اللي بيحصل فعلًا الساعة ١١ بالليل.
 */
import { useMemo, useState } from "react";
import { Check, Copy, Search } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/field";
import { EmptyState } from "@/components/shared/empty-state";
import type { Prompt, PromptCategory } from "@/content/prompts";

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // الحافظة مش متاحة — المتدرّب يقدر يعلّم ويننسخ بإيده
    }
  }

  return (
    <article className="rounded-[20px] border border-line bg-surface p-5 shadow-soft">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15.5px] font-extrabold leading-snug text-fg">{prompt.title}</h3>
          <p className="mt-1 text-[12.5px] text-fg-subtle">{prompt.when}</p>
        </div>
        <button
          onClick={copy}
          aria-label={`نسخ برومبت ${prompt.title}`}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-[12.5px] font-bold transition-colors",
            copied
              ? "border-[oklch(0.58_0.15_150/0.35)] bg-[oklch(0.58_0.15_150/0.1)] text-[oklch(0.45_0.15_150)] dark:text-[oklch(0.78_0.16_150)]"
              : "border-line bg-surface-2 text-fg-muted hover:border-line-strong hover:text-fg",
          )}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "اتنسخ" : "نسخ"}
        </button>
      </div>

      <pre className="scrollbar-none max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl bg-surface-2 p-4 font-sans text-[13.5px] leading-[1.9] text-fg-muted">
        {prompt.body}
      </pre>

      <Badge tone="neutral" size="sm" className="mt-3">
        {prompt.category}
      </Badge>
    </article>
  );
}

export function PromptLibrary({ prompts }: { prompts: Prompt[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<PromptCategory | null>(null);

  const categories = useMemo(
    () => [...new Set(prompts.map((p) => p.category))],
    [prompts],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!q || `${p.title} ${p.when} ${p.body}`.toLowerCase().includes(q)),
    );
  }, [prompts, query, cat]);

  const chip = (active: boolean) =>
    cn(
      "h-9 rounded-full border px-4 text-sm font-bold transition-colors",
      active
        ? "border-brand-500/40 bg-brand-500/12 text-brand-600 dark:text-brand-300"
        : "border-line bg-surface text-fg-subtle hover:text-fg",
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
          aria-hidden
        />
        <label htmlFor="prompt-search" className="sr-only">
          ابحث في البرومبتات
        </label>
        <Input
          id="prompt-search"
          type="search"
          placeholder="ابحث... مثلًا: اجتماع، أتمتة، قرار"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pe-11"
        />
      </div>

      {categories.length > 1 && (
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
      )}

      <p className="text-[13px] text-fg-subtle">
        <span className="ltr-nums">{formatNumber(visible.length)}</span> برومبت
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="مفيش برومبت مطابق"
          description="جرّب كلمة تانية، أو شيل الفلتر."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}
    </div>
  );
}
