/**
 * Paymob — الأنسب للسوق المصري (فيزا · فودافون كاش · أقساط).
 *
 * خطوات التفعيل الكاملة في docs/ROADMAP.md §2.2:
 *   1. سجّل حساب تاجر على paymob.com
 *   2. خُد PAYMOB_API_KEY و PAYMOB_INTEGRATION_ID و PAYMOB_HMAC_SECRET
 *   3. كمّل الدوال التلاتة تحت (التسلسل موضّح في التعليقات)
 *   4. غيّر `enabled` تحت من `false` لـ `Boolean(apiKey && integrationId)`
 *   5. خلّي site.features.payments = true
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import type { CheckoutInput, CheckoutResult, PaymentEvent, PaymentProvider } from "./types";

const apiKey = process.env.PAYMOB_API_KEY;
const integrationId = process.env.PAYMOB_INTEGRATION_ID;
const hmacSecret = process.env.PAYMOB_HMAC_SECRET;

export const paymobProvider: PaymentProvider = {
  id: "paymob",
  label: "فيزا · فودافون كاش (Paymob)",
  // ⚠️ متسبّهاش `Boolean(apiKey && integrationId)` — `createCheckout` تحت
  // لسه استب فاضي. لو خلّيتها كده وحد حطّ المفاتيح وفعّل
  // `site.features.payments`، كل محاولة حجز هترجع فشل (502) من غير أي
  // تحذير واضح، وده بيقفل قناة البيع كلها بصمت. خلّيها `false` لحد ما
  // تخلّص الخطوة ٣ فعلًا.
  enabled: false,

  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    if (!apiKey || !integrationId) {
      return {
        ok: false,
        reference: "",
        error: "الدفع الإلكتروني لسه مش مفعّل. تواصل معايا على واتساب وهظبطلك التسجيل.",
      };
    }

    // ── التسلسل المطلوب (٣ نداءات بالترتيب) ────────────────────
    // 1) POST https://accept.paymob.com/api/auth/tokens        { api_key }
    //    → بيرجّع token
    // 2) POST https://accept.paymob.com/api/ecommerce/orders   { auth_token, amount_cents, items }
    //    → بيرجّع order id
    // 3) POST https://accept.paymob.com/api/acceptance/payment_keys
    //    { auth_token, amount_cents, order_id, billing_data, integration_id }
    //    → بيرجّع payment key
    // الرابط النهائي:
    //    https://accept.paymob.com/api/acceptance/iframes/<IFRAME_ID>?payment_token=<key>
    //
    // ⚠️ المبلغ بالقروش: input.amount * 100
    // ⚠️ ممنوع تاخد المبلغ من المتصفّح — خُده من content/courses.ts زي ما بيحصل هنا

    return {
      ok: false,
      reference: "",
      error: "بوابة الدفع لسه بتتظبّط. تواصل معايا على واتساب.",
    };
  },

  async verifyWebhook(rawBody: string, signature: string | null): Promise<boolean> {
    if (!hmacSecret || !signature || !rawBody) return false;
    try {
      // Paymob بيوقّع بترتيب حقول محدّد — راجع توثيقهم وحطّ الحقول بالترتيب
      const expected = createHmac("sha512", hmacSecret).update(rawBody).digest("hex");
      const a = Buffer.from(expected);
      const b = Buffer.from(signature);
      // timingSafeEqual بيمنع هجمات التوقيت
      return a.length === b.length && timingSafeEqual(a, b);
    } catch {
      return false;
    }
  },

  async parseEvent(rawBody: string): Promise<PaymentEvent> {
    try {
      const event = JSON.parse(rawBody) as {
        obj?: { success?: boolean; id?: number; amount_cents?: number; currency?: string };
      };
      const o = event.obj;
      return {
        kind: o?.success ? "paid" : "failed",
        reference: String(o?.id ?? ""),
        amount: o?.amount_cents ? o.amount_cents / 100 : undefined,
        currency: o?.currency,
      };
    } catch {
      return { kind: "unknown", reference: "" };
    }
  },
};
