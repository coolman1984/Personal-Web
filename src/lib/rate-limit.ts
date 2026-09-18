/**
 * حماية بسيطة من الطلبات المتكرّرة — في ذاكرة العملية.
 *
 * ⚠️ للاستخدام على سيرفر واحد فقط. لو نشرت على أكتر من نسخة (serverless)،
 * استبدلها بـUpstash Redis أو ما شابه — شوف docs/ROADMAP.md §2.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * بيستخرج عنوان الزائر من هيدرز البروكسي.
 *
 * ⚠️ `x-forwarded-for` سلسلة بيبنيها كل بروكسي في الطريق، والقيمة الأولى
 * فيها هي اللي الزائر نفسه بيبعتها — يعني أي حد يقدر يزوّرها ويتحايل على
 * حد الطلبات بمجرد ما يغيّر الهيدر. القيمة اللي نقدر نوثق فيها هي آخر
 * وحدة، اللي البروكسي المباشر (Vercel وغيره) هو اللي ضافها، مش الزائر.
 * لو منشورين على Vercel، `x-vercel-forwarded-for` أوثق من الكل لأن
 * Vercel بيحط فيها القيمة الحقيقية دايمًا ومش بيسيب الزائر يغيّرها.
 */
export function clientKey(req: Request): string {
  const vercelIp = req.headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.trim();

  const fwd = req.headers.get("x-forwarded-for");
  const lastHop = fwd?.split(",").pop()?.trim();
  return lastHop || req.headers.get("x-real-ip") || "unknown";
}

/** تنظيف دوري بسيط عشان الخريطة ما تكبرش بلا حدود */
const sweeper = setInterval(() => {
  const now = Date.now();
  for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
}, WINDOW_MS);
sweeper.unref?.();
