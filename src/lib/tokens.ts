/**
 * ربط درجات الألوان بالمستويات — المرجع الوحيد للألوان في المكوّنات.
 * المواصفات: docs/DESIGN.md §2.4
 *
 * الكلاسات مكتوبة كاملة (مش مركّبة) عشان Tailwind يقدر يشوفها وقت البناء.
 */
import type { Accent, LevelId } from "@/types";

export const levelAccent: Record<LevelId, Accent> = {
  beginner: "aqua",
  intermediate: "brand",
  advanced: "gold",
};

interface AccentClasses {
  /** نص بلون الدرجة */
  text: string;
  /** خلفية خفيفة */
  bg: string;
  /** حد */
  border: string;
  /** حلقة */
  ring: string;
  /** تدرّج للأزرار والأشرطة */
  gradient: string;
  /** لون خام للاستخدام في style */
  raw: string;
  /** توهّج */
  glow: string;
}

export const accentClasses: Record<Accent, AccentClasses> = {
  aqua: {
    text: "text-aqua-600 dark:text-aqua-300",
    bg: "bg-aqua-500/10 dark:bg-aqua-400/12",
    border: "border-aqua-500/25 dark:border-aqua-400/25",
    ring: "ring-aqua-500/30",
    gradient: "from-aqua-500 to-aqua-400",
    raw: "oklch(0.70 0.15 197)",
    glow: "shadow-[0_0_48px_-12px_oklch(0.70_0.15_197/0.55)]",
  },
  brand: {
    text: "text-brand-600 dark:text-brand-300",
    bg: "bg-brand-500/10 dark:bg-brand-400/12",
    border: "border-brand-500/25 dark:border-brand-400/25",
    ring: "ring-brand-500/30",
    gradient: "from-brand-600 to-brand-400",
    raw: "oklch(0.63 0.21 288)",
    glow: "shadow-[0_0_48px_-12px_oklch(0.63_0.21_288/0.55)]",
  },
  gold: {
    text: "text-gold-600 dark:text-gold-300",
    bg: "bg-gold-500/12 dark:bg-gold-400/12",
    border: "border-gold-500/28 dark:border-gold-400/25",
    ring: "ring-gold-500/30",
    gradient: "from-gold-600 to-gold-400",
    raw: "oklch(0.76 0.14 80)",
    glow: "shadow-[0_0_48px_-12px_oklch(0.76_0.14_80/0.55)]",
  },
};

export function accentFor(level: LevelId): AccentClasses {
  return accentClasses[levelAccent[level]];
}

/** الاسم المختصر لكل مستوى — بيستخدم في الشارات */
export const levelShortLabel: Record<LevelId, string> = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدّم",
};
