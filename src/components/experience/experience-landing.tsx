/**
 * صفحة /experience — مسار التوظيف: الحقائق، الاتجاهات الوظيفية، الخبرة، المهارات،
 * الشغل العام، الحالات، والتواصل. المرجع: Master Profile v3 §5.4.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExperiencePageContent, HomeContent, PageChromeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";
import { HomeContact } from "@/components/home/home-contact";

interface ExperienceLandingProps {
  content: ExperiencePageContent;
  chrome: PageChromeContent;
  projects: HomeContent["work"]["items"];
  className?: string;
}

const linkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-fg underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline";

export function ExperienceLanding({ content, chrome, projects, className }: ExperienceLandingProps) {
  const { hero, directions, history, skills, cases, background } = content;

  return (
    <div className={cn("workshop-root min-h-screen bg-background text-fg", className)}>
      <WorkshopNav content={chrome} />
      <main>
        {/* الهيرو */}
        <section className="bg-background pb-28 pt-14 text-fg md:pb-36 md:pt-20">
          <div id="workshop-content" tabIndex={-1} className="container-ws outline-none">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
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

        {/* الشريط الكحلي الوحيد — الحقائق الأساسية */}
        <div className="container-ws relative z-10 -mt-16 md:-mt-20">
          <ScrollReveal>
            <dl
              aria-label={content.factsLabel}
              className="ink-grid-bg grid border border-ink-border text-ink-fg sm:grid-cols-2 lg:grid-cols-4"
            >
              {content.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-ink-border p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-e lg:border-b-0 lg:border-e lg:last:border-e-0 md:p-8"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{fact.label}</dt>
                  <dd className="mt-3 font-display text-lg font-medium leading-snug tracking-tight text-ink-fg md:text-xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        {/* الاتجاهات الوظيفية */}
        <WorkshopSection>
          <Eyebrow>{directions.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={directions.title} className="display-md mt-6" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{directions.intro}</p>
          </ScrollReveal>
          <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            {directions.items.map((item, index) => (
              <li key={item.title} className="bg-background">
                <ScrollReveal className="h-full" delayMs={index * 50}>
                  <article className="flex h-full flex-col p-7">
                    <span className="font-mono text-sm tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-fg">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.body}</p>
                    <a href={item.cvHref} className={cn(linkClass, "mt-auto pt-6")}>
                      {directions.ctaLabel}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </article>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </WorkshopSection>

        {/* الخبرة */}
        <WorkshopSection className="border-t border-border bg-secondary/30">
          <Eyebrow>{history.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={history.title} className="display-md mt-6" />
          <ScrollReveal className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-5">
            <h3 className="font-display text-2xl font-medium tracking-tight text-fg">{history.employer}</h3>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{history.employerPeriod}</p>
          </ScrollReveal>
          {history.roles.map((role, index) => (
            <ScrollReveal key={role.title} delayMs={index * 50}>
              <div className="grid gap-4 border-b border-border py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <div>
                  <h4 className="font-display text-lg font-medium leading-snug text-fg md:text-xl">{role.title}</h4>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">{role.period}</p>
                </div>
                <ul className="space-y-3 text-sm leading-relaxed text-fg-muted md:text-base">
                  {role.points.map((point) => (
                    <li key={point} className="border-s-2 border-primary ps-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </WorkshopSection>

        {/* المهارات */}
        <WorkshopSection className="border-t border-border">
          <Eyebrow>{skills.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={skills.title} className="display-md mt-6" />
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {skills.groups.map((group, index) => (
              <ScrollReveal key={group.title} className="bg-background p-7" delayMs={(index % 3) * 50}>
                <h3 className="font-display text-lg font-medium tracking-tight text-fg">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="border border-border px-2.5 py-1 text-xs text-fg-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </WorkshopSection>

        {/* الشغل العام */}
        <WorkshopSection className="border-t border-border bg-secondary/30">
          <Eyebrow>{content.projects.eyebrow}</Eyebrow>
          <WordReveal as="h2" text={content.projects.title} className="display-md mt-6" />
          <ScrollReveal className="mt-6 max-w-3xl">
            <p className="text-lg text-fg-muted">{content.projects.intro}</p>
          </ScrollReveal>
          <ul className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, content.projects.count).map((project, index) => (
              <li key={project.title} className="bg-background">
                <ScrollReveal className="h-full" delayMs={(index % 3) * 50}>
                  <article className="flex h-full flex-col p-7">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{project.category}</p>
                    <h3 className="mt-3 font-display text-lg font-medium tracking-tight text-fg">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
                    <p className="mt-4 border-s-2 border-primary ps-3 text-sm text-fg">{project.evidence}</p>
                    {/* مستودع خاص (زي الأكاديمية) → رابط النسخة الحية بدل الكود */}
                    <a
                      href={"repoHref" in project && project.repoHref ? project.repoHref : project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(linkClass, "mt-auto pt-6")}
                    >
                      {"repoHref" in project && project.repoHref ? content.projects.codeLabel : content.projects.liveLabel}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </article>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <ScrollReveal className="mt-8">
            <Link href={content.projects.allHref} className={linkClass}>
              {content.projects.allLabel}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </ScrollReveal>
        </WorkshopSection>

        {/* الحالات والخلفية */}
        <WorkshopSection className="border-t border-border">
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <Eyebrow>{cases.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">
                {cases.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{cases.body}</p>
              <Link href={cases.href} className={cn(linkClass, "mt-6")}>
                {cases.linkLabel}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </ScrollReveal>
            <ScrollReveal delayMs={60}>
              <Eyebrow>{background.eyebrow}</Eyebrow>
              <dl className="mt-6 border-t border-border">
                {background.items.map((item) => (
                  <div key={item.label} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{item.label}</dt>
                    <dd className="text-sm text-fg">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </WorkshopSection>

        <HomeContact contact={content.contact} />
      </main>
      <WorkshopFooter content={chrome} />
    </div>
  );
}
