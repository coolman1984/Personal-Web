/**
 * الصفحة الرئيسية — تجميع السكاشن بالترتيب المحدّد في docs/PLAN.md §7.2
 * كل البيانات بتتجاب من lib/queries على السيرفر.
 */
import {
  getAllLevels,
  getComparison,
  getCourseCountByLevel,
  getFaqs,
  getFeaturedArticles,
  getFeaturedCourses,
  getMiniCourses,
  getFeaturedProjects,
  getMethodPillars,
  getPricingTiers,
  getServices,
  getStats,
  getTestimonials,
  getTools,
  getFeaturedWork,
  githubProfileUrl,
} from "@/lib/queries";

import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Stats } from "@/components/sections/stats";
import { Ladder } from "@/components/sections/ladder";
import { Levels } from "@/components/sections/levels";
import { Method } from "@/components/sections/method";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { MiniCourses } from "@/components/sections/mini-courses";
import { WhyDifferent } from "@/components/sections/why-different";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Articles } from "@/components/sections/articles";
import { FaqSection } from "@/components/sections/faq-section";
import { Newsletter } from "@/components/sections/newsletter";
import { FinalCta } from "@/components/sections/final-cta";
import { site } from "@/content/site";

export default async function HomePage() {
  const [
    levels,
    courseCounts,
    tools,
    stats,
    pillars,
    featuredCourses,
    miniCourses,
    comparison,
    projects,
    testimonials,
    tiers,
    articles,
    faqs,
    work,
    services,
  ] = await Promise.all([
    getAllLevels(),
    getCourseCountByLevel(),
    getTools(),
    getStats(),
    getMethodPillars(),
    getFeaturedCourses(6),
    getMiniCourses(),
    getComparison(),
    getFeaturedProjects(6),
    getTestimonials(),
    getPricingTiers(),
    getFeaturedArticles(3),
    getFaqs(),
    getFeaturedWork(6),
    getServices(),
  ]);

  return (
    <>
      <Hero levels={levels} courseCounts={courseCounts} />
      <TrustBar tools={tools} />
      <Stats stats={stats} />
      {site.features.work && <Work items={work} githubHref={githubProfileUrl()} />}
      <Ladder />
      <Levels levels={levels} courseCounts={courseCounts} />
      <MiniCourses courses={miniCourses} />
      <Method pillars={pillars} />
      <FeaturedCourses courses={featuredCourses} />
      {site.features.services && <Services services={services} />}
      <WhyDifferent rows={comparison} />
      {site.features.projects && <Projects projects={projects} />}
      <Testimonials testimonials={testimonials} />
      <Pricing tiers={tiers} />
      {site.features.articles && <Articles articles={articles} />}
      <FaqSection faqs={faqs.slice(0, 6)} />
      <Newsletter />
      <FinalCta />
    </>
  );
}
