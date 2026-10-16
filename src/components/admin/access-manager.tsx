"use client";
/** إدارة الوصول — إضافة وسحب وبحث. */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Search, Trash2 } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FieldWrap, Input, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { useToast } from "@/components/ui/toast";
import type { ApiResponse } from "@/types";

interface Row {
  id: string;
  email: string;
  course_slug: string;
  granted_by: string;
  created_at: string;
  note: string | null;
}

interface Props {
  rows: Row[];
  courses: { slug: string; title: string }[];
}

export function AccessManager({ rows, courses }: Props) {
  const router = useRouter();
  const { push } = useToast();

  const [email, setEmail] = useState("");
  const [courseSlug, setCourseSlug] = useState(courses[0]?.slug ?? "");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");

  const titleBySlug = useMemo(
    () => Object.fromEntries(courses.map((c) => [c.slug, c.title])),
    [courses],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.email.includes(q) ||
        (titleBySlug[r.course_slug] ?? "").toLowerCase().includes(q),
    );
  }, [rows, query, titleBySlug]);

  async function grant(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, courseSlug, note }),
      });
      const data = (await res.json()) as ApiResponse;
      push(data.message, data.ok ? "success" : "error");
      if (data.ok) {
        setEmail("");
        setNote("");
        router.refresh();
      }
    } catch {
      push("فيه حاجة مش مظبوطة. جرّب تاني.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function revoke(row: Row) {
    const label = titleBySlug[row.course_slug] ?? row.course_slug;
    if (!confirm(`تسحب وصول ${row.email} من «${label}»؟`)) return;
    try {
      const res = await fetch(`/api/admin/access?id=${row.id}`, { method: "DELETE" });
      const data = (await res.json()) as ApiResponse;
      push(data.message, data.ok ? "success" : "error");
      if (data.ok) router.refresh();
    } catch {
      push("مقدرناش نسحب الوصول.", "error");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* فتح وصول جديد */}
      <form
        onSubmit={grant}
        className="rounded-lg border border-line bg-surface p-6 shadow-soft"
      >
        <h2 className="mb-5 flex items-center gap-2.5 text-lg font-extrabold text-fg">
          <KeyRound className="size-5 text-brand-500" aria-hidden />
          فتح وصول جديد
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <FieldWrap label="إيميل المتدرّب" htmlFor="grant-email" required>
            <Input
              id="grant-email"
              type="email"
              required
              dir="ltr"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-start"
            />
          </FieldWrap>
          <FieldWrap label="الكورس" htmlFor="grant-course" required>
            <Select
              id="grant-course"
              required
              value={courseSlug}
              onChange={(e) => setCourseSlug(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </Select>
          </FieldWrap>
        </div>

        <FieldWrap
          label="ملاحظة"
          htmlFor="grant-note"
          hint="اختياري — مثلًا: دفع ٢٠٠٠ واتساب"
          className="mt-5"
        >
          <Input
            id="grant-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="دفع ٢٠٠٠ واتساب"
          />
        </FieldWrap>

        <Button type="submit" size="lg" loading={saving} className="mt-6">
          افتح الوصول
        </Button>
      </form>

      {/* القائمة */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-fg">
            الوصول المفتوح{" "}
            <span className="ltr-nums text-fg-subtle">({formatNumber(rows.length)})</span>
          </h2>
          <div className="relative">
            <Search
              className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
              aria-hidden
            />
            <label htmlFor="access-search" className="sr-only">
              ابحث
            </label>
            <Input
              id="access-search"
              type="search"
              placeholder="ابحث بإيميل أو كورس..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pe-11 sm:w-72"
            />
          </div>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title={rows.length === 0 ? "لسه مفيش وصول مفتوح" : "مفيش نتائج"}
            description={
              rows.length === 0
                ? "ضيف أول إيميل من الفورم فوق."
                : "جرّب كلمة تانية."
            }
          />
        ) : (
          <ul className="flex flex-col gap-2.5">
            {visible.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-4"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-fg" dir="ltr">
                    {row.email}
                  </span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-fg-subtle">
                    {titleBySlug[row.course_slug] ?? row.course_slug}
                    {row.note ? ` — ${row.note}` : ""}
                  </span>
                </span>

                <Badge tone={row.granted_by === "payment" ? "success" : "neutral"} size="sm">
                  {row.granted_by === "payment" ? "دفع" : "يدوي"}
                </Badge>

                <span className="shrink-0 text-[12.5px] text-fg-subtle">
                  {formatDate(row.created_at)}
                </span>

                <button
                  onClick={() => revoke(row)}
                  aria-label={`سحب وصول ${row.email}`}
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-fg-subtle transition-colors hover:border-[oklch(0.55_0.2_25/0.4)] hover:text-[oklch(0.6_0.2_25)]"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
