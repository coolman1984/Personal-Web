"use client";
/**
 * Workshop sticky nav — blurred background, mobile menu.
 */
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/hooks/use-scroll-progress";
import type { WorkshopContent } from "@/types";
import { WorkshopButton } from "./workshop-button";

interface WorkshopNavProps {
  content: WorkshopContent;
}

export function WorkshopNav({ content }: WorkshopNavProps) {
  const scrolled = useScrolledPast(12);

  return (
    <>
      <a
        href="#workshop-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[200] focus:rounded-[var(--radius)] focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-sm"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl transition-[border-color,background-color] duration-300",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="font-display text-base font-semibold tracking-tight text-fg transition-colors duration-200 hover:text-primary"
          >
            {content.owner.name}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-[var(--radius)] px-3 py-2 text-sm text-fg-muted transition-colors duration-200 hover:bg-secondary hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <WorkshopButton
              href={content.nav.cta.href}
              variant="primary"
              className="hidden sm:inline-flex"
            >
              {content.nav.cta.label}
            </WorkshopButton>

            <details className="group relative lg:hidden">
              <summary
                className="grid size-10 cursor-pointer list-none place-items-center rounded-[var(--radius)] border border-border text-fg transition-colors duration-200 hover:bg-secondary [&::-webkit-details-marker]:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5 group-open:hidden" aria-hidden />
                <span className="hidden text-lg leading-none group-open:inline" aria-hidden>
                  ×
                </span>
              </summary>
              <nav
                className="absolute end-0 top-full z-50 mt-2 min-w-[min(100vw-2.5rem,18rem)] border border-border bg-background shadow-sm"
                aria-label="Mobile"
              >
                <ul className="flex flex-col gap-1 p-3">
                  {content.nav.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block rounded-[var(--radius)] px-3 py-3 text-sm text-fg-muted transition-colors hover:bg-secondary hover:text-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  <li className="pt-2 sm:hidden">
                    <WorkshopButton href={content.nav.cta.href} variant="primary" className="w-full">
                      {content.nav.cta.label}
                    </WorkshopButton>
                  </li>
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
