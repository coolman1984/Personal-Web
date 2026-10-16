"use client";
/**
 * الغلاف التفاعلي للموقع — بيربط الهيدر بلوحة الأوامر.
 * البيانات بتيجي من Server Component (layout.tsx) عشان ما نحمّلش المتصفّح.
 */
import { useCallback, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useHotkey } from "@/hooks/use-hotkey";
import { site } from "@/content/site";
import { Navbar } from "./navbar";
import { CommandPalette } from "./command-palette";
import { ExitIntentModal } from "./exit-intent-modal";
import type { Course, Level, SearchItem } from "@/types";

interface SiteShellProps {
  levels: Level[];
  coursesByLevel: Record<string, Course[]>;
  searchIndex: SearchItem[];
  children: ReactNode;
}

export function SiteShell({ levels, coursesByLevel, searchIndex, children }: SiteShellProps) {
  const pathname = usePathname();
  const isWorkshopHome = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useHotkey("k", openSearch, { meta: true });

  return (
    <>
      {!isWorkshopHome && (
        <Navbar levels={levels} coursesByLevel={coursesByLevel} onOpenSearch={openSearch} />
      )}
      {children}
      {!isWorkshopHome && site.features.commandPalette && (
        <CommandPalette open={searchOpen} onClose={closeSearch} items={searchIndex} />
      )}
      {!isWorkshopHome && site.features.exitIntent && site.features.newsletter && (
        <ExitIntentModal />
      )}
    </>
  );
}
