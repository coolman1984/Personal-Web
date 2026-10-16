/**
 * خطوط الموقع — مشتركة بين مجموعات المسارات (workshop / site).
 */
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

export const fontClassName = `${geist.variable} ${geistMono.variable} ${arabic.variable}`;
