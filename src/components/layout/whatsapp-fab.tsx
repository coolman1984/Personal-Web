"use client";
/** زر واتساب عائم. المواصفات: docs/DESIGN.md §5.10 */
import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFab() {
  if (!site.features.whatsappFab) return null;

  const href = whatsappLink(
    site.whatsapp,
    `السلام عليكم ${site.shortName}، حابب أسأل عن الكورسات.`,
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معايا على واتساب"
      className="group fixed bottom-24 end-5 z-40 grid size-14 place-items-center rounded-full text-white shadow-[0_8px_24px_-6px_oklch(0.72_0.17_145/0.45)] transition-transform hover:scale-105 md:bottom-6"
      style={{ background: "oklch(0.66 0.16 145)", animation: "pulse-ring 2.6s cubic-bezier(0.4,0,0.6,1) infinite" }}
    >
      <MessageCircle className="size-6" />
      <span className="pointer-events-none absolute end-full me-3 hidden whitespace-nowrap rounded-lg border border-line glass px-3 py-2 text-[13px] font-bold text-fg opacity-0 shadow-soft transition-opacity group-hover:opacity-100 md:block">
        كلّمني على واتساب
      </span>
    </a>
  );
}
