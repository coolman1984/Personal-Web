/**
 * صفحة /ecosystem — «المنظومة»: المصنع الرقمي أولًا (3D جنب 2D)، الطريق (تعلّم ← خطّط ← أتمت ← شغّل الشركة ← شغّل المصنع ← ابنِ ← اعرض)،
 * باقة الشركة (أربع برامج بلقطات حقيقية)، كروت الأنظمة الخمسة التانية،
 * جدول الإدارات، وملاحظة الأمانة. المحتوى في src/content/ecosystem.ts، والشكل على نمط صفحة /demo.
 */
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EcosystemContent, EcosystemShot, PageChromeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";
import { LivePlant } from "@/components/shared/live-plant";

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
  const { hero, flagship, path, suite, systems, departments, honesty, next } = content;

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

        {/* المصنع الرقمي أولًا: أكبر شغل، 3D جنب 2D */}
        <WorkshopSection id={flagship.id} className="scroll-mt-24">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow>{flagship.eyebrow}</Eyebrow>
            <span className="border border-primary px-2 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary">
              {flagship.badge}
            </span>
          </div>
          <WordReveal as="h2" text={flagship.title} className="display-md mt-6 max-w-4xl" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{flagship.intro}</p>
          </ScrollReveal>
          <LivePlant content={flagship.live} className="mt-12" />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {flagship.pair.map((shot, index) => (
              <ScrollReveal key={shot.src} delayMs={index * 60}>
                <Shot shot={shot} sizes="(min-width: 768px) 50vw, 100vw" />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {flagship.closeups.map((shot, index) => (
              <ScrollReveal key={shot.src} delayMs={index * 60}>
                <Shot shot={shot} sizes="(min-width: 768px) 50vw, 100vw" />
              </ScrollReveal>
            ))}
          </div>
          <dl className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {flagship.points.map((point) => (
              <div key={point.title} className="border-b border-border py-6 sm:pe-6">
                <dt className="font-display text-lg font-medium text-fg">{point.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{point.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WorkshopButton href={flagship.primary.href} variant="primary">
              {flagship.primary.label}
            </WorkshopButton>
            <WorkshopButton href={flagship.secondary.href} variant="secondary">
              {flagship.secondary.label}
            </WorkshopButton>
          </div>
        </WorkshopSection>

        {/* الطريق */}
        <WorkshopSection className="border-t border-border">
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

        {/* باقة الشركة: أربع برامج، صورة كبيرة لكل واحد */}
        <WorkshopSection id={suite.id} className="scroll-mt-24 border-t border-border">
          <Eyebrow>{suite.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={suite.title} className="display-md mt-6 max-w-4xl" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{suite.intro}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-10">
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
              {suite.chainLabel}
            </p>
            <ol className="mt-4 flex flex-wrap gap-x-2 gap-y-2 text-sm text-fg">
              {suite.chain.map((link, index) => (
                <li key={link} className="flex items-center gap-2">
                  <span className="border border-border bg-secondary px-2.5 py-1">{link}</span>
                  {index < suite.chain.length - 1 && (
                    <span aria-hidden className="text-fg-muted rtl:rotate-180">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </ScrollReveal>
          <div className="mt-16 space-y-20 md:space-y-28">
            {suite.items.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className={cn(
                  "grid scroll-mt-24 items-center gap-8 lg:gap-14",
                  index % 2 === 0
                    ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
                    : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]",
                )}
              >
                {item.image && (
                  <ScrollReveal className={cn("min-w-0", index % 2 === 1 && "lg:order-2")}>
                    {"view3d" in item && item.view3d ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Shot shot={{ ...item.image, label: suite.planLabel }} sizes="(min-width: 1024px) 29vw, (min-width: 640px) 50vw, 100vw" />
                        <Shot shot={{ ...item.view3d, label: suite.view3dLabel }} sizes="(min-width: 1024px) 29vw, (min-width: 640px) 50vw, 100vw" />
                      </div>
                    ) : (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="w-full border border-border"
                      />
                    )}
                  </ScrollReveal>
                )}
                <ScrollReveal className={cn("min-w-0", index % 2 === 1 && "lg:order-1")} delayMs={60}>
                  <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
                    {item.layer} · {item.status}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">{item.name}</h3>
                  <p className="mt-3 text-lg font-medium leading-relaxed text-fg">{item.oneLine}</p>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">{item.body}</p>
                  <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">
                    {suite.insideLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg">{item.inside.join(", ")}</p>
                  <div className="mt-6">
                    <a href={item.link.href} className={linkClass}>
                      {item.link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </div>
                </ScrollReveal>
              </article>
            ))}
          </div>
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
                    {"image" in item && item.image && (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                        className="mb-6 aspect-[16/10] w-full border border-border object-cover object-left-top"
                      />
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

/** لقطة شاشة بعنوان صغير تحتها (3D أو 2D) */
function Shot({ shot, sizes }: { shot: EcosystemShot; sizes: string }) {
  const image = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      className="w-full border border-border transition-[filter] duration-200 group-hover:brightness-[1.04]"
    />
  );
  return (
    <figure className="min-w-0">
      {shot.href ? (
        <a href={shot.href} className="group block focus-visible:ring-2 focus-visible:ring-primary">
          {image}
        </a>
      ) : (
        image
      )}
      <figcaption className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">
        {shot.label}
      </figcaption>
    </figure>
  );
}
