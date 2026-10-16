/** صفحة الدخول. */
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { authEnabled } from "@/lib/supabase/config";
import { LoginForm } from "@/components/auth/login-form";
import { Aurora } from "@/components/layout/aurora";
import { Logo } from "@/components/layout/logo";

export const metadata = buildMetadata({
  title: "تسجيل الدخول",
  description: "ادخل عشان توصل لمواد كورساتك.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden noise">
      <Aurora />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />

      <div className="container-x relative py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="rounded-lg border border-line bg-surface p-7 shadow-lift ring-gradient md:p-8">
            <h1 className="text-center text-2xl font-extrabold text-fg">
              أهلًا بيك تاني
            </h1>
            <p className="mt-2 text-center text-[14.5px] leading-relaxed text-fg-muted">
              ادخل بنفس الإيميل اللي حجزت بيه، وهتلاقي مواد كورساتك مفتوحة.
            </p>

            {authEnabled ? (
              <Suspense
                fallback={<div className="mt-7 h-40 animate-pulse rounded-xl bg-surface-2" />}
              >
                <LoginForm />
              </Suspense>
            ) : (
              <p className="mt-7 rounded-xl border border-gold-500/25 bg-gold-500/8 p-4 text-center text-[14px] leading-relaxed text-fg-muted">
                نظام الحسابات لسه بيتظبّط. تواصل معايا على واتساب وهبعتلك المواد
                مباشرة.
              </p>
            )}
          </div>

          <p className="mt-6 text-center text-[13px] leading-relaxed text-fg-subtle">
            لسه ما حجزتش؟{" "}
            <a href="/courses" className="font-bold text-brand-600 dark:text-brand-300">
              شوف الكورسات
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
