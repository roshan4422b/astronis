# Services architecture

`src/data/service-hierarchy.json` is the single service architecture source. It defines the approved 11 main services, 36 sub-services and 269 child services from the final hierarchy supplied for this work. `src/data/services.ts` adds display metadata while retaining the approved main-service slugs.

The services hub, header mega menu, footer, service enquiry form, search, main service templates, route resolver, human-readable sitemap and XML sitemap consume this shared data. Child URLs use the service slug, sub-service slug and normalized child name.

The catch-all service route resolves main, sub-service and child-service paths and supplies page metadata and breadcrumbs. Existing detailed company formation and corporate structuring pages are mounted at canonical child paths; their previous URLs permanently redirect. Other superseded standalone service paths redirect to their approved parent or corresponding hierarchy entry in `next.config.ts`.

Run `node scripts/validate-services.mjs` to verify the approved counts and unique canonical URLs and regenerate `docs/service-route-audit.md`.
