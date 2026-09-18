/** قواعد محرّكات البحث. */
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // صفحات الحجز والشكر ما لهاش لازمة في نتائج البحث
      disallow: ["/api/", "/enroll/", "/thank-you"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
