/**
 * استقبال رسائل التواصل.
 * من غير RESEND_API_KEY و CONTACT_TO_EMAIL بيرجع 503 قبل أي نداء خارجي.
 */
import { NextResponse } from "next/server";
import { isContactConfigured } from "@/lib/features";
import { validateContact } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { unavailable } from "@/lib/unavailable";
import type { ApiResponse } from "@/types";

export async function POST(req: Request) {
  if (!isContactConfigured()) {
    return unavailable("نموذج التواصل مش متاح دلوقتي. راسلني على الإيميل أو لينكدإن.");
  }

  const limit = rateLimit(`contact:${clientKey(req)}`);
  if (!limit.allowed) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "بعتّ رسايل كتير في وقت قصير. استنى شوية وجرّب تاني." },
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

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "فيه حقول محتاجة مراجعة.", errors: result.errors },
      { status: 400 },
    );
  }

  const { data } = result;

  try {
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!resendKey || !to) {
      return unavailable("نموذج التواصل مش متاح دلوقتي. راسلني على الإيميل أو لينكدإن.");
    }

    {
      // ── إرسال فعلي عبر Resend ──────────────────────────────
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Website <onboarding@resend.dev>",
          to,
          reply_to: data.email,
          subject: `رسالة جديدة من الموقع: ${data.subject}`,
          text: [
            `الاسم: ${data.name}`,
            `الإيميل: ${data.email}`,
            `التليفون: ${data.phone ?? "—"}`,
            `الموضوع: ${data.subject}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });

      // ⚠️ لازم نتأكّد إن Resend فعلًا قبل الرسالة — لو رفضها (مفتاح غلط،
      // حد يومي...) وإحنا رجّعنا "وصلت" للزائر، الرسالة بتضيع من غير ما
      // حد يحس. لو فشل هنا، بيقع في catch تحت ويرجّع رسالة واضحة.
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Resend رفض الرسالة (${res.status}): ${detail}`);
      }
    }

    return NextResponse.json<ApiResponse>({
      ok: true,
      message: "وصلت رسالتك 👌 هرد عليك خلال ٢٤ ساعة.",
    });
  } catch (error) {
    // نسجّل التفاصيل على السيرفر بس — ما نكشفهاش للمستخدم
    console.error("[contact] فشل الإرسال:", error);
    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        message: "فيه حاجة مش مظبوطة عندنا. جرّب تاني، أو كلّمني على واتساب.",
      },
      { status: 500 },
    );
  }
}
