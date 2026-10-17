import "server-only";
/**
 * هل الحجز ظاهر؟ الأعلام من features.ts، ومفتاح المحتوى payments
 * لسه لازم يتفتح يدويًا قبل أي دفع إلكتروني.
 */
import { site } from "@/content/site";
import { hasPaymentKeys, isContactConfigured } from "@/lib/features";
import { hasRealPayments } from "@/lib/payments";

/** دفع إلكتروني حقيقي: مفاتيح + بوابة متفعّلة + مفتاح المحتوى. */
export function canCheckout(): boolean {
  return site.features.payments && hasPaymentKeys() && hasRealPayments();
}

/** حجز يدوي بيوصل على الإيميل. */
export function canManualEnroll(): boolean {
  return isContactConfigured();
}

/** زر الحجز أو نموذج الحجز. من غيره الرابط يبقى إيميل مباشر. */
export function canBook(): boolean {
  return canCheckout() || canManualEnroll();
}
