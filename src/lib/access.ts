import "server-only";
/**
 * طبقة الوصول — مين يقدر يشوف أنهي كورس.
 *
 * ⚠️ الدوال دي هي **الطبقة التانية** من الحماية. الأولى هي middleware،
 *    والتالتة سياسات RLS في القاعدة. لازم التلاتة موجودين.
 *    المرجع: docs/MEMBERSHIP-PLAN.md §7
 */
import { createClient, getUserEmail } from "@/lib/supabase/server";
import { getCourseBySlug } from "@/lib/queries";
import type { Course } from "@/types";

export interface AccessRow {
  course_slug: string;
  granted_by: string;
  created_at: string;
  expires_at: string | null;
  note: string | null;
}

/** الكورسات المفتوحة للمستخدم الحالي */
export async function getMyCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const email = await getUserEmail();
  if (!supabase || !email) return [];

  const { data, error } = await supabase
    .from("course_access")
    .select("course_slug, expires_at")
    .eq("email", email);

  if (error) {
    console.error("[access] فشل جلب الكورسات:", error.message);
    return [];
  }

  const now = Date.now();
  const slugs = (data ?? [])
    .filter((r) => !r.expires_at || new Date(r.expires_at).getTime() > now)
    .map((r) => r.course_slug);

  const courses = await Promise.all(slugs.map((s) => getCourseBySlug(s)));
  return courses.filter((c): c is Course => c !== null);
}

/** هل الكورس ده مفتوح للمستخدم الحالي؟ */
export async function hasAccess(courseSlug: string): Promise<boolean> {
  const supabase = await createClient();
  const email = await getUserEmail();
  if (!supabase || !email) return false;

  const { data, error } = await supabase
    .from("course_access")
    .select("expires_at")
    .eq("email", email)
    .eq("course_slug", courseSlug)
    .maybeSingle();

  if (error || !data) return false;
  if (data.expires_at && new Date(data.expires_at).getTime() <= Date.now()) return false;
  return true;
}

/** هل المستخدم الحالي مسؤول؟ */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const email = await getUserEmail();
  if (!supabase || !email) return false;

  const { data, error } = await supabase
    .from("admins")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  return !error && Boolean(data);
}

/** كل صفوف الوصول — للوحة الإدارة. السياسات بتمنع غير المسؤول تلقائيًا. */
export async function listAllAccess(): Promise<
  (AccessRow & { id: string; email: string })[]
> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("course_access")
    .select("id, email, course_slug, granted_by, created_at, expires_at, note")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error("[access] فشل جلب القائمة:", error.message);
    return [];
  }
  return data ?? [];
}
