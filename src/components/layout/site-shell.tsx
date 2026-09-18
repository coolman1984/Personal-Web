"use client";
/**
 * الغلاف التفاعلي للموقع — بيربط الهيدر بلوحة الأوامر.
 * البيانات بتيجي من Server Component (layout.tsx) عشان ما نحمّلش المتصفّح.
 */
import { useCallback, useState, type ReactNode } from "react";
import { useHotkey } from "@/hooks/use-hotkey";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { Navbar } from "./navbar";
import { CommandPalette } from "./command-palette";
import type { Course, Level, SearchItem } from "@/types";

interface SiteShellProps {
  levels: Level[];
  coursesByLevel: Record<string, Course[]>;
  searchIndex: SearchItem[];
  children: ReactNode;
}

export function SiteShell({ levels, coursesByLevel, searchIndex, children }: SiteShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => {
    setSearchOpen(true);
    track("open_command_palette");
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useHotkey("k", openSearch, { meta: true });

  return (
    <>
      <Navbar levels={levels} coursesByLevel={coursesByLevel} onOpenSearch={openSearch} />
      {children}
      {site.features.commandPalette && (
        <CommandPalette open={searchOpen} onClose={closeSearch} items={searchIndex} />
      )}
    </>
  );
}
