/**
 * Unmatched URLs and unknown static slugs.
 * Own document so the 404 is styled without a route-group layout.
 * No author or site-name metadata — those must not leak onto the English home.
 */
import type { Metadata } from "next";
import "./globals.css";
import { SiteNotFound } from "@/components/layout/site-not-found";

export const metadata: Metadata = {
  title: "الصفحة مش موجودة",
  description: "الرابط ده مش موجود.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body
        className="min-h-screen bg-bg text-fg antialiased"
        style={{
          fontFamily:
            '"IBM Plex Sans Arabic", "Noto Sans Arabic", "Noto Naskh Arabic", Tahoma, "Segoe UI", sans-serif',
        }}
      >
        <SiteNotFound />
      </body>
    </html>
  );
}
