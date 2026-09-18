"use client";
/** قائمة المستخدم في الهيدر — بتتغيّر حسب حالة الدخول. */
import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  email: string | null;
  isAdmin: boolean;
}

export function UserMenu({ email, isAdmin }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  if (!email) {
    return (
      <Button href="/login" variant="secondary" size="md" className="hidden sm:inline-flex">
        دخول
      </Button>
    );
  }

  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="قائمة حسابي"
        className={cn(
          "flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-2.5",
          "transition-colors hover:bg-surface-2",
        )}
      >
        <span className="grid size-6 place-items-center rounded-lg bg-linear-to-bl from-brand-600 to-aqua-500 text-[11px] font-black text-white">
          {initial}
        </span>
        <ChevronDown
          className={cn("size-4 text-fg-subtle transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute end-0 top-full z-50 w-60 pt-2">
          <div className="overflow-hidden rounded-2xl border border-line glass shadow-lift">
            <p
              className="truncate border-b border-line px-4 py-3 text-[12.5px] text-fg-subtle"
              dir="ltr"
            >
              {email}
            </p>
            <nav className="p-1.5">
              <Link
                href="/my"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <BookOpen className="size-4" aria-hidden />
                كورساتي
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  <Shield className="size-4" aria-hidden />
                  لوحة الإدارة
                </Link>
              )}
            </nav>
            <form action="/auth/signout" method="post" className="border-t border-line p-1.5">
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <LogOut className="size-4" aria-hidden />
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
