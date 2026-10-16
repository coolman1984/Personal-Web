/**
 * الجذر — RTL والخطوط والثيم والهيكل العام.
 * المواصفات: docs/DESIGN.md §3.1 و §10.3
 */
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

import { site } from "@/content/site";
import { buildMetadata, personJsonLd, organizationJsonLd } from "@/lib/seo";
import { getAllLevels, getCoursesByLevel, getSearchIndex } from "@/lib/queries";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SiteShell } from "@/components/layout/site-shell";
import { ScrollProgressGate } from "@/components/layout/scroll-progress-gate";
import { SiteExtras } from "@/components/layout/site-extras";
import { JsonLd } from "@/components/shared/json-ld";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — كورسات ذكاء اصطناعي بالعربي على ٣ مستويات`,
  description:
    "الهدف مش إنك تتعلّم أدوات — الهدف إنك تبني نظام عمل. ٩ كورسات على ٣ مستويات، بالعربي، وكل جلسة بتخلص بمخرج شغّال من شغلك إنت.",
  path: "/",
});

export const viewport: Viewport = {
  // ألوان شريط المتصفّح على الموبايل — استثناء مقصود من قاعدة «ممنوع ألوان خام»:
  // بتتقري قبل تحميل الـCSS. القيم = `--bg` النهاري والليلي (docs/DESIGN.md §2).
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c22" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";
  const isWorkshopHome = pathname === "/";

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
      lang={isWorkshopHome ? "en" : "ar"}
      dir={isWorkshopHome ? "ltr" : "rtl"}
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${arabic.variable}`}
    >
      <body>
        {!isWorkshopHome && <JsonLd data={[personJsonLd(), organizationJsonLd()]} />}
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgressGate />
            <SiteShell
              levels={levels}
              coursesByLevel={{ beginner, intermediate, advanced }}
              searchIndex={searchIndex}
            >
              {isWorkshopHome ? children : <main id="main">{children}</main>}
              <SiteExtras />
            </SiteShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
