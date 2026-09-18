-- ════════════════════════════════════════════════════════════════════
-- العضوية والوصول المدفوع
-- المرجع الكامل: docs/MEMBERSHIP-PLAN.md
--
-- الفكرة في سطر: المتدرّب يدفع → صاحب الموقع يفتحله بإيميله →
-- المتدرّب يدخل بجوجل → النظام يطابق الإيميل ويفتح المحتوى.
-- ════════════════════════════════════════════════════════════════════


-- ════ ١) الملف الشخصي ═══════════════════════════════════════════════
-- Supabase بيعمل auth.users تلقائيًا. الجدول ده للبيانات الإضافية.

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'بيانات المتدرّب الإضافية — مرتبطة بحساب المصادقة';


-- ════ ٢) المسؤولون ══════════════════════════════════════════════════
-- بسيط عن قصد: إيميل واحد في كل صف.

create table if not exists public.admins (
  email       text primary key,
  created_at  timestamptz not null default now()
);

comment on table public.admins is 'إيميلات اللي ليهم حق الدخول على /admin';


-- ════ ٣) الوصول للكورسات — قلب النظام ═══════════════════════════════
--
-- ⚠️ المفتاح هنا هو الإيميل، مش user_id. وده مقصود:
--    الترتيب اللي بيحصل فعلًا هو
--      ١) المتدرّب يدفع
--      ٢) صاحب الموقع يضيف إيميله هنا   ← لسه مفيش حساب أصلًا!
--      ٣) المتدرّب يدخل بجوجل لأول مرة
--      ٤) النظام يطابق إيميل حسابه بالصف ده ويفتحله
--    لو ربطناه بـuser_id، كان لازم يعمل حساب قبل ما ناخد فلوسه.

create table if not exists public.course_access (
  id                 uuid primary key default gen_random_uuid(),

  -- بيتخزّن دايمًا بحروف صغيرة — الحارس في الدالة تحت
  email              text not null,
  course_slug        text not null,

  -- إزاي اتفتح الوصول ده؟ مهم للمحاسبة والمتابعة
  granted_by         text not null default 'manual'
                     check (granted_by in ('manual', 'payment', 'gift')),
  payment_reference  text,
  amount             numeric(10, 2),

  -- تاريخ انتهاء اختياري — هيستخدم في الاشتراكات لاحقًا
  expires_at         timestamptz,

  -- ملاحظة لصاحب الموقع: "دفع ٢٠٠٠ واتساب ١٥ سبتمبر"
  note               text,

  created_at         timestamptz not null default now(),

  constraint course_access_unique unique (email, course_slug)
);

comment on table public.course_access is
  'مين يقدر يشوف أنهي كورس. المفتاح إيميل مش user_id — شوف التعليق فوق';

create index if not exists course_access_email_idx
  on public.course_access (email);

create index if not exists course_access_course_idx
  on public.course_access (course_slug);


-- ════ ٤) توحيد الإيميلات — حارس على مستوى القاعدة ═══════════════════
-- بدل ما نعتمد على إن كل كود في التطبيق فاكر يعمل lower().
-- لو حد أضاف صف من لوحة Supabase مباشرة، ده هيظبّطه برضه.

create or replace function public.normalize_email()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.email := lower(trim(new.email));
  return new;
end;
$$;

drop trigger if exists normalize_course_access_email on public.course_access;
create trigger normalize_course_access_email
  before insert or update on public.course_access
  for each row execute function public.normalize_email();

drop trigger if exists normalize_admins_email on public.admins;
create trigger normalize_admins_email
  before insert or update on public.admins
  for each row execute function public.normalize_email();


-- ════ ٥) إنشاء الملف الشخصي تلقائيًا عند أول دخول ═══════════════════

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    lower(trim(new.email)),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ════ ٦) دوال مساعدة للسياسات ═══════════════════════════════════════

-- إيميل المستخدم الحالي — من التوكن مباشرة
create or replace function public.current_email()
returns text
language sql
stable
security invoker
set search_path = ''
as $$
  select lower(trim(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- هل المستخدم الحالي مسؤول؟
-- security definer عشان يقدر يقرا جدول admins بغضّ النظر عن سياساته
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a
    where a.email = public.current_email()
  );
$$;


-- ════ ٧) أمان مستوى الصف (RLS) — إجباري ═════════════════════════════
-- ⚠️ من غير السياسات دي، أي حد معاه المفتاح العام يقدر يقرا كل الجدول.

alter table public.profiles      enable row level security;
alter table public.admins        enable row level security;
alter table public.course_access enable row level security;

-- ── الملف الشخصي ────────────────────────────────────────────────────
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ── المسؤولون: المسؤول بس ───────────────────────────────────────────
drop policy if exists "admins_admin_only" on public.admins;
create policy "admins_admin_only" on public.admins
  for all using (public.is_admin()) with check (public.is_admin());

-- ── الوصول للكورسات ─────────────────────────────────────────────────
-- المتدرّب يشوف صفوفه هو بس
drop policy if exists "access_select_own" on public.course_access;
create policy "access_select_own" on public.course_access
  for select using (email = public.current_email() or public.is_admin());

-- الإضافة والتعديل والحذف: المسؤول بس
drop policy if exists "access_admin_write" on public.course_access;
create policy "access_admin_write" on public.course_access
  for insert with check (public.is_admin());

drop policy if exists "access_admin_update" on public.course_access;
create policy "access_admin_update" on public.course_access
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "access_admin_delete" on public.course_access;
create policy "access_admin_delete" on public.course_access
  for delete using (public.is_admin());


-- ════ ٨) دالة الفحص اللي التطبيق بينادي عليها ═══════════════════════
-- بتحترم تاريخ الانتهاء لو موجود.

create or replace function public.has_course_access(p_course_slug text)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1 from public.course_access ca
    where ca.email = public.current_email()
      and ca.course_slug = p_course_slug
      and (ca.expires_at is null or ca.expires_at > now())
  );
$$;


-- ════ ٩) 👈 غيّر ده — حطّ إيميلك عشان تدخل لوحة الإدارة ════════════
-- شغّل السطر ده بإيميلك في محرّر SQL في لوحة Supabase:
--
--   insert into public.admins (email) values ('your@email.com');
--
-- سايبينه معلّق عن قصد: ما ينفعش نحطّ إيميل حقيقي في ملف بيتحفظ في Git.
