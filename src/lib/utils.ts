/** أدوات مساعدة عامة. المرجع: docs/PLAN.md §9.1 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ArticleBlock, CoursePrice } from "@/types";

/** دمج كلاسات Tailwind بأمان — آخر كلاس بيكسب عند التعارض */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const arabicNumberFormat = new Intl.NumberFormat("ar-EG");

/** 1500 → "١٬٥٠٠" */
export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

const currencyLabels: Record<string, string> = {
  EGP: "ج.م",
  USD: "$",
  SAR: "ر.س",
};

/** { amount: 4500, currency: "EGP" } → "٤٬٥٠٠ ج.م" */
export function formatPrice(price: CoursePrice): string {
  if (price.amount <= 0) return "حسب الطلب";
  return `${arabicNumberFormat.format(price.amount)} ${currencyLabels[price.currency] ?? price.currency}`;
}

/** "2026-09-01" → "١ سبتمبر ٢٠٢٦" */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

/** يحوّل أي نص لـslug صالح للرابط (بيدعم العربي) */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** يحسب دقايق القراءة — ٢٠٠ كلمة/دقيقة للعربي */
export function readingTime(blocks: ArticleBlock[]): number {
  const words = blocks.reduce((sum, b) => {
    if ("text" in b) return sum + b.text.split(/\s+/).length;
    if ("items" in b) return sum + b.items.join(" ").split(/\s+/).length;
    if ("code" in b) return sum + b.code.split(/\s+/).length;
    return sum;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

export function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

/** يبني رابط واتساب برسالة جاهزة */
export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** الرابط الأساسي للموقع — من متغيّر البيئة أو الافتراضي */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

/** يبني رابطًا مطلقًا من مسار نسبي */
export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/** يجمع ساعات كل وحدات المنهج */
export function sumHours(items: { hours: number }[]): number {
  return items.reduce((s, i) => s + i.hours, 0);
}

/** يعدّ كل الدروس في كل الوحدات */
export function countLessons(modules: { lessons: string[] }[]): number {
  return modules.reduce((s, m) => s + m.lessons.length, 0);
}

/** نسبة الخصم المئوية */
export function discountPercent(price: CoursePrice): number | null {
  if (!price.compareAt || price.compareAt <= price.amount) return null;
  return Math.round((1 - price.amount / price.compareAt) * 100);
}
