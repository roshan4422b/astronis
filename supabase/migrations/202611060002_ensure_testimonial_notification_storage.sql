create table if not exists public.cms_testimonial_notification_deliveries (
  testimonial_id uuid not null references public.cms_content(id) on delete cascade,
  event_status text not null check (event_status in ('published', 'rejected')),
  delivery_status text not null default 'sending' check (delivery_status in ('sending', 'sent', 'failed')),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  primary key (testimonial_id, event_status)
);

alter table public.cms_testimonial_notification_deliveries enable row level security;

revoke all on public.cms_testimonial_notification_deliveries from public, anon;
grant select, insert, update on public.cms_testimonial_notification_deliveries to authenticated;

drop policy if exists "CMS admins manage testimonial email delivery records"
  on public.cms_testimonial_notification_deliveries;

create policy "CMS admins manage testimonial email delivery records"
on public.cms_testimonial_notification_deliveries
for all to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));
