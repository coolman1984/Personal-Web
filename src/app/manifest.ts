/** PWA manifest — بيخلّي الموقع يتحطّ على الشاشة الرئيسية للموبايل. */
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — كورسات الذكاء الاصطناعي`,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    // لون خام هنا استثناء مقصود: المتصفّح بيقرا الملف ده قبل ما يحمّل أي CSS،
    // فمش بيفهم متغيّرات `globals.css`. القيمة = `--bg` الليلي (docs/DESIGN.md §2).
    background_color: "#0d0e14",
    theme_color: "#0d0e14",
    lang: "ar",
    dir: "rtl",
    orientation: "portrait",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
