/**
 * صفحة /demo — «The 10-Minute Report Rebuild»: الملفات قبل، خطوات الـpipeline بأوقاتها الحقيقية،
 * الفحوصات والملاحظات بعد، والمقارنة بخط الأساس اللي بيقوله الحضور. المرجع: Master Profile v3 §4.3.
 */
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageChromeContent, ReportRebuildContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";

interface ReportRebuildLandingProps {
  content: ReportRebuildContent;
  chrome: PageChromeContent;
  className?: string;
}

const fmt = (n: number) => n.toLocaleString("en-US");

export function ReportRebuildLanding({ content, chrome, className }: ReportRebuildLandingProps) {
  const { hero, before, pipeline, after, compare, limits, next, results } = content;
  const seconds = (results.pipelineMs / 1000).toFixed(2);

  const facts = [
    { label: content.facts.files, value: fmt(results.inputs.files) },
    { label: content.facts.rows, value: fmt(results.inputs.rows) },
    { label: content.facts.run, value: seconds },
    { label: content.facts.checks, value: fmt(results.checks.length) },
  ];

  return (
    <div className={cn("workshop-root min-h-screen bg-background text-fg", className)}>
      <WorkshopNav content={chrome} />
      <main>
        {/* الهيرو */}
        <section className="bg-background pb-28 pt-14 text-fg md:pb-36 md:pt-20">
          <div id="workshop-content" tabIndex={-1} className="container-ws outline-none">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <span className="border border-primary px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
                {hero.badge}
              </span>
            </div>
            <h1 className="display-lg mt-6 max-w-4xl text-fg">{hero.title}</h1>
            <ScrollReveal className="mt-8 max-w-3xl">
              <p className="text-lg leading-relaxed text-fg-muted">{hero.intro}</p>
            </ScrollReveal>
            <ScrollReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" delayMs={80}>
              <WorkshopButton href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label}
              </WorkshopButton>
              <WorkshopButton href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </WorkshopButton>
            </ScrollReveal>
          </div>
        </section>

        {/* الشريط الكحلي الوحيد */}
        <div className="container-ws relative z-10 -mt-16 md:-mt-20">
          <ScrollReveal>
            <dl
              aria-label={content.factsLabel}
              className="ink-grid-bg grid grid-cols-2 border border-ink-border text-ink-fg lg:grid-cols-4"
            >
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-ink-border p-6 [&:nth-child(odd)]:border-e lg:border-b-0 lg:border-e lg:last:border-e-0 [&:nth-last-child(-n+2)]:border-b-0 md:p-8"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{fact.label}</dt>
                  <dd className="mt-3 font-display text-3xl font-medium tabular-nums tracking-tight text-ink-fg md:text-4xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        {/* قبل */}
        <WorkshopSection>
          <Eyebrow>{before.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={before.title} className="display-md mt-6 max-w-4xl" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{before.intro}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-12">
            <table className="w-full border-collapse text-start text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pe-6 text-start font-mono text-xs font-medium uppercase tracking-[0.14em] text-fg-muted">
                    {before.fileLabel}
                  </th>
                  <th scope="col" className="py-3 text-start font-mono text-xs font-medium uppercase tracking-[0.14em] text-fg-muted">
                    {before.problemLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {before.files.map((file) => (
                  <tr key={file.name} className="border-b border-border align-top">
                    <th scope="row" className="py-4 pe-6 text-start font-medium text-fg">
                      {file.name}
                    </th>
                    <td className="py-4 text-fg-muted">{file.problem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>
        </WorkshopSection>

        {/* الخطوات */}
        <WorkshopSection className="border-t border-border bg-secondary/30">
          <Eyebrow>{pipeline.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={pipeline.title} className="display-md mt-6" />
          <ol className="mt-12 border-t border-border">
            {results.steps.map((step, index) => (
              <li key={step.step}>
                <ScrollReveal delayMs={index * 40}>
                  <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-[3rem_9rem_1fr_5rem] sm:items-baseline sm:gap-6">
                    <span className="font-mono text-sm tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-medium text-fg">{step.step}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{step.detail}</p>
                    <p className="font-mono text-xs tabular-nums text-fg-muted sm:text-end">
                      {step.ms.toFixed(1)} {pipeline.msLabel}
                    </p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </WorkshopSection>

        {/* بعد */}
        <WorkshopSection className="border-t border-border">
          <Eyebrow>{after.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={after.title} className="display-md mt-6 max-w-4xl" />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                {after.checksTitle}
              </h3>
              <ul className="mt-5 space-y-4">
                {results.checks.map((c) => (
                  <li key={c.check} className="flex gap-3">
                    {c.passed ? (
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-label={after.passLabel} />
                    ) : (
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-fg" aria-label={after.failLabel} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-fg">{c.check}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delayMs={60}>
              <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                {after.findingsTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {results.findings.map((f) => (
                  <li key={f} className="border-s-2 border-primary ps-3 text-sm leading-relaxed text-fg">
                    {f}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-14">
            <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
              {after.tableTitle}
            </h3>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-border text-fg-muted">
                    <th scope="col" className="py-3 pe-4 text-start font-medium">{after.monthLabel}</th>
                    <th scope="col" className="py-3 pe-4 text-end font-medium">{after.goodLabel}</th>
                    <th scope="col" className="py-3 pe-4 text-end font-medium">{after.scrapLabel}</th>
                    <th scope="col" className="py-3 text-end font-medium">{after.costLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.byMonth.map((m) => (
                    <tr key={m.month} className="border-b border-border">
                      <th scope="row" className="py-3 pe-4 text-start font-medium text-fg">{m.month}</th>
                      <td className="py-3 pe-4 text-end text-fg">{fmt(m.goodUnits)}</td>
                      <td className="py-3 pe-4 text-end text-fg">{fmt(m.scrapUnits)}</td>
                      <td className="py-3 text-end text-fg">{fmt(Math.round(m.scrapCost))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-mono text-xs text-fg-muted">{results.dataLabel}</p>
          </ScrollReveal>
        </WorkshopSection>

        {/* المقارنة */}
        <WorkshopSection className="border-t border-border bg-secondary/30">
          <Eyebrow>{compare.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={compare.title} className="display-md mt-6" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{compare.body}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            <div className="bg-background p-7">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{compare.manualLabel}</p>
              <p className="mt-3 font-display text-xl font-medium text-fg">{compare.manualValue}</p>
            </div>
            <div className="bg-background p-7">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{compare.pipelineLabel}</p>
              <p className="mt-3 font-display text-3xl font-medium tabular-nums text-primary">{seconds} s</p>
            </div>
            <div className="bg-background p-7">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{compare.videoTitle}</p>
              <p className="mt-3 font-display text-xl font-medium text-fg-muted">{compare.videoStatus}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="mt-12 border border-border bg-background p-7">
            <h3 className="font-display text-xl font-medium text-fg">{limits.title}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg-muted">
              {limits.items.map((item) => (
                <li key={item} className="border-s-2 border-primary ps-3">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </WorkshopSection>

        {/* الخطوة الجاية */}
        <WorkshopSection className="border-t border-border">
          <ScrollReveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">{next.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted">{next.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WorkshopButton href={next.primary.href} variant="primary">
                {next.primary.label}
              </WorkshopButton>
              <WorkshopButton href={next.secondary.href} variant="secondary">
                {next.secondary.label}
              </WorkshopButton>
            </div>
          </ScrollReveal>
        </WorkshopSection>
      </main>
      <WorkshopFooter content={chrome} />
    </div>
  );
}
