# Reusable service page system

`src/app/services/_template/` contains the shared page system. The templates accept a `ServicePractice` object and contain no Corporate-specific routing or layout branches.

## Data and routing

- `service-detail-types.ts`: practice, group and child-content contracts; URL and anchor helpers.
- `service-practices.ts`: registered detailed practices and route resolution. Corporate headings and child titles are derived from the existing central services hierarchy.
- `corporate-formation-content.ts` and `corporate-group-content.ts`: descriptive content for all 59 child sections. This is service-scope copy, not a statement of current eligibility rules, fees or statutory timeframes.
- `services.ts`: the portfolio's `canonicalSlug` tells the menu and hub which URL to use without changing the existing identity keys.
- The catch-all service route renders the shared main or group template. The two previous Corporate main URLs redirect permanently to `/services/corporate-commercial-advisory`; existing legacy child routes remain available.

The main page uses six large alternating service sections. Every child row links to its parent group page with a stable hash. No new child-level routes are generated. Group pages are rendered from the same template, with two introductory paragraphs, coverage, use cases, considerations and assistance content for each child.

## Navigation and form

`SectionNavigation` supplies both the main-page sticky bar and the detail sidebar. On small screens it becomes a labelled native select. It uses IntersectionObserver and a requestAnimationFrame-throttled scroll handler to track long sections reliably. Header measurements are observed with ResizeObserver. Hash entry, reload and history traversal account for the header and mobile navigation; reduced-motion visitors do not receive smooth scrolling.

The shared `PageTransition` retains its normal behavior but no longer forces hash destinations to the top. `ServiceEnquiryForm` accepts `defaultRequirement`, validated against its existing service data; the group template supplies the current group and practice. Changing the service still clears dependent fields.

## Adding another practice

1. Keep its existing identity and workbook mapping in the central portfolio.
2. Add group descriptions, visuals, FAQs and child content using `ServicePractice`.
3. Register it in `servicePractices` and supply a canonical slug if needed.
4. Reuse the templates, navigation, support sections, breadcrumbs and metadata behavior unchanged.
5. Check workbook parity, unique anchors, routing, form defaults and responsive behavior.

The current main H1 uses the exact practice name from the SEO portion of the brief. The longer growth-focused heading is retained as its prominent supporting statement. Each page has one H1; child-service names are H2s. Breadcrumb JSON-LD and canonical metadata are supplied by the route.

## Validation

- `node scripts/validate-corporate.cjs`
- `node scripts/check-corporate.cjs` (set `PLAYWRIGHT_MODULE` if installed outside the project)
- `npx tsc --noEmit`
- Targeted ESLint for changed files
- `npm run build` (on memory-constrained machines, `CIRCLE_NODE_TOTAL=2` limits Next's build worker count without changing project configuration)

Browser artifacts are saved under ignored `artifacts/corporate/`.
