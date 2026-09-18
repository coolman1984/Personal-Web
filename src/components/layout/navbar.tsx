"use client";
/** الهيدر الزجاجي الثابت. المواصفات: docs/DESIGN.md §5.4 */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/hooks/use-scroll-progress";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";
import type { Course, Level } from "@/types";

interface NavbarProps {
  levels: Level[];
  coursesByLevel: Record<string, Course[]>;
  onOpenSearch: () => void;
  /** إيميل المستخدم الحالي — null لو مش داخل */
  userEmail: string | null;
  isAdmin: boolean;
  authEnabled: boolean;
}

export function Navbar({
  levels,
  coursesByLevel,
  onOpenSearch,
  userEmail,
  isAdmin,
  authEnabled,
}: NavbarProps) {
  const scrolled = useScrolledPast(20);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-200 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:shadow-lift"
      >
        تخطّي إلى المحتوى
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-[height,background-color,border-color] duration-300",
          scrolled ? "h-16 border-b border-line glass" : "h-20 border-b border-transparent",
        )}
      >
        <div className="container-x flex h-full items-center justify-between gap-4">
          <Logo />

          {/* روابط الديسكتوب */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقّل الرئيسي">
            {mainNav.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              if (hasChildren) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <button
                      onClick={() => setMegaOpen((v) => !v)}
                      aria-expanded={megaOpen}
                      className={cn(
                        "flex h-9 items-center gap-1 rounded-[10px] px-3 text-[15px] font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-surface-2 text-fg"
                          : "text-fg-muted hover:bg-surface-2 hover:text-fg",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-4 transition-transform", megaOpen && "rotate-180")}
                      />
                    </button>
                    <MegaMenu
                      open={megaOpen}
                      levels={levels}
                      coursesByLevel={coursesByLevel}
                      onNavigate={() => setMegaOpen(false)}
                    />
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-9 items-center rounded-[10px] px-3 text-[15px] font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-surface-2 text-fg"
                      : "text-fg-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* أدوات الشمال */}
          <div className="flex items-center gap-2">
            {site.features.commandPalette && (
              <button
                onClick={onOpenSearch}
                aria-label="بحث في الموقع"
                className="hidden size-10 place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg sm:grid"
              >
                <Search className="size-[18px]" />
              </button>
            )}
            <ThemeToggle />
            {authEnabled && <UserMenu email={userEmail} isAdmin={isAdmin} />}
            <Button href="/quiz" size="md" className="hidden md:inline-flex">
              حدّد مستواك
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="فتح القائمة"
              className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors hover:text-fg lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        levels={levels}
        onOpenSearch={onOpenSearch}
      />
    </>
  );
}
