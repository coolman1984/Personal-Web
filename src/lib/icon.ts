/**
 * جسر آمن لأيقونات lucide-react.
 * لو اسم الأيقونة غلط أو مش موجود، بيرجّع أيقونة افتراضية بدل ما الصفحة تقع.
 */
import * as Lucide from "lucide-react";
import type { LucideIcon } from "lucide-react";

const fallback: LucideIcon = Lucide.Circle;

export function getIcon(name?: string): LucideIcon {
  if (!name) return fallback;
  const registry = Lucide as unknown as Record<string, LucideIcon | undefined>;
  return registry[name] ?? fallback;
}
