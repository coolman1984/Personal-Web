/**
 * اختيار بوابة الدفع تلقائيًا حسب المفاتيح الموجودة.
 * الترتيب: Paymob (السوق المصري) ← Stripe ← الوهمية.
 */
import { mockProvider } from "./mock";
import { paymobProvider } from "./paymob";
import { stripeProvider } from "./stripe";
import type { PaymentProvider } from "./types";

export function getPaymentProvider(): PaymentProvider {
  if (paymobProvider.enabled) return paymobProvider;
  if (stripeProvider.enabled) return stripeProvider;
  return mockProvider;
}

/** هل فيه دفع إلكتروني حقيقي شغّال؟ */
export function hasRealPayments(): boolean {
  return getPaymentProvider().id !== "mock";
}

export type { CheckoutInput, CheckoutResult, PaymentEvent, PaymentProvider } from "./types";
