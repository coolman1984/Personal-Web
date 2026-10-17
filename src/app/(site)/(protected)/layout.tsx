/**
 * غلاف المنطقة المحمية — الطبقة التانية من الحماية.
 * (الأولى middleware، والتالتة سياسات RLS)
 */
import { redirect } from "next/navigation";
import { getUserEmail } from "@/lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getUserEmail();
  if (!email) redirect("/login?next=/my");
  return <>{children}</>;
}
