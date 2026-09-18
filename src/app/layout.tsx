/**
 * الجذر — RTL والخطوط والثيم والهيكل العام.
 * المواصفات: docs/DESIGN.md §3.1 و §10.3
 */
import type { Metadata, Viewport } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/content/site";
import { buildMetadata, personJsonLd, organizationJsonLd } from "@/lib/seo";
import { getAllLevels, getCoursesByLevel, getSearchIndex } from "@/lib/queries";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SiteShell } from "@/components/layout/site-shell";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { ExitIntentModal } from "@/components/shared/exit-intent-modal";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";

const display = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — كورسات ذكاء اصطناعي بالعربي على ٣ مستويات`,
  description:
    "الهدف مش إنك تتعلّم أدوات — الهدف إنك تبني نظام عمل. ٩ كورسات على ٣ مستويات، بالعربي، وكل جلسة بتخلص بمخرج شغّال من شغلك إنت.",
  path: "/",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfb" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // البيانات بتتجاب هنا مرة واحدة على السيرفر
  const levels = await getAllLevels();
  const [beginner, intermediate, advanced] = await Promise.all([
    getCoursesByLevel("beginner"),
    getCoursesByLevel("intermediate"),
    getCoursesByLevel("advanced"),
  ]);
  const searchIndex = await getSearchIndex();

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <JsonLd data={[personJsonLd(), organizationJsonLd()]} />
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgress />
            <SiteShell
              levels={levels}
              coursesByLevel={{ beginner, intermediate, advanced }}
              searchIndex={searchIndex}
            >
              <main id="main">{children}</main>
              <Footer />
              <BackToTop />
              <WhatsAppFab />
              <MobileCtaBar />
              <ExitIntentModal />
            </SiteShell>
          </ToastProvider>
        </ThemeProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
