/**
 * ربط درجات الألوان بالمستويات — المرجع الوحيد للألوان في المكوّنات.
 * المواصفات: docs/DESIGN.md §2.4
 *
 * الكلاسات مكتوبة كاملة (مش مركّبة) عشان Tailwind يقدر يشوفها وقت البناء.
 */
import type { Accent, LevelId } from "@/types";

/**
 * ربط المستوى بلونه — تدرّج صاعد في اللوحة الجديدة:
 *   مبتدئ  → فولاذي محايد
 *   متوسط  → كحلي (لون الهوية)
 *   متقدّم → ذهبي (اللون المميّز)
 * المواصفات: docs/DESIGN.md §2.4
 */
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
  /** الفولاذي — المستوى المبتدئ */
  aqua: {
    text: "text-aqua-600 dark:text-aqua-300",
    bg: "bg-aqua-500/10 dark:bg-aqua-400/14",
    border: "border-aqua-500/25 dark:border-aqua-400/28",
    ring: "ring-aqua-500/30",
    gradient: "from-aqua-600 to-aqua-400",
    raw: "oklch(0.60 0.055 250)",
    glow: "shadow-[0_0_48px_-14px_oklch(0.60_0.055_250/0.5)]",
  },
  /** الكحلي — المستوى المتوسط ولون الهوية */
  brand: {
    text: "text-brand-800 dark:text-brand-200",
    bg: "bg-brand-900/8 dark:bg-brand-300/14",
    border: "border-brand-900/20 dark:border-brand-300/28",
    ring: "ring-brand-900/25",
    gradient: "from-brand-900 to-brand-700",
    raw: "oklch(0.2522 0.0562 264)",
    glow: "shadow-[0_0_48px_-14px_oklch(0.2522_0.0562_264/0.45)]",
  },
  /** الذهبي — المستوى المتقدّم */
  gold: {
    text: "text-gold-700 dark:text-gold-400",
    bg: "bg-gold-500/14 dark:bg-gold-500/16",
    border: "border-gold-500/35 dark:border-gold-500/35",
    ring: "ring-gold-500/35",
    gradient: "from-gold-600 to-gold-400",
    raw: "oklch(0.7859 0.1674 70)",
    glow: "shadow-[0_0_48px_-12px_oklch(0.7859_0.1674_70/0.55)]",
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
