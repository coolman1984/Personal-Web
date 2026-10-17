/**
 * Arabic-site fonts, kept separate from the English workshop.
 * This file must not import ./fonts — a shared chunk would preload IBM Plex on the English home.
 */
import { Cairo, IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";

export const display = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
  // Shared CSS would otherwise emit these files as preloads on the English home.
  preload: false,
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const arabicFontClassName = `${display.variable} ${arabic.variable} ${mono.variable}`;
