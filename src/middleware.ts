/**
 * حماية المسارات — الطبقة الأولى من تلاتة.
 * الطبقة ٢ فحص في الصفحة نفسها، والطبقة ٣ سياسات RLS في القاعدة.
 * المرجع: docs/MEMBERSHIP-PLAN.md §7
 */
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith("/my") || pathname.startsWith("/admin");

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    // نفتكر هو كان رايح فين عشان نرجّعه بعد الدخول
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // لو داخل بالفعل وراح على /login، نوديه لكورساته
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/my", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * كل المسارات ما عدا الملفات الثابتة والصور.
     * لازم يشمل المسارات العامة كمان عشان الجلسة تتحدّث باستمرار.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};
