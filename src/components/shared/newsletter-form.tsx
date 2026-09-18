"use client";
/** فورم الاشتراك في النشرة — مُعاد استخدامه في الفوتر والسكشن. */
import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { track } from "@/lib/analytics";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      push(data.message, data.ok ? "success" : "error");
      if (data.ok) {
        track("subscribe_newsletter");
        setEmail("");
      }
    } catch {
      push("فيه حاجة مش مظبوطة. جرّب تاني، أو كلّمني على واتساب.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-2 sm:flex-row", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        بريدك الإلكتروني
      </label>
      <Input
        id="newsletter-email"
        type="email"
        required
        dir="ltr"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 text-start"
      />
      <Button type="submit" size="md" loading={loading} icon={<Send />}>
        ابعتلي الدليل
      </Button>
    </form>
  );
}
