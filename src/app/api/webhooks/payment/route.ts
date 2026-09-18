/**
 * استقبال تأكيد الدفع من البوابة.
 *
 * ⚠️ التحقّق من التوقيع إجباري قبل أي إجراء — من غيره أي حد يقدر يبعت
 *    «تم الدفع» كذبًا.
 */
import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";

export async function POST(req: Request) {
  const provider = getPaymentProvider();

  // لازم ناخد الجسم خام (نص) مش JSON — التوقيع بيتحسب على النص الأصلي
  const rawBody = await req.text();
  const signature =
    req.headers.get("stripe-signature") ??
    req.headers.get("hmac") ??
    req.headers.get("x-signature");

  const valid = await provider.verifyWebhook(rawBody, signature);
  if (!valid) {
    console.warn("[webhook] توقيع غير صالح — الطلب اتجاهل");
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = await provider.parseEvent(rawBody);

  // ── اللي لازم يتعمل عند نجاح الدفع ──────────────────────────
  // محتاج قاعدة بيانات — شوف docs/ROADMAP.md §2.3 و §3
  //   1. سجّل العملية بمعرّفها الفريد (عشان تمنع التكرار)
  //   2. حوّل حالة التسجيل لـ"مدفوع"
  //   3. ابعت إيميل تأكيد للمتدرّب
  //   4. ابعت إشعار لصاحب الموقع
  //   5. ضيف المتدرّب لمجموعة الواتساب/تيليجرام
  console.info("[webhook] حدث دفع:", { kind: event.kind, reference: event.reference });

  // البوابة محتاجة 200 بسرعة عشان ما تعيدش المحاولة
  return NextResponse.json({ ok: true });
}
