/**
 * Stripe — جاهزة، محتاجة المفاتيح بس.
 *
 * خطوات التفعيل الكاملة في docs/ROADMAP.md §2.2:
 *   1. npm i stripe
 *   2. حطّ STRIPE_SECRET_KEY و STRIPE_WEBHOOK_SECRET في .env
 *   3. فُكّ التعليق عن الكود تحت
 *   4. غيّر `enabled` تحت من `false` لـ `Boolean(secretKey)`
 *   5. خلّي site.features.payments = true
 */
import type { CheckoutInput, CheckoutResult, PaymentEvent, PaymentProvider } from "./types";

const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripeProvider: PaymentProvider = {
  id: "stripe",
  label: "بطاقة ائتمان (Stripe)",
  // ⚠️ متسبّهاش `Boolean(secretKey)` — `createCheckout` تحت لسه استب فاضي.
  // لو خلّيتها كده وحد حطّ المفتاح وفعّل `site.features.payments`، كل
  // محاولة حجز هترجع فشل (502) من غير أي تحذير واضح، وده بيقفل قناة
  // البيع كلها بصمت. خلّيها `false` لحد ما تخلّص الخطوة ٣ فعلًا.
  enabled: false,

  async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
    if (!secretKey) {
      return {
        ok: false,
        reference: "",
        error: "الدفع الإلكتروني لسه مش مفعّل. تواصل معايا على واتساب وهظبطلك التسجيل.",
      };
    }

    // ── الكود الحقيقي (فُكّ التعليق بعد `npm i stripe`) ──────────
    // import Stripe from "stripe";
    // const stripe = new Stripe(secretKey);
    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   line_items: [{
    //     price_data: {
    //       currency: input.currency.toLowerCase(),
    //       product_data: { name: input.courseTitle },
    //       unit_amount: input.amount * 100, // بالقروش
    //     },
    //     quantity: 1,
    //   }],
    //   customer_email: input.customer.email,
    //   metadata: { courseSlug: input.courseSlug, phone: input.customer.phone },
    //   success_url: input.successUrl,
    //   cancel_url: input.cancelUrl,
    // });
    // return { ok: true, redirectUrl: session.url!, reference: session.id };

    return {
      ok: false,
      reference: "",
      error: "بوابة الدفع لسه بتتظبّط. تواصل معايا على واتساب.",
    };
  },

  async verifyWebhook(rawBody: string, signature: string | null): Promise<boolean> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret || !signature || !rawBody) return false;

    // ── الكود الحقيقي ──────────────────────────────────────────
    // const stripe = new Stripe(secretKey!);
    // try {
    //   stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    //   return true;
    // } catch { return false; }

    return false;
  },

  async parseEvent(rawBody: string): Promise<PaymentEvent> {
    try {
      const event = JSON.parse(rawBody) as { type?: string; data?: { object?: { id?: string } } };
      const id = event.data?.object?.id ?? "";
      if (event.type === "checkout.session.completed") return { kind: "paid", reference: id };
      if (event.type === "charge.refunded") return { kind: "refunded", reference: id };
      return { kind: "unknown", reference: id };
    } catch {
      return { kind: "unknown", reference: "" };
    }
  },
};
