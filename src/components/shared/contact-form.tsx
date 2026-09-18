"use client";
/** فورم التواصل — بيتحقّق في المتصفّح وعلى السيرفر. */
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldWrap, Input, Select, Textarea } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import type { ApiResponse } from "@/types";

const subjects = [
  "استفسار عن كورس",
  "تدريب مؤسسي لشركة",
  "تدريب فردي مكثّف",
  "استشارة",
  "حاجة تانية",
];

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const { push } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // لازم نحفظ مرجع الفورم هنا، لأن React بيصفّر `currentTarget` بعد
    // ما الحدث يخلص — استخدامه بعد `await` بيرمي خطأ وقت التشغيل.
    const form = e.currentTarget;
    setLoading(true);
    setErrors({});

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ApiResponse;

      if (data.ok) {
        push(data.message, "success");
        setSent(true);
        form.reset();
      } else {
        setErrors(data.errors ?? {});
        push(data.message, "error");
      }
    } catch {
      push("فيه حاجة مش مظبوطة. جرّب تاني، أو كلّمني على واتساب.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-[24px] border border-[oklch(0.58_0.15_150/0.28)] bg-[oklch(0.58_0.15_150/0.07)] p-8 text-center">
        <p className="text-xl font-extrabold text-fg">وصلت رسالتك 👌</p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          هرد عليك خلال ٢٤ ساعة. لو مستعجل، كلّمني على واتساب مباشرة.
        </p>
        <Button onClick={() => setSent(false)} variant="ghost" size="sm" className="mt-4">
          ابعت رسالة تانية
        </Button>
      </div>
    );
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

      <div className="grid gap-5 md:grid-cols-2">
        <FieldWrap
          label="التليفون"
          htmlFor="phone"
          hint="اختياري — بس بيسهّل التواصل"
          error={errors.phone}
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder="+20 100 000 0000"
            className="text-start"
          />
        </FieldWrap>
        <FieldWrap label="الموضوع" htmlFor="subject" required error={errors.subject}>
          <Select id="subject" name="subject" required defaultValue={defaultSubject ?? subjects[0]}>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FieldWrap>
      </div>

      <FieldWrap label="رسالتك" htmlFor="message" required error={errors.message}>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="قوللي إنت بتشتغل إيه، وإيه المهمة اللي بتاخد منك وقت — ده بيخلّيني أرشّحلك الأنسب."
        />
      </FieldWrap>

      <Button type="submit" size="lg" loading={loading} icon={<Send />} className="self-start">
        ابعت الرسالة
      </Button>
    </form>
  );
}
