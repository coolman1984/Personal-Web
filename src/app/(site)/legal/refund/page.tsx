import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/content/site";
import type { ArticleBlock } from "@/types";

export const metadata = buildMetadata({
  title: "سياسة الاسترداد",
  description: "إمتى تقدر تسترد فلوسك وإزاي.",
  path: "/legal/refund",
});

const blocks: ArticleBlock[] = [
  {
    type: "p",
    text: "الهدف إنك تبقى مرتاح وإنت بتحجز. الصفحة دي بتوضّح إمتى تقدر تسترد فلوسك وإزاي.",
  },
  { type: "h2", text: "الاسترداد قبل بداية الكورس" },
  {
    type: "p",
    text: "لو ألغيت قبل أول جلسة بـ٤٨ ساعة على الأقل، بتسترد المبلغ كامل من غير أي خصم.",
  },
  { type: "h2", text: "بعد ما الكورس يبدأ" },
  {
    type: "ul",
    items: [
      "لو حضرت أول جلسة ولقيت إن المستوى مش مناسب لك، بنقدر ننقلك لمستوى تاني من غير فرق سعر لو نفس الفئة.",
      "الاسترداد بعد الجلسة الثانية بيتم تقييمه حالة بحالة حسب الظرف.",
      "المواد اللي استلمتها (الأدلة والتسجيلات) بتفضل معاك في كل الحالات.",
    ],
  },
  {
    type: "callout",
    tone: "tip",
    title: "قبل ما تحجز",
    text: "لو مش متأكّد من المستوى المناسب، خُد اختبار تحديد المستوى الأول — أو كلّمني على واتساب وأنا هرشّحلك بصدق حتى لو الترشيح يبقى إنك تستنى.",
  },
  { type: "h2", text: "لو المجموعة اتأجّلت من ناحيتي" },
  {
    type: "p",
    text: "لو اضطرّيت أأجّل مجموعة، معاك خيارين: تنتقل للمجموعة الجاية، أو تسترد المبلغ كامل فورًا. الاختيار اختيارك.",
  },
  { type: "h2", text: "طريقة الاسترداد" },
  {
    type: "p",
    text: "الاسترداد بيتم بنفس طريقة الدفع، وبياخد من ٥ لـ١٤ يوم عمل حسب البنك أو بوابة الدفع.",
  },
  { type: "h2", text: "طلب الاسترداد" },
  { type: "p", text: `ابعت طلبك على ${site.email} أو على واتساب، ومعاه رقم المرجع.` },
];

export default function RefundPage() {
  return (
    <LegalPage
      title="سياسة الاسترداد"
      description="إمتى تقدر تسترد فلوسك وإزاي."
      path="/legal/refund"
      updatedAt="سبتمبر ٢٠٢٦"
      blocks={blocks}
    />
  );
}
