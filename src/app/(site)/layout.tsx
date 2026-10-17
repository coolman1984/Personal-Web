/**
 * جذر الموقع العربي — RTL وغلاف الكورسات وحالة الحساب.
 * المواصفات: docs/DESIGN.md §3.1 و §10.3
 */
import type { Metadata, Viewport } from "next";
import "../globals.css";

import { site } from "@/content/site";
import { personJsonLd, organizationJsonLd } from "@/lib/seo";
import { getAllLevels, getCoursesByLevel, getSearchIndex } from "@/lib/queries";
import { getUserEmail } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/access";
import { isAuthConfigured, isNewsletterConfigured } from "@/lib/features";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import { siteUrl } from "@/lib/utils";
import { arabicFontClassName } from "@/lib/fonts-ar";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SiteShell } from "@/components/layout/site-shell";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteExtras } from "@/components/layout/site-extras";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    template: `%s — ${site.name}`,
    default: `${site.name} — كورسات ذكاء اصطناعي بالعربي على ٣ مستويات`,
  },
  description:
    "الهدف مش إنك تتعلّم أدوات — الهدف إنك تبني نظام عمل. ٩ كورسات على ٣ مستويات، بالعربي، وكل جلسة بتخلص بمخرج شغّال من شغلك إنت.",
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function SiteRootLayout({ children }: { children: React.ReactNode }) {
  // من غير مفاتيح التكامل، الصفحات العامة تفضل ثابتة. كوكيز الحساب بتتقري بس لو متفعّل.
  const authEnabled = isAuthConfigured();
  const newsletterEnabled = site.features.newsletter && isNewsletterConfigured();
  const levels = await getAllLevels();
  const [beginner, intermediate, advanced] = await Promise.all([
    getCoursesByLevel("beginner"),
    getCoursesByLevel("intermediate"),
    getCoursesByLevel("advanced"),
  ]);
  const searchIndex = await getSearchIndex();
  const userEmail = authEnabled ? await getUserEmail() : null;
  const admin = userEmail ? await isAdmin() : false;

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={arabicFontClassName}>
      <body>
        <JsonLd data={[personJsonLd(), organizationJsonLd()]} />
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgress />
            <SiteShell
              levels={levels}
              coursesByLevel={{ beginner, intermediate, advanced }}
              searchIndex={searchIndex}
              userEmail={userEmail}
              isAdmin={admin}
              authEnabled={authEnabled}
              newsletterEnabled={newsletterEnabled}
            >
              <main id="main">{children}</main>
              <SiteExtras newsletterEnabled={newsletterEnabled} />
            </SiteShell>
          </ToastProvider>
        </ThemeProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
