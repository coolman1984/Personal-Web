/**
 * طبقة تتبّع الأحداث — مجرّدة عن المزوّد.
 *
 * بتشتغل من غير أي إعداد: لو مفيش مزوّد متظبّط، بتسجّل في الـconsole
 * في بيئة التطوير وبتسكت في الإنتاج.
 *
 * التفعيل: حطّ NEXT_PUBLIC_GA_ID أو NEXT_PUBLIC_PLAUSIBLE_DOMAIN في .env
 * التفاصيل: docs/ROADMAP.md §1.3
 */

export type AnalyticsEvent =
  | "view_course"
  | "click_enroll"
  | "start_quiz"
  | "finish_quiz"
  | "submit_contact"
  | "subscribe_newsletter"
  | "click_whatsapp"
  | "open_command_palette"
  | "begin_checkout"
  | "purchase";

type Props = Record<string, string | number | boolean>;

interface AnalyticsWindow extends Window {
  gtag?: (command: string, event: string, params?: Props) => void;
  plausible?: (event: string, options?: { props: Props }) => void;
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;

  const w = window as AnalyticsWindow;

  try {
    if (w.plausible) {
      w.plausible(event, { props });
      return;
    }
    if (w.gtag) {
      w.gtag("event", event, props);
      return;
    }
    if (process.env.NODE_ENV === "development") {
      console.info("[analytics]", event, props);
    }
  } catch {
    // التتبّع ما ينفعش يكسر الموقع أبدًا
  }
}
