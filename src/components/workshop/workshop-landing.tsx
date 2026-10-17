/**
 * Workshop landing — composes all sections for the home page.
 */
import type { WorkshopContent } from "@/types";
import { WorkshopNav } from "./workshop-nav";
import { WorkshopHero } from "./workshop-hero";
import { WorkshopAudience } from "./workshop-audience";
import { WorkshopOutcomes } from "./workshop-outcomes";
import { WorkshopAgenda } from "./workshop-agenda";
import { WorkshopFormat } from "./workshop-format";
import { WorkshopAbout } from "./workshop-about";
import { WorkshopProof } from "./workshop-proof";
import { WorkshopWork } from "./workshop-work";
import { WorkshopServices } from "./workshop-services";
import { WorkshopFaq } from "./workshop-faq";
import { WorkshopContact } from "./workshop-contact";
import { WorkshopFooter } from "./workshop-footer";

interface WorkshopLandingProps {
  content: WorkshopContent;
}

export function WorkshopLanding({ content }: WorkshopLandingProps) {
  return (
    <div className="workshop-root min-h-screen bg-background text-fg">
      <WorkshopNav content={content} />
      <main>
        <WorkshopHero hero={content.hero} />
        <WorkshopAudience audience={content.audience} />
        <WorkshopOutcomes outcomes={content.outcomes} />
        <WorkshopAgenda agenda={content.agenda} />
        <WorkshopFormat format={content.format} />
        <WorkshopAbout about={content.about} />
        <WorkshopProof proof={content.proof} />
        <WorkshopWork work={content.work} />
        <WorkshopServices services={content.services} />
        <WorkshopFaq faq={content.faq} />
        <WorkshopContact contact={content.contact} />
      </main>
      <WorkshopFooter content={content} />
    </div>
  );
}
