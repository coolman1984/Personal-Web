import "server-only";
/**
 * عميل Supabase على السيرفر (Server Components و Route Handlers).
 *
 * ⚠️ الكوكيز بتتكتب من الـmiddleware. الـServer Component ما بيقدرش يكتب
 *    كوكي، فبنبلع الخطأ بهدوء — وده السلوك الموصى بيه من Supabase.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { authEnabled, supabaseAnonKey, supabaseUrl } from "./config";

export async function createClient() {
  if (!authEnabled) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component — الـmiddleware هو اللي بيحدّث الجلسة
        }
      },
    },
  });
}

/** المستخدم الحالي، أو null. آمن للنداء في أي مكان. */
export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** إيميل المستخدم الحالي بحروف صغيرة، أو null. */
export async function getUserEmail(): Promise<string | null> {
  const user = await getUser();
  return user?.email ? user.email.toLowerCase().trim() : null;
}
