"use client";
/**
 * عناصر الموقع الإضافية — فوتر، FABs، شريط الموبايل.
 */
import { Footer } from "./footer";
import { BackToTop } from "./back-to-top";
import { WhatsAppFab } from "./whatsapp-fab";
import { MobileCtaBar } from "./mobile-cta-bar";

export function SiteExtras({ newsletterEnabled }: { newsletterEnabled: boolean }) {
  return (
    <>
      <Footer newsletterEnabled={newsletterEnabled} />
      <BackToTop />
      <WhatsAppFab />
      <MobileCtaBar />
    </>
  );
}
