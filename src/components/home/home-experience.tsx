/**
 * الخبرة — شريط مختصر للمسؤولين عن التوظيف، منفصل عن العروض. المرجع: Master Profile v3 §5.4.
 */
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { Eyebrow } from "@/components/workshop/eyebrow";
import { WordReveal } from "@/components/workshop/motion/word-reveal";
import { ScrollReveal } from "@/components/workshop/motion/scroll-reveal";
import { WorkshopSection } from "@/components/workshop/workshop-section";
import { WorkshopButton } from "@/components/workshop/workshop-button";

interface HomeExperienceProps {
  experience: HomeContent["experience"];
  className?: string;
}

export function HomeExperience({ experience, className }: HomeExperienceProps) {
  return (
    <WorkshopSection id={experience.id} className={className}>
      <Eyebrow>{experience.eyebrow}</Eyebrow>
      <WordReveal as="h2" text={experience.title} className="display-md mt-6 max-w-4xl" />
      <ScrollReveal className="mt-6 max-w-3xl">
        <p className="text-lg text-fg-muted">{experience.intro}</p>
      </ScrollReveal>

      <div className="mt-14 border-t border-border">
        {experience.items.map((item, index) => (
          <ScrollReveal key={item.title} delayMs={index * 40}>
            <div className="grid gap-3 border-b border-border py-7 md:grid-cols-[9rem_1fr_1.3fr] md:items-start md:gap-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-muted">{item.label}</p>
              <h3 className="font-display text-lg font-medium text-fg md:text-xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-fg-muted md:text-base">{item.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-fg-muted">
            {experience.rolesTitle}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {experience.roles.map((role) => (
              <li key={role} className="border border-border px-3 py-2 text-sm text-fg">
                {role}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-fg-muted">{experience.availability}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WorkshopButton href={experience.pageCta.href} variant="secondary">
            {experience.pageCta.label}
          </WorkshopButton>
          <WorkshopButton href={experience.cta.href} variant="ghost">
            {experience.cta.label}
          </WorkshopButton>
        </div>
      </ScrollReveal>
    </WorkshopSection>
  );
}
