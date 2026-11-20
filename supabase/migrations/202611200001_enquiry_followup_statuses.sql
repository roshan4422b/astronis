alter table public.cms_enquiries
  add column if not exists follow_up_date date;

alter table public.cms_enquiries
  drop constraint if exists cms_enquiries_status_check;

alter table public.cms_enquiries
  add constraint cms_enquiries_status_check
  check (status in ('New', 'In Progress', 'Responded', 'Closed', 'Interested', 'Not Interested', 'Follow-up'));

notify pgrst, 'reload schema';
