/**
 * الواجهة الموحّدة لأي بوابة دفع.
 * الموقع بيتكلّم مع الواجهة دي بس — فتغيير البوابة ما بيمسّش أي كود تاني.
 * الشرح الكامل: docs/ROADMAP.md §2
 */

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface CheckoutInput {
  courseSlug: string;
  /** السعر بيتحسب على السيرفر من content/courses.ts — مش من المتصفّح أبدًا */
  amount: number;
  currency: string;
  courseTitle: string;
  customer: CheckoutCustomer;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  ok: boolean;
  /** الرابط اللي بنحوّل المستخدم ليه عشان يدفع */
  redirectUrl?: string;
  /** معرّف العملية عندنا */
  reference: string;
  /** رسالة عربية للمستخدم لو فيه مشكلة */
  error?: string;
}

export type PaymentEventKind = "paid" | "failed" | "refunded" | "unknown";

export interface PaymentEvent {
  kind: PaymentEventKind;
  reference: string;
  amount?: number;
  currency?: string;
  raw?: unknown;
}

export interface PaymentProvider {
  readonly id: "mock" | "stripe" | "paymob";
  /** الاسم المعروض للمستخدم */
  readonly label: string;
  /** هل البوابة متظبّطة فعلًا (المفاتيح موجودة)؟ */
  readonly enabled: boolean;

  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
  verifyWebhook(rawBody: string, signature: string | null): Promise<boolean>;
  parseEvent(rawBody: string): Promise<PaymentEvent>;
}
