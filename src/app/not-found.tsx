/** صفحة ٤٠٤. */
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/layout/aurora";

const links = [
  { label: "كل الكورسات", href: "/courses" },
  { label: "خريطة التعلّم", href: "/roadmap" },
  { label: "حدّد مستواك", href: "/quiz" },
  { label: "المقالات", href: "/articles" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden noise">
      <Aurora />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="grid size-16 place-items-center rounded-2xl border border-line bg-surface text-brand-500">
          <Compass className="size-7" aria-hidden />
        </span>
        <p className="ltr-nums mt-7 text-[clamp(3rem,10vw,6rem)] font-black leading-none text-gradient">
          ٤٠٤
        </p>
        <h1 className="mt-4 text-2xl font-extrabold text-fg">الصفحة دي مش موجودة</h1>
        <p className="mt-3 max-w-md text-[16px] leading-[1.9] text-fg-muted">
          يمكن الرابط اتغيّر، أو فيه حرف ناقص. بس فيه حاجات حلوة تانية 👇
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {links.map((l) => (
            <li key={l.href}>
              <Button href={l.href} variant="secondary" size="md">
                {l.label}
              </Button>
            </li>
          ))}
        </ul>

        <Button href="/" size="lg" className="mt-8">
          ارجع للرئيسية
        </Button>
      </div>
    </section>
  );
}
