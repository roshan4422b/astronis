revoke all privileges on table public.cms_content from public, anon;
grant insert on table public.cms_content to anon;

drop policy if exists "Public testimonial submissions" on public.cms_content;
create policy "Public testimonial submissions" on public.cms_content
for insert to anon, authenticated
with check (
  collection = 'testimonials'
  and status = 'pending'
  and data->'consent' = 'true'::jsonb
  and data->'identityPublicationConsent' = 'true'::jsonb
  and pg_catalog.length(pg_catalog.btrim(coalesce(data->>'name', ''))) between 2 and 120
  and pg_catalog.length(pg_catalog.btrim(coalesce(data->>'text', ''))) <= 5000
  and (
    (
      data->>'format' = 'written'
      and pg_catalog.length(pg_catalog.btrim(coalesce(data->>'text', ''))) between 10 and 5000
    )
    or (
      data->>'format' = 'video'
      and data->'mediaSubmitted' = 'true'::jsonb
    )
  )
);
