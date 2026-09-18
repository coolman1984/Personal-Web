/** قوائم التنقّل — الهيدر والفوتر. */
import type { NavItem } from "@/types";

/** روابط الهيدر الرئيسية */
export const mainNav: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  {
    label: "الكورسات",
    href: "/courses",
    description: "٦ كورسات على ٣ مستويات",
    children: [
      {
        label: "المستوى المبتدئ",
        href: "/levels/beginner",
        description: "ابدأ من الصفر — من غير برمجة",
        icon: "Sprout",
      },
      {
        label: "المستوى المتوسط",
        href: "/levels/intermediate",
        description: "من مستخدِم... لبانِي",
        icon: "Layers",
      },
      {
        label: "المستوى المتقدّم",
        href: "/levels/advanced",
        description: "ابنِ أنظمة... مش تجارب",
        icon: "Crown",
      },
      {
        label: "كل الكورسات",
        href: "/courses",
        description: "استعرض الكورسات كلها",
        icon: "GraduationCap",
      },
    ],
  },
  { label: "خريطة التعلّم", href: "/roadmap" },
  { label: "المشاريع", href: "/projects" },
  { label: "المقالات", href: "/articles" },
  { label: "عني", href: "/about" },
];

/** أعمدة الفوتر */
export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "الكورسات",
    links: [
      { label: "المستوى المبتدئ", href: "/levels/beginner" },
      { label: "المستوى المتوسط", href: "/levels/intermediate" },
      { label: "المستوى المتقدّم", href: "/levels/advanced" },
      { label: "كل الكورسات", href: "/courses" },
      { label: "الباقات", href: "/pricing" },
    ],
  },
  {
    title: "الموقع",
    links: [
      { label: "عني", href: "/about" },
      { label: "خريطة التعلّم", href: "/roadmap" },
      { label: "المشاريع", href: "/projects" },
      { label: "المقالات", href: "/articles" },
      { label: "حدّد مستواك", href: "/quiz" },
    ],
  },
  {
    title: "مساعدة",
    links: [
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "تواصل معايا", href: "/contact" },
      { label: "الشروط والأحكام", href: "/legal/terms" },
      { label: "سياسة الخصوصية", href: "/legal/privacy" },
      { label: "سياسة الاسترداد", href: "/legal/refund" },
    ],
  },
];

export const socialLabels: Record<string, string> = {
  linkedin: "لينكدإن",
  youtube: "يوتيوب",
  x: "إكس",
  facebook: "فيسبوك",
  github: "جيت هب",
  telegram: "تيليجرام",
};
