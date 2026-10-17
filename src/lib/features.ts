/**
 * أعلام التشغيل حسب وجود متغيّرات البيئة.
 *
 * الملف ده للسيرفر والـmiddleware فقط. ممنوع استيراده من مكوّن فيه
 * "use client" — المتصفّح ياخد boolean من السيرفر، مش أسماء الأسرار.
 * المفاتيح العامة (NEXT_PUBLIC_) بس اللي ينفع تتقرأ من كود المتصفّح،
 * وده حاصل في src/lib/supabase/config.ts من غير ما يمرّ على الأسرار.
 */

function filled(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/** حسابات Supabase: رابط المشروع + المفتاح العام. */
export function isAuthConfigured(): boolean {
  return filled(process.env.NEXT_PUBLIC_SUPABASE_URL) && filled(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** إرسال نموذج التواصل والحجز اليدوي عبر Resend. */
export function isContactConfigured(): boolean {
  return filled(process.env.RESEND_API_KEY) && filled(process.env.CONTACT_TO_EMAIL);
}

/** حفظ النشرة في Mailchimp. */
export function isNewsletterConfigured(): boolean {
  return filled(process.env.MAILCHIMP_API_KEY) && filled(process.env.MAILCHIMP_AUDIENCE_ID);
}

/** سكربتات التحليلات في المتصفّح. القيم دي عامة أصلًا. */
export function isAnalyticsConfigured(): boolean {
  return filled(process.env.NEXT_PUBLIC_GA_ID) || filled(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
}

/** مفاتيح Stripe السرّية اللازمة للسيرفر. التنفيذ نفسه لسه مقفول في payments/stripe.ts. */
export function isStripeKeyed(): boolean {
  return filled(process.env.STRIPE_SECRET_KEY) && filled(process.env.STRIPE_WEBHOOK_SECRET);
}

/** مفاتيح Paymob السرّية اللازمة للسيرفر. التنفيذ نفسه لسه مقفول في payments/paymob.ts. */
export function isPaymobKeyed(): boolean {
  return (
    filled(process.env.PAYMOB_API_KEY) &&
    filled(process.env.PAYMOB_INTEGRATION_ID) &&
    filled(process.env.PAYMOB_HMAC_SECRET)
  );
}

/** فيه مفاتيح بوابة، حتى لو التنفيذ لسه مش متفعّل. */
export function hasPaymentKeys(): boolean {
  return isStripeKeyed() || isPaymobKeyed();
}
