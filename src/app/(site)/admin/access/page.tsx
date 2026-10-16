/** شاشة فتح وسحب الوصول — الشاشة اللي بتتستخدم كل يوم. */
import { listAllAccess } from "@/lib/access";
import { getAllCourses } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { AccessManager } from "@/components/admin/access-manager";

export const metadata = buildMetadata({
  title: "إدارة الوصول",
  description: "",
  path: "/admin/access",
  noIndex: true,
});

export default async function AdminAccessPage() {
  const [access, courses] = await Promise.all([listAllAccess(), getAllCourses()]);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "لوحة الإدارة", href: "/admin" },
          { label: "إدارة الوصول", href: "/admin/access" },
        ]}
        eyebrow="إدارة"
        title="فتح وسحب الوصول"
        description="ضيف إيميل المتدرّب بعد ما يدفع، وهو هيلاقي الكورس مفتوح أول ما يدخل."
      />
      <section className="container-x pb-14">
        <AccessManager
          rows={access}
          courses={courses.map((c) => ({ slug: c.slug, title: c.title }))}
        />
      </section>
    </>
  );
}
