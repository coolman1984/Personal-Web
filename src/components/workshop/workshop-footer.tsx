/**
 * Workshop page footer — minimal links.
 */
import Link from "next/link";
import type { WorkshopContent } from "@/types";

interface WorkshopFooterProps {
  content: WorkshopContent;
}

export function WorkshopFooter({ content }: WorkshopFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-x flex flex-col gap-4 py-10 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {content.footer.note}
        </p>
        <ul className="flex flex-wrap gap-4">
          {content.footer.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors duration-200 hover:text-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
