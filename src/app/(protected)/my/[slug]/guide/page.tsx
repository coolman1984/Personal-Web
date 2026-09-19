import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, BookOpenCheck, CheckCircle2, FileSpreadsheet, ShieldCheck,
  Sparkles, TriangleAlert, Wand2, Workflow, Target, Bug, Gauge, Code2
} from "lucide-react";
import { hasAccess } from "@/lib/access";
import { Button } from "@/components/ui/button";

const files = [
  ["01_Sales_Transactions.xlsx", "ملف الحركة الأساسي", "كل أوامر البيع: رقم الطلب، التاريخ، العميل، المنتج، الكمية، السعر، مندوب البيع، والقناة."],
  ["02_Product_Master.xlsx", "دليل المنتجات", "اسم المنتج، التصنيف، العلامة، التكلفة القياسية، سعر القائمة، والحالة."],
  ["03_Customer_Master.xlsx", "دليل العملاء", "اسم العميل، الشريحة، المنطقة، أيام الائتمان، والحالة."],
  ["04_Adjustments.xlsx", "التعديلات", "الخصومات، المرتجعات، تكلفة الشحن، وسبب التعديل لكل طلب."],
  ["05_Monthly_Report_STUDENT.xlsx", "ملف شغلك", "ده الملف اللي هتبني فيه الحل خطوة بخطوة. ما تبدأش من نسخة المدرب."],
];

const stages = [
  ["١", "افهم العملية قبل الكود", "اكتب العملية اليدوية كما تحدث فعلًا: من أين تأتي الملفات؟ ما الذي تربطه؟ ما الحسابات؟ وما شكل التقرير النهائي؟"],
  ["٢", "اربط البيانات يدويًا مرة واحدة", "استخدم البحث بين الجداول والحسابات بنفسك. الهدف إنك تفهم المنطق قبل ما تطلب من الذكاء الاصطناعي يأتمته."],
  ["٣", "اكتشف مشاكل البيانات", "لا تصلّح كل شيء بصمت. كوّن قائمة بالمشكلات التي يجب على الأتمتة اكتشافها والإبلاغ عنها."],
  ["٤", "سجّل أول ماكرو", "سجّل مهمة صغيرة ومحددة. شوف الكود الذي أنشأه إكسل وافهم العلاقة بين خطواتك والكود."],
  ["٥", "خلّي الذكاء الاصطناعي يبني الوحدات", "ابنِ الاستيراد، التنظيف، الربط، الحساب، الفحص، والتقرير كوحدات صغيرة بدل كود ضخم مرة واحدة."],
  ["٦", "اجمع كل شيء في زر واحد", "الزر يشغّل السلسلة كاملة ويترك لك تقريرًا وسجل تشغيل وقائمة مشكلات، من غير لمس الملفات الأصلية."],
  ["٧", "اختبر ضد أرقام مرجعية", "لا تعتمد على إن الملف شكله صح. قارن أعداد الصفوف والمجاميع والأخطاء المتوقعة."],
  ["٨", "قِس الوقت الموفّر", "قارن زمن العملية اليدوية بزمن التشغيل الآلي. ده هو العائد الحقيقي من الأتمتة."],
];

const prompts = [
  {
    title: "١. برومبت فهم العملية",
    why: "استخدمه قبل أي كود. الهدف إن النموذج يفهم شغلك ويسألك عن الناقص.",
    text: `عندي عملية شهرية يدوية لإعداد تقرير مبيعات وربحية.
أستلم أربعة ملفات منفصلة: المبيعات، المنتجات، العملاء، والتعديلات التي تشمل الخصومات والمرتجعات والشحن.

قبل أن تكتب أي كود:
1. فكّك العملية إلى خطوات واضحة من استلام الملفات حتى التقرير النهائي.
2. حدّد المدخلات والمخرجات وقواعد العمل.
3. حدّد المفاتيح التي ستربط الملفات ببعضها.
4. اقترح فحوصات جودة البيانات والحالات الاستثنائية.
5. اسألني عن أي معلومة ناقصة تحتاجها.

مهم: لا تكتب كود الآن. أريد تصميم العملية أولًا.`,
  },
  {
    title: "٢. برومبت خريطة الربط",
    why: "بعد ما يفهم العملية، خليه يحدد من أين يأتي كل عمود في التقرير.",
    text: `هذه هي الملفات وأعمدتها:
[الصق أسماء الأعمدة من الملفات الأربعة]

أريد جدول خريطة بيانات يوضح:
- كل عمود مطلوب في التقرير النهائي.
- الملف المصدر.
- العمود المصدر.
- مفتاح الربط.
- هل القيمة منقولة أم محسوبة؟
- المعادلة أو قاعدة الحساب إن وجدت.
- ماذا يحدث إذا لم نجد المفتاح؟

لا تكتب VBA حتى الآن.`,
  },
  {
    title: "٣. برومبت تصميم الأتمتة",
    why: "هنا نتحول من فهم الشغل إلى تصميم النظام، ولسه قبل الكود.",
    text: `صمّم لي أتمتة Excel VBA للعملية السابقة.

الشروط:
- الملفات الأصلية للقراءة فقط ولا يتم تعديلها.
- استيراد كل مصدر إلى ورقة Raw مستقلة.
- تنظيف المفاتيح قبل الربط بإزالة المسافات وتوحيد حالة الحروف.
- عدم حذف الصفوف التي بها مشكلة.
- تسجيل المشكلات في ورقة Issues مع سبب واضح.
- إنشاء Run Log يحتوي وقت التشغيل وعدد الصفوف وعدد المشكلات والنتيجة.
- تقسيم الحل إلى إجراءات صغيرة واضحة.
- إذا فشل جزء، يتوقف بأمان ويعرض رسالة مفهومة.

قبل كتابة الكود، أعطني أسماء الوحدات وترتيب التشغيل ومسؤولية كل وحدة.`,
  },
  {
    title: "٤. برومبت أول وحدة VBA",
    why: "ابدأ صغير. أول نجاح لازم يكون مفهوم وقابل للاختبار.",
    text: `اكتب الآن أول وحدة VBA فقط.

المطلوب:
- اختيار ملف Sales_Transactions من خلال نافذة اختيار ملف.
- فتحه للقراءة فقط.
- نسخ البيانات إلى ورقة Raw_Sales داخل ملف التقرير.
- إذا كانت Raw_Sales موجودة، امسح بيانات التشغيل السابق فقط.
- لا تعدّل ملف المصدر.
- أغلق المصدر بعد النسخ.
- أضف معالجة أخطاء ورسالة نجاح واضحة.
- اشرح لي الكود جزءًا جزءًا بلغة بسيطة.

لا تضف المنتجات أو العملاء أو أي جزء آخر الآن.`,
  },
  {
    title: "٥. برومبت الربط والحساب",
    why: "بعد نجاح الاستيراد، نضيف منطق العمل نفسه.",
    text: `أضف وحدة تبني جدول Processed من Raw_Sales.

لكل صف:
- ابحث عن المنتج باستخدام Product ID.
- ابحث عن العميل باستخدام Customer ID.
- ابحث عن التعديلات باستخدام Order ID.
- احسب Gross Sales = Qty × Unit Price.
- احسب Discount Value.
- احسب Return Value.
- احسب Net Sales.
- احسب COGS من الكمية الصافية × Standard Cost.
- احسب Profit = Net Sales - COGS - Shipping Cost.
- احسب Margin = Profit / Net Sales مع حماية القسمة على صفر.

أي مفتاح غير موجود أو قيمة غير منطقية يجب تسجيلها في Issues، وليس إخفاءها أو اختراع قيمة بديلة.`,
  },
  {
    title: "٦. برومبت الجودة والفشل الآمن",
    why: "ده الفرق بين ماكرو لطيف وأداة تقدر تعتمد عليها.",
    text: `راجع الأتمتة كمهندس جودة.

أضف فحوصات تكشف على الأقل:
- Order ID مكرر.
- Product ID غير موجود.
- Customer ID غير موجود.
- مفاتيح فيها مسافات زائدة.
- اختلاف الحروف الكبيرة والصغيرة في الأكواد.
- Unit Price فارغ.
- Qty يساوي صفر أو أقل.
- Return Qty أكبر من Qty المباعة.
- Shipping Cost سالب.
- Discount % غير منطقي.
- مفاتيح مكررة داخل ملفات الـMaster.

لكل مشكلة: سجّل رقم الطلب، نوع المشكلة، القيمة، ومصدرها في Issues.
لا تصلّح مشكلة تجارية بصمت إلا لو كانت قاعدة التنظيف متفقًا عليها مسبقًا.`,
  },
  {
    title: "٧. برومبت التجميع النهائي",
    why: "بعد اختبار كل وحدة منفردة، اجمعها تحت زر واحد.",
    text: `أنشئ إجراء رئيسي اسمه RunMonthlyReport يشغّل الوحدات بالترتيب الصحيح:
تهيئة التشغيل → اختيار/استيراد الملفات → تنظيف المفاتيح → فحوصات الجودة → الربط → الحسابات → تحديث التقرير → تحديث Run Log → رسالة النهاية.

المطلوب:
- لا تستخدم Select أو Activate إلا لو كان ضروريًا فعلًا.
- أوقف ScreenUpdating أثناء التشغيل وأعده في النهاية حتى عند الخطأ.
- أعطني رسالة نهاية فيها عدد الصفوف وعدد المشكلات وزمن التشغيل.
- لو فشل جزء، لا تترك Excel في حالة غير مستقرة.
- لا تغيّر أي ملف مصدر.`,
  },
  {
    title: "٨. برومبت الاختبار قبل الاعتماد",
    why: "آخر خطوة مش تحسين الشكل. آخر خطوة إثبات إن الناتج صحيح.",
    text: `اكتب لي خطة اختبار للأتمتة قبل استخدامها على ملف عمل حقيقي.

أريد حالات اختبار تشمل:
- تشغيل طبيعي.
- ملف مفقود.
- ورقة باسم مختلف.
- بيانات فارغة.
- منتج غير موجود.
- عميل غير موجود.
- طلب مكرر.
- سعر ناقص.
- مرتجع أكبر من البيع.
- تشغيل الأتمتة مرتين للتأكد أنها لا تضاعف البيانات.

لكل اختبار اكتب: المدخل، النتيجة المتوقعة، وكيف أتأكد منها يدويًا.`,
  },
];

function Prompt({ title, why, text }: { title: string; why: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
      <div className="border-b border-line bg-bg-subtle px-5 py-4">
        <h3 className="font-extrabold text-fg">{title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{why}</p>
      </div>
      <pre dir="rtl" className="overflow-x-auto whitespace-pre-wrap p-5 text-right font-sans text-[13.5px] leading-7 text-fg-muted">{text}</pre>
    </div>
  );
}

export default async function ExcelAutomationGuidePage() {
  const allowed = await hasAccess("excel-automation");
  if (!allowed) notFound();

  return (
    <main>
      <section className="border-b border-line bg-bg-subtle">
        <div className="container-x py-12">
          <Link href="/my/excel-automation" className="mb-6 inline-flex items-center gap-2 text-[13px] text-fg-subtle hover:text-fg">
            <ArrowRight className="size-4" /> ارجع للكورس
          </Link>
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1.5 text-[12px] font-bold text-gold-700 dark:text-gold-300">
              <Sparkles className="size-3.5" /> المعمل العملي الكامل
            </span>
            <h1 className="text-[clamp(2rem,5vw,3.6rem)] font-black leading-[1.15] text-fg">
              من أربع ملفات مبعثرة إلى تقرير كامل بزر واحد
            </h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-fg-muted">
              الصفحة دي معمولة علشان ترجع لها حتى بعد شهور وتقدر تعيد المشروع من الصفر. امشِ بالترتيب، ما تقفزش للكود، وما تعتبرش إن الأتمتة نجحت لمجرد إن الملف اتفتح من غير رسالة خطأ.
            </p>
          </div>
        </div>
      </section>

      <div className="container-x py-12">
        <div className="mx-auto max-w-5xl space-y-14">
          <section className="rounded-3xl border border-brand-500/20 bg-brand-500/[0.06] p-6 sm:p-8">
            <div className="flex gap-4">
              <Target className="mt-1 size-6 shrink-0 text-brand-500" />
              <div>
                <h2 className="text-xl font-extrabold text-fg">إيه المطلوب منك في النهاية؟</h2>
                <p className="mt-3 leading-8 text-fg-muted">
                  عندك موظف بيستلم أربع ملفات كل شهر. يفتحهم، يربط أكواد المنتجات والعملاء، يدخل الخصومات والمرتجعات، يحسب الربحية، يراجع الأخطاء، وبعدها يطلع التقرير. هدفنا إن نفس العملية تتحول إلى نظام: تختار الملفات، تضغط زر، والنظام يستورد ويربط ويحسب ويفحص ويطلع التقرير وسجل التشغيل وقائمة المشكلات.
                </p>
                <p className="mt-4 font-bold text-fg">الجملة اللي لازم تفضل في دماغك: إحنا مش بنأتمت Excel. إحنا بنأتمت عملية شغل.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <FileSpreadsheet className="size-6 text-aqua-500" />
              <h2 className="text-2xl font-extrabold text-fg">١. افهم الملفات قبل ما تلمس أي معادلة</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {files.map(([name, role, desc]) => (
                <div key={name} className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
                  <p dir="ltr" className="font-mono text-[12px] font-bold text-brand-600 dark:text-brand-300">{name}</p>
                  <h3 className="mt-2 font-extrabold text-fg">{role}</h3>
                  <p className="mt-2 text-[13.5px] leading-7 text-fg-muted">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-gold-500/25 bg-gold-500/[0.07] p-5">
              <p className="font-bold text-fg">قبل ما تبدأ</p>
              <p className="mt-2 text-[14px] leading-7 text-fg-muted">حط الملفات الأربعة وملف المتدرب في فولدر واحد جديد. خُد نسخة احتياطية منه. اشتغل دائمًا على النسخة. ما تعدلش ملفات المصدر علشان “تسهّل” الحل، لأن الحفاظ على المصدر جزء من التمرين.</p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Workflow className="size-6 text-brand-500" />
              <h2 className="text-2xl font-extrabold text-fg">٢. الطريق الكامل للمشروع</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stages.map(([n,t,d]) => (
                <div key={n} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span className="ltr-nums grid size-9 shrink-0 place-items-center rounded-xl bg-brand-500/10 font-black text-brand-600 dark:text-brand-300">{n}</span>
                  <div><h3 className="font-extrabold text-fg">{t}</h3><p className="mt-2 text-[13.5px] leading-7 text-fg-muted">{d}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <BookOpenCheck className="size-6 text-aqua-500" />
              <h2 className="text-2xl font-extrabold text-fg">٣. اعمل النسخة اليدوية مرة واحدة</h2>
            </div>
            <div className="space-y-4 text-[14.5px] leading-8 text-fg-muted">
              <p>ابدأ من ملف المبيعات. كل صف فيه يعرفك “إيه اللي اتباع”، لكنه لوحده مش يعرف تكلفة المنتج ولا اسم العميل ولا منطق الخصم والمرتجع. علشان كده هتربط الملفات بالمفاتيح المشتركة.</p>
              <div className="rounded-2xl border border-line bg-bg-subtle p-5 font-mono text-[13px]" dir="ltr">
                Sales.Product ID → Products.Product ID<br/>
                Sales.Customer ID → Customers.Customer ID<br/>
                Sales.Order ID → Adjustments.Order ID
              </div>
              <p>ابدأ ببحث بسيط لإحضار اسم المنتج والتكلفة، وبعدها اسم العميل والمنطقة، ثم الخصم والمرتجع والشحن. استخدم معالجة الخطأ بحيث المفتاح المفقود يظهر بوضوح بدل ما يختفي.</p>
              <div className="rounded-2xl border border-line bg-surface p-5 font-mono text-[13px]" dir="ltr">
                =IFERROR(VLOOKUP(D2,'[02_Product_Master.xlsx]Products'!$A:$G,2,FALSE),"NOT FOUND")
              </div>
              <p>بعد الربط احسب بالتسلسل: إجمالي البيع، قيمة الخصم، قيمة المرتجع، صافي المبيعات، تكلفة البضاعة، الربح، ثم هامش الربح. لو صافي المبيعات صفر، لازم تحمي معادلة الهامش من القسمة على صفر.</p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Bug className="size-6 text-gold-500" />
              <h2 className="text-2xl font-extrabold text-fg">٤. ما تصلّحش الأخطاء اللي هتقابلك بسرعة</h2>
            </div>
            <p className="mb-5 leading-8 text-fg-muted">الملفات فيها مشاكل مقصودة. دي مش عيوب في التمرين، دي جزء أساسي منه. لما يظهر لك مفتاح مش موجود أو قيمة غريبة، اسأل: “لو ده حصل الشهر الجاي وأنا مش واقف جنب الأداة، النظام المفروض يعمل إيه؟”</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["منتج غير موجود في دليل المنتجات","عميل غير موجود","مسافات زيادة حول الكود","حروف صغيرة بدل الكبيرة","سعر بيع فارغ","كمية صفر","رقم طلب مكرر","مفتاح مكرر في ملف Master","مرتجع أكبر من الكمية المباعة","تكلفة شحن سالبة","خصم غير منطقي"].map(x => (
                <div key={x} className="flex items-start gap-2 rounded-xl border border-line p-4 text-[13.5px] text-fg-muted">
                  <TriangleAlert className="mt-0.5 size-4 shrink-0 text-gold-500" />{x}
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-aqua-500/20 bg-aqua-500/[0.06] p-5 font-bold leading-7 text-fg">القاعدة: مشكلة البيانات لا تختفي. إمّا تتصلح بقاعدة معلنة، أو تتسجل في Issues علشان إنسان يراجعها.</p>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Wand2 className="size-6 text-brand-500" />
              <h2 className="text-2xl font-extrabold text-fg">٥. البرومبتات: امشِ بيها بالترتيب</h2>
            </div>
            <p className="mb-6 leading-8 text-fg-muted">ما تجمعش البرومبتات دي في طلب واحد. كل مرحلة لها هدف واختبار. انسخ البرومبت، أعطِ النموذج المعلومات الحقيقية من ملفك، اقرأ التصميم، وبعدها فقط انتقل للمرحلة التالية.</p>
            <div className="space-y-5">{prompts.map(p => <Prompt key={p.title} {...p} />)}</div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Code2 className="size-6 text-aqua-500" />
              <h2 className="text-2xl font-extrabold text-fg">٦. أول مرة تستخدم محرر VBA</h2>
            </div>
            <div className="space-y-3 text-[14px] leading-8 text-fg-muted">
              <p>افتح ملف المتدرب في Excel واحفظ نسخة منه بصيغة تدعم الماكرو. فعّل تبويب Developer لو مش ظاهر، ثم افتح محرر VBA وأنشئ Module جديد. الصق أول وحدة فقط، احفظ، ارجع لإكسل وشغّلها.</p>
              <p>بعد كل وحدة اسأل نفسك أربع أسئلة: هل اشتغلت؟ هل الناتج صحيح؟ ماذا يحدث لو الملف ناقص؟ وهل أقدر أشغّلها مرة ثانية من غير ما تضاعف البيانات؟ لو واحدة منهم إجابتها “مش عارف”، ما تنتقلش للخطوة التالية.</p>
              <p className="rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] p-5 font-bold text-fg">ما تفعّلش ماكرو من مصدر مجهول. في التدريب أنت بتراجع الكود اللي اتولد لك، وبتجربه على نسخة من البيانات، وبعدين فقط تعتمد النسخة.</p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="size-6 text-brand-500" />
              <h2 className="text-2xl font-extrabold text-fg">٧. شكل الأتمتة المحترفة في النهاية</h2>
            </div>
            <div className="rounded-3xl border border-line bg-bg-subtle p-6">
              <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[13px] font-bold text-fg">
                {["اختيار الملفات","استيراد Raw","تنظيف المفاتيح","فحص الجودة","ربط الجداول","الحسابات","التقرير","Issues","Run Log"].map((x,i) => (
                  <span key={x} className="contents"><span className="rounded-xl border border-line bg-surface px-3 py-2">{x}</span>{i<8 && <span className="text-fg-subtle">←</span>}</span>
                ))}
              </div>
            </div>
            <p className="mt-5 leading-8 text-fg-muted">زر التشغيل مش هو الإنجاز. الإنجاز إن كل خطوة معروفة، وكل فشل له رسالة، وكل مشكلة لها أثر، والملفات الأصلية لم تُمس، وتقدر تعيد التشغيل بدون تراكم بيانات قديمة.</p>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Gauge className="size-6 text-gold-500" />
              <h2 className="text-2xl font-extrabold text-fg">٨. اختبر قبل ما تقول “خلصت”</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["اختبار إعادة التشغيل","شغّل الأداة مرتين. عدد الصفوف والمجاميع لازم يفضلوا نفسهم."],
                ["اختبار ملف ناقص","الغِ ملفًا من الاختيار. لازم تحصل على رسالة واضحة، مش تقرير ناقص بصمت."],
                ["اختبار الأخطاء","تأكد إن المشاكل المقصودة ظهرت في Issues ولم تختفِ."],
                ["اختبار عينة يدوية","اختار 5 إلى 10 طلبات واحسبها يدويًا وقارن الناتج."],
                ["اختبار المجاميع","قارن إجمالي المبيعات والربح بين النسخة اليدوية والآلية."],
                ["اختبار الزمن","سجّل زمن الطريقة اليدوية وزمن الزر الواحد. ده رقم العائد اللي تعرضه."],
              ].map(([t,d]) => <div key={t} className="rounded-2xl border border-line bg-surface p-5"><h3 className="flex items-center gap-2 font-extrabold text-fg"><CheckCircle2 className="size-4 text-aqua-500"/>{t}</h3><p className="mt-2 text-[13.5px] leading-7 text-fg-muted">{d}</p></div>)}
            </div>
          </section>

          <section className="rounded-3xl border border-brand-500/20 bg-brand-500/[0.06] p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-fg">٩. إمتى تنتقل لبايثون؟</h2>
            <p className="mt-4 leading-8 text-fg-muted">مش لأن بايثون “أقوى” وخلاص. تنتقل لما المشكلة نفسها تكبر: عشرات الملفات، مئات الآلاف من الصفوف، تشغيل مجدول، سجلات أقوى، معالجة أسرع، أو احتياج لأداة تعمل خارج Excel. الجميل إن المنطق لا يتغير: مدخلات، تنظيف، ربط، قواعد، فحوصات، مخرجات، وسجل تشغيل. أنت بتغيّر المحرك، مش طريقة التفكير.</p>
          </section>

          <section className="text-center">
            <p className="mx-auto max-w-2xl text-lg font-extrabold leading-8 text-fg">لو نسيت كل تفاصيل الكورس بعد شهرين، افتكر قاعدة واحدة: افهم العملية، صمّمها، ابنِها أجزاء صغيرة، اختبر كل جزء، وبعدها فقط اضغط زر واحد.</p>
            <div className="mt-6 flex justify-center"><Button href="/my/excel-automation" variant="secondary" icon={<ArrowRight />}>ارجع لمكتبة الكورس</Button></div>
          </section>
        </div>
      </div>
    </main>
  );
}
