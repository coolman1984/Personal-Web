/**
 * الرئيسية الجديدة — بتجمع البلوكات بالترتيب بتاع Master Profile v3 §7.
 */
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types";
import { WorkshopNav } from "@/components/workshop/workshop-nav";
import { WorkshopFooter } from "@/components/workshop/workshop-footer";
import { HomeHero } from "./home-hero";
import { HomeFlagship } from "./home-flagship";
import { HomeCredentials } from "./home-credentials";
import { HomeProblems } from "./home-problems";
import { HomeCases } from "./home-cases";
import { HomeWork } from "./home-work";
import { HomeOffers } from "./home-offers";
import { HomeMethod } from "./home-method";
import { HomeExperience } from "./home-experience";
import { HomeContact } from "./home-contact";

interface HomeLandingProps {
  content: HomeContent;
  className?: string;
}

export function HomeLanding({ content, className }: HomeLandingProps) {
  return (
    <div className={cn("workshop-root min-h-screen bg-background text-fg", className)}>
      <WorkshopNav content={content} />
      <main>
        <HomeHero hero={content.hero} />
        <HomeFlagship />
        <HomeCredentials credentials={content.credentials} />
        <HomeProblems problems={content.problems} />
        <HomeCases cases={content.cases} />
        <HomeWork work={content.work} />
        <HomeOffers offers={content.offers} className="border-t border-border" />
        <HomeMethod method={content.method} />
        <HomeExperience experience={content.experience} />
        <HomeContact contact={content.contact} />
      </main>
      <WorkshopFooter content={content} />
    </div>
  );
}
