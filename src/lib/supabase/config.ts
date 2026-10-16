/**
 * إعدادات Supabase — مع تعطيل آمن.
 *
 * الموقع لازم يفضل شغّال ١٠٠٪ من غير Supabase. لو المتغيّرات مش موجودة،
 * ميزات الحساب بتختفي بهدوء والباقي يشتغل عادي.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

/**
 * هل نظام الحسابات متظبّط أصلًا؟
 * نفس الشرط في isAuthConfigured() داخل src/lib/features.ts.
 * النسخة دي من غير أسرار عشان ينفع المتصفّح يستورد الملف.
 */
export const authEnabled = Boolean(supabaseUrl && supabaseAnonKey);
