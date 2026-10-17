"use client";
/**
 * Heading reveal word-by-word on scroll — CSS + IntersectionObserver.
 * Without JS or with reduced motion, words stay visible (see globals.css).
 */
import { useLayoutEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { armScrollMotion, isElementInView } from "./motion-ready";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Stagger per word in ms */
  staggerMs?: number;
}

export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  staggerMs = 50,
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

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
      el.classList.add("word-reveal-armed");
      el.setAttribute("inert", "");
    };

    if (isElementInView(el, 0.25)) {
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
