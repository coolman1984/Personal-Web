/**
 * بوابة وهمية — بتشتغل من غير أي مفاتيح.
 * السبب: الموقع لازم يشتغل ١٠٠٪ من اليوم الأول. ولما تجيب مفاتيح بوابة
 * حقيقية وتحطّها في .env، الاختيار بيتحوّل ليها تلقائيًا.
 */
import type { CheckoutInput, CheckoutResult, PaymentEvent, PaymentProvider } from "./types";

function reference(slug: string) {
  return `mock_${slug}_${Date.now().toString(36)}`;
}

export const mockProvider: PaymentProvider = {
  id: "mock",
  label: "تسجيل مباشر (بدون دفع إلكتروني)",
  enabled: true,

  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    const ref = reference(input.courseSlug);
    // مفيش دفع فعلي — بنحوّل لصفحة الشكر ومعاها المرجع
    const url = new URL(input.successUrl);
    url.searchParams.set("ref", ref);
    url.searchParams.set("mode", "manual");
    return { ok: true, redirectUrl: url.toString(), reference: ref };
  },

  async verifyWebhook(): Promise<boolean> {
    // مفيش webhook للبوابة الوهمية
    return false;
  },

  async parseEvent(): Promise<PaymentEvent> {
    return { kind: "unknown", reference: "" };
  },
};
