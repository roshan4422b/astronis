insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-private-assets',
  'cms-private-assets',
  false,
  20971520,
  array['application/pdf','image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm','video/quicktime']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public submissions must pass through the OTP-verifying server route.
drop policy if exists "Public testimonial submissions" on public.cms_content;
revoke insert on table public.cms_content from public, anon;
grant insert on table public.cms_content to service_role;

create table if not exists public.cms_testimonial_notification_deliveries (
  testimonial_id uuid not null references public.cms_content(id) on delete cascade,
  event_status text not null check (event_status in ('published', 'rejected')),
  delivery_status text not null default 'sending' check (delivery_status in ('sending', 'sent', 'failed')),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  primary key (testimonial_id, event_status)
);

alter table public.cms_testimonial_notification_deliveries enable row level security;
revoke all on public.cms_testimonial_notification_deliveries from public, anon, authenticated;
grant select, insert, update on public.cms_testimonial_notification_deliveries to authenticated;
drop policy if exists "CMS admins manage testimonial email delivery records"
  on public.cms_testimonial_notification_deliveries;
create policy "CMS admins manage testimonial email delivery records"
on public.cms_testimonial_notification_deliveries
for all to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

drop function if exists public.cms_public_testimonials();
create function public.cms_public_testimonials()
returns table (
  slug text,
  name text,
  company text,
  designation text,
  service text,
  testimonial_text text,
  image_path text,
  video_path text,
  video_url text,
  video_source text
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    content.slug,
    case when pg_catalog.jsonb_typeof(content.data->'name') = 'string' then content.data->>'name' else '' end,
    case when pg_catalog.jsonb_typeof(content.data->'company') = 'string' then content.data->>'company' else '' end,
    case when pg_catalog.jsonb_typeof(content.data->'designation') = 'string' then content.data->>'designation' else '' end,
    case when pg_catalog.jsonb_typeof(content.data->'service') = 'string' then content.data->>'service' else '' end,
    case when pg_catalog.jsonb_typeof(content.data->'text') = 'string' then content.data->>'text' else '' end,
    case
      when content.data->'photoPublicationConsent' = 'true'::jsonb
        and pg_catalog.jsonb_typeof(content.data->'imagePath') = 'string'
      then content.data->>'imagePath'
      else ''
    end,
    case when pg_catalog.jsonb_typeof(content.data->'videoPath') = 'string' then content.data->>'videoPath' else '' end,
    case when pg_catalog.jsonb_typeof(content.data->'videoUrl') = 'string' then content.data->>'videoUrl' else '' end,
    case when pg_catalog.jsonb_typeof(content.data->'videoSource') = 'string' then content.data->>'videoSource' else '' end
  from public.cms_content as content
  where content.collection = 'testimonials'
    and content.status = 'published'
    and content.data->'consent' = 'true'::jsonb
    and content.data->'identityPublicationConsent' = 'true'::jsonb
  order by content.updated_at desc;
$$;

revoke all on function public.cms_public_testimonials() from public, anon, authenticated;
grant execute on function public.cms_public_testimonials() to anon, authenticated;
