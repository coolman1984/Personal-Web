"use client";
/**
 * فورم الحجز — بيتعامل مع الحالتين:
 *  • الدفع الإلكتروني مفعّل  → بينادي /api/checkout وبيحوّل لبوابة الدفع
 *  • مش مفعّل               → بينادي /api/enroll ويسجّل الاهتمام
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldWrap, Input, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import type { ApiResponse } from "@/types";

interface EnrollFormProps {
  courseSlug: string;
  /** الدفع الإلكتروني شغّال فعلًا؟ */
  paymentsEnabled: boolean;
}

export function EnrollForm({ courseSlug, paymentsEnabled }: EnrollFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { push } = useToast();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(fd.entries()), courseSlug };
    const endpoint = paymentsEnabled ? "/api/checkout" : "/api/enroll";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ApiResponse<{
        redirectUrl?: string;
        reference?: string;
      }>;

      if (!data.ok) {
        setErrors(data.errors ?? {});
        push(data.message, "error");
        return;
      }

      if (data.data?.redirectUrl) {
        window.location.href = data.data.redirectUrl;
        return;
      }

      push(data.message, "success");
      router.push(`/thank-you?course=${courseSlug}&ref=${data.data?.reference ?? ""}`);
    } catch {
      push("فيه حاجة مش مظبوطة. جرّب تاني، أو كلّمني على واتساب.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <FieldWrap label="اسمك" htmlFor="name" required error={errors.name}>
          <Input id="name" name="name" required autoComplete="name" placeholder="الاسم بالكامل" />
        </FieldWrap>
        <FieldWrap label="الإيميل" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            autoComplete="email"
            placeholder="your@email.com"
            className="text-start"
          />
        </FieldWrap>
      </div>

      <FieldWrap
        label="التليفون"
        htmlFor="phone"
        required
        hint="هتواصل معاك عليه لتأكيد الحجز"
        error={errors.phone}
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          dir="ltr"
          autoComplete="tel"
          placeholder="+20 100 000 0000"
          className="text-start"
        />
      </FieldWrap>

      <FieldWrap
        label="حاجة تحب أعرفها؟"
        htmlFor="note"
        hint="اختياري — بتشتغل إيه، وإيه المهمة اللي واخداك وقت"
        error={errors.note}
      >
        <Textarea id="note" name="note" className="min-h-28" />
      </FieldWrap>

      <Button
        type="submit"
        size="lg"
        loading={loading}
        icon={paymentsEnabled ? <CreditCard /> : <Send />}
        fullWidth
      >
        {paymentsEnabled ? "كمّل للدفع" : "أكّد الحجز"}
      </Button>

      <p className="text-center text-[12.5px] leading-relaxed text-fg-subtle">
        {paymentsEnabled
          ? "هتتحوّل لصفحة دفع آمنة. بياناتك ما بتتخزّنش عندنا."
          : "مفيش دفع دلوقتي — بسجّل بياناتك وأتواصل معاك لتأكيد الحجز وطريقة الدفع."}
      </p>
    </form>
  );
}
