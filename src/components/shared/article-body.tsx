/** عارض محتوى المقال — بيحوّل بلوكات البيانات لـHTML. */
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleBlock } from "@/types";

const calloutStyles = {
  info: {
    icon: Info,
    box: "border-brand-500/25 bg-brand-500/8",
    icn: "text-brand-500",
  },
  tip: {
    icon: Lightbulb,
    box: "border-[oklch(0.58_0.15_150/0.28)] bg-[oklch(0.58_0.15_150/0.07)]",
    icn: "text-[oklch(0.5_0.15_150)] dark:text-[oklch(0.78_0.16_150)]",
  },
  warn: {
    icon: TriangleAlert,
    box: "border-gold-500/28 bg-gold-500/8",
    icn: "text-gold-700 dark:text-gold-300",
  },
} as const;

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-ar">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return <p key={i}>{block.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i}>
                {block.text}
                {block.cite && (
                  <cite className="mt-2 block text-sm not-italic text-fg-subtle">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          case "callout": {
            const s = calloutStyles[block.tone];
            const Icon = s.icon;
            return (
              <div key={i} className={cn("my-7 rounded-lg border p-5", s.box)}>
                <p className="mb-1.5 flex items-center gap-2 text-[15px] font-extrabold text-fg">
                  <Icon className={cn("size-4.5", s.icn)} aria-hidden />
                  {block.title}
                </p>
                <p className="m-0 text-[14.5px] leading-[1.9]">{block.text}</p>
              </div>
            );
          }
          case "code":
            return (
              <pre
                key={i}
                dir="ltr"
                className="my-6 overflow-x-auto rounded-lg border border-line bg-surface-2 p-5 text-start text-sm"
              >
                <code className="font-mono">{block.code}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
