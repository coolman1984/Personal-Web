/**
 * أعمالي — أنظمة حقيقية بناها صاحب الموقع، بروابط مستودعاتها.
 * بيظهر في الرئيسية بعد شريط الأرقام. الكارت نفسه في components/work/work-card.tsx
 */
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { GitHubIcon } from "@/components/shared/social-icons";
import { Reveal } from "@/components/motion/reveal";
import { WorkCard } from "@/components/work/work-card";
import type { WorkItemView } from "@/types";

interface WorkProps {
  items: WorkItemView[];
  githubHref: string;
}

export function Work({ items, githubHref }: WorkProps) {
  if (items.length === 0) return null;

  return (
    <section className="container-x py-14 md:py-24">
      <SectionHeading
        eyebrow="أعمالي"
        title="مش بس بدرّس... أنا ببني"
        description="أنظمة حقيقية بنيتها بإيدي، والكود بتاعها منشور على GitHub لأي حد يراجعه. الأرقام اللي تحت كل مشروع موجودة في الكود نفسه."
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} delay={i * 0.06} className="h-full">
            <WorkCard item={item} />
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-3">
        <Button href="/work" variant="secondary" size="lg" iconAfter={<ArrowLeft />}>
          شوف كل أعمالي
        </Button>
        <Button
          href={githubHref}
          variant="ghost"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          icon={<GitHubIcon />}
        >
          حسابي على GitHub
        </Button>
      </Reveal>
    </section>
  );
}
