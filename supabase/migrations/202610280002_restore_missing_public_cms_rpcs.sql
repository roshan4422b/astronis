create or replace function public.cms_published_page(requested_path text)
returns table (slug text, data jsonb)
language sql
stable
security definer
set search_path = ''
as $$
  select
    content.slug,
    pg_catalog.jsonb_build_object(
      'title', case when pg_catalog.jsonb_typeof(content.data->'title') = 'string' then content.data->'title' else '""'::jsonb end,
      'category', case when pg_catalog.jsonb_typeof(content.data->'category') = 'string' then content.data->'category' else '""'::jsonb end,
      'description', case when pg_catalog.jsonb_typeof(content.data->'description') = 'string' then content.data->'description' else '""'::jsonb end,
      'content', case when pg_catalog.jsonb_typeof(content.data->'content') = 'string' then content.data->'content' else '""'::jsonb end,
      'featuredImage', case when pg_catalog.jsonb_typeof(content.data->'featuredImage') = 'string' then content.data->'featuredImage' else '""'::jsonb end,
      'seoTitle', case when pg_catalog.jsonb_typeof(content.data->'seoTitle') = 'string' then content.data->'seoTitle' else '""'::jsonb end,
      'seoDescription', case when pg_catalog.jsonb_typeof(content.data->'seoDescription') = 'string' then content.data->'seoDescription' else '""'::jsonb end,
      'ogTitle', case when pg_catalog.jsonb_typeof(content.data->'ogTitle') = 'string' then content.data->'ogTitle' else '""'::jsonb end,
      'ogDescription', case when pg_catalog.jsonb_typeof(content.data->'ogDescription') = 'string' then content.data->'ogDescription' else '""'::jsonb end,
      'canonicalUrl', case when pg_catalog.jsonb_typeof(content.data->'canonicalUrl') = 'string' then content.data->'canonicalUrl' else '""'::jsonb end,
      'robotsIndex', case when pg_catalog.jsonb_typeof(content.data->'robotsIndex') = 'boolean' then content.data->'robotsIndex' else 'true'::jsonb end,
      'robotsFollow', case when pg_catalog.jsonb_typeof(content.data->'robotsFollow') = 'boolean' then content.data->'robotsFollow' else 'true'::jsonb end
    ) as data
  from public.cms_content as content
  where content.collection = 'pages'
    and content.status = 'published'
    and (
      content.data->>'sourcePath' = requested_path
      or content.slug = pg_catalog.btrim(requested_path, '/')
    )
  order by
    case when content.data->>'sourcePath' = requested_path then 0 else 1 end,
    content.updated_at desc
  limit 1;
$$;
revoke all on function public.cms_published_page(text) from public, anon, authenticated;
grant execute on function public.cms_published_page(text) to anon, authenticated;

create or replace function public.cms_source_testimonial_slugs()
returns table (slug text)
language sql
stable
security definer
set search_path = ''
as $$
  select content.slug
  from public.cms_content as content
  where content.collection = 'testimonials'
    and content.data->'sourceDefined' = 'true'::jsonb
    and content.status <> 'published';
$$;
revoke all on function public.cms_source_testimonial_slugs() from public, anon, authenticated;
grant execute on function public.cms_source_testimonial_slugs() to anon, authenticated;

notify pgrst, 'reload schema';
