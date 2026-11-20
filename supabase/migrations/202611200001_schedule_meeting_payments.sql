create table if not exists public.cms_meeting_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique,
  idempotency_key uuid not null unique,
  name text not null check (length(name) between 2 and 120),
  email text not null check (length(email) <= 254),
  phone text not null check (length(phone) between 8 and 24),
  organisation text not null,
  service text not null,
  team text not null,
  turnover text not null,
  preferred_date date not null,
  preferred_time text not null,
  timezone text not null,
  meeting_mode text not null,
  enquiry_agreement_id text not null
    check (enquiry_agreement_id = 'enquiry-communication-consultation-consent'),
  consent_accepted_at timestamptz not null,
  booking_status text not null default 'pending_payment'
    check (booking_status in ('pending_payment', 'confirmed')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'failed', 'paid')),
  amount integer not null check (amount > 0),
  currency text not null default 'INR' check (currency ~ '^[A-Z]{3}$'),
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  order_creation_started_at timestamptz,
  payment_details jsonb not null default '{}'::jsonb,
  confirmation_email_status text not null default 'pending'
    check (confirmation_email_status in ('pending', 'sending', 'sent', 'failed', 'skipped')),
  confirmation_email_sent_at timestamptz,
  internal_notification_status text not null default 'pending'
    check (internal_notification_status in ('pending', 'sending', 'sent', 'failed', 'skipped')),
  internal_notification_sent_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((booking_status = 'confirmed') = (payment_status = 'paid'))
);

create index if not exists cms_meeting_bookings_created_idx
  on public.cms_meeting_bookings (created_at desc);
create index if not exists cms_meeting_bookings_date_idx
  on public.cms_meeting_bookings (preferred_date, preferred_time);
create index if not exists cms_meeting_bookings_email_idx
  on public.cms_meeting_bookings (email, created_at desc);

drop trigger if exists cms_meeting_bookings_updated_at on public.cms_meeting_bookings;
create trigger cms_meeting_bookings_updated_at
  before update on public.cms_meeting_bookings
  for each row execute function public.set_cms_updated_at();

alter table public.cms_meeting_bookings enable row level security;
revoke all on public.cms_meeting_bookings from public, anon, authenticated;
grant select, insert, update on public.cms_meeting_bookings to service_role;

create table if not exists public.cms_meeting_payment_events (
  event_id text primary key,
  booking_id uuid references public.cms_meeting_bookings(id) on delete set null,
  event_type text not null,
  received_at timestamptz not null default now()
);

alter table public.cms_meeting_payment_events enable row level security;
revoke all on public.cms_meeting_payment_events from public, anon, authenticated;
grant select, insert on public.cms_meeting_payment_events to service_role;
