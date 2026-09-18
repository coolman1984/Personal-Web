/**
 * استقبال الرجوع من جوجل أو من الرابط السحري.
 * بيبدّل الكود بجلسة ويحوّل المستخدم لوجهته.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/my";

  // ما نثقش في `next` الجاي من الرابط — لازم يكون مسار داخلي
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/my";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(`${origin}/login?error=not_configured`);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("[auth/callback] فشل تبديل الكود:", error.message);
    return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
  }

  return NextResponse.redirect(`${origin}${safeNext}`);
}
