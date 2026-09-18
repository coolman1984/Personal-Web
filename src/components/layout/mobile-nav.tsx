"use client";
/** درج التنقّل للموبايل. */
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { getIcon } from "@/lib/icon";
import { cn, whatsappLink } from "@/lib/utils";
import { accentFor, levelShortLabel } from "@/lib/tokens";
import { useLockBody } from "@/hooks/use-lock-body";
import { Button } from "@/components/ui/button";
import type { Level } from "@/types";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  levels: Level[];
  onOpenSearch: () => void;
}

export function MobileNav({ open, onClose, levels, onOpenSearch }: MobileNavProps) {
  useLockBody(open);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-90 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 end-0 flex w-[min(21rem,88vw)] flex-col border-s border-line bg-surface shadow-lift"
            aria-label="قائمة التنقّل"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-sm font-extrabold text-fg">القائمة</span>
              <button
                onClick={onClose}
                aria-label="إغلاق القائمة"
                className="grid size-9 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="mb-5 flex w-full items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-fg-subtle"
              >
                <Search className="size-4" />
                ابحث في الموقع...
              </button>

              <p className="mb-2 px-2 text-[11px] font-bold tracking-wider text-fg-subtle">
                المستويات
              </p>
              <ul className="mb-5 flex flex-col gap-1.5">
                {levels.map((level) => {
                  const Icon = getIcon(level.icon);
                  const accent = accentFor(level.id);
                  return (
                    <li key={level.id}>
                      <Link
                        href={`/levels/${level.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:bg-surface-2"
                      >
                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-lg border",
                            accent.bg,
                            accent.border,
                            accent.text,
                          )}
                        >
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-bold text-fg">
                            {levelShortLabel[level.id]}
                          </span>
                          <span className="text-[12px] text-fg-subtle">{level.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mb-2 px-2 text-[11px] font-bold tracking-wider text-fg-subtle">
                الصفحات
              </p>
              <ul className="flex flex-col gap-0.5">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-2 border-t border-line p-4">
              <Button href="/quiz" size="lg" fullWidth onClick={onClose}>
                حدّد مستواك
              </Button>
              <Button
                href={whatsappLink(site.whatsapp, `السلام عليكم ${site.shortName}،`)}
                variant="secondary"
                size="lg"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                كلّمني على واتساب
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
