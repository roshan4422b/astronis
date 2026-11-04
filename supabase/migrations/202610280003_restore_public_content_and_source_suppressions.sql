create or replace function public.cms_public_content(requested_collection text)
returns table (slug text, data jsonb)
language sql
stable
security definer
set search_path = ''
as $$
  select content.slug,
    case content.collection
      when 'services' then pg_catalog.jsonb_build_object(
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
        'robotsFollow', case when pg_catalog.jsonb_typeof(content.data->'robotsFollow') = 'boolean' then content.data->'robotsFollow' else 'true'::jsonb end,
        'sourceDefined', content.data->'sourceDefined' = 'true'::jsonb
      )
      when 'industries' then pg_catalog.jsonb_build_object(
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
      )
      when 'professionals' then pg_catalog.jsonb_build_object(
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
        'robotsFollow', case when pg_catalog.jsonb_typeof(content.data->'robotsFollow') = 'boolean' then content.data->'robotsFollow' else 'true'::jsonb end,
        'designation', case when pg_catalog.jsonb_typeof(content.data->'designation') = 'string' then content.data->'designation' else '""'::jsonb end,
        'expertise', case when pg_catalog.jsonb_typeof(content.data->'expertise') = 'string' then content.data->'expertise' else '""'::jsonb end,
        'education', case when pg_catalog.jsonb_typeof(content.data->'education') = 'string' then content.data->'education' else '""'::jsonb end,
        'enrolment', case when pg_catalog.jsonb_typeof(content.data->'enrolment') = 'string' then content.data->'enrolment' else '""'::jsonb end,
        'sourceDefined', content.data->'sourceDefined' = 'true'::jsonb
      )
      when 'global-presence' then pg_catalog.jsonb_build_object(
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
      )
      when 'technology' then pg_catalog.jsonb_build_object(
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
      )
      when 'insights' then pg_catalog.jsonb_build_object(
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
        'robotsFollow', case when pg_catalog.jsonb_typeof(content.data->'robotsFollow') = 'boolean' then content.data->'robotsFollow' else 'true'::jsonb end,
        'author', case when pg_catalog.jsonb_typeof(content.data->'author') = 'string' then content.data->'author' else '""'::jsonb end
      )
    end as data
  from public.cms_content as content
  where content.status = 'published'
    and content.collection in ('services', 'industries', 'professionals', 'global-presence', 'technology', 'insights')
    and content.collection = requested_collection
  order by content.updated_at desc;
$$;
revoke all on function public.cms_public_content(text) from public, anon, authenticated;
grant execute on function public.cms_public_content(text) to anon, authenticated;

create or replace function public.cms_unpublished_source_content_slugs(requested_collection text)
returns table (slug text)
language sql
stable
security definer
set search_path = ''
as $$
  select content.slug
  from public.cms_content as content
  where requested_collection in (
      'services',
      'industries',
      'professionals',
      'global-presence',
      'technology',
      'insights'
    )
    and content.collection = requested_collection
    and content.data->'sourceDefined' = 'true'::jsonb
    and content.status <> 'published';
$$;

revoke all on function public.cms_unpublished_source_content_slugs(text) from public, anon, authenticated;
grant execute on function public.cms_unpublished_source_content_slugs(text) to anon, authenticated;

notify pgrst, 'reload schema';
