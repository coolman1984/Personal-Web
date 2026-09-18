/**
 * إعدادات Supabase — مع تعطيل آمن.
 *
 * الموقع لازم يفضل شغّال ١٠٠٪ من غير Supabase. لو المتغيّرات مش موجودة،
 * ميزات الحساب بتختفي بهدوء والباقي يشتغل عادي.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** هل نظام الحسابات متظبّط أصلًا؟ */
export const authEnabled = Boolean(supabaseUrl && supabaseAnonKey);
