/**
 * صفحة /ecosystem — «المنظومة»: الطريق (تعلّم ← خطّط ← أتمت ← شغّل ← ابنِ ← اعرض)، كروت الأنظمة الستة،
 * جدول الإدارات، وملاحظة الأمانة. المحتوى في src/content/ecosystem.ts، والشكل على نمط صفحة /demo.
 */
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EcosystemContent, PageChromeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";

interface EcosystemLandingProps {
  content: EcosystemContent;
  chrome: PageChromeContent;
  className?: string;
}

const gridCellBorder =
  "h-full border-b border-border max-md:border-e-0 md:border-e md:[&:nth-child(2n)]:border-e-0 lg:[&:nth-child(2n)]:border-e lg:[&:nth-child(3n)]:border-e-0 last:border-e-0";

const linkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline";

export function EcosystemLanding({ content, chrome, className }: EcosystemLandingProps) {
  const { hero, path, systems, departments, honesty, next } = content;

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
              {content.facts.map((fact) => (
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

        {/* الطريق */}
        <WorkshopSection>
          <Eyebrow>{path.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={path.title} className="display-md mt-6 max-w-4xl" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{path.intro}</p>
          </ScrollReveal>
          <ol className="mt-12 border-t border-border">
            {path.steps.map((step, index) => (
              <li key={step.step}>
                <ScrollReveal delayMs={index * 40}>
                  <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-[3rem_8rem_1fr_11rem] sm:items-baseline sm:gap-6">
                    <span className="font-mono text-sm tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-medium text-fg">{step.step}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{step.detail}</p>
                    <a
                      href={`#${step.target}`}
                      className="font-mono text-xs text-fg underline-offset-4 hover:text-primary hover:underline sm:text-end"
                    >
                      {step.system}
                    </a>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </WorkshopSection>

        {/* الأنظمة */}
        <WorkshopSection id="systems" className="border-t border-border bg-secondary/30">
          <Eyebrow>{systems.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={systems.title} className="display-md mt-6 max-w-4xl" />
          <div className="mt-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {systems.items.map((item, index) => (
              <div key={item.id} id={item.id} className={cn(gridCellBorder, "scroll-mt-24")}>
                <ScrollReveal className="h-full" delayMs={(index % 3) * 50}>
                  <article className="relative flex h-full flex-col bg-background p-7">
                    {item.status === "Live" && (
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary" aria-hidden />
                    )}
                    <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                      {item.layer} · {item.status}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">{item.name}</h3>
                    <p className="mt-3 text-base font-medium leading-relaxed text-fg">{item.oneLine}</p>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                    <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">
                      {systems.insideLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fg">{item.inside.join(", ")}</p>
                    <div className="mt-auto pt-6">
                      <a href={item.link.href} className={linkClass}>
                        {item.link.label}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    </div>
                  </article>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </WorkshopSection>

        {/* الإدارات */}
        <WorkshopSection className="border-t border-border">
          <Eyebrow>{departments.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={departments.title} className="display-md mt-6 max-w-4xl" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{departments.intro}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-start text-sm">
              <thead>
                <tr className="border-b border-border">
                  {[departments.departmentLabel, departments.learnLabel, departments.toolLabel].map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="py-3 pe-6 text-start font-mono text-xs font-medium uppercase tracking-[0.14em] text-fg-muted"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departments.rows.map((row) => (
                  <tr key={row.department} className="border-b border-border align-top">
                    <th scope="row" className="py-4 pe-6 text-start font-medium text-fg">
                      {row.department}
                    </th>
                    <td className="py-4 pe-6 text-fg-muted">{row.learn}</td>
                    <td className="py-4 text-fg">{row.tool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>

          <ScrollReveal className="mt-14 border border-border bg-secondary p-7">
            <h3 className="font-display text-xl font-medium text-fg">{honesty.title}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-fg-muted">
              {honesty.items.map((item) => (
                <li key={item} className="border-s-2 border-primary ps-3">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </WorkshopSection>

        {/* الخطوة الجاية */}
        <WorkshopSection className="border-t border-border bg-secondary/30">
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
