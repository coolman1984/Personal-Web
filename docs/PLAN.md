# خطة التنفيذ الشاملة — الموقع الشخصي لكورسات الذكاء الاصطناعي

> **الغرض من الملف ده:** ده المرجع الوحيد والكامل للمشروع. أي شخص أو Agent يفتح المشروع
> ده لأول مرة، يقرأ الملف ده من أوّله لآخره، ويقدر يكمّل الشغل من غير ما يسأل حد ومن غير
> ما يقف. كل قرار متكتوب، وكل ملف متحدّد، وكل دالة معرّفة بالاسم والمدخلات والمخرجات.
>
> **لو فيه تعارض** بين الملف ده وأي كود موجود → الملف ده هو الأصل، والكود هو اللي يتعدّل.
> **لو فيه تعارض** بينه وبين `docs/DESIGN.md` في حاجة بصرية → `DESIGN.md` هو الأصل.

**آخر تحديث:** 2026-09-18
**الحالة:** ✅ **كل المراحل من ٠ لـ٨ خلصت.** الموقع مبني وشغّال، ٦٠ صفحة متولّدة.

---

## جدول المحتويات

| # | القسم | الوصف المختصر |
|---|-------|----------------|
| 1 | [الرؤية والهدف](#1-الرؤية-والهدف) | ليه الموقع موجود وإيه اللي المفروض يحقّقه |
| 2 | [الجمهور ورحلة الزائر](#2-الجمهور-ورحلة-الزائر) | مين اللي هيدخل وإزاي بنمشّيه للحجز |
| 3 | [الستاك التقني](#3-الستاك-التقني-والأسباب) | كل مكتبة وليه اخترناها |
| 4 | [هيكل الملفات](#4-هيكل-الملفات-الكامل) | شجرة المشروع كاملة |
| 5 | [نماذج البيانات](#5-نماذج-البيانات-types) | كل الـTypeScript types بالتفصيل |
| 6 | [طبقة المحتوى](#6-طبقة-المحتوى-content-layer) | مصدر الحقيقة الوحيد للبيانات |
| 7 | [الصفحات](#7-الصفحات-routes) | كل صفحة وإيه اللي فيها |
| 8 | [المكوّنات](#8-المكوّنات-components) | كل component وواجهته |
| 9 | [المكتبات والدوال](#9-المكتبات-والدوال-lib) | كل function بتوقيعها |
| 10 | [الـAPI](#10-الـapi-routes) | المسارات الخلفية والتجهيز للدفع |
| 11 | [الفيتشرز الكاملة](#11-قائمة-الفيتشرز-الكاملة) | 120+ ميزة مصنّفة |
| 12 | [خطة التنفيذ بالخطوات](#12-خطة-التنفيذ-بالخطوات) | الترتيب الإجباري للشغل |
| 13 | [معايير القبول](#13-معايير-القبول-definition-of-done) | إمتى نقول "خلصت" |
| 14 | [المخاطر والحلول](#14-المخاطر-والحلول-البديلة) | لو حاجة وقعت نعمل إيه |

---

## 1. الرؤية والهدف

### 1.1 الفكرة في سطر واحد
موقع شخصي عربي بالكامل، يقدّم **مدرّب ذكاء اصطناعي** وكورساته على تلات مستويات
(مبتدئ / متوسط / متقدّم)، بتصميم راقي جدًا يليق بخبير، ومبني بطريقة تسمح بإضافة
الدفع والـAPIs ومنصة تعلّم كاملة بعدين من غير إعادة بناء.

### 1.2 الأهداف القابلة للقياس

| الهدف | المقياس | الوسيلة في الموقع |
|-------|---------|-------------------|
| بناء الثقة | الزائر يفضل > 90 ثانية | قسم "منهجي"، المشاريع الحقيقية، آراء المتدربين |
| توضيح المستوى المناسب | 30%+ يخلّصوا اختبار المستوى | صفحة `/quiz` + مقارنة المستويات |
| التحويل للحجز | نقرة على "احجز مكانك" | CTA ثابت في الهيدر + في كل كارت كورس + شريط سفلي في الموبايل |
| التواصل المباشر | رسالة/واتساب | زر واتساب عائم + فورم تواصل |
| بناء قائمة بريدية | اشتراك في النشرة | سكشن نشرة + نافذة خروج (Exit Intent) |

### 1.3 مبادئ غير قابلة للتفاوض

1. **عربي أولًا (RTL-first):** `<html dir="rtl" lang="ar">`. أي مكوّن يتبني بمنطق
   `start/end` مش `left/right`. ممنوع استخدام `ml-*` / `mr-*` / `left-*` / `right-*`
   — نستخدم `ms-*` / `me-*` / `start-*` / `end-*`.
2. **اللغة بسيطة وراقية:** جملة قصيرة، كلمة مفهومة، صفر مصطلحات متفلسفة. لو لازم
   مصطلح إنجليزي، نكتبه ونفسّره في نصف سطر.
3. **البيانات في مكان واحد:** كل النصوص والكورسات في `src/content/`. ممنوع كتابة
   نص ثابت جوّه أي component. السبب: عشان تقدر تغيّر كل حاجة من ملف واحد، وعشان
   نربطه بقاعدة بيانات بعدين من غير ما نلمس الواجهة.
4. **قابلية التوسّع:** أي خدمة خارجية (دفع، إيميل، تحليلات) تتكتب **ورا واجهة
   (interface)**، ويكون فيه نسخة وهمية (mock) شغّالة من غير مفاتيح. الموقع لازم
   يشتغل 100% من غير أي مفتاح API.
5. **السرعة:** Server Components افتراضيًا. `"use client"` بس لما نحتاج تفاعل
   حقيقي. الهدف: Lighthouse ≥ 95 في الأربع خانات.
6. **الوصولية (a11y):** تباين ألوان AA على الأقل، تنقّل بالكيبورد كامل، `aria-*`
   صحيحة، احترام `prefers-reduced-motion`.

---

## 2. الجمهور ورحلة الزائر

### 2.1 ثلاث شخصيات مستهدفة

**(أ) "أحمد" — مبتدئ فضولي، 24 سنة، خرّيج تجارة**
- بيسمع عن AI في كل حتة وحاسس إنه اتأخر.
- خايف إن الموضوع محتاج برمجة ورياضة.
- **اللي محتاج يشوفه:** "هتبدأ من الصفر"، "من غير برمجة"، سعر واضح، مدة قصيرة.

**(ب) "منى" — متوسطة، 31 سنة، مسوّقة رقمية**
- بتستخدم ChatGPT يوميًا بس بشكل سطحي.
- عايزة تبني حاجة حقيقية تفرق في شغلها.
- **اللي محتاجة تشوفه:** مشاريع عملية، أدوات بالاسم، "هتطلع بإيه في إيدك".

**(ج) "خالد" — متقدّم، 29 سنة، مهندس برمجيات**
- عايز يبني أنظمة AI حقيقية (RAG، Agents، Fine-tuning).
- بيقيّم المدرّب من عمق الكلام مش من الدعاية.
- **اللي محتاج يشوفه:** تفاصيل تقنية، معمارية، مشاريع بمستوى إنتاجي.

### 2.2 رحلة الزائر (Funnel) — والـUI اللي بيخدم كل خطوة

```
  [1] وصل للموقع
       │  ← الهيرو: عنوان قوي + جملة توضّح القيمة + زرّين
       ▼
  [2] "هو ده مين؟"
       │  ← شريط الأرقام (طلاب/ساعات/مشاريع) + شعارات الأدوات
       ▼
  [3] "أنا مستواي إيه؟"
       │  ← كروت المستويات التلاتة + زر "مش عارف مستواك؟ جرّب الاختبار"
       ▼
  [4] "هو بيشرح إزاي؟"
       │  ← سكشن المنهج (Bento) + مقطع/صورة + مبادئ الشرح
       ▼
  [5] "إيه الكورسات بالظبط؟"
       │  ← كروت الكورسات بفلترة + صفحة تفصيلية لكل كورس
       ▼
  [6] "أثق ليه؟"
       │  ← المشاريع الحقيقية + آراء المتدربين + الشهادة
       ▼
  [7] "بكام؟"
       │  ← جدول الباقات + مقارنة + ضمان استرداد
       ▼
  [8] "عايز أحجز / أسأل"
       │  ← فورم الحجز + واتساب + شريط CTA سفلي في الموبايل
       ▼
  [9] لسه متردد
          ← النشرة البريدية + المقالات المجانية + دليل PDF مجاني
```

**قاعدة:** في أي نقطة في الصفحة، لازم يكون فيه CTA على بعد أقل من شاشة واحدة.

---

## 3. الستاك التقني والأسباب

| التقنية | الإصدار | ليه دي بالذات | البديل لو فشلت |
|---------|---------|---------------|-----------------|
| **Next.js** | 16.3.5 | App Router + Server Components = سرعة عالية و SEO ممتاز. وبيدّينا `/api` جاهزة للدفع من غير سيرفر منفصل. | Astro (لكن هنخسر الـAPI) |
| **React** | 19.3 | مطلوب لـNext 16، وفيه `useOptimistic` و`useActionState` هنستخدمهم في الفورمات | — |
| **TypeScript** | 7.x | يمنع أخطاء البيانات، وبيخلّي أي Agent تاني يفهم شكل البيانات من الـtypes | — |
| **Tailwind CSS** | 4.3 | الإصدار الجديد بيتظبط من الـCSS نفسه (`@theme`) — أسهل في الصيانة وأسرع في البناء | CSS Modules |
| **Motion** | 13.4 | (الاسم الجديد لـFramer Motion) حركات ناعمة، `whileInView` جاهز، ودعم `prefers-reduced-motion` | CSS animations فقط |
| **lucide-react** | 1.x | أيقونات نضيفة، خفيفة، tree-shakeable | Heroicons |
| **next-themes** | 0.4 | تبديل الوضع الليلي من غير وميض (flash) | تطبيق يدوي بـcookie |
| **clsx + tailwind-merge** | — | دالة `cn()` لدمج الكلاسات بأمان | — |

### 3.1 حاجات مقصودة إننا **ما استخدمناهاش** (ومهم تعرف ليه)

- ❌ **مكتبة UI جاهزة (MUI / Chakra):** بتفرض شكلها وبتصعّب التخصيص، وبتكبّر
  حجم الموقع. إحنا بانينا مكوّناتنا عشان الشكل يبقى مميّز 100%.
- ❌ **قاعدة بيانات دلوقتي:** المحتوى ثابت ونادر التغيير. إضافتها دلوقتي = تعقيد
  من غير فايدة. الطبقة معمولة بحيث نضيفها في يوم واحد (شوف `ROADMAP.md §2`).
- ❌ **CMS خارجي:** نفس السبب. لكن `src/content/` متصمّم بحيث يتبدّل بـSanity/Strapi
  بتغيير دالة واحدة.
- ❌ **i18n (تعدّد اللغات):** الموقع عربي بالكامل حاليًا. البنية بتسمح بإضافته
  بعدين (شوف `ROADMAP.md §7`).

---

## 4. هيكل الملفات الكامل

```
Personal-Web/
├── CLAUDE.md                      ← قواعد المشروع لأي Agent (اقرأه الأول)
├── README.md                      ← تشغيل ونشر
├── package.json
├── next.config.ts                 ← إعدادات Next + هيدرز الأمان
├── tsconfig.json                  ← مسار @/* → src/*
├── postcss.config.mjs             ← Tailwind v4
├── .env.example                   ← كل المفاتيح المحتملة موثّقة
├── .gitignore
│
├── docs/
│   ├── PLAN.md                    ← الملف ده
│   ├── DESIGN.md                  ← مواصفات التصميم بالمقاسات
│   ├── CONTENT.md                 ← كل النصوص والمحتوى
│   ├── ROADMAP.md                 ← خطة التطوير المستقبلي
│   └── COMPONENTS.md              ← فهرس سريع لكل مكوّن
│
├── public/
│   ├── favicon.svg
│   ├── logo.svg                   ← الشعار (نصّي متدرّج)
│   ├── og-default.png             ← صورة المشاركة الافتراضية
│   └── files/
│       └── .gitkeep               ← مكان الـPDF والملفات المجانية
│
└── src/
    ├── app/
    │   ├── layout.tsx             ← الجذر: RTL، الخطوط، الثيم، الهيدر، الفوتر
    │   ├── page.tsx               ← الصفحة الرئيسية (تجميع السكاشن)
    │   ├── globals.css            ← نظام التصميم كامل
    │   ├── not-found.tsx          ← صفحة 404 مخصّصة
    │   ├── error.tsx              ← صفحة خطأ عامة
    │   ├── loading.tsx            ← هيكل تحميل
    │   ├── sitemap.ts             ← خريطة الموقع تلقائية
    │   ├── robots.ts              ← قواعد محرّكات البحث
    │   ├── manifest.ts            ← PWA manifest
    │   ├── opengraph-image.tsx    ← صورة مشاركة مولّدة ديناميكيًا
    │   │
    │   ├── courses/
    │   │   ├── page.tsx           ← كل الكورسات + فلترة
    │   │   └── [slug]/
    │   │       ├── page.tsx       ← صفحة الكورس التفصيلية
    │   │       └── opengraph-image.tsx
    │   ├── levels/[level]/page.tsx    ← صفحة لكل مستوى
    │   ├── projects/page.tsx          ← معرض المشاريع
    │   ├── projects/[slug]/page.tsx   ← تفاصيل مشروع
    │   ├── articles/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   ├── about/page.tsx             ← عني بالتفصيل
    │   ├── pricing/page.tsx           ← الباقات والمقارنة
    │   ├── roadmap/page.tsx           ← خريطة التعلّم
    │   ├── quiz/page.tsx              ← اختبار تحديد المستوى
    │   ├── contact/page.tsx           ← تواصل + حجز
    │   ├── faq/page.tsx
    │   ├── enroll/[slug]/page.tsx     ← صفحة الحجز/الدفع
    │   ├── thank-you/page.tsx         ← بعد الحجز
    │   ├── legal/
    │   │   ├── terms/page.tsx
    │   │   ├── privacy/page.tsx
    │   │   └── refund/page.tsx
    │   └── api/
    │       ├── contact/route.ts       ← استقبال رسائل
    │       ├── subscribe/route.ts     ← النشرة البريدية
    │       ├── checkout/route.ts      ← بدء الدفع
    │       ├── enroll/route.ts        ← تسجيل بدون دفع
    │       └── webhooks/
    │           └── payment/route.ts   ← تأكيد الدفع
    │
    ├── components/
    │   ├── ui/                    ← لبنات أساسية (11 مكوّن)
    │   ├── motion/                ← أغلفة الحركة (5 مكوّنات)
    │   ├── layout/                ← الهيكل العام (9 مكوّنات)
    │   ├── sections/              ← سكاشن الصفحة الرئيسية (15 سكشن)
    │   ├── course/                ← مكوّنات الكورسات (7)
    │   └── shared/                ← مشتركة (8)
    │
    ├── content/                   ← 🔑 مصدر الحقيقة الوحيد
    │   ├── site.ts                ← بيانات الموقع والشخص
    │   ├── navigation.ts          ← القوائم
    │   ├── courses.ts             ← الكورسات (الأهم)
    │   ├── levels.ts              ← تعريف المستويات التلاتة
    │   ├── projects.ts            ← المشاريع
    │   ├── articles.ts            ← المقالات
    │   ├── testimonials.ts        ← آراء المتدربين
    │   ├── faq.ts                 ← الأسئلة الشائعة
    │   ├── pricing.ts             ← الباقات
    │   ├── method.ts              ← منهج الشرح (نقاط التميّز)
    │   ├── stats.ts               ← الأرقام
    │   ├── timeline.ts            ← المسيرة المهنية
    │   ├── tools.ts               ← الأدوات والتقنيات
    │   └── quiz.ts                ← أسئلة تحديد المستوى
    │
    ├── lib/
    │   ├── utils.ts               ← cn, formatters, slugify...
    │   ├── seo.ts                 ← بناء الـmetadata والـJSON-LD
    │   ├── queries.ts             ← دوال جلب البيانات (طبقة عزل)
    │   ├── analytics.ts           ← تتبّع الأحداث
    │   ├── validation.ts          ← تحقّق من الفورمات بدون مكتبات
    │   ├── rate-limit.ts          ← حماية بسيطة للـAPI
    │   └── payments/
    │       ├── types.ts           ← واجهة موحّدة لأي بوابة دفع
    │       ├── index.ts           ← اختيار البوابة حسب الإعدادات
    │       ├── mock.ts            ← بوابة وهمية (تشتغل بدون مفاتيح)
    │       ├── stripe.ts          ← تجهيز Stripe
    │       └── paymob.ts          ← تجهيز Paymob (مصر)
    │
    ├── hooks/
    │   ├── use-scroll-progress.ts
    │   ├── use-media-query.ts
    │   ├── use-lock-body.ts
    │   ├── use-counter.ts
    │   ├── use-local-storage.ts
    │   └── use-hotkey.ts
    │
    └── types/
        └── index.ts               ← كل الـtypes في مكان واحد
```

---

## 5. نماذج البيانات (Types)

> كل النماذج دي في `src/types/index.ts`. أي إضافة لبيانات جديدة **لازم** تبدأ
> بتعريف النوع هنا الأول.

### 5.1 المستوى — `Level`

```ts
export type LevelId = "beginner" | "intermediate" | "advanced";

export interface Level {
  id: LevelId;
  /** الاسم المعروض: "المستوى المبتدئ" */
  label: string;
  /** اسم مختصر للشارات: "مبتدئ" */
  shortLabel: string;
  /** جملة واحدة تلخّص المستوى */
  tagline: string;
  /** فقرة شارحة (2-3 أسطر) */
  description: string;
  /** "لمين ده؟" — 4 نقاط */
  audience: string[];
  /** "هتطلع بإيه؟" — 5 نقاط */
  outcomes: string[];
  /** المطلوب قبل ما تبدأ */
  prerequisites: string[];
  /** رقم الترتيب 1..3 — بيستخدم في خريطة التعلّم */
  order: number;
  /** اسم أيقونة من lucide-react */
  icon: string;
  /** درجة اللون الأساسية للمستوى (شوف DESIGN.md §2.4) */
  accent: "aqua" | "brand" | "gold";
}
```

### 5.2 الكورس — `Course` (أهم نوع في المشروع)

```ts
export interface CourseModule {
  /** رقم الوحدة */
  order: number;
  title: string;
  /** وصف سطر واحد */
  summary: string;
  /** عناوين الدروس */
  lessons: string[];
  /** مدة الوحدة بالساعات */
  hours: number;
  /** المشروع العملي المرتبط بالوحدة (اختياري) */
  project?: string;
}

export interface CoursePrice {
  amount: number;
  /** السعر قبل الخصم — لو موجود بيظهر مشطوب */
  compareAt?: number;
  currency: "EGP" | "USD" | "SAR";
  /** "للشخص" | "للمجموعة" */
  note?: string;
}

export interface Course {
  slug: string;                    // في الرابط: /courses/[slug]
  title: string;
  /** عنوان فرعي جذّاب (سطر واحد) */
  tagline: string;
  /** فقرة تعريفية (3-4 أسطر) للكارت وللـSEO */
  summary: string;
  /** شرح مطوّل لصفحة الكورس */
  description: string;
  level: LevelId;
  /** مدة الكورس: "6 أسابيع" */
  duration: string;
  /** عدد الجلسات */
  sessions: number;
  /** إجمالي الساعات */
  hours: number;
  /** عدد أقصى للمجموعة */
  groupSize: number;
  format: ("أونلاين مباشر" | "تسجيلات" | "حضوري" | "فردي")[];
  language: "العربية";
  price: CoursePrice;
  /** 5-7 مخرجات — "هتخرج قادر على..." */
  outcomes: string[];
  /** المتطلبات قبل الكورس */
  prerequisites: string[];
  /** لمين الكورس ده */
  audience: string[];
  /** الأدوات اللي هتتعلمها (أسماء من tools.ts) */
  tools: string[];
  /** المنهج الكامل */
  curriculum: CourseModule[];
  /** اللي هتاخده معاك: ملفات، قوالب، شهادة... */
  deliverables: string[];
  /** فيه شهادة؟ */
  certificate: boolean;
  /** التقييم من 5 */
  rating: number;
  /** عدد المتدربين */
  studentsCount: number;
  /** يظهر في الرئيسية؟ */
  featured: boolean;
  /** أسئلة خاصة بالكورس ده */
  faqs: { question: string; answer: string }[];
  /** كلمات مفتاحية للبحث والـSEO */
  keywords: string[];
  /** حالة الكورس */
  status: "متاح" | "الأماكن محدودة" | "قريبًا" | "مكتمل";
  /** تاريخ أقرب مجموعة */
  nextCohort?: string;
  /** أيقونة lucide */
  icon: string;
}
```

### 5.3 باقي الأنواع

```ts
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** "روبوت محادثة" | "تحليل بيانات" | "رؤية حاسوبية" ... */
  category: string;
  /** التقنيات المستخدمة */
  tech: string[];
  /** الأثر: "وفّر 60% من وقت الرد على العملاء" */
  impact: string;
  year: number;
  /** 3-4 نقاط عن اللي اتعمل */
  highlights: string[];
  /** مرتبط بأي مستوى — بيظهر في صفحة الكورس */
  relatedLevel: LevelId;
  featured: boolean;
  icon: string;
  links?: { label: string; href: string }[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  /** المحتوى بصيغة بلوكات — بديل بسيط لـMDX */
  body: ArticleBlock[];
  tags: string[];
  publishedAt: string;       // ISO date
  readingMinutes: number;
  featured: boolean;
  category: string;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "info" | "tip" | "warn"; title: string; text: string }
  | { type: "code"; lang: string; code: string };

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

export interface Faq {
  question: string;
  answer: string;
  category: "عام" | "الكورسات" | "الدفع" | "تقني";
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: CoursePrice;
  /** الأنسب لمين */
  bestFor: string;
  features: { text: string; included: boolean }[];
  ctaLabel: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
}

export interface Stat {
  value: number;
  suffix?: string;      // "+" | "%" | "س"
  label: string;
  icon: string;
}

export interface MethodPillar {
  title: string;
  description: string;
  icon: string;
  /** حجم الكارت في شبكة الـBento */
  span: "sm" | "md" | "lg";
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Tool {
  name: string;
  category: "نماذج" | "أطر عمل" | "بيانات" | "نشر" | "أدوات";
  level: LevelId[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; score: number }[];
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}
```

---

## 6. طبقة المحتوى (Content Layer)

### 6.1 القاعدة الذهبية

```
❌ غلط:  <h1>أهلاً بيك في موقعي</h1>
✅ صح:   <h1>{site.hero.title}</h1>   // والنص في src/content/site.ts
```

**السبب:** لما تيجي تربط الموقع بقاعدة بيانات أو لوحة تحكم، هتغيّر دالة واحدة في
`src/lib/queries.ts` وخلاص — من غير ما تفتح أي component.

### 6.2 `src/content/site.ts` — بيانات الشخص والموقع

ده الملف اللي **صاحب الموقع بيعدّله أول حاجة**. بيحتوي على:

```ts
export const site = {
  // ── الهوية ──────────────────────────────────
  name: "اسم صاحب الموقع",          // 👈 غيّر ده
  shortName: "الاسم المختصر",
  role: "مدرّب ومهندس ذكاء اصطناعي",
  tagline: "بخلّي الذكاء الاصطناعي سهل... وشغّال في إيدك",
  bio: "...",
  url: "https://example.com",       // 👈 غيّر ده
  locale: "ar_EG",

  // ── التواصل ─────────────────────────────────
  email: "...",
  phone: "...",
  whatsapp: "20100...",             // بصيغة دولية بدون +
  location: "القاهرة، مصر",

  // ── السوشيال ────────────────────────────────
  social: { linkedin, youtube, x, facebook, github, telegram },

  // ── نصوص الهيرو ─────────────────────────────
  hero: { badge, titleLines[], subtitle, primaryCta, secondaryCta, chips[] },

  // ── إعدادات تشغيلية ─────────────────────────
  features: {
    payments: false,        // 👈 خلّيها true لما تربط بوابة الدفع
    newsletter: true,
    quiz: true,
    commandPalette: true,
    exitIntent: true,
    whatsappFab: true,
  },
} as const;
```

### 6.3 دوال الوصول للبيانات — `src/lib/queries.ts`

> **مهم جدًا:** أي component يحتاج بيانات، **لازم** ينادي دالة من هنا، ومينفعش
> يستورد من `content/` مباشرة. ده اللي هيخلّي التحويل لقاعدة بيانات سهل.

كل الدوال `async` من دلوقتي — حتى لو البيانات ثابتة — عشان لما نربط قاعدة بيانات
ما نغيّرش أي حاجة في المكوّنات.

| الدالة | المدخل | المخرج | الاستخدام |
|--------|--------|--------|-----------|
| `getAllCourses()` | — | `Promise<Course[]>` | صفحة الكورسات |
| `getCourseBySlug(slug)` | `string` | `Promise<Course \| null>` | صفحة الكورس |
| `getCoursesByLevel(level)` | `LevelId` | `Promise<Course[]>` | صفحة المستوى |
| `getFeaturedCourses()` | — | `Promise<Course[]>` | الرئيسية |
| `getAllLevels()` | — | `Promise<Level[]>` | كروت المستويات |
| `getLevelById(id)` | `LevelId` | `Promise<Level \| null>` | صفحة المستوى |
| `getAllProjects()` | — | `Promise<Project[]>` | معرض المشاريع |
| `getProjectBySlug(slug)` | `string` | `Promise<Project \| null>` | تفاصيل مشروع |
| `getFeaturedProjects()` | — | `Promise<Project[]>` | الرئيسية |
| `getAllArticles()` | — | `Promise<Article[]>` | المدوّنة (مرتّبة بالتاريخ) |
| `getArticleBySlug(slug)` | `string` | `Promise<Article \| null>` | صفحة المقال |
| `getRelatedArticles(slug, n)` | `string, number` | `Promise<Article[]>` | آخر المقال |
| `getTestimonials(level?)` | `LevelId?` | `Promise<Testimonial[]>` | آراء |
| `getFaqs(category?)` | `string?` | `Promise<Faq[]>` | الأسئلة |
| `getPricingTiers()` | — | `Promise<PricingTier[]>` | الباقات |
| `getSearchIndex()` | — | `Promise<SearchItem[]>` | لوحة الأوامر ⌘K |

---

## 7. الصفحات (Routes)

### 7.1 جدول الصفحات الكامل

| المسار | النوع | العنوان | المحتوى الأساسي |
|--------|-------|---------|------------------|
| `/` | ثابتة | الرئيسية | 15 سكشن (§7.2) |
| `/courses` | ثابتة | كل الكورسات | فلترة بالمستوى + بحث + ترتيب |
| `/courses/[slug]` | ثابتة (SSG) | صفحة الكورس | هيرو + منهج + مخرجات + سعر + آراء + أسئلة |
| `/levels/[level]` | ثابتة (SSG) | صفحة المستوى | شرح المستوى + كورساته + مشاريعه |
| `/projects` | ثابتة | المشاريع | شبكة + فلترة بالتصنيف |
| `/projects/[slug]` | ثابتة (SSG) | تفاصيل مشروع | القصة + التقنيات + الأثر |
| `/articles` | ثابتة | المقالات | شبكة + فلترة بالوسوم |
| `/articles/[slug]` | ثابتة (SSG) | المقال | محتوى + فهرس جانبي + شريط تقدّم القراءة |
| `/about` | ثابتة | عني | القصة + المسيرة + الفلسفة + الأدوات |
| `/pricing` | ثابتة | الأسعار | باقات + جدول مقارنة + أسئلة الدفع |
| `/roadmap` | ثابتة | خريطة التعلّم | مسار بصري من المبتدئ للمتقدّم |
| `/quiz` | تفاعلية | حدّد مستواك | 8 أسئلة + نتيجة + توصية |
| `/contact` | تفاعلية | تواصل | فورم + واتساب + أسئلة سريعة |
| `/faq` | ثابتة | الأسئلة الشائعة | مصنّفة + بحث |
| `/enroll/[slug]` | تفاعلية | احجز مكانك | ملخّص + بيانات + دفع (أو تسجيل اهتمام) |
| `/thank-you` | ثابتة | شكرًا | تأكيد + الخطوات الجاية |
| `/legal/terms` | ثابتة | الشروط | — |
| `/legal/privacy` | ثابتة | الخصوصية | — |
| `/legal/refund` | ثابتة | سياسة الاسترداد | — |

### 7.2 سكاشن الصفحة الرئيسية — بالترتيب

| # | السكشن | الملف | الهدف | تفاعلي؟ |
|---|--------|-------|-------|---------|
| 1 | `Hero` | `sections/hero.tsx` | جذب + وعد واضح + CTA | ✅ |
| 2 | `TrustBar` | `sections/trust-bar.tsx` | شريط أدوات متحرّك | ❌ |
| 3 | `Stats` | `sections/stats.tsx` | 4 أرقام بعدّاد متحرّك | ✅ |
| 4 | `Levels` | `sections/levels.tsx` | 3 كروت المستويات | ✅ |
| 5 | `Method` | `sections/method.tsx` | شبكة Bento لمنهج الشرح | ❌ |
| 6 | `FeaturedCourses` | `sections/featured-courses.tsx` | الكورسات المميّزة مع فلترة | ✅ |
| 7 | `LearningPath` | `sections/learning-path.tsx` | مسار التعلّم البصري | ✅ |
| 8 | `WhyDifferent` | `sections/why-different.tsx` | "نظرتي مختلفة" — قبل/بعد | ✅ |
| 9 | `Projects` | `sections/projects.tsx` | مشاريع حقيقية | ❌ |
| 10 | `Testimonials` | `sections/testimonials.tsx` | آراء متحرّكة | ✅ |
| 11 | `Pricing` | `sections/pricing.tsx` | باقات + مبدّل | ✅ |
| 12 | `Articles` | `sections/articles.tsx` | آخر 3 مقالات | ❌ |
| 13 | `Faq` | `sections/faq.tsx` | أهم 6 أسئلة | ✅ |
| 14 | `Newsletter` | `sections/newsletter.tsx` | اشتراك + هدية PDF | ✅ |
| 15 | `FinalCta` | `sections/final-cta.tsx` | دعوة أخيرة قوية | ❌ |

---

## 8. المكوّنات (Components)

### 8.1 `components/ui/` — اللبنات الأساسية

| المكوّن | الملف | الـProps الرئيسية | ملاحظات |
|---------|-------|-------------------|----------|
| `Button` | `button.tsx` | `variant`, `size`, `href?`, `icon?`, `loading?` | 6 أشكال (§DESIGN 5.1) |
| `Badge` | `badge.tsx` | `tone`, `size`, `icon?` | للمستويات والحالات |
| `Card` | `card.tsx` | `as`, `interactive?`, `glow?` | الأساس لكل الكروت |
| `SpotlightCard` | `spotlight-card.tsx` | `children` | إضاءة تتبع الماوس |
| `TiltCard` | `tilt-card.tsx` | `intensity` | ميلان 3D خفيف |
| `Accordion` | `accordion.tsx` | `items`, `allowMultiple` | للمنهج والأسئلة |
| `Tabs` | `tabs.tsx` | `tabs`, `defaultValue` | فلترة الكورسات |
| `Dialog` | `dialog.tsx` | `open`, `onClose`, `title` | نوافذ منبثقة |
| `Input` / `Textarea` / `Select` | `field.tsx` | `label`, `error`, `hint` | حقول الفورم |
| `Progress` | `progress.tsx` | `value`, `tone` | تقدّم الاختبار |
| `Rating` | `rating.tsx` | `value`, `size` | نجوم التقييم |
| `Avatar` | `avatar.tsx` | `initials`, `tone` | أڤاتار نصّي (بدون صور) |
| `Toast` | `toast.tsx` | `useToast()` | رسائل النجاح/الخطأ |

### 8.2 `components/motion/` — أغلفة الحركة

| المكوّن | الوظيفة |
|---------|----------|
| `Reveal` | يظهر العنصر بنعومة لما يوصل للشاشة. props: `delay`, `y`, `once` |
| `Stagger` | يظهر مجموعة عناصر ورا بعض بفارق زمني |
| `Counter` | عدّاد رقمي يعدّ من 0 للرقم لما يظهر |
| `Marquee` | شريط متحرّك لا نهائي (للأدوات والآراء) |
| `TextReveal` | العنوان يظهر كلمة كلمة |
| `MagneticButton` | الزر بينجذب ناحية الماوس |

### 8.3 `components/layout/`

| المكوّن | الوظيفة |
|---------|----------|
| `Navbar` | هيدر زجاجي ثابت + قائمة كبيرة للكورسات + CTA |
| `MobileNav` | درج جانبي للموبايل |
| `Footer` | 4 أعمدة + نشرة + سوشيال + روابط قانونية |
| `ThemeProvider` / `ThemeToggle` | الوضع الليلي/النهاري/تلقائي |
| `ScrollProgress` | شريط تقدّم رفيع أعلى الصفحة |
| `CommandPalette` | بحث شامل بـ`Ctrl/⌘ + K` |
| `BackToTop` | زر العودة لأعلى |
| `WhatsAppFab` | زر واتساب عائم |
| `MobileCtaBar` | شريط CTA سفلي في الموبايل فقط |
| `AuroraBackground` | الخلفية المتدرّجة المتحرّكة |

### 8.4 `components/course/`

| المكوّن | الوظيفة |
|---------|----------|
| `CourseCard` | كارت الكورس (3 أحجام: `sm` / `md` / `featured`) |
| `CourseHero` | رأس صفحة الكورس |
| `CurriculumAccordion` | المنهج بوحداته ودروسه |
| `OutcomesList` | "هتخرج قادر على..." |
| `PriceBox` | صندوق السعر اللاصق (sticky) |
| `LevelBadge` | شارة المستوى بلونه |
| `CourseFilters` | فلترة بالمستوى + السعر + المدة |
| `CompareTable` | جدول مقارنة المستويات التلاتة |

### 8.5 `components/shared/`

| المكوّن | الوظيفة |
|---------|----------|
| `SectionHeading` | عنوان السكشن الموحّد (شارة + عنوان + وصف) |
| `Breadcrumbs` | مسار التنقّل |
| `ShareButtons` | مشاركة على السوشيال |
| `EmptyState` | لما مفيش نتائج |
| `NewsletterForm` | فورم الاشتراك (مُعاد استخدامه) |
| `ContactForm` | فورم التواصل |
| `ExitIntentModal` | نافذة لما الزائر ينوي يخرج |
| `JsonLd` | حقن البيانات المنظّمة للـSEO |

---

## 9. المكتبات والدوال (lib)

### 9.1 `lib/utils.ts`

```ts
cn(...inputs: ClassValue[]): string
  // دمج كلاسات Tailwind بأمان (clsx + twMerge)

formatPrice(price: CoursePrice): string
  // 4500 EGP → "٤٬٥٠٠ ج.م"  (أرقام عربية + رمز العملة)

formatNumber(n: number): string
  // 1500 → "١٬٥٠٠"

formatDate(iso: string): string
  // "2026-03-15" → "١٥ مارس ٢٠٢٦"

slugify(text: string): string
  // يحوّل أي نص لـslug صالح للرابط

readingTime(blocks: ArticleBlock[]): number
  // يحسب دقايق القراءة (200 كلمة/دقيقة للعربي)

truncate(text: string, max: number): string

whatsappLink(phone: string, message: string): string
  // يبني رابط wa.me بالرسالة جاهزة

absoluteUrl(path: string): string
  // يبني رابط كامل من NEXT_PUBLIC_SITE_URL
```

### 9.2 `lib/seo.ts`

```ts
buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
}): Metadata
  // يبني كل الـmeta tags + OpenGraph + Twitter Card

courseJsonLd(course: Course): object      // schema.org/Course
personJsonLd(): object                     // schema.org/Person
articleJsonLd(article: Article): object    // schema.org/Article
faqJsonLd(faqs: Faq[]): object             // schema.org/FAQPage
breadcrumbJsonLd(items): object            // schema.org/BreadcrumbList
organizationJsonLd(): object               // schema.org/Organization
```

### 9.3 `lib/validation.ts` — تحقّق بدون مكتبات خارجية

```ts
type Result<T> = { ok: true; data: T } | { ok: false; errors: Record<string,string> };

validateContact(form: FormData): Result<ContactInput>
validateSubscribe(form: FormData): Result<{ email: string }>
validateEnroll(form: FormData): Result<EnrollInput>

isEmail(v: string): boolean
isPhone(v: string): boolean       // يقبل الصيغ المصرية والدولية
isArabicOrEnglishName(v: string): boolean
```

### 9.4 `lib/payments/` — الجزء اللي بيخلّي الدفع سهل بعدين

**الفكرة:** بنعرّف واجهة واحدة، وكل بوابة دفع بتطبّقها. الموقع بيتكلّم مع الواجهة
بس، فلو غيّرنا البوابة مش هنلمس أي كود تاني.

```ts
// types.ts
export interface CheckoutInput {
  courseSlug: string;
  amount: number;
  currency: string;
  customer: { name: string; email: string; phone: string };
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  ok: boolean;
  /** الرابط اللي بنحوّل المستخدم ليه */
  redirectUrl?: string;
  /** معرّف العملية عندنا */
  reference: string;
  error?: string;
}

export interface PaymentProvider {
  readonly id: "mock" | "stripe" | "paymob";
  readonly enabled: boolean;
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
  verifyWebhook(rawBody: string, signature: string): Promise<boolean>;
  parseEvent(rawBody: string): Promise<PaymentEvent>;
}

// index.ts
export function getPaymentProvider(): PaymentProvider
  // يرجّع stripe لو المفتاح موجود، وإلا paymob، وإلا mock
```

**بوابة `mock`:** بتشتغل من غير أي مفاتيح، وبترجّع رابط لـ`/thank-you?demo=1`.
كده الموقع شغّال 100% من اليوم الأول، ولما تجيب مفاتيح Stripe بتحطها في `.env`
والدفع الحقيقي بيشتغل لوحده.

### 9.5 `lib/analytics.ts`

```ts
track(event: AnalyticsEvent, props?: Record<string, string|number>): void
  // بيبعت لـGA4 أو Plausible لو متظبطين، وإلا بيسجّل في الـconsole في بيئة التطوير

type AnalyticsEvent =
  | "view_course" | "click_enroll" | "start_quiz" | "finish_quiz"
  | "submit_contact" | "subscribe_newsletter" | "click_whatsapp"
  | "open_command_palette" | "begin_checkout" | "purchase";
```

---

## 10. الـAPI Routes

| المسار | الطريقة | المدخل | المخرج | الحالة الافتراضية |
|--------|---------|--------|--------|--------------------|
| `/api/contact` | POST | `{name,email,phone,subject,message}` | `{ok, message}` | بيتحقّق ويسجّل. بيبعت إيميل لو `RESEND_API_KEY` موجود |
| `/api/subscribe` | POST | `{email, name?}` | `{ok, message}` | بيتحقّق ويسجّل. بيضيف لـMailchimp لو المفتاح موجود |
| `/api/enroll` | POST | `{courseSlug, name, email, phone, note?}` | `{ok, reference}` | تسجيل اهتمام (بدون دفع) |
| `/api/checkout` | POST | `CheckoutInput` | `CheckoutResult` | بينادي `getPaymentProvider()` |
| `/api/webhooks/payment` | POST | raw body | `200 OK` | بيتحقّق من التوقيع ويسجّل الحدث |

**قواعد إجبارية لكل route:**
1. يتحقّق من المدخلات بـ`lib/validation.ts` — **ما نثقش في أي بيانات جاية من برّه**.
2. يمرّ على `lib/rate-limit.ts` (5 طلبات / دقيقة / IP).
3. يرجّع رسالة خطأ **بالعربي ومفهومة**، من غير ما يكشف تفاصيل تقنية.
4. ما يرجّعش تفاصيل الأخطاء الداخلية للمستخدم — يسجّلها في السيرفر بس.
5. يشتغل من غير أي متغيّر بيئة — لو المفتاح ناقص، يتصرّف بلطف ويقول للمستخدم
   يتواصل على واتساب.

---

## 11. قائمة الفيتشرز الكاملة

### أ) الواجهة والتصميم (25)
1. وضع ليلي/نهاري/تلقائي مع حفظ الاختيار
2. خلفية Aurora متدرّجة متحرّكة
3. طبقة ضوضاء (noise) خفيفة للفخامة
4. شبكة/نقط خلفية متلاشية
5. إطارات متدرّجة رفيعة (gradient border)
6. زجاج ضبابي (glassmorphism) في الهيدر والكروت
7. كروت بإضاءة تتبع الماوس (spotlight)
8. كروت بميلان 3D خفيف (tilt)
9. أزرار مغناطيسية
10. نصوص متدرّجة الألوان
11. ظهور تدريجي عند التمرير (reveal)
12. ظهور متتابع للمجموعات (stagger)
13. عدّادات رقمية متحرّكة
14. شريط متحرّك لا نهائي للأدوات
15. شريط تقدّم التمرير أعلى الصفحة
16. شريط تقدّم القراءة في المقالات
17. تمرير ناعم (smooth scroll)
18. حالات hover/focus/active متقنة لكل عنصر
19. هياكل تحميل (skeletons)
20. صفحة 404 مصمّمة
21. صفحة خطأ مصمّمة
22. أيقونات متّسقة من مجموعة واحدة
23. تايبوجرافي عربي احترافي (خطّين متكاملين)
24. تجاوب كامل من 320px لـ2560px
25. احترام `prefers-reduced-motion` و`prefers-color-scheme`

### ب) التنقّل والبحث (10)
26. هيدر ثابت بيتغيّر شكله عند التمرير
27. قائمة كبيرة (mega menu) للكورسات
28. درج جانبي للموبايل
29. لوحة أوامر شاملة بـ`Ctrl+K`
30. بحث فوري في الكورسات والمقالات والصفحات
31. مسار تنقّل (breadcrumbs)
32. زر العودة لأعلى
33. شريط CTA سفلي في الموبايل
34. روابط تنقّل بين المقالات (السابق/التالي)
35. فهرس جانبي للمقالات الطويلة

### ج) الكورسات (22)
36. تلات مستويات معرّفة بوضوح
37. صفحة مستقلة لكل مستوى
38. صفحة تفصيلية لكل كورس
39. منهج بوحدات ودروس قابل للطي
40. حساب تلقائي لإجمالي الساعات والدروس
41. مخرجات التعلّم لكل كورس
42. متطلبات ما قبل الكورس
43. "الكورس ده لمين؟"
44. الأدوات اللي هتتعلمها بالأسماء
45. اللي هتاخده معاك (deliverables)
46. صندوق سعر لاصق (sticky) في صفحة الكورس
47. سعر قبل/بعد الخصم
48. شارة حالة (متاح / أماكن محدودة / قريبًا)
49. تاريخ أقرب مجموعة
50. تقييم بالنجوم وعدد المتدربين
51. فلترة الكورسات بالمستوى
52. ترتيب بالسعر/المدة/الشهرة
53. بحث نصّي في الكورسات
54. جدول مقارنة المستويات التلاتة
55. كورسات مقترحة في آخر كل صفحة كورس
56. أسئلة شائعة خاصة بكل كورس
57. شهادة إتمام معلن عنها

### د) التحويل والتسويق (18)
58. هيرو بوعد واضح وزرّين
59. شريط ثقة بالأرقام
60. آراء المتدربين
61. مشاريع حقيقية كدليل
62. باقات أسعار مع مبدّل (فردي/مجموعة)
63. جدول مقارنة الباقات
64. ضمان استرداد معلن
65. نشرة بريدية
66. هدية مجانية (دليل PDF) مقابل الإيميل
67. نافذة نية الخروج (exit intent)
68. زر واتساب عائم برسالة جاهزة
69. CTA في كل سكشن
70. اختبار تحديد المستوى مع توصية
71. صفحة شكر بخطوات واضحة
72. عدّاد أماكن متبقية (نفسي)
73. شارات "الأكثر طلبًا" على الباقة الموصى بها
74. حجز استشارة مجانية 15 دقيقة
75. مشاركة على السوشيال

### هـ) المحتوى (12)
76. مدوّنة بمقالات كاملة
77. تصنيف المقالات بالوسوم
78. مقالات ذات صلة
79. وقت القراءة المحسوب
80. معرض مشاريع بتفاصيل
81. فلترة المشاريع بالتصنيف
82. صفحة "عني" بقصة ومسيرة
83. خط زمني للمسيرة المهنية
84. فلسفة الشرح (المنهج)
85. خريطة تعلّم بصرية
86. أسئلة شائعة مصنّفة وقابلة للبحث
87. صفحات قانونية (شروط/خصوصية/استرداد)

### و) SEO والأداء (14)
88. Metadata كاملة لكل صفحة
89. OpenGraph + Twitter Cards
90. صور مشاركة مولّدة ديناميكيًا
91. بيانات منظّمة (JSON-LD) لـ6 أنواع
92. `sitemap.xml` تلقائي
93. `robots.txt`
94. روابط canonical
95. توليد ثابت (SSG) لكل الصفحات
96. تحسين الخطوط (font-display: swap + preconnect)
97. تحسين الصور (AVIF/WebP)
98. هيدرز أمان
99. PWA manifest
100. تقسيم الكود تلقائيًا
101. Server Components افتراضيًا

### ز) الجاهزية التقنية للمستقبل (12)
102. طبقة دفع مجرّدة (3 بوابات)
103. Webhook للدفع جاهز
104. طبقة استعلامات معزولة (تتبدّل بقاعدة بيانات)
105. طبقة تحليلات مجرّدة
106. تحقّق من المدخلات في كل API
107. حماية من الطلبات المتكرّرة
108. متغيّرات بيئة موثّقة بالكامل
109. أنواع TypeScript صارمة
110. تعليقات عربية في كل ملف مهم
111. توثيق كامل في `docs/`
112. بنية تسمح بإضافة تسجيل الدخول
113. بنية تسمح بإضافة منصة تعلّم (LMS)

### ح) الوصولية (7)
114. تنقّل كامل بالكيبورد
115. `aria-label` على كل زر أيقوني
116. حلقات تركيز (focus rings) واضحة
117. تباين ألوان AA+
118. رابط "تخطّي للمحتوى"
119. `alt` وصفية
120. احترام تقليل الحركة

---

## 12. خطة التنفيذ بالخطوات

> **الترتيب ده إجباري.** كل مرحلة بتبني على اللي قبلها. أي Agent بيكمّل الشغل
> لازم يشوف آخر مرحلة خلصت ويكمّل من اللي بعدها.

### المرحلة 0 — الأساس ✅ (خلصت)
- [x] إنشاء الفرع `claude/exciting-archimedes-f1blxw`
- [x] `package.json` + تثبيت الحزم
- [x] `tsconfig.json` / `postcss.config.mjs` / `next.config.ts`
- [x] `.gitignore` / `.env.example`
- [x] `src/app/globals.css` — نظام التصميم كامل

### المرحلة 1 — التخطيط ✅ (خلصت)
- [x] `docs/PLAN.md`
- [x] `docs/DESIGN.md`
- [x] `docs/CONTENT.md`
- [x] `docs/ROADMAP.md`
- [x] `CLAUDE.md` + `README.md`
- [x] `docs/SOURCE-MATERIAL.md` — المادة المصدرية الحقيقية

### المرحلة 2 ✅ — الأنواع والمحتوى
- [x] `src/types/index.ts` — كل الأنواع
- [x] `src/content/site.ts` + `navigation.ts`
- [x] `src/content/levels.ts` — المستويات التلاتة
- [x] `src/content/courses.ts` — **٩ كورسات** مبنية من المادة الحقيقية
- [x] باقي ملفات المحتوى
- [x] `src/lib/queries.ts` — دوال الجلب
- **معيار القبول:** `npm run typecheck` يعدّي بدون أخطاء

### المرحلة 3 ✅ — الأدوات الأساسية
- [x] `src/lib/utils.ts`
- [x] `src/lib/seo.ts`
- [x] `src/hooks/*`
- [x] `src/components/ui/*` (كل اللبنات)
- [x] `src/components/motion/*`
- **معيار القبول:** كل مكوّن يشتغل لوحده، و`typecheck` نضيف

### المرحلة 4 ✅ — الهيكل العام
- [x] `src/app/layout.tsx` — RTL + خطوط + ثيم
- [x] `components/layout/navbar.tsx` + `mobile-nav.tsx`
- [x] `components/layout/footer.tsx`
- [x] `theme-toggle` / `scroll-progress` / `back-to-top` / `whatsapp-fab`
- **معيار القبول:** `npm run build` ينجح، والهيدر والفوتر ظاهرين

### المرحلة 5 ✅ — الصفحة الرئيسية
- [x] الـ15 سكشن بالترتيب المذكور في §7.2
- **معيار القبول:** الصفحة كاملة، متجاوبة، والحركات شغّالة

### المرحلة 6 ✅ — الصفحات الداخلية
- [x] `/courses` + `/courses/[slug]`
- [x] `/levels/[level]`
- [x] `/about` / `/pricing` / `/roadmap`
- [x] `/projects` + `/projects/[slug]`
- [x] `/articles` + `/articles/[slug]`
- [x] `/faq` / `/contact` / `/quiz`
- [x] `/enroll/[slug]` / `/thank-you`
- [x] الصفحات القانونية
- **معيار القبول:** كل رابط في الموقع شغّال، مفيش 404

### المرحلة 7 ✅ — التفاعل المتقدّم
- [x] `CommandPalette` (⌘K)
- [x] `ExitIntentModal`
- [x] الفورمات + الـAPI routes
- [x] طبقة الدفع (mock شغّالة)
- **معيار القبول:** كل فورم بيتحقّق وبيرد برسالة عربية

### المرحلة 8 ✅ — SEO والتلميع
- [x] `sitemap.ts` / `robots.ts` / `manifest.ts`
- [x] `opengraph-image.tsx`
- [x] JSON-LD في كل صفحة مناسبة
- [x] مراجعة الوصولية
- [x] مراجعة التجاوب على 320 / 768 / 1024 / 1440 / 1920
- **معيار القبول:** `npm run build` نضيف + مراجعة بصرية

### المرحلة 9 ✅ — التسليم ✅
- [x] تحديث `README.md` بخطوات النشر
- [x] commit + push على الفرع
- [x] تقرير للمستخدم بالعربي

---

## 13. معايير القبول (Definition of Done)

الشغل ما يتحسبش خلص غير لما **كل** النقط دي تتحقّق:

| # | المعيار | إزاي نتأكّد |
|---|---------|--------------|
| 1 | البناء بينجح | `npm run build` → بدون أخطاء |
| 2 | الأنواع سليمة | `npm run typecheck` → بدون أخطاء |
| 3 | كل الروابط شغّالة | مراجعة يدوية لكل رابط في `navigation.ts` |
| 4 | مفيش نص إنجليزي ظاهر للمستخدم | بحث في المكوّنات |
| 5 | مفيش نص مكتوب جوّه مكوّن | كل النصوص من `content/` |
| 6 | RTL سليم | مفيش `ml-`/`mr-`/`left-`/`right-` في الكود |
| 7 | الوضع الليلي والنهاري سليمين | مراجعة بصرية للاتنين |
| 8 | متجاوب | 320px / 768px / 1440px |
| 9 | الحركات بتحترم تقليل الحركة | مراجعة الكود |
| 10 | كل زر أيقوني له `aria-label` | بحث في الكود |
| 11 | الموقع شغّال من غير أي `.env` | حذف `.env` وتجربة |
| 12 | التوثيق محدّث | `docs/` تعكس الكود الفعلي |

---

## 14. المخاطر والحلول البديلة

| الخطر | الاحتمال | الحل البديل |
|-------|----------|--------------|
| الخطوط ما تتحمّلش وقت البناء (شبكة) | متوسط | نستخدم `<link>` لـGoogle Fonts في `layout.tsx` بدل `next/font`، أو نرجع لخطوط النظام عبر `font-family` احتياطي |
| `motion` تعمل مشاكل مع React 19 | منخفض | نستبدل الحركات بـCSS (`animate-fade-up` موجودة أصلًا في `globals.css`) |
| `lucide-react` أيقونة مش موجودة | منخفض | نستخدم دالة `getIcon(name)` ترجّع أيقونة افتراضية لو الاسم غلط |
| Tailwind v4 سلوك مختلف عن v3 | متوسط | كل الإعدادات في `globals.css` بـ`@theme` — موثّقة في `DESIGN.md` |
| البناء بطيء بسبب عدد الصفحات | منخفض | كلها SSG وصغيرة |
| المحتوى يكبر ويبقى صعب الإدارة | متوسط | الانتقال لـCMS — خطوة واحدة في `queries.ts` (شوف `ROADMAP.md §3`) |

---

## 15. ملاحظة مهمة عن المحتوى الشخصي

**الاسم، الصور، الأرقام، آراء المتدربين، وتفاصيل المشاريع** المكتوبة في
`src/content/` هي **قوالب جاهزة بصياغة احترافية** — مبنية على تخصّص تدريب الذكاء
الاصطناعي بمستوياته التلاتة.

صاحب الموقع لازم يفتح الملفات دي ويحطّ بياناته الحقيقية:

| الملف | اللي لازم يتغيّر |
|-------|-------------------|
| `src/content/site.ts` | الاسم، الإيميل، التليفون، الواتساب، روابط السوشيال، رابط الموقع |
| `src/content/courses.ts` | الأسعار الحقيقية، المدد، تواريخ المجموعات |
| `src/content/testimonials.ts` | آراء حقيقية من متدربين فعليين |
| `src/content/projects.ts` | المشاريع الحقيقية اللي اشتغلت عليها |
| `src/content/stats.ts` | الأرقام الحقيقية |
| `src/content/timeline.ts` | المسيرة المهنية الحقيقية |

كل مكان محتاج تعديل متعلّم عليه بتعليق `// 👈 غيّر ده` في الكود.
