# خطة التطوير المستقبلي — Roadmap

> **الملف ده بيجاوب على سؤال واحد:** "بعد ما الموقع ينزل، أكبّره إزاي؟"
>
> كل مرحلة هنا مكتوبة بحيث أي مطوّر (أو Agent) ياخدها وينفّذها لوحده، من غير ما
> يحتاج يفهم المشروع كله. كل مرحلة فيها: **ليه** · **إيه اللي يتعمل** · **فين
> بالظبط في الكود** · **الجهد المتوقّع** · **إزاي نتأكّد إنها نجحت**.

**آخر تحديث:** 2026-09-18

---

## نظرة عامة على المراحل

| المرحلة | الاسم | الجهد | الأولوية | بتعتمد على |
|---------|-------|-------|-----------|-------------|
| **0** | الإطلاق الأول (الموقع الحالي) | — | ✅ | — |
| **1** | النشر والقياس | يوم | 🔴 عالية | 0 |
| **2** | تفعيل الدفع الإلكتروني | ٣-٥ أيام | 🔴 عالية | 1 |
| **3** | قاعدة بيانات ولوحة تحكّم | ٥-٧ أيام | 🟠 متوسطة | 2 |
| **4** | تسجيل الدخول وحساب المتدرّب | ٤-٦ أيام | 🟠 متوسطة | 3 |
| **5** | منصّة التعلّم (LMS) | ٢-٣ أسابيع | 🟡 لاحقة | 4 |
| **6** | مساعد ذكي داخل الموقع | ٣-٥ أيام | 🟡 لاحقة | 3 |
| **7** | تعدّد اللغات (عربي/إنجليزي) | ٣-٤ أيام | 🟢 اختيارية | 1 |
| **8** | تطبيق موبايل (PWA ثم Native) | أسبوع+ | 🟢 اختيارية | 5 |

**الترتيب المنطقي:** ١ → ٢ → ٣ → ٤ → ٥، والباقي بالتوازي حسب الحاجة.

---

## المرحلة 1 — النشر والقياس

### ليه؟
الموقع من غير نشر = ملف على جهازك. ومن غير قياس = بتشتغل وإنت مغمّض.

### اللي يتعمل

#### 1.1 النشر على Vercel (الأسهل والأنسب لـNext.js)
```bash
# مرة واحدة
npm i -g vercel
vercel login
vercel --prod
```
أو من الواجهة: اربط الريبو على vercel.com → Import → Deploy.

**متغيّرات البيئة المطلوبة عند النشر:**
```
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

#### 1.2 ربط الدومين
في Vercel → Settings → Domains → أضف الدومين → غيّر الـDNS عند مزوّد الدومين.

#### 1.3 تفعيل التحليلات
**الخيار الأسهل:** Vercel Analytics (زر واحد في اللوحة).
**البديل الأفضل للخصوصية:** Plausible.

**الملف:** `src/lib/analytics.ts` — الدالة `track()` جاهزة، محتاجة بس:
```ts
// في .env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
// أو
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
والسكربت يتضاف في `src/app/layout.tsx` تحت `<body>`.

#### 1.4 تسجيل الموقع في Google
1. Google Search Console → أضف الموقع → تحقّق بملف HTML أو DNS
2. ارفع `sitemap.xml` (موجود تلقائيًا على `/sitemap.xml`)

### معيار النجاح
- [ ] الموقع مفتوح على دومين حقيقي بـHTTPS
- [ ] Lighthouse ≥ 90 في الأربع خانات
- [ ] الزيارات بتظهر في لوحة التحليلات
- [ ] الموقع بيظهر في نتائج بحث Google خلال أسبوع

---

## المرحلة 2 — تفعيل الدفع الإلكتروني

### ليه؟
دلوقتي الحجز بيتم بالواتساب. كل خطوة يدوية = عملاء بيضيعوا.

### الوضع الحالي (مهم تفهمه)
المشروع **متبني أصلًا** بحيث الدفع يتفعّل بأقل شغل ممكن:

```
src/lib/payments/
├── types.ts      ← الواجهة الموحّدة (PaymentProvider)
├── index.ts      ← بيختار البوابة تلقائيًا حسب المفاتيح الموجودة
├── mock.ts       ← بوابة وهمية شغّالة دلوقتي (بدون مفاتيح)
├── stripe.ts     ← جاهزة، محتاجة المفاتيح بس
└── paymob.ts     ← جاهزة، محتاجة المفاتيح بس
```

**دالة الاختيار:**
```ts
export function getPaymentProvider(): PaymentProvider {
  if (process.env.STRIPE_SECRET_KEY) return stripeProvider;
  if (process.env.PAYMOB_API_KEY) return paymobProvider;
  return mockProvider;
}
```
يعني: **تحطّ المفتاح في `.env` → الدفع الحقيقي بيشتغل لوحده.**

### اللي يتعمل

#### 2.1 اختيار البوابة

| البوابة | الأنسب لـ | العمولة التقريبية | ملاحظات |
|---------|-----------|--------------------|----------|
| **Paymob** | السوق المصري | ٢٫٧٥% + ٣ ج.م | بيدعم فودافون كاش، فيزا، أقساط |
| **Fawry** | السوق المصري | متغيّرة | دفع في المنافذ |
| **Stripe** | عملاء دوليين | ٢٫٩% + ٠٫٣٠$ | مش متاح للتسجيل من مصر مباشرة |
| **Paddle** | بديل دولي | ٥% | Merchant of Record — بيتولّى الضرايب |

**التوصية:** Paymob للمحلي + Paddle للدولي.

#### 2.2 خطوات التفعيل (Paymob مثالًا)
1. سجّل حساب تاجر على paymob.com واستنى الموافقة
2. من اللوحة: خُد `API Key` و`Integration ID` و`HMAC Secret`
3. حطّهم في متغيّرات البيئة على Vercel
4. افتح `src/lib/payments/paymob.ts` وكمّل الدوال التلاتة:
   - `createCheckout()` — بتنادي 3 endpoints بالترتيب:
     `auth_token` → `ecommerce/orders` → `acceptance/payment_keys`
   - `verifyWebhook()` — تتحقّق من HMAC
   - `parseEvent()` — تقرأ نتيجة العملية
5. في `src/content/site.ts` غيّر `features.payments` لـ`true`
6. جرّب على بيئة الاختبار (Test Mode) بكارت تجريبي

#### 2.3 اللي لازم يتعمل بعد الدفع الناجح
في `src/app/api/webhooks/payment/route.ts`:
```ts
// الخطوات المطلوبة عند نجاح الدفع:
// 1. تحقّق من التوقيع (موجود)
// 2. سجّل العملية في قاعدة البيانات   ← محتاج المرحلة 3
// 3. ابعت إيميل تأكيد للمتدرّب
// 4. ابعت إشعار لصاحب الموقع
// 5. ضيف المتدرّب لمجموعة الواتساب/تيليجرام
```

### تحذيرات أمان إجبارية
- ❌ **ممنوع** تحطّ أي مفتاح سرّي في ملف داخل الريبو
- ❌ **ممنوع** تحسب السعر من البيانات الجاية من المتصفّح — احسبه من
  `src/content/courses.ts` على السيرفر
- ✅ **إجباري** التحقّق من توقيع الـWebhook قبل أي إجراء
- ✅ **إجباري** تسجيل كل عملية دفع بمعرّف فريد لمنع التكرار

### معيار النجاح
- [ ] عملية دفع تجريبية كاملة نجحت
- [ ] الـWebhook وصل واتحقّق توقيعه
- [ ] إيميل التأكيد وصل
- [ ] الفلوس ظهرت في لوحة التاجر

---

## المرحلة 3 — قاعدة بيانات ولوحة تحكّم

### ليه؟
دلوقتي المحتوى في ملفات TypeScript. يعني أي تعديل = تعديل كود + إعادة نشر.
مع قاعدة بيانات: تعدّل من لوحة تحكّم في المتصفّح.

### التوصية التقنية
**Supabase** (PostgreSQL مُدار + مصادقة + تخزين ملفات + API جاهز).
السبب: بيجيب ٤ حاجات في واحدة، وطبقة مجانية سخية، ومتوافق تمامًا مع Next.js.

### الجداول المطلوبة

```sql
-- الكورسات
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  level text not null check (level in ('beginner','intermediate','advanced')),
  data jsonb not null,           -- باقي الحقول كـJSON (مرونة)
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- المتدربين
create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz default now()
);

-- التسجيلات
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  course_id uuid references courses(id) on delete restrict,
  status text not null default 'pending',  -- pending|paid|cancelled|refunded
  amount numeric(10,2),
  currency text default 'EGP',
  payment_reference text unique,
  created_at timestamptz default now()
);

-- رسائل التواصل
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text, email text, phone text, subject text, body text,
  handled boolean default false,
  created_at timestamptz default now()
);

-- المشتركين في النشرة
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  confirmed boolean default false,
  created_at timestamptz default now()
);
```

### نقطة التبديل الوحيدة في الكود

**دي أهم نقطة في الملف كله.** كل الموقع بيقرأ البيانات من `src/lib/queries.ts`
بس. عشان كده التحويل لقاعدة بيانات = تعديل ملف واحد:

```ts
// قبل (الحالي)
export async function getAllCourses(): Promise<Course[]> {
  return courses;                    // من src/content/courses.ts
}

// بعد (مع Supabase)
export async function getAllCourses(): Promise<Course[]> {
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("level");
  return data?.map(rowToCourse) ?? [];
}
```
**ولا مكوّن واحد في الموقع هيتغيّر.** ده السبب اللي خلّانا نعمل الطبقة دي من الأول.

### لوحة التحكّم
**الخيار الأسرع:** استخدم لوحة Supabase نفسها (Table Editor) — كفاية في البداية.
**الخيار الأفضل:** صفحة `/admin` محمية:
```
src/app/admin/
├── layout.tsx          ← تحقّق من الصلاحية
├── page.tsx            ← لوحة الأرقام
├── courses/page.tsx    ← إدارة الكورسات
├── students/page.tsx   ← المتدربين
├── enrollments/page.tsx← التسجيلات
└── messages/page.tsx   ← الرسائل
```

### معيار النجاح
- [ ] كل الكورسات اتنقلت للقاعدة
- [ ] الموقع شغّال زي ما هو بالظبط
- [ ] تعديل كورس من اللوحة بيظهر في الموقع من غير إعادة نشر

---

## المرحلة 4 — تسجيل الدخول وحساب المتدرّب

### ليه؟
عشان المتدرّب يدخل يشوف كورساته وملفاته وشهادته.

### التقنية
**Supabase Auth** (لو عملت المرحلة 3) — بيدعم:
- إيميل + كلمة سر
- رابط سحري (Magic Link) — **الأنسب**، مفيش كلمات سر تتنسي
- Google / Facebook

### اللي يتعمل
```
src/app/(auth)/
├── login/page.tsx
├── register/page.tsx
└── verify/page.tsx

src/app/(dashboard)/
├── layout.tsx              ← حماية المسار
├── dashboard/page.tsx      ← كورساتي
├── dashboard/[slug]/page.tsx ← محتوى الكورس
├── profile/page.tsx        ← بياناتي
└── certificates/page.tsx   ← شهاداتي
```

**الحماية:** `src/middleware.ts`
```ts
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
```

### أمان إجباري
- فعّل **Row Level Security (RLS)** على كل جدول في Supabase
- المتدرّب يشوف تسجيلاته هو بس:
  ```sql
  create policy "own enrollments" on enrollments
    for select using (auth.uid() = student_id);
  ```

### معيار النجاح
- [ ] تسجيل ودخول وخروج شغّالين
- [ ] `/dashboard` محمي — الزائر غير المسجّل بيتحوّل لصفحة الدخول
- [ ] المتدرّب مش قادر يشوف بيانات متدرّب تاني (اختبر ده بجد)

---

## المرحلة 5 — منصّة التعلّم (LMS)

### ليه؟
بدل ما المحتوى على Drive و Zoom، يبقى كله في مكانك — وده بيزوّد القيمة والسعر.

### المميزات بالترتيب

| # | الميزة | الجهد | ملاحظات |
|---|--------|-------|----------|
| 1 | مشغّل فيديو مع حفظ مكان التوقّف | متوسط | Mux أو Cloudflare Stream |
| 2 | تتبّع التقدّم (نسبة الإنجاز) | سهل | جدول `progress` |
| 3 | ملفات ومرفقات لكل درس | سهل | Supabase Storage |
| 4 | اختبارات قصيرة بعد كل وحدة | متوسط | جدول `quizzes` + `attempts` |
| 5 | تسليم المشاريع والتعليق عليها | متوسط | رفع ملف + مراجعة |
| 6 | شهادة PDF تلقائية | متوسط | توليد PDF + رقم تحقّق |
| 7 | منتدى أسئلة لكل كورس | كبير | أو استخدم Discord/Telegram |
| 8 | إشعارات (إيميل + داخل الموقع) | متوسط | Resend + جدول `notifications` |

### الجداول الإضافية
```sql
create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  module_order int, lesson_order int,
  title text, video_url text, duration_seconds int,
  content jsonb, attachments jsonb
);

create table progress (
  student_id uuid references students(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  completed boolean default false,
  last_position_seconds int default 0,
  updated_at timestamptz default now(),
  primary key (student_id, lesson_id)
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid, course_id uuid,
  serial text unique not null,       -- رقم التحقّق العلني
  issued_at timestamptz default now()
);
```

### صفحة التحقّق من الشهادة
`/verify/[serial]` — أي حد يدخل الرقم يتأكّد إن الشهادة حقيقية.
**دي بتزوّد مصداقية الشهادة جدًا.**

---

## المرحلة 6 — مساعد ذكي داخل الموقع

### ليه؟
دي أقوى دعاية ممكنة: **موقع مدرّب ذكاء اصطناعي فيه ذكاء اصطناعي شغّال.**

### الفكرة
روبوت محادثة في الركن، بيعرف كل حاجة عن الكورسات، وبيجاوب على أسئلة الزوّار،
وبيرشّح المستوى المناسب.

### التنفيذ (RAG مبسّط)
```
src/app/api/assistant/route.ts

1. جهّز المعرفة:  كل محتوى src/content/ يتحوّل لنص منظّم
2. عند كل سؤال:   ابعت السؤال + المعرفة للنموذج (Claude API)
3. ارجّع الإجابة بالبثّ (streaming) للمستخدم
4. لو السؤال خارج نطاق الكورسات → وجّهه للواتساب
```

**المكتبات:** `@anthropic-ai/sdk` + `ai` (Vercel AI SDK) للبثّ.

### حدود إجبارية (مهمة جدًا)
```
النموذج ممنوع عليه:
❌ يخترع سعر أو تاريخ مش موجود في البيانات
❌ يوعد بأي حاجة نيابة عن صاحب الموقع
❌ يجاوب على أسئلة خارج الكورسات
✅ لو مش عارف → "دي محتاجة {الاسم} شخصيًا، كلّمه هنا 👈"
```

### حماية التكلفة
- حدّ أقصى ١٠ رسائل للزائر الواحد في الساعة
- حدّ أقصى لطول الرسالة ٥٠٠ حرف
- استخدم نموذج سريع ورخيص للأسئلة البسيطة

---

## المرحلة 7 — تعدّد اللغات

### الوضع الحالي
الموقع عربي بالكامل، والبنية جاهزة للإضافة.

### الخطوات
1. `npm i next-intl`
2. انقل كل نصوص `src/content/` لـ`messages/ar.json` و`messages/en.json`
3. غيّر المسارات لـ`src/app/[locale]/...`
4. في `layout.tsx`: `dir={locale === "ar" ? "rtl" : "ltr"}`
5. ضيف مبدّل اللغة في الهيدر

### ملاحظة تصميمية مهمة
كل الكود مكتوب بـ`ms-*`/`me-*`/`start-*`/`end-*` (شوف `DESIGN.md §10`)، يعني
التصميم هيتقلب لـLTR **تلقائيًا** من غير أي تعديل. ده مقصود من الأول.

---

## المرحلة 8 — تطبيق موبايل

### الخطوة الأولى: PWA (سهلة وسريعة)
`src/app/manifest.ts` موجود أصلًا. المتبقّي:
1. `npm i next-pwa` أو Service Worker يدوي
2. أيقونات 192px و512px في `public/`
3. اختبر "أضف للشاشة الرئيسية"

**النتيجة:** الموقع بينزل على الموبايل كتطبيق، وبيشتغل أوفلاين جزئيًا.

### الخطوة التانية: تطبيق أصلي (لو احتجت)
**التوصية:** Expo (React Native) — يعيد استخدام نفس الـAPIs ونفس منطق البيانات.
**بس ما تعملهاش غير لو:** عندك ٥٠٠+ متدرّب نشط، أو محتاج إشعارات فورية قوية،
أو محتاج تحميل الفيديوهات للمشاهدة بدون إنترنت.

---

## أفكار إضافية (حسب الحاجة)

| الفكرة | القيمة | الجهد |
|--------|--------|-------|
| نظام إحالة (كل متدرّب يجيب متدرّب بخصم) | 🔥 عالية | متوسط |
| كوبونات خصم | 🔥 عالية | سهل |
| قائمة انتظار للكورسات المكتملة | عالية | سهل |
| تقويم المجموعات القادمة | عالية | متوسط |
| حجز استشارة مع تقويم (Cal.com) | عالية | سهل |
| نسخة PDF من كل مقال | متوسطة | سهل |
| بودكاست / حلقات صوتية | متوسطة | متوسط |
| مكتبة أوامر (Prompts) مجانية | 🔥 عالية | متوسط |
| حاسبة تكلفة نماذج AI | متوسطة | متوسط |
| صفحة "سألني أي حاجة" (AMA) | متوسطة | سهل |
| شهادات مع رمز QR للتحقّق | عالية | متوسط |
| تسعير بالعملة حسب بلد الزائر | متوسطة | متوسط |
| اختبار A/B لصفحات الهبوط | متوسطة | متوسط |

---

## قواعد ثابتة لأي تطوير جاي

> اقرأ الخمس قواعد دي قبل أي إضافة. دي اللي بتمنع المشروع يتلخبط مع الوقت.

1. **البيانات تفضل ورا `src/lib/queries.ts`** — أي مصدر بيانات جديد يتضاف هناك،
   مش في المكوّنات.
2. **أي خدمة خارجية تتلفّ في واجهة (interface)** ويكون ليها نسخة `mock` شغّالة
   بدون مفاتيح — زي ما عملنا في `lib/payments/`.
3. **النصوص في `src/content/` بس** — ولا نص واحد جوّه مكوّن.
4. **RTL أولًا** — `ms-`/`me-`/`start-`/`end-` دايمًا. راجع `DESIGN.md §10`.
5. **حدّث التوثيق مع الكود** — أي فيتشر جديد يتضاف لـ`PLAN.md §11`، وأي قرار
   بصري لـ`DESIGN.md`. **التوثيق القديم أخطر من عدم وجود توثيق.**

---

## جدول أولويات مقترح (أول ٩٠ يوم بعد الإطلاق)

| الأسبوع | الشغل |
|---------|-------|
| ١ | النشر + الدومين + التحليلات + Search Console |
| ٢ | استبدال كل المحتوى المبدئي بمحتوى حقيقي (أرقام، آراء، مشاريع) |
| ٣-٤ | تفعيل الدفع (Paymob) + اختبار كامل |
| ٥-٦ | قاعدة بيانات + نقل المحتوى + لوحة بسيطة |
| ٧-٨ | تسجيل الدخول + حساب المتدرّب |
| ٩-١٠ | كتابة ٦ مقالات حقيقية للـSEO |
| ١١-١٢ | المساعد الذكي في الموقع (أقوى ميزة تسويقية) |
