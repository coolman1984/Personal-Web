/** تسجيل اهتمام بكورس — من غير دفع. */
import { NextResponse } from "next/server";
import { validateEnroll } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { getCourseBySlug } from "@/lib/queries";
import type { ApiResponse } from "@/types";

export async function POST(req: Request) {
  const limit = rateLimit(`enroll:${clientKey(req)}`);
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

  // نتأكّد إن الكورس موجود فعلًا — ما نثقش في الـslug الجاي من المتصفّح
  const course = await getCourseBySlug(result.data.courseSlug);
  if (!course) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "الكورس ده مش موجود." },
      { status: 404 },
    );
  }

  const reference = `enr_${course.slug}_${Date.now().toString(36)}`;

  try {
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (resendKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Website <onboarding@resend.dev>",
          to,
          reply_to: result.data.email,
          subject: `حجز جديد: ${course.title}`,
          text: [
            `المرجع: ${reference}`,
            `الكورس: ${course.title}`,
            `الاسم: ${result.data.name}`,
            `الإيميل: ${result.data.email}`,
            `التليفون: ${result.data.phone}`,
            `ملاحظة: ${result.data.note ?? "—"}`,
          ].join("\n"),
        }),
      });

      // حجز من غير إشعار بيوصلنا = عميل واثق إن حجزه اتسجّل وإحنا مش
      // واخدين بالنا. لازم نلقط الرفض هنا قبل ما نقول للزائر "تمام".
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Resend رفض إشعار الحجز (${res.status}): ${detail}`);
      }
    } else {
      console.info("[enroll] حجز جديد:", { reference, course: course.slug });
    }

    return NextResponse.json<ApiResponse<{ reference: string }>>({
      ok: true,
      message: "تمام! وصلني طلبك وهتواصل معاك خلال ٢٤ ساعة.",
      data: { reference },
    });
  } catch (error) {
    console.error("[enroll] فشل:", error);
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "فيه حاجة مش مظبوطة. كلّمني على واتساب وهسجّلك يدويًا." },
      { status: 500 },
    );
  }
}
