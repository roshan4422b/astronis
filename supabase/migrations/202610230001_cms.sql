create extension if not exists pgcrypto;

create table if not exists public.cms_admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  invited_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.cms_admin_users enable row level security;
revoke all on public.cms_admin_users from anon, authenticated;
grant select on public.cms_admin_users to authenticated;
drop policy if exists "Administrators can confirm their own allowlist membership" on public.cms_admin_users;
create policy "Administrators can confirm their own allowlist membership" on public.cms_admin_users
for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.cms_admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to anon, authenticated;

create table if not exists public.cms_content (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in ('pages','services','industries','professionals','global-presence','technology','insights','testimonials','seo')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status text not null default 'draft' check (status in ('draft','published','archived','pending','approved','rejected')),
  data jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection, slug)
);

create index if not exists cms_content_public_idx on public.cms_content (collection, updated_at desc) where status = 'published';
create index if not exists cms_content_status_idx on public.cms_content (collection, status, updated_at desc);
create index if not exists cms_content_data_search_idx on public.cms_content using gin (data jsonb_path_ops);

create or replace function public.set_cms_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cms_content_updated_at on public.cms_content;
create trigger cms_content_updated_at before update on public.cms_content
for each row execute function public.set_cms_updated_at();

alter table public.cms_content enable row level security;
drop policy if exists "Published content is publicly readable" on public.cms_content;
create policy "Published content is publicly readable" on public.cms_content
for select to anon, authenticated using (status = 'published' or (select public.is_cms_admin()));

create or replace function public.cms_source_content_statuses(requested_collection text)
returns table (collection text, slug text, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select content.collection, content.slug, content.status
  from public.cms_content as content
  where content.data->>'sourceDefined' = 'true'
    and content.collection = requested_collection;
$$;
revoke all on function public.cms_source_content_statuses(text) from public;
grant execute on function public.cms_source_content_statuses(text) to anon, authenticated;

drop policy if exists "Admins manage content" on public.cms_content;
create policy "Admins manage content" on public.cms_content
for all to authenticated using ((select public.is_cms_admin())) with check (
  (select public.is_cms_admin())
  and not (
    collection = 'testimonials' and status = 'published'
    and (coalesce(data->>'consent', 'false') <> 'true'
      or coalesce(data->>'identityPublicationConsent', 'false') <> 'true')
  )
);
drop policy if exists "Public testimonial submissions" on public.cms_content;
create policy "Public testimonial submissions" on public.cms_content
for insert to anon, authenticated
with check (
  collection = 'testimonials'
  and status = 'pending'
  and coalesce(data->>'consent', '') = 'true'
  and coalesce(data->>'identityPublicationConsent', '') = 'true'
  and length(trim(coalesce(data->>'name', ''))) between 2 and 120
  and length(trim(coalesce(data->>'text', ''))) between 10 and 5000
);

create table if not exists public.cms_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 2 and 120),
  email text not null check (length(email) <= 254),
  company text not null default '',
  subject text not null default '',
  message text not null default '',
  form_type text not null default 'website',
  status text not null default 'New' check (status in ('New','In Progress','Responded','Closed')),
  internal_notes text not null default '',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cms_enquiries_created_idx on public.cms_enquiries (created_at desc);
create index if not exists cms_enquiries_status_idx on public.cms_enquiries (status, created_at desc);
drop trigger if exists cms_enquiries_updated_at on public.cms_enquiries;
create trigger cms_enquiries_updated_at before update on public.cms_enquiries
for each row execute function public.set_cms_updated_at();
alter table public.cms_enquiries enable row level security;
drop policy if exists "Admins manage enquiries" on public.cms_enquiries;
create policy "Admins manage enquiries" on public.cms_enquiries
for all to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));
drop policy if exists "Public may submit enquiries" on public.cms_enquiries;
create policy "Public may submit enquiries" on public.cms_enquiries
for insert to anon, authenticated with check (
  status = 'New' and internal_notes = ''
  and length(trim(name)) between 2 and 120
  and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
);

create table if not exists public.cms_settings (
  key text primary key check (key ~ '^[a-zA-Z0-9_.-]{1,100}$'),
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
drop trigger if exists cms_settings_updated_at on public.cms_settings;
create trigger cms_settings_updated_at before update on public.cms_settings
for each row execute function public.set_cms_updated_at();
alter table public.cms_settings enable row level security;
drop policy if exists "Admins manage settings" on public.cms_settings;
create policy "Admins manage settings" on public.cms_settings
for all to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-assets', 'cms-assets', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif','application/pdf'])
on conflict (id) do update set public = true, file_size_limit = 10485760,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-private-assets', 'cms-private-assets', false, 10485760, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 10485760,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "CMS assets are publicly readable" on storage.objects;
create policy "CMS assets are publicly readable" on storage.objects
for select to anon, authenticated using (bucket_id = 'cms-assets');
drop policy if exists "CMS admins upload assets" on storage.objects;
create policy "CMS admins upload assets" on storage.objects
for insert to authenticated with check (bucket_id = 'cms-assets' and (select public.is_cms_admin()));
drop policy if exists "CMS admins update assets" on storage.objects;
create policy "CMS admins update assets" on storage.objects
for update to authenticated using (bucket_id = 'cms-assets' and (select public.is_cms_admin()))
with check (bucket_id = 'cms-assets' and (select public.is_cms_admin()));
drop policy if exists "CMS admins delete assets" on storage.objects;
create policy "CMS admins delete assets" on storage.objects
for delete to authenticated using (bucket_id = 'cms-assets' and (select public.is_cms_admin()));

drop policy if exists "CMS admins read private assets" on storage.objects;
create policy "CMS admins read private assets" on storage.objects
for select to authenticated using (bucket_id = 'cms-private-assets' and (select public.is_cms_admin()));
drop policy if exists "CMS admins upload private assets" on storage.objects;
create policy "CMS admins upload private assets" on storage.objects
for insert to authenticated with check (bucket_id = 'cms-private-assets' and (select public.is_cms_admin()));
drop policy if exists "CMS admins update private assets" on storage.objects;
create policy "CMS admins update private assets" on storage.objects
for update to authenticated using (bucket_id = 'cms-private-assets' and (select public.is_cms_admin()))
with check (bucket_id = 'cms-private-assets' and (select public.is_cms_admin()));
drop policy if exists "CMS admins delete private assets" on storage.objects;
create policy "CMS admins delete private assets" on storage.objects
for delete to authenticated using (bucket_id = 'cms-private-assets' and (select public.is_cms_admin()));

grant select, insert on public.cms_content to anon, authenticated;
grant update, delete on public.cms_content to authenticated;
grant select, insert on public.cms_enquiries to anon, authenticated;
grant update, delete on public.cms_enquiries to authenticated;
grant select, insert, update, delete on public.cms_settings to authenticated;

-- After inviting an administrator through Supabase Auth, add only that auth.users.id:
-- insert into public.cms_admin_users (user_id) values ('<AUTH_USER_UUID>');
