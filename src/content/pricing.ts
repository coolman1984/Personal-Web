/**
 * الباقات — 👈 غيّر ده: الأسعار مبدئية.
 * المرجع: docs/DESIGN.md §12.11
 */
import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "single",
    name: "كورس واحد",
    tagline: "تبدأ من نقطة محدّدة عايز تحلّها",
    price: { amount: 2400, currency: "EGP", note: "يبدأ من" },
    bestFor: "اللي عنده مشكلة واحدة واضحة عايز يحلّها",
    accent: "aqua",
    features: [
      { text: "كورس واحد من اختيارك", included: true },
      { text: "تسجيلات الجلسات", included: true },
      { text: "الدليل PDF الخاص بالكورس", included: true },
      { text: "شهادة إتمام", included: true },
      { text: "مجموعة الخرّيجين", included: true },
      { text: "كل الأدلة الخمسة", included: false },
      { text: "مراجعة فردية للمشروع", included: false },
      { text: "متابعة شهرية بعد الكورس", included: false },
    ],
    ctaLabel: "اختار كورسك",
    ctaHref: "/courses",
    highlighted: false,
  },
  {
    id: "program",
    name: "البرنامج الشامل",
    tagline: "المسار الكامل من ٨ مستويات",
    price: { amount: 9500, compareAt: 12000, currency: "EGP", note: "للفرد" },
    groupPrice: { amount: 7600, currency: "EGP", note: "للفرد عند حجز ثلاثة أفراد فأكتر" },
    bestFor: "اللي عايز يشوف الصورة كاملة ويبني نظام عمل",
    accent: "brand",
    badge: "الأكثر طلبًا",
    features: [
      { text: "ثماني جلسات بإجمالي ١٦ ساعة تدريبية", included: true },
      { text: "٨ مخرجات شغّالة من شغلك", included: true },
      { text: "الأدلة الخمسة كاملة (٣٤ صفحة)", included: true },
      { text: "مكتبة أكثر من ٤٠ برومبت", included: true },
      { text: "تسجيلات كل الجلسات", included: true },
      { text: "شهادة إتمام بعد التقييم", included: true },
      { text: "مراجعة فردية للمشروع النهائي", included: true },
      { text: "متابعة شهرية لمدة ٣ شهور", included: true },
    ],
    ctaLabel: "احجز مكانك",
    ctaHref: "/enroll/ai-essentials",
    highlighted: true,
  },
  {
    id: "corporate",
    name: "تدريب مؤسسي",
    tagline: "مفصّل على عمليات شركتك",
    price: { amount: 0, currency: "EGP", note: "تسعير حسب الطلب" },
    bestFor: "الشركات اللي عايزة تدرّب فريق وتقيس الأثر",
    accent: "gold",
    features: [
      { text: "المحتوى مفصّل على عمليات شركتك", included: true },
      { text: "التطبيق على ملفات وعمليات حقيقية", included: true },
      { text: "تدريب حضوري أو أونلاين", included: true },
      { text: "تقييم وشهادات لكل المتدرّبين", included: true },
      { text: "تقرير أثر: الخطوات الملغاة والساعات الموفَّرة", included: true },
      { text: "جلسة تنفيذية للإدارة", included: true },
      { text: "متابعة تنفيذ بعد التدريب", included: true },
      { text: "مكتبة برومبتات خاصة بالشركة", included: true },
    ],
    ctaLabel: "اطلب عرض سعر",
    ctaHref: "/contact?topic=corporate",
    highlighted: false,
  },
];
