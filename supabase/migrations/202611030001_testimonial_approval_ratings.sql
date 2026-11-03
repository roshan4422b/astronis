drop function if exists public.cms_public_testimonials();

create function public.cms_public_testimonials()
returns table (
  slug text,
  name text,
  company text,
  designation text,
  service text,
  testimonial_text text,
  rating integer,
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
      when pg_catalog.jsonb_typeof(content.data->'rating') = 'number'
        and (content.data->>'rating')::numeric between 1 and 5
        and (content.data->>'rating')::numeric = pg_catalog.trunc((content.data->>'rating')::numeric)
      then (content.data->>'rating')::integer
      else 5
    end,
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
    and content.status in ('approved', 'published')
    and content.data->'consent' = 'true'::jsonb
    and content.data->'identityPublicationConsent' = 'true'::jsonb
  order by content.updated_at desc;
$$;

revoke all on function public.cms_public_testimonials() from public, anon, authenticated;
grant execute on function public.cms_public_testimonials() to anon, authenticated;
