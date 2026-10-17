"use client";
/**
 * Fade + rise on scroll — respects reduced motion and no-JS fallback.
 */
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { armScrollMotion, isElementInView } from "./motion-ready";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-in-view");
      return;
    }

    const markVisible = () => {
      el.classList.add("is-in-view");
      el.removeAttribute("inert");
    };

    const markHidden = () => {
      armScrollMotion();
      el.classList.add("scroll-reveal-armed");
      el.setAttribute("inert", "");
    };

    if (isElementInView(el)) {
      markVisible();
      return;
    }

    markHidden();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markVisible();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", className)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
