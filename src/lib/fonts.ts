/**
 * Latin faces for every document.
 * IBM Plex Sans Arabic is in fonts-ar.ts so the English workshop layout
 * does not import it and does not preload it.
 */
import { Geist, Geist_Mono } from "next/font/google";

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

export const latinFontClassName = `${geist.variable} ${geistMono.variable}`;
