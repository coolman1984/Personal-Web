"use client";
/**
 * المصنع الحي جوه الصفحة — iframe لـ plant.html في وضع embed وبيبدأ بالعرض (#present).
 * ليه client: بيحمّل الـ3D بس لما يبان على شاشة كبيرة، وعلى الموبايل بعد ضغطة (توفير بيانات وبطارية).
 * قبل التحميل بتظهر صورة ثابتة من نفس المصنع. النصوص كلها جاية من المحتوى (props).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LivePlantContent {
  /** الصفحة اللي بتتعرض جوه الإطار */
  src: string;
  /** المصنع كامل في تبويب جديد */
  openHref: string;
  title: string;
  poster: { src: string; alt: string; width: number; height: number };
  startLabel: string;
  loadingLabel: string;
  fullscreenLabel: string;
  openLabel: string;
  note: string;
}

interface LivePlantProps {
  content: LivePlantContent;
  className?: string;
}

/** شاشة كبيرة ومن غير «تقليل الحركة» ومن غير «توفير البيانات» → يشتغل لوحده */
function canAutostart() {
  if (typeof window === "undefined") return false;
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return wide && !reduced && !saveData;
}

export function LivePlant({ content, className }: LivePlantProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || started || !canAutostart()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  const fullscreen = useCallback(() => {
    setStarted(true);
    frameRef.current?.requestFullscreen?.().catch(() => undefined);
  }, []);

  return (
    <figure className={cn("min-w-0", className)}>
      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-ink sm:aspect-[16/9]"
      >
        <Image
          src={content.poster.src}
          alt={content.poster.alt}
          width={content.poster.width}
          height={content.poster.height}
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            ready && "opacity-0",
          )}
        />
        {started ? (
          <iframe
            src={content.src}
            title={content.title}
            allow="fullscreen"
            allowFullScreen
            onLoad={() => setReady(true)}
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors duration-200 hover:bg-ink/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          >
            <span className="inline-flex h-12 items-center gap-2 rounded-[var(--radius)] bg-primary-solid px-6 text-sm font-medium text-primary-fg">
              <Play className="size-4" aria-hidden />
              {content.startLabel}
            </span>
          </button>
        )}
        {started && !ready && (
          <span
            role="status"
            className="absolute bottom-4 start-4 border border-ink-border bg-ink/80 px-3 py-1.5 font-mono text-xs text-ink-fg"
          >
            {content.loadingLabel}
          </span>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">{content.note}</span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={fullscreen}
            className="inline-flex items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
          >
            <Maximize2 className="size-3.5" aria-hidden />
            {content.fullscreenLabel}
          </button>
          <a
            href={content.openHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
          >
            {content.openLabel}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
