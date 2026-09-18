"use client";
import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    // defaultTheme="system" = نحترم إعداد جهاز الزائر.
    // الزائر يقدر يغيّره من زر الثيم، واختياره بيتحفظ.
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
