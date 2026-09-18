/** سكشن النشرة البريدية. المواصفات: docs/DESIGN.md §12.12 */
import { Gift } from "lucide-react";
import { site } from "@/content/site";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Reveal } from "@/components/motion/reveal";

export function Newsletter() {
  if (!site.features.newsletter) return null;

  return (
    <section className="container-x py-14 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-8 shadow-soft noise ring-gradient md:p-12">
          <div
            aria-hidden
            className="absolute -top-24 end-[-10%] size-72 rounded-full opacity-25 blur-[100px]"
            style={{ background: "radial-gradient(circle, oklch(0.63 0.21 288), transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl border border-gold-500/25 bg-gold-500/12 text-gold-600 dark:text-gold-300">
              <Gift className="size-6" />
            </span>

            <div className="max-w-xl">
              <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2rem)] font-extrabold text-fg">
                {site.leadMagnet.title}
              </h2>
              <p className="mt-3 text-[15.5px] leading-[1.9] text-fg-muted">
                {site.leadMagnet.description}
              </p>
            </div>

            <NewsletterForm className="w-full max-w-md" />

            <p className="text-[12.5px] text-fg-subtle">
              من غير سبام. تقدر تلغي الاشتراك في أي وقت.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
