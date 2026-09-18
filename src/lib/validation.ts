/**
 * التحقّق من مدخلات الفورمات — بدون مكتبات خارجية.
 * قاعدة: ما نثقش في أي بيانات جاية من برّه، ورسائل الخطأ بالعربي ومفهومة.
 */
import type { ContactInput, EnrollInput, ValidationResult } from "@/types";

export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

/** بيقبل الصيغ المصرية والدولية */
export function isPhone(v: string): boolean {
  const digits = v.replace(/[\s\-()+]/g, "");
  return /^\d{8,15}$/.test(digits);
}

export function isName(v: string): boolean {
  const t = v.trim();
  return t.length >= 2 && t.length <= 80;
}

/** محارف التحكّم — بنشيلها من أي مدخل قبل ما نستخدمه */
const CONTROL_CHARS = /[\p{Cc}]/gu;

/** بيقصّ النص ويشيل محارف التحكّم — حماية أساسية */
function clean(v: unknown, max: number): string {
  return String(v ?? "")
    .replace(CONTROL_CHARS, " ")
    .trim()
    .slice(0, max);
}

export function validateContact(raw: unknown): ValidationResult<ContactInput> {
  const d = (raw ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = clean(d.name, 80);
  const email = clean(d.email, 160);
  const phone = clean(d.phone, 30);
  const subject = clean(d.subject, 120);
  const message = clean(d.message, 4000);

  if (!isName(name)) errors.name = "اكتب اسمك من فضلك.";
  if (!isEmail(email)) errors.email = "الإيميل ده شكله مش مظبوط.";
  if (phone && !isPhone(phone)) errors.phone = "رقم التليفون ده شكله مش مظبوط.";
  if (subject.length < 2) errors.subject = "اختار موضوع الرسالة.";
  if (message.length < 10) errors.message = "اكتب تفاصيل أكتر شوية (١٠ حروف على الأقل).";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { name, email, phone: phone || undefined, subject, message } };
}

export function validateSubscribe(raw: unknown): ValidationResult<{ email: string }> {
  const d = (raw ?? {}) as Record<string, unknown>;
  const email = clean(d.email, 160);
  if (!isEmail(email)) return { ok: false, errors: { email: "الإيميل ده شكله مش مظبوط." } };
  return { ok: true, data: { email } };
}

export function validateEnroll(raw: unknown): ValidationResult<EnrollInput> {
  const d = (raw ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const courseSlug = clean(d.courseSlug, 80);
  const name = clean(d.name, 80);
  const email = clean(d.email, 160);
  const phone = clean(d.phone, 30);
  const note = clean(d.note, 2000);

  if (!courseSlug) errors.courseSlug = "الكورس مش محدّد.";
  if (!isName(name)) errors.name = "اكتب اسمك من فضلك.";
  if (!isEmail(email)) errors.email = "الإيميل ده شكله مش مظبوط.";
  if (!isPhone(phone)) errors.phone = "اكتب رقم تليفون صحيح — هتواصل معاك عليه.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { courseSlug, name, email, phone, note: note || undefined } };
}
