/** بناء الـmetadata والبيانات المنظّمة. المرجع: docs/PLAN.md §9.2 */
import type { Metadata } from "next";
import { site } from "@/content/site";
import { workshop } from "@/content/workshop";
import { home } from "@/content/home";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import type { Article, Course, Faq } from "@/types";

/**
 * صورة المشاركة — ملف ثابت مولَّد بـ`node scripts/generate-og.mjs`.
 * مش ديناميكية لأن محرّك next/og لسه ما بيدعمش تشكيل الحروف العربية.
 */
const OG_IMAGE = "/og-default.png";
const WORKSHOP_OG_IMAGE = "/og-workshop.png";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
  noIndex?: boolean;
  /** Override Open Graph locale (e.g. en_US for workshop home). */
  locale?: string;
  /** Custom OG image path; pass `null` to omit images. */
  ogImage?: string | null;
  /** When false, only `keywords` are used (no Arabic site keywords). */
  mergeSiteKeywords?: boolean;
  /** Author and creator. Defaults to the Arabic site name. */
  authorName?: string;
  /** Open Graph site name. Defaults to `authorName`, then the Arabic site name. */
  siteName?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedAt,
  noIndex,
  locale = site.locale,
  ogImage = OG_IMAGE,
  mergeSiteKeywords = true,
  authorName,
  siteName,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? title : `${title} — ${site.name}`;
  const keywordList = mergeSiteKeywords ? [...site.keywords, ...keywords] : keywords;
  const author = authorName ?? site.name;
  const ogSiteName = siteName ?? authorName ?? site.name;
  const ogImages =
    ogImage === null
      ? undefined
      : [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }];

  return {
    title: fullTitle,
    description,
    keywords: keywordList.length > 0 ? keywordList : undefined,
    authors: [{ name: author }],
    creator: author,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: ogSiteName,
      locale,
      ...(ogImages ? { images: ogImages } : {}),
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage && ogImage !== null ? { images: [ogImage] } : {}),
    },
  };
}

export { WORKSHOP_OG_IMAGE };

// ═══════════════════════════════════════════════════════════
// البيانات المنظّمة (JSON-LD)
// ═══════════════════════════════════════════════════════════

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.bio,
    url: siteUrl(),
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: Object.values(site.social).filter(
      (href) => href.trim() && !/username|example\.com/i.test(href),
    ),
    knowsAbout: [
      "الذكاء الاصطناعي",
      "أتمتة المؤسسات",
      "هندسة الأوامر",
      "تحليل البيانات",
      "وكلاء الذكاء الاصطناعي",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.bio,
    url: siteUrl(),
    email: site.email,
    inLanguage: "ar",
  };
}

export function courseJsonLd(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    inLanguage: "ar",
    url: absoluteUrl(`/courses/${course.slug}`),
    provider: { "@type": "Person", name: site.name, url: siteUrl() },
    educationalLevel: course.level,
    teaches: course.outcomes,
    coursePrerequisites: course.prerequisites.join("، "),
    timeRequired: `PT${course.hours}H`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.format.includes("أونلاين مباشر") ? "online" : "onsite",
      courseWorkload: `PT${course.hours}H`,
      inLanguage: "ar",
    },
    // ⚠️ ما نحطّش سعر في البيانات المنظّمة لو مش معروض على الصفحة —
    //    جوجل بيعتبر ده تضليلًا وبيعاقب عليه
    ...(site.features.showPrices && course.price.amount > 0
      ? {
          offers: {
            "@type": "Offer",
            price: course.price.amount,
            priceCurrency: course.price.currency,
            availability:
              course.status === "مكتمل"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "ar",
    author: { "@type": "Person", name: site.name, url: siteUrl() },
    publisher: { "@type": "Person", name: site.name },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    keywords: article.tags.join("، "),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Workshop home — WebPage until a public event date is confirmed. */
export function workshopJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Build your AI agent team — Executive workshop",
    description:
      "A one-day, hands-on workshop for managers in the Gulf and Egypt on building a practical AI agent team with free or low-cost tools.",
    inLanguage: "en",
    url: absoluteUrl("/workshop"),
    about: {
      "@type": "Person",
      name: "Mohamed Fawzy",
      jobTitle: workshop.about.headline,
      sameAs: [workshop.contact.linkedIn.href],
    },
  };
}

/** بيانات منظّمة للرئيسية الإنجليزية — شخص بيقدّم خدمات تحوّل للمصانع والشركات */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${home.owner.name} — ${home.hero.brandTag}`,
    inLanguage: "en",
    url: siteUrl(),
    mainEntity: {
      "@type": "Person",
      name: home.owner.name,
      jobTitle: "AI & Process Automation Transformation Leader",
      description: home.hero.subline,
      address: { "@type": "PostalAddress", addressLocality: home.owner.location },
      email: home.contact.email,
      sameAs: [home.contact.linkedIn.href, home.work.githubHref],
      knowsAbout: [
        "AI transformation",
        "Process automation",
        "Manufacturing finance",
        "FP&A",
        "SAP",
        "Python",
        "SQL",
      ],
    },
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
