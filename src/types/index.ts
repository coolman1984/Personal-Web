/**
 * كل تعريفات الأنواع في المشروع.
 * أي بيانات جديدة لازم تبدأ بتعريف نوعها هنا الأول.
 * المرجع: docs/PLAN.md §5
 */

// ═══════════════════════════════════════════════════════════
// المستويات
// ═══════════════════════════════════════════════════════════

export type LevelId = "beginner" | "intermediate" | "advanced";

export type Accent = "aqua" | "brand" | "gold";

export interface Level {
  id: LevelId;
  /** الاسم المعروض الكامل */
  label: string;
  /** اسم مختصر للشارات */
  shortLabel: string;
  /** جملة واحدة تلخّص المستوى */
  tagline: string;
  /** فقرة شارحة */
  description: string;
  /** الكورس ده لمين */
  audience: string[];
  /** هتطلع بإيه */
  outcomes: string[];
  /** المطلوب قبل ما تبدأ */
  prerequisites: string[];
  /** الترتيب 1..3 — بيستخدم في خريطة التعلّم */
  order: number;
  /** اسم أيقونة من lucide-react */
  icon: string;
  /** درجة اللون — DESIGN.md §2.4 */
  accent: Accent;
}

// ═══════════════════════════════════════════════════════════
// الكورسات
// ═══════════════════════════════════════════════════════════

export interface CourseModule {
  order: number;
  title: string;
  summary: string;
  lessons: string[];
  hours: number;
  /** المشروع العملي المرتبط بالوحدة */
  project?: string;
}

export type Currency = "EGP" | "USD" | "SAR";

export interface CoursePrice {
  amount: number;
  /** السعر قبل الخصم — لو موجود بيظهر مشطوب */
  compareAt?: number;
  currency: Currency;
  note?: string;
}

export type CourseStatus = "متاح" | "الأماكن محدودة" | "قريبًا" | "مكتمل";

export type CourseFormat = "أونلاين مباشر" | "تسجيلات" | "حضوري" | "فردي";

/**
 * نوع الكورس — بيحدّد إزاي بيتعرض وفين.
 *  • mini    → ميني كورس: نتيجة واحدة محدّدة، ٣-٦ ساعات، سعر صغير
 *  • course  → كورس عادي: موضوع كامل
 *  • program → البرنامج الشامل: المسار كله
 */
export type CourseKind = "mini" | "course" | "program";

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  level: LevelId;
  kind: CourseKind;
  duration: string;
  sessions: number;
  hours: number;
  groupSize: number;
  format: CourseFormat[];
  language: string;
  price: CoursePrice;
  outcomes: string[];
  prerequisites: string[];
  audience: string[];
  tools: string[];
  curriculum: CourseModule[];
  deliverables: string[];
  certificate: boolean;
  rating: number;
  studentsCount: number;
  featured: boolean;
  faqs: CourseFaq[];
  keywords: string[];
  status: CourseStatus;
  nextCohort?: string;
  /** عدد الأماكن المتبقية — للضغط النفسي الصادق */
  seatsLeft?: number;
  icon: string;

  /**
   * نموذج التسليم — بيوضّح إيه اللي مباشر وإيه اللي مراجعة على الموقع.
   * المرجع: docs/MEMBERSHIP-PLAN.md §1
   */
  delivery?: {
    /** وصف الجزء المباشر: "٤ جلسات × ٩٠ دقيقة" */
    live: string;
    /** مادة المراجعة اللي بتتفتح بعد الدفع */
    review: string[];
  };

  /** الوعد في جملة واحدة — بيظهر بارز في الميني كورسات */
  promise?: string;
}

// ═══════════════════════════════════════════════════════════
// المشاريع
// ═══════════════════════════════════════════════════════════

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  /** المشكلة اللي المشروع بيحلّها */
  problem: string;
  /** الحل */
  solution: string;
  category: string;
  tech: string[];
  /** الأثر بالأرقام */
  impact: string;
  year: number;
  highlights: string[];
  relatedLevel: LevelId;
  featured: boolean;
  icon: string;
  links?: ProjectLink[];
}

// ═══════════════════════════════════════════════════════════
// المقالات
// ═══════════════════════════════════════════════════════════

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "info" | "tip" | "warn"; title: string; text: string }
  | { type: "code"; lang: string; code: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: ArticleBlock[];
  tags: string[];
  /** ISO date */
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
  category: string;
  /** الكورس المرتبط — بيظهر كدعوة في آخر المقال */
  relatedCourse?: string;
}

// ═══════════════════════════════════════════════════════════
// الآراء والأسئلة والباقات
// ═══════════════════════════════════════════════════════════

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** الحروف الأولى للأڤاتار النصّي */
  initials: string;
  courseSlug?: string;
  level: LevelId;
}

export type FaqCategory = "عام" | "الكورسات" | "الدفع" | "تقني";

export interface Faq {
  question: string;
  answer: string;
  category: FaqCategory;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: CoursePrice;
  /** سعر المجموعة — بيظهر لما المبدّل يبقى "مجموعة" */
  groupPrice?: CoursePrice;
  bestFor: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
  accent: Accent;
}

// ═══════════════════════════════════════════════════════════
// عناصر متنوّعة
// ═══════════════════════════════════════════════════════════

export interface Stat {
  value: number;
  suffix?: string;
  /** للأرقام العشرية زي 4.9 */
  decimals?: number;
  label: string;
  icon: string;
}

export interface MethodPillar {
  title: string;
  description: string;
  icon: string;
  /** حجم الكارت في شبكة الـBento — DESIGN.md §4.5 */
  span: "sm" | "md" | "lg";
  accent: Accent;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export type ToolCategory = "نماذج" | "أطر عمل" | "بيانات" | "نشر" | "أدوات";

export interface Tool {
  name: string;
  category: ToolCategory;
  level: LevelId[];
}

export interface ComparisonRow {
  traditional: string;
  mine: string;
}

// ═══════════════════════════════════════════════════════════
// اختبار تحديد المستوى
// ═══════════════════════════════════════════════════════════

export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  level: LevelId;
  title: string;
  message: string;
  /** أقل درجة للوصول للمستوى ده */
  minScore: number;
}

// ═══════════════════════════════════════════════════════════
// التنقّل والبحث
// ═══════════════════════════════════════════════════════════

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
  /** يفتح في تبويب جديد */
  external?: boolean;
}

export type SearchKind = "course" | "article" | "project" | "page";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SearchKind;
  icon: string;
  keywords: string[];
}

// ═══════════════════════════════════════════════════════════
// الفورمات والـAPI
// ═══════════════════════════════════════════════════════════

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EnrollInput {
  courseSlug: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
}

export interface ApiResponse<T = undefined> {
  ok: boolean;
  message: string;
  data?: T;
  /** أخطاء الحقول — المفتاح اسم الحقل */
  errors?: Record<string, string>;
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };
