create or replace function public.cms_public_testimonials()
returns table (
  slug text,
  name text,
  company text,
  designation text,
  service text,
  testimonial_text text
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
    case when pg_catalog.jsonb_typeof(content.data->'text') = 'string' then content.data->>'text' else '' end
  from public.cms_content as content
  where content.collection = 'testimonials'
    and content.status = 'published'
    and content.data->'consent' = 'true'::jsonb
    and content.data->'identityPublicationConsent' = 'true'::jsonb
  order by content.updated_at desc;
$$;

revoke all on function public.cms_public_testimonials() from public, anon, authenticated;
grant execute on function public.cms_public_testimonials() to anon, authenticated;
