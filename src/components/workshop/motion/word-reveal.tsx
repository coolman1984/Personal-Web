"use client";
/**
 * Heading reveal word-by-word on scroll — CSS + IntersectionObserver.
 * Without JS or with reduced motion, words stay visible (see globals.css).
 */
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Stagger per word in ms */
  staggerMs?: number;
  children?: ReactNode;
}

export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  staggerMs = 50,
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-in-view");
      return;
    }
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("word-reveal", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="word-reveal-shell" aria-hidden={false}>
          <span
            className="word-reveal-inner"
            style={{ transitionDelay: `${index * staggerMs}ms` }}
          >
            {word}
          </span>
          {index < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </Tag>
  );
}
