"use client";
/**
 * Site chrome hidden on workshop home — footer, FABs, mobile CTA.
 */
import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { BackToTop } from "./back-to-top";
import { WhatsAppFab } from "./whatsapp-fab";
import { MobileCtaBar } from "./mobile-cta-bar";

export function SiteExtras() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <>
      <Footer />
      <BackToTop />
      <WhatsAppFab />
      <MobileCtaBar />
    </>
  );
}
