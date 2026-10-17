/** غلاف لوحة الإدارة — بيتأكّد إن الإيميل في جدول admins. */
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/access";
import { getUserEmail } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const email = await getUserEmail();
  if (!email) redirect("/login?next=/admin");

  // ٤٠٤ مش ٤٠٣ — عشان ما نأكّدش لحد إن الصفحة دي موجودة أصلًا
  const admin = await isAdmin();
  if (!admin) notFound();

  return <>{children}</>;
}
