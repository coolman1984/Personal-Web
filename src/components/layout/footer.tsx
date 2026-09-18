/** الفوتر — ٤ أعمدة + نشرة + سوشيال. المواصفات: docs/DESIGN.md §5.6 */
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { footerNav, socialIcons, socialLabels } from "@/content/navigation";
import { getIcon } from "@/lib/icon";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Logo } from "./logo";

export function Footer() {
  const year = new Intl.DateTimeFormat("ar-EG", { year: "numeric" }).format(new Date());

  return (
    <footer className="relative mt-24 border-t border-line bg-bg-subtle">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* العمود الأول — الهوية */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-[1.9] text-fg-muted">{site.tagline}</p>

            <ul className="flex flex-col gap-2.5 text-[13px] text-fg-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-fg-subtle" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-fg" dir="ltr">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-fg-subtle" aria-hidden />
                <span className="ltr-nums">{site.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-fg-subtle" aria-hidden />
                <span>{site.location}</span>
              </li>
            </ul>

            <ul className="flex flex-wrap gap-2">
              {Object.entries(site.social).map(([key, href]) => {
                if (!href) return null;
                const Icon = getIcon(socialIcons[key]);
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLabels[key] ?? key}
                      className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-fg-subtle transition-colors hover:border-line-strong hover:text-fg"
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
              <h3 className="text-sm font-extrabold text-fg">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-fg-muted transition-colors hover:text-fg"
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
          <div className="mt-12 rounded-3xl border border-line bg-surface p-6 noise md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <h3 className="text-lg font-extrabold text-fg">{site.leadMagnet.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {site.leadMagnet.description}
                </p>
              </div>
              <NewsletterForm className="w-full md:max-w-sm" />
            </div>
          </div>
        )}
      </div>

      {/* الشريط السفلي */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-fg-subtle sm:flex-row">
          <p>
            © {year} {site.name} · كل الحقوق محفوظة
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/legal/terms" className="hover:text-fg">
                الشروط
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-fg">
                الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/legal/refund" className="hover:text-fg">
                الاسترداد
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
