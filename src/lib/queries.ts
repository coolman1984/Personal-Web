/**
 * طبقة الوصول للبيانات — نقطة العزل الوحيدة بين الواجهة ومصدر البيانات.
 *
 * ⚠️ قاعدة إجبارية: أي مكوّن أو صفحة **لازم** يجيب بياناته من هنا،
 *    وممنوع يستورد من `src/content/` مباشرة.
 *
 * ليه؟ عشان لما نربط الموقع بقاعدة بيانات أو CMS، نعدّل الملف ده بس
 * ولا نلمس أي مكوّن. التفاصيل في docs/ROADMAP.md §3.
 *
 * كل الدوال `async` من دلوقتي — حتى والبيانات ثابتة — عشان التحويل
 * لقاعدة بيانات ما يغيّرش أي توقيع.
 */
import { courses } from "@/content/courses";
import { levels } from "@/content/levels";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faq";
import { pricingTiers } from "@/content/pricing";
import { tools } from "@/content/tools";
import { methodPillars, comparison } from "@/content/method";
import { stats } from "@/content/stats";
import { timeline } from "@/content/timeline";
import { quizQuestions, quizResults, maxQuizScore } from "@/content/quiz";
import { readingTime } from "@/lib/utils";
import type {
  Article,
  ComparisonRow,
  Course,
  Faq,
  FaqCategory,
  Level,
  LevelId,
  MethodPillar,
  PricingTier,
  Project,
  QuizQuestion,
  QuizResult,
  SearchItem,
  Stat,
  Testimonial,
  TimelineItem,
  Tool,
} from "@/types";

// ═══════════════════════════════════════════════════════════
// الكورسات
// ═══════════════════════════════════════════════════════════

const levelOrder: Record<LevelId, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/** كل الكورسات مرتّبة بالمستوى ثم بالمميّز */
export async function getAllCourses(): Promise<Course[]> {
  return [...courses].sort((a, b) => {
    const byLevel = levelOrder[a.level] - levelOrder[b.level];
    if (byLevel !== 0) return byLevel;
    return Number(b.featured) - Number(a.featured);
  });
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return courses.find((c) => c.slug === slug) ?? null;
}

export async function getCoursesByLevel(level: LevelId): Promise<Course[]> {
  return courses.filter((c) => c.level === level);
}

export async function getFeaturedCourses(limit = 6): Promise<Course[]> {
  const all = await getAllCourses();
  return all.filter((c) => c.featured).slice(0, limit);
}

/** كورسات مقترحة في آخر صفحة الكورس — نفس المستوى الأول، ثم اللي بعده */
export async function getRelatedCourses(slug: string, limit = 3): Promise<Course[]> {
  const current = await getCourseBySlug(slug);
  if (!current) return [];
  const sameLevel = courses.filter((c) => c.slug !== slug && c.level === current.level);
  const others = courses.filter((c) => c.slug !== slug && c.level !== current.level);
  return [...sameLevel, ...others].slice(0, limit);
}

/** إجمالي عدد الساعات في كل الكورسات — بيستخدم في الأرقام */
export async function getTotalHours(): Promise<number> {
  return courses.reduce((sum, c) => sum + c.hours, 0);
}

// ═══════════════════════════════════════════════════════════
// المستويات
// ═══════════════════════════════════════════════════════════

export async function getAllLevels(): Promise<Level[]> {
  return [...levels].sort((a, b) => a.order - b.order);
}

export async function getLevelById(id: LevelId): Promise<Level | null> {
  return levels.find((l) => l.id === id) ?? null;
}

/** عدد الكورسات في كل مستوى — بيستخدم في كروت المستويات */
export async function getCourseCountByLevel(): Promise<Record<LevelId, number>> {
  return courses.reduce(
    (acc, c) => {
      acc[c.level] += 1;
      return acc;
    },
    { beginner: 0, intermediate: 0, advanced: 0 } as Record<LevelId, number>,
  );
}

// ═══════════════════════════════════════════════════════════
// المشاريع
// ═══════════════════════════════════════════════════════════

export async function getAllProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => b.year - a.year);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectsByLevel(level: LevelId): Promise<Project[]> {
  return projects.filter((p) => p.relatedLevel === level);
}

export async function getProjectCategories(): Promise<string[]> {
  return [...new Set(projects.map((p) => p.category))];
}

// ═══════════════════════════════════════════════════════════
// المقالات
// ═══════════════════════════════════════════════════════════

// المصدر الخام مفيهوش `readingMinutes` — بنحسبها هنا من طول المقال
// الفعلي، عشان ترجع صح تلقائيًا لو حد غيّر المحتوى وما حدّثش رقم يدوي.
const articlesWithReadingTime: Article[] = articles.map((a) => ({
  ...a,
  readingMinutes: readingTime(a.body),
}));

export async function getAllArticles(): Promise<Article[]> {
  return [...articlesWithReadingTime].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articlesWithReadingTime.find((a) => a.slug === slug) ?? null;
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const all = await getAllArticles();
  const featured = all.filter((a) => a.featured);
  return (featured.length >= limit ? featured : all).slice(0, limit);
}

/** مقالات ذات صلة — بتشارك وسمًا على الأقل */
export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const current = await getArticleBySlug(slug);
  if (!current) return [];
  const all = await getAllArticles();
  const scored = all
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.article);
}

export async function getArticleTags(): Promise<string[]> {
  return [...new Set(articles.flatMap((a) => a.tags))];
}

// ═══════════════════════════════════════════════════════════
// الآراء والأسئلة والباقات
// ═══════════════════════════════════════════════════════════

export async function getTestimonials(level?: LevelId): Promise<Testimonial[]> {
  return level ? testimonials.filter((t) => t.level === level) : testimonials;
}

export async function getFaqs(category?: FaqCategory): Promise<Faq[]> {
  return category ? faqs.filter((f) => f.category === category) : faqs;
}

export async function getFaqCategories(): Promise<FaqCategory[]> {
  return [...new Set(faqs.map((f) => f.category))];
}

export async function getPricingTiers(): Promise<PricingTier[]> {
  return pricingTiers;
}

// ═══════════════════════════════════════════════════════════
// عناصر الصفحة الرئيسية وصفحة «عني»
// ═══════════════════════════════════════════════════════════

export async function getStats(): Promise<Stat[]> {
  return stats;
}

export async function getMethodPillars(): Promise<MethodPillar[]> {
  return methodPillars;
}

export async function getComparison(): Promise<ComparisonRow[]> {
  return comparison;
}

export async function getTimeline(): Promise<TimelineItem[]> {
  return timeline;
}

export async function getTools(level?: LevelId): Promise<Tool[]> {
  return level ? tools.filter((t) => t.level.includes(level)) : tools;
}

// ═══════════════════════════════════════════════════════════
// اختبار تحديد المستوى
// ═══════════════════════════════════════════════════════════

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  return quizQuestions;
}

export async function getQuizMaxScore(): Promise<number> {
  return maxQuizScore;
}

/** بيرجّع النتيجة المطابقة للدرجة — بيرتّب تنازليًا ويرجّع أول تطابق */
export function resolveQuizResult(score: number): QuizResult {
  const sorted = [...quizResults].sort((a, b) => b.minScore - a.minScore);
  return sorted.find((r) => score >= r.minScore) ?? sorted[sorted.length - 1]!;
}

// ═══════════════════════════════════════════════════════════
// فهرس البحث — للوحة الأوامر ⌘K
// ═══════════════════════════════════════════════════════════

const staticPages: SearchItem[] = [
  {
    id: "page-home",
    title: "الرئيسية",
    description: "نظرة عامة على الكورسات والمنهج",
    href: "/",
    kind: "page",
    icon: "Home",
    keywords: ["رئيسية", "home"],
  },
  {
    id: "page-courses",
    title: "كل الكورسات",
    description: "٩ كورسات على ٣ مستويات",
    href: "/courses",
    kind: "page",
    icon: "GraduationCap",
    keywords: ["كورسات", "دورات", "courses"],
  },
  {
    id: "page-roadmap",
    title: "خريطة التعلّم",
    description: "المسار من مساعد شخصي لفريق رقمي",
    href: "/roadmap",
    kind: "page",
    icon: "Map",
    keywords: ["خريطة", "مسار", "roadmap"],
  },
  {
    id: "page-quiz",
    title: "حدّد مستواك",
    description: "٨ أسئلة بتقولك تبدأ منين",
    href: "/quiz",
    kind: "page",
    icon: "ListChecks",
    keywords: ["اختبار", "مستوى", "quiz"],
  },
  {
    id: "page-pricing",
    title: "الأسعار والباقات",
    description: "كورس واحد · البرنامج الشامل · تدريب مؤسسي",
    href: "/pricing",
    kind: "page",
    icon: "Wallet",
    keywords: ["أسعار", "باقات", "تكلفة", "pricing"],
  },
  {
    id: "page-about",
    title: "عني",
    description: "القصة والمنهج والمسيرة",
    href: "/about",
    kind: "page",
    icon: "User",
    keywords: ["عني", "about", "مين"],
  },
  {
    id: "page-projects",
    title: "المشاريع",
    description: "مخرجات المتدربين الفعلية",
    href: "/projects",
    kind: "page",
    icon: "FolderKanban",
    keywords: ["مشاريع", "أعمال", "projects"],
  },
  {
    id: "page-articles",
    title: "المقالات",
    description: "مقالات مستخلَصة من الأدلة",
    href: "/articles",
    kind: "page",
    icon: "Newspaper",
    keywords: ["مقالات", "مدونة", "blog"],
  },
  {
    id: "page-faq",
    title: "الأسئلة الشائعة",
    description: "إجابات على أكتر الأسئلة تكرارًا",
    href: "/faq",
    kind: "page",
    icon: "HelpCircle",
    keywords: ["أسئلة", "faq"],
  },
  {
    id: "page-contact",
    title: "تواصل معايا",
    description: "احجز أو اسأل",
    href: "/contact",
    kind: "page",
    icon: "Mail",
    keywords: ["تواصل", "اتصال", "contact"],
  },
];

/** كل اللي ممكن يتبحث فيه — كورسات ومقالات ومشاريع وصفحات */
export async function getSearchIndex(): Promise<SearchItem[]> {
  const courseItems: SearchItem[] = courses.map((c) => ({
    id: `course-${c.slug}`,
    title: c.title,
    description: c.tagline,
    href: `/courses/${c.slug}`,
    kind: "course",
    icon: c.icon,
    keywords: [...c.keywords, c.level, ...c.tools],
  }));

  const articleItems: SearchItem[] = articles.map((a) => ({
    id: `article-${a.slug}`,
    title: a.title,
    description: a.excerpt,
    href: `/articles/${a.slug}`,
    kind: "article",
    icon: "Newspaper",
    keywords: [...a.tags, a.category],
  }));

  const projectItems: SearchItem[] = projects.map((p) => ({
    id: `project-${p.slug}`,
    title: p.title,
    description: p.summary,
    href: `/projects/${p.slug}`,
    kind: "project",
    icon: p.icon,
    keywords: [...p.tech, p.category],
  }));

  return [...courseItems, ...articleItems, ...projectItems, ...staticPages];
}
