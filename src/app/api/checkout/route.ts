/**
 * بدء عملية الدفع.
 *
 * ⚠️ قاعدة أمان أساسية: السعر بيتحسب هنا على السيرفر من content/courses.ts.
 *    ممنوع تمامًا ناخد المبلغ من المتصفّح — ده أسهل طريقة يتسرق بيها الموقع.
 */
import { NextResponse } from "next/server";
import { validateEnroll } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { getCourseBySlug } from "@/lib/queries";
import { getPaymentProvider } from "@/lib/payments";
import { absoluteUrl } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export async function POST(req: Request) {
  const limit = rateLimit(`checkout:${clientKey(req)}`);
  if (!limit.allowed) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "جرّبت كتير في وقت قصير. استنى دقيقة وجرّب تاني." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "البيانات المرسَلة مش مفهومة." },
      { status: 400 },
    );
  }

  const result = validateEnroll(body);
  if (!result.ok) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "فيه حقول محتاجة مراجعة.", errors: result.errors },
      { status: 400 },
    );
  }

  const course = await getCourseBySlug(result.data.courseSlug);
  if (!course) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "الكورس ده مش موجود." },
      { status: 404 },
    );
  }

  if (course.status === "مكتمل") {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "المجموعة دي اكتملت. كلّمني عشان أحطّك في المجموعة الجاية." },
      { status: 409 },
    );
  }

  const provider = getPaymentProvider();

  try {
    const checkout = await provider.createCheckout({
      courseSlug: course.slug,
      // 👇 السعر من مصدر الحقيقة على السيرفر — مش من الطلب
      amount: course.price.amount,
      currency: course.price.currency,
      courseTitle: course.title,
      customer: {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
      },
      successUrl: absoluteUrl(`/thank-you?course=${course.slug}`),
      cancelUrl: absoluteUrl(`/enroll/${course.slug}?cancelled=1`),
    });

    if (!checkout.ok) {
      return NextResponse.json<ApiResponse>(
        { ok: false, message: checkout.error ?? "مقدرناش نبدأ عملية الدفع." },
        { status: 502 },
      );
    }

    return NextResponse.json<ApiResponse<{ redirectUrl?: string; reference: string }>>({
      ok: true,
      message: "جاري تحويلك لصفحة الدفع...",
      data: { redirectUrl: checkout.redirectUrl, reference: checkout.reference },
    });
  } catch (error) {
    console.error("[checkout] فشل:", error);
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "فيه حاجة مش مظبوطة في الدفع. كلّمني على واتساب." },
      { status: 500 },
    );
  }
}
