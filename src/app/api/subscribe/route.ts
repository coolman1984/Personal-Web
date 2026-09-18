/** الاشتراك في النشرة البريدية. */
import { NextResponse } from "next/server";
import { validateSubscribe } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import type { ApiResponse } from "@/types";

export async function POST(req: Request) {
  const limit = rateLimit(`subscribe:${clientKey(req)}`);
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

  const result = validateSubscribe(body);
  if (!result.ok) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: result.errors.email ?? "الإيميل مش مظبوط.", errors: result.errors },
      { status: 400 },
    );
  }

  try {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (apiKey && audienceId) {
      // مفتاح Mailchimp بينتهي بـ-usX اللي هي منطقة السيرفر (مثلًا -us21)
      const dc = apiKey.split("-").pop();
      if (!dc || dc === apiKey) {
        // المفتاح مش بالشكل المتوقّع — منادي دومين "undefined" غلط تمامًا،
        // فبنوقف هنا ونسجّل تحذير واضح بدل ما نضيع الطلب بصمت.
        throw new Error(
          `MAILCHIMP_API_KEY بشكل غير متوقّع — لازم ينتهي بـ"-usX" (منطقة السيرفر)`,
        );
      }

      const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: result.data.email, status: "subscribed" }),
      });

      // "Member Exists" (٤٠٠) معناها الإيميل مشترك أصلًا — ده نجاح من وجهة
      // نظر الزائر، مش خطأ. أي رفض تاني لازم يوصلنا كخطأ حقيقي.
      if (!res.ok) {
        const detail = (await res.json().catch(() => null)) as { title?: string } | null;
        if (detail?.title !== "Member Exists") {
          throw new Error(`Mailchimp رفض الاشتراك (${res.status}): ${detail?.title ?? "?"}`);
        }
      }
    } else {
      console.info("[subscribe] اشتراك جديد (القائمة البريدية مش متظبّطة):", result.data.email);
    }

    return NextResponse.json<ApiResponse>({
      ok: true,
      message: "تمام! هتلاقي الدليل في إيميلك خلال دقايق.",
    });
  } catch (error) {
    console.error("[subscribe] فشل:", error);
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "فيه حاجة مش مظبوطة. جرّب تاني بعد شوية." },
      { status: 500 },
    );
  }
}
