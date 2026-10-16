/**
 * جذر الورشة — إنجليزي LTR على `/` (مجموعة مسارات منفصلة عن الموقع العربي).
 */
import type { Viewport } from "next";
import "../globals.css";

import { latinFontClassName } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c22" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function WorkshopRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={latinFontClassName}>
      <body>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
