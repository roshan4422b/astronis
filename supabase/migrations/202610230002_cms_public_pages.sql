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
    case when pg_catalog.jsonb_typeof(content.data->'name') = 'string' then content.data->'name' else '""'::jsonb end,
    case when pg_catalog.jsonb_typeof(content.data->'company') = 'string' then content.data->'company' else '""'::jsonb end,
    case when pg_catalog.jsonb_typeof(content.data->'designation') = 'string' then content.data->'designation' else '""'::jsonb end,
    case when pg_catalog.jsonb_typeof(content.data->'service') = 'string' then content.data->'service' else '""'::jsonb end,
    case when pg_catalog.jsonb_typeof(content.data->'text') = 'string' then content.data->'text' else '""'::jsonb end
  from public.cms_content as content
  where content.collection = 'testimonials'
    and content.status = 'published'
    and content.data->'consent' = 'true'::jsonb
    and content.data->'identityPublicationConsent' = 'true'::jsonb
  order by content.updated_at desc;
$$;
revoke all on function public.cms_public_testimonials() from public, anon, authenticated;
grant execute on function public.cms_public_testimonials() to anon, authenticated;

drop policy if exists "Admins manage content" on public.cms_content;
create policy "Admins manage content" on public.cms_content
for all to authenticated using ((select public.is_cms_admin())) with check (
  (select public.is_cms_admin())
  and not (
    collection = 'testimonials' and status = 'published'
    and (
      data->'consent' is distinct from 'true'::jsonb
      or data->'identityPublicationConsent' is distinct from 'true'::jsonb
    )
  )
);

drop policy if exists "Public testimonial submissions" on public.cms_content;
create policy "Public testimonial submissions" on public.cms_content
for insert to anon, authenticated
with check (
  collection = 'testimonials'
  and status = 'pending'
  and data->'consent' = 'true'::jsonb
  and data->'identityPublicationConsent' = 'true'::jsonb
  and pg_catalog.length(pg_catalog.btrim(coalesce(data->>'name', ''))) between 2 and 120
  and pg_catalog.length(pg_catalog.btrim(coalesce(data->>'text', ''))) between 10 and 5000
);

drop function if exists public.cms_source_content_statuses(text);

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

revoke all on function public.is_cms_admin() from public, anon, authenticated;
grant execute on function public.is_cms_admin() to anon, authenticated;

drop policy if exists "Published content is publicly readable" on public.cms_content;
drop policy if exists "CMS admins read content" on public.cms_content;
create policy "CMS admins read content" on public.cms_content
for select to authenticated using ((select public.is_cms_admin()));

revoke select on table public.cms_content from public, anon;
grant select on table public.cms_content to authenticated;
grant insert on table public.cms_content to anon, authenticated;
