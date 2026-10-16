/**
 * Arabic face for the course site only.
 * This file must not import ./fonts — a shared chunk would preload IBM Plex on the English home.
 */
import { IBM_Plex_Sans_Arabic } from "next/font/google";

export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
  // Shared CSS would otherwise emit these files as preloads on the English home.
  preload: false,
});

export const arabicFontClassName = arabic.variable;
