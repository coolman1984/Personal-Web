/** تسجيل الخروج. */
import { NextResponse, type NextRequest } from "next/server";
import { isAuthConfigured } from "@/lib/features";
import { createClient } from "@/lib/supabase/server";
import { unavailable } from "@/lib/unavailable";

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return unavailable("تسجيل الدخول مش متاح دلوقتي.");
  }

  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
