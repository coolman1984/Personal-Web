/**
 * صفحة الحالة — سلسلة الإثبات كاملة، مع صندوق «How measured» وصندوق «Limits of the result».
 * الحقل الفاضي بيظهر «To be documented» بدل ما يتخفّى (بيظهر بس في وضع المعاينة).
 * المرجع: Master Profile v3 §3.4.
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CasePageContent, CaseStudy } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface CaseDetailProps {
  study: CaseStudy;
  eyebrow: string;
  content: CasePageContent["detail"];
  className?: string;
}

interface ChainBlockProps {
  index: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/** خطوة من سلسلة الإثبات — رقم وعنوان على جنب والمحتوى على الجنب التاني */
function ChainBlock({ index, title, children, className }: ChainBlockProps) {
  return (
    <ScrollReveal
      className={cn("grid gap-4 border-t border-border py-10 md:grid-cols-[14rem_1fr] md:gap-10", className)}
    >
      <h2 className="flex items-baseline gap-3 font-display text-xl font-medium tracking-tight text-fg">
        <span className="font-mono text-sm tabular-nums text-primary">{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="max-w-3xl text-base leading-relaxed text-fg">{children}</div>
    </ScrollReveal>
  );
}

export function CaseDetail({ study, eyebrow, content, className }: CaseDetailProps) {
  const missing = <span className="text-fg-muted italic">{content.missing}</span>;
  const text = (value: string | null) => (value ? <p>{value}</p> : missing);
  const list = (items: string[] | null) =>
    items && items.length > 0 ? (
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="border-s-2 border-primary ps-3">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      missing
    );

  const facts = [
    { label: content.contextLabel, value: study.context },
    { label: content.periodLabel, value: study.period },
    { label: content.stackLabel, value: study.stack.length > 0 ? study.stack.join(", ") : null },
  ];

  return (
    <div className={className}>
      <section className="bg-background pb-12 pt-10 text-fg md:pt-14">
        <div id="workshop-content" tabIndex={-1} className="container-ws outline-none">
          <Link
            href={content.backHref}
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
            {content.backLabel}
          </Link>
          <Eyebrow className="mt-10">{eyebrow}</Eyebrow>
          <h1 className="display-lg mt-6 max-w-4xl text-fg">{study.title}</h1>
          <dl className="mt-10 grid border border-border md:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-e md:last:border-e-0"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{fact.label}</dt>
                <dd className="mt-2 text-sm text-fg">{fact.value ?? missing}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WorkshopSection className="pt-0 md:pt-0">
        <ChainBlock index={1} title={content.problemTitle}>
          <p>{study.problem}</p>
        </ChainBlock>
        <ChainBlock index={2} title={content.baselineTitle}>
          {text(study.baseline)}
        </ChainBlock>
        <ChainBlock index={3} title={content.roleTitle}>
          {text(study.role)}
          <p className="mt-3 text-sm text-fg-muted">
            <span className="font-medium text-fg">{content.teamLabel}: </span>
            {study.team ?? content.missing}
          </p>
        </ChainBlock>
        <ChainBlock index={4} title={content.changedTitle}>
          {list(study.changed)}
        </ChainBlock>
        <ChainBlock index={5} title={content.resultTitle}>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
            <div className="bg-background p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{content.grossLabel}</dt>
              <dd className="mt-2 font-display text-xl font-medium tracking-tight">
                {study.grossResult ?? missing}
              </dd>
            </div>
            <div className="bg-secondary/50 p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{content.netLabel}</dt>
              <dd className="mt-2 font-display text-xl font-medium tracking-tight">{study.netResult ?? missing}</dd>
            </div>
          </dl>
          <aside className="mt-6 border-s-2 border-primary bg-secondary/40 p-5">
            <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
              {content.howMeasuredTitle}
            </h3>
            <div className="mt-2 text-sm leading-relaxed">{text(study.howMeasured)}</div>
          </aside>
        </ChainBlock>
        <ChainBlock index={6} title={content.limitsTitle}>
          <aside className="border border-border p-5 text-sm leading-relaxed">{list(study.limits)}</aside>
        </ChainBlock>
        <ChainBlock index={7} title={content.evidenceTitle} className="border-b">
          {study.evidence && study.evidence.length > 0 ? (
            <ul className="space-y-2">
              {study.evidence.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg underline underline-offset-4 transition-colors duration-200 hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          ) : (
            missing
          )}
        </ChainBlock>
      </WorkshopSection>

      <WorkshopSection className="border-t border-border bg-secondary/30">
        <ScrollReveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{content.cta.title}</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-muted">{content.cta.body}</p>
          </div>
          <WorkshopButton href={content.cta.href} variant="primary">
            {content.cta.label}
          </WorkshopButton>
        </ScrollReveal>
      </WorkshopSection>
    </div>
  );
}
