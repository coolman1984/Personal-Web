"use client";
/** أزرار المشاركة على السوشيال. */
import { Check, Link2 } from "lucide-react";
import { LinkedInIcon, XIcon } from "./social-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const links = [
    {
      label: "مشاركة على إكس",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "مشاركة على لينكدإن",
      icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // الحافظة مش متاحة — نتجاهل بهدوء
    }
  }

  const btn =
    "grid size-9 place-items-center rounded-lg border border-line bg-surface text-fg-subtle transition-colors hover:border-line-strong hover:text-fg";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-fg-subtle">شارك:</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className={btn}
        >
          <l.icon className="size-4" />
        </a>
      ))}
      <button onClick={copy} aria-label="نسخ الرابط" className={cn(btn, copied && "text-brand-500")}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
