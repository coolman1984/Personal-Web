/**
 * تحديث جلسة Supabase في كل طلب.
 * لازم يتنادى من src/middleware.ts وإلا الجلسة هتنتهي فجأة.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthConfigured } from "@/lib/features";
import { supabaseAnonKey, supabaseUrl } from "./config";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!isAuthConfigured()) return { response, user: null };

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // ⚠️ ممنوع تحطّ أي كود بين إنشاء العميل و getUser() —
  // ده بيسبّب خروج عشوائي للمستخدمين.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
