/** بناء الـmetadata والبيانات المنظّمة. المرجع: docs/PLAN.md §9.2 */
import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import type { Article, Course, Faq } from "@/types";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedAt,
  noIndex,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? title : `${title} — ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...site.keywords, ...keywords],
    authors: [{ name: site.name }],
    creator: site.name,
    metadataBase: new URL(siteUrl()),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

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
    sameAs: Object.values(site.social).filter(Boolean),
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
    ...(course.price.amount > 0
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
