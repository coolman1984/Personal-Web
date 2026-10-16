"use client";
/**
 * فورم الدخول — بجوجل أو برابط سحري.
 *
 * ليه الاتنين؟ أجهزة الشركات كتير بتمنع الدخول بجوجل، وناس كتير حسابهم
 * مايكروسوفت. الرابط السحري بيكلّف ساعة شغل وبينقذ عملاء.
 */
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { FieldWrap, Input } from "@/components/ui/field";
import { GoogleIcon } from "@/components/shared/social-icons";

const errorMessages: Record<string, string> = {
  missing_code: "الرابط ناقص. جرّب تسجّل الدخول تاني.",
  exchange_failed: "الرابط ده انتهت صلاحيته. اطلب رابط جديد.",
  not_configured: "نظام الحسابات لسه بيتظبّط.",
};

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/my";
  const urlError = params.get("error");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"google" | "magic" | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError ? (errorMessages[urlError] ?? "فيه حاجة مش مظبوطة.") : null,
  );

  const redirectTo = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=${encodeURIComponent(next)}`;

  async function signInWithGoogle() {
    setLoading("google");
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
      // المتصفّح بيتحوّل لجوجل — مفيش كود بعد كده
    } catch {
      setError("مقدرناش نوصل لجوجل. جرّب الرابط السحري تحت.");
      setLoading(null);
    }
  }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading("magic");
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setSent(true);
    } catch {
      setError("مقدرناش نبعت الرابط. اتأكّد من الإيميل وجرّب تاني.");
    } finally {
      setLoading(null);
    }
  }

  if (sent) {
    return (
      <div className="mt-7 rounded-xl border border-[oklch(0.58_0.15_150/0.28)] bg-[oklch(0.58_0.15_150/0.07)] p-5 text-center">
        <Mail
          className="mx-auto mb-3 size-6 text-[oklch(0.5_0.15_150)] dark:text-[oklch(0.78_0.16_150)]"
          aria-hidden
        />
        <p className="text-base font-extrabold text-fg">بعتنالك الرابط ✓</p>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
          افتح إيميلك واضغط على الرابط عشان تدخل. لو ما لقيتوش، بصّ في
          البريد غير المرغوب فيه.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-[13px] text-fg-subtle underline underline-offset-4 hover:text-fg"
        >
          ابعت لإيميل تاني
        </button>
      </div>
    );
  }

  return (
    <div className="mt-7 flex flex-col gap-5">
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-[oklch(0.55_0.2_25/0.28)] bg-[oklch(0.55_0.2_25/0.07)] p-3 text-center text-[13.5px] leading-snug text-fg-muted"
        >
          {error}
        </p>
      )}

      <Button
        onClick={signInWithGoogle}
        variant="secondary"
        size="lg"
        fullWidth
        loading={loading === "google"}
        icon={<GoogleIcon />}
      >
        الدخول بحساب جوجل
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[12px] text-fg-subtle">أو</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={sendMagicLink} className="flex flex-col gap-4">
        <FieldWrap
          label="رابط دخول على الإيميل"
          htmlFor="magic-email"
          hint="لو جهاز شغلك بيمنع الدخول بجوجل، استخدم ده"
        >
          <Input
            id="magic-email"
            name="email"
            type="email"
            required
            dir="ltr"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-start"
          />
        </FieldWrap>
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading === "magic"}
          icon={<Send />}
        >
          ابعتلي رابط الدخول
        </Button>
      </form>
    </div>
  );
}
