/**
 * فتح وسحب الوصول — للمسؤول بس.
 *
 * ⚠️ الصلاحية بتتفحص هنا **وكمان** في سياسات RLS في القاعدة.
 *    لو حد عدّى من هنا بالغلط، القاعدة هترفض برضه.
 */
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/access";
import { createClient } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/lib/queries";
import { isEmail } from "@/lib/validation";
import type { ApiResponse } from "@/types";

async function guard() {
  const supabase = await createClient();
  if (!supabase) return { error: "نظام الحسابات مش متظبّط.", supabase: null };
  if (!(await isAdmin())) return { error: "مش مسموح.", supabase: null };
  return { error: null, supabase };
}

export async function POST(req: Request) {
  const { error: guardError, supabase } = await guard();
  if (guardError || !supabase) {
    return NextResponse.json<ApiResponse>({ ok: false, message: guardError! }, { status: 403 });
  }

  let body: { email?: string; courseSlug?: string; note?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "البيانات مش مفهومة." },
      { status: 400 },
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const courseSlug = (body.courseSlug ?? "").trim();
  const note = (body.note ?? "").trim().slice(0, 500);

  if (!isEmail(email)) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "الإيميل ده شكله مش مظبوط.", errors: { email: "إيميل غير صالح" } },
      { status: 400 },
    );
  }

  // ما نثقش في الـslug الجاي من الواجهة
  const course = await getCourseBySlug(courseSlug);
  if (!course) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "الكورس ده مش موجود." },
      { status: 404 },
    );
  }

  const { error } = await supabase.from("course_access").insert({
    email,
    course_slug: course.slug,
    granted_by: "manual",
    note: note || null,
  });

  if (error) {
    // 23505 = تكرار — رسالة واضحة مش خطأ مخيف
    if (error.code === "23505") {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: `${email} كان مفتوحله الكورس ده بالفعل.`,
      });
    }
    console.error("[admin/access] فشل الإضافة:", error.message);
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "مقدرناش نفتح الوصول. جرّب تاني." },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse>({
    ok: true,
    message: `اتفتح «${course.title}» لـ${email} ✓`,
  });
}

export async function DELETE(req: Request) {
  const { error: guardError, supabase } = await guard();
  if (guardError || !supabase) {
    return NextResponse.json<ApiResponse>({ ok: false, message: guardError! }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "المعرّف ناقص." },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("course_access").delete().eq("id", id);
  if (error) {
    console.error("[admin/access] فشل السحب:", error.message);
    return NextResponse.json<ApiResponse>(
      { ok: false, message: "مقدرناش نسحب الوصول." },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse>({ ok: true, message: "اتسحب الوصول ✓" });
}
