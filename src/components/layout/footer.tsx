/** الفوتر — ٤ أعمدة + نشرة + سوشيال. المواصفات: docs/DESIGN.md §5.6 */
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { footerNav, socialLabels } from "@/content/navigation";
import { socialIconMap, type SocialKey } from "@/components/shared/social-icons";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Logo } from "./logo";

export function Footer() {
  const year = new Intl.DateTimeFormat("ar-EG", { year: "numeric" }).format(new Date());

  return (
    <footer className="relative band-navy">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* العمود الأول — الهوية */}
          <div className="flex flex-col gap-5">
            <Logo onDark />
            <p className="max-w-xs text-sm leading-[1.9] text-white/65">{site.tagline}</p>

            <ul className="flex flex-col gap-2.5 text-[13px] text-white/70">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-gold-500" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-gold-500" dir="ltr">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-gold-500" aria-hidden />
                <span className="ltr-nums">{site.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-gold-500" aria-hidden />
                <span>{site.location}</span>
              </li>
            </ul>

            <ul className="flex flex-wrap gap-2">
              {Object.entries(site.social).map(([key, href]) => {
                const Icon = socialIconMap[key as SocialKey];
                if (!href || !Icon) return null;
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[key] ?? key}
                      className="grid size-9 place-items-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-500"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* أعمدة الروابط */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-white">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/70 transition-colors hover:text-gold-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* النشرة */}
        {site.features.newsletter && (
          <div className="mt-14 rounded-lg border border-white/12 bg-white/[0.05] p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <h3 className="text-lg font-extrabold text-white">{site.leadMagnet.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {site.leadMagnet.description}
                </p>
              </div>
              <NewsletterForm className="w-full md:max-w-sm" />
            </div>
          </div>
        )}
      </div>

      {/* الشريط السفلي */}
      <div className="border-t border-white/12">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-white/55 sm:flex-row">
          <p>
            © {year} {site.name}
            <span aria-hidden className="mx-1.5 opacity-60">
              ·
            </span>
            كل الحقوق محفوظة
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/legal/terms" className="hover:text-gold-500">
                الشروط
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-gold-500">
                الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/legal/refund" className="hover:text-gold-500">
                الاسترداد
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
