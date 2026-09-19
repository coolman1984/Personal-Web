/**
 * النشرة البريدية — شريط ذهبي بعرض الشاشة زي المرجع.
 * المواصفات: docs/DESIGN.md §12.12
 */
import { Gift } from "lucide-react";
import { site } from "@/content/site";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Reveal } from "@/components/motion/reveal";

export function Newsletter() {
  if (!site.features.newsletter) return null;

  return (
    <section className="band-gold">
      <div className="container-x py-10 md:py-12">
        <Reveal>
          <div className="flex flex-col items-center gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 text-center lg:text-start">
              <span className="hidden size-12 shrink-0 place-items-center rounded-md bg-brand-900/10 text-brand-900 sm:grid">
                <Gift className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-[clamp(1.25rem,2vw+0.6rem,1.625rem)] font-black leading-snug text-brand-900">
                  {site.leadMagnet.title}
                </h2>
                <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-brand-900/75">
                  {site.leadMagnet.description}
                </p>
              </div>
            </div>

            <NewsletterForm className="w-full lg:max-w-md" onGold />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
