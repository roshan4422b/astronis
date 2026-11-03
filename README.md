# Astronis Global website

A responsive Next.js website built from the supplied homepage PDF, final Word content master, menu workbook and existing public images.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. To run the production version:

```sh
npm run build
npm start
```

## Structure

- `src/app/home/`: separate hero, quick services, reasons, practice areas, industries, global presence, approach, professionals, insights, FAQ, clients, stories, testimonials, consultation, enquiry and contact-strip components.
- `src/app/page.tsx`: serves the composed homepage at `/`. `/home` also works and has a canonical link to `/`.
- `src/app/about/`, `services/`, `industries/`, `professionals/`, `insights/`, `global-presence/`, `contact/`: page-specific section components.
- Nested service pages include the spreadsheet's practice categories and individual services. Shared dynamic templates avoid duplicating the same layout for every service.
- `src/app/_components/`: shared header, footer, icons, banners and buttons.
- `src/content/site.ts`: homepage copy, practice summaries, industries, statistics, FAQs and supplied success stories.
- `src/content/service-menu.json`: service hierarchy transcribed from the spreadsheet.
- `src/content/site-menu.json`: additional menu categories from the spreadsheet.
- `src/app/globals.css`: design system and responsive layouts.

## Reference decisions

The Word document identifies itself as the final homepage content master. Its current Astronis branding, section order and wording take precedence over older PREACH LAW LLP labels in the spreadsheet and conflicting mockup copy. The PDF supplies the visual direction, leadership names and office details.

Only existing public images are used. The supplied logo is unchanged. Some PDF compositions and card photographs do not exist as separate public assets, so the closest relevant supplied images are used; this is not a pixel-for-pixel reproduction. Leadership cards use initials because standalone approved portraits were not supplied.

The Word document explicitly requires approved client logos and publication consent. Example brand endorsements and testimonials shown in mockups are not treated as publication approval. The homepage uses the permitted neutral trust statement. No article dates, client identities or additional case-study outcomes have been invented.

## Supabase CMS setup

The CMS uses Supabase Auth, Postgres and Storage. Public and administrator database access uses the project URL and **publishable/anon key** under the existing RLS policies. Public testimonial submissions are verified by the server-side email OTP flow and then persisted with a server-only Supabase service-role client; the migration revokes direct anonymous `cms_content` inserts so clients cannot bypass OTP verification. The same key is used for private testimonial media upload and signed playback, must never be exposed as `NEXT_PUBLIC_*`, and is not used for administrator CMS mutations.

Required environment variables (local `.env.local` or your hosting provider's environment configuration):

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# Server-only; required for OTP-verified testimonial persistence, private media upload, and signed playback.
SUPABASE_SERVICE_ROLE_KEY=
APP_BASE_URL=

# Optional email notifications for persisted enquiries
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Optional delivery for testimonial media submissions
TESTIMONIAL_WEBHOOK_URL=
TESTIMONIAL_WEBHOOK_TOKEN=
```

The values are intentionally blank here; obtain them from your own Supabase project. The URL and anon key are required for CMS and admin functionality. The service-role key is required for all public testimonial submissions (including text-only submissions), private photo/video uploads, and signed URLs. Without it, testimonial submissions fail explicitly; configure it only in server-side environments.

Password recovery uses `http://localhost:3000` automatically during local development. For production, set the server-only `APP_BASE_URL` to the site's canonical HTTPS origin (for example, `https://www.astronisglobal.com`, without a path). In Supabase Auth URL Configuration, set the Site URL to the production site and add the local and production `/auth/callback` URLs to the allowed redirect URLs.

### Project and administrator bootstrap

1. Create a Supabase project and configure its Auth email/password provider. Disable public sign-ups; administrators must be invited by an operator.
2. Review and apply every missing migration in timestamp order, through `supabase/migrations/202611020001_testimonial_media_notifications.sql`. The latest migration extends the existing private asset bucket's media allowlist and size limit without changing its Storage RLS policies, revokes direct anonymous testimonial inserts so public submissions must pass through the OTP-verified server route, adds the moderation-email deduplication ledger, and exposes media references only for published testimonials.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to local and production environments. Add `SUPABASE_SERVICE_ROLE_KEY` only to server-side environments for OTP-verified testimonial persistence, media upload, and signed URL creation. Restart/redeploy the application after configuring them.
4. Invite the first administrator using Supabase Auth's dashboard. After the invited user has accepted, obtain that user's Auth UUID and run this operator-only SQL:

   ```sql
   insert into public.cms_admin_users (user_id)
   values ('<the-invited-auth-user-uuid>');
   ```

   The allowlist has no public insert policy; users cannot grant themselves admin access. Repeat the invitation and explicit allowlist insert for each administrator. Test the invitation/login flow and allowlist removal before launch.
5. Sign in at `/admin/login`. Protect the Supabase dashboard itself with MFA and tightly scoped project access.

For password recovery, add `http://localhost:3000/auth/callback` and `https://<your-production-host>/auth/callback` to Supabase Auth's allowed redirect URLs. Keep the Site URL set to the production site; the application explicitly supplies its local or production callback destination when requesting a recovery email. The callback returns to `/auth/reset-password` after exchanging the one-time code. If you customize the Reset Password email template, keep its link based on Supabase's `{{ .ConfirmationURL }}` so Supabase can verify the one-time code and forward to the allowed callback URL.

The existing `cms-assets` bucket remains public-read for approved website assets. Testimonial photos and videos use the existing private `cms-private-assets` bucket and signed URLs; supported formats are checked on both client and server, with 3 MB image and 20 MB video limits. The latest migration updates bucket MIME/size constraints but does not weaken its administrator-only storage policies. Test storage behavior and configure backups, retention, monitoring, request limits, and any required malware scanning before production.

The repository currently contains SQL migrations but no `supabase/config.toml`. Check the target project's migration history and schema before applying anything; do not rerun an already-recorded migration. Apply only missing migrations in order, and confirm the notification table, storage settings, RLS policy, and public testimonial function exist. If using the CLI, link the intended project, inspect `supabase db push --dry-run`, and apply only the required migration(s). The migration has not been applied by this code change.

### CMS behavior and deployment

`cms_content` stores JSONB content and SEO metadata with a unique `(collection, slug)`. Current admin collections are pages, services, industries, professionals, global presence, technology, insights, testimonials, and SEO. Draft and archived records are not rendered by CMS public routes. Public page content is returned through a function that projects only supported page and SEO fields; anonymous roles cannot directly select page JSON or metadata. The Website Pages collection overlays the source page routes for home, about, services, industries, professionals, insights-events, global-presence, technology-and-digital-solutions and contact, while preserving source pages as the fallback when no published CMS record exists.

Existing hardcoded content has **not** been bulk-imported into Supabase. A partial source inventory is shown in the admin as source-backed records (selected page metadata, services, industries, professionals, jurisdictions, four technology landing pages, source article entries and approved source testimonials). Those rows are synthesized from the checked-in source files until an administrator saves them; the first save upserts the record by collection and slug. Do not interpret their appearance in the admin as evidence that the corresponding database row already exists. The inventory does not yet cover all nested service details, page sections, route metadata, homepage body sections, or every complex legacy page. Those pages continue to use their original source-defined content and layouts unless that individual content has an implemented CMS overlay. Keep the source files and existing static fallback content until each migration is reviewed and verified.

The migration exposes source-record status only (collection, slug and status) through a narrow database function. This allows the homepage and testimonials page to suppress a source testimonial that has been archived or moved to draft without making unpublished content publicly readable. Other source-backed collections may still fall back to static content if archived; test each route before relying on archive/unpublish behavior there. CMS insight and testimonial publishing revalidates the affected paths.

Website enquiry submissions are validated and persisted to `cms_enquiries`; Resend is an optional notification integration, not the durable store. Admin enquiry status and internal notes stay in that operational table and are not website content. Admin login's Remember me option persists the Supabase session cookie for 30 days; otherwise it remains a browser-session cookie. Testimonial submissions are stored as pending and require recorded testimonial and identity publication consent before approval; public testimonial output includes only published records with both consent gates. Photos and uploaded/recorded videos are stored in the existing private Supabase bucket; approved public and authenticated admin views receive short-lived signed URLs. Direct video URLs are restricted to HTTPS MP4, MOV or WebM links. The existing testimonial webhook remains optional for its configured delivery integration and is not the CMS media store.

Moderation emails reuse the existing Mailtrap transactional email configuration. Approval/rejection decisions are saved before sending; a unique per-testimonial/status notification ledger prevents repeat deliveries. Existing testimonials without a verifiable OTP proof are not sent moderation email. Mailtrap production delivery depends on a production-enabled account and a verified sender configured in `MAILTRAP_API_KEY` and `MAILTRAP_FROM_EMAIL`.

The CMS is not production-configured in this repository. Before launch, apply the migration to the intended Supabase project, set the two required environment variables in every deployment environment, configure Auth email delivery/invitations, verify RLS and storage policies, configure testimonial media handling if needed, and test backups, monitoring, abuse controls and recovery. Never use test content as approved/public content.

### Local and production verification

1. For local work, use a dedicated non-production Supabase project, apply the migration, configure `.env.local`, invite and allowlist a test administrator, then run `npm run dev`.
2. Verify that `/admin/login` rejects unauthenticated access to protected routes and that the invited, allowlisted account can load each existing admin section. Submit a harmless test enquiry and verify it appears after reload; remove the test operational record through an explicitly authorized non-production cleanup after verification.
3. In a non-production project only, create a clearly identified draft source-backed record, reload the admin to verify persistence, edit it, publish it, and confirm the corresponding public route renders the updated content. Verify draft/archived behavior and confirm a failed or unauthenticated write shows an error. Remove test content when finished.
4. Run `npx tsc --noEmit`, `npm run lint` and `npm run build`. Check the existing public routes at desktop and mobile widths, including navigation, before release.
5. For production, separately verify the deployment has the correct project URL and publishable key, the production database has the reviewed migration, the administrator is explicitly allowlisted, and storage/Auth settings are correct. Use an expressly authorized production test procedure; do not publish test records otherwise. This repository has no production credentials or verified deployment target, so production publishing and live behavior have not been tested or claimed.

## Enquiry delivery

The enquiry form retains browser/server validation, consent, a honeypot, same-origin checks and field limits. A successful response is returned only after the enquiry is inserted in the configured Supabase database. Without Supabase configuration or if persistence fails, the API returns an explicit error and does not claim success. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` as server-only variables if email notifications are wanted; their absence does not prevent an enquiry from being saved to the admin inbox.

## Admin enquiry management

The existing `/admin/enquiries` inbox exports genuine `.xlsx` workbooks through admin-authorized, paginated server queries. “Download Excel” exports all enquiries regardless of active filters; “Download Filtered” applies the current search, status, and date filters. Each record can also be exported individually. Hovering or focusing an enquiry name opens its authorized full-details preview; clicking or tapping keeps it open.

## Public form verification

All public enquiry, professional application, consultation, testimonial and subscription forms require a verified email OTP and a server-checked, short-lived, single-use proof before submission. A 6-digit one-time code is delivered with the existing Mailtrap transactional email API integration. Codes expire after five minutes, allow at most five incorrect attempts and have a 60-second resend cooldown. Global and professional enquiries, professional applications, consultations, and subscriptions also require a Cloudflare Turnstile token verified server-side. The testimonial form displays Turnstile but does not require its token; testimonial submissions remain protected by the one-time email proof.

Configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the matching server-only `TURNSTILE_SECRET_KEY` from the same Cloudflare Turnstile widget in the repository-root `.env.local`. Add the hostname you use (including `localhost` for local development) to that widget's allowed hostnames. Because Next.js embeds `NEXT_PUBLIC_*` values into the client bundle, restart the development server after changing the site key and rebuild/redeploy after changing it for production.

For local development and production, set the server-only `MAILTRAP_API_KEY`, `MAILTRAP_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `EMAIL_OTP_SECRET` values. OTP sending and proof verification will fail closed if these are missing. Restart the local development server after changing `.env.local`.

```dotenv
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-rest-token
EMAIL_OTP_SECRET=at-least-32-random-characters
```

Create a persistent Upstash Redis database for OTP and proof storage. The verification flow deliberately fails closed if Redis or the OTP signing secret is missing; it does not fall back to process memory. Keep the Redis token, Mailtrap credentials and OTP signing secret out of browser code and source control.

Run the automated verification tests:

```sh
npm run test:verification
npx tsc --noEmit
npm run build
```

To test rendered form pages and direct API rejection locally, start the built site in one terminal and run the smoke test in another:

```sh
npm run start -- --hostname 127.0.0.1 --port 3123
npm run test:form-apis
```

For a live email check, configure the variables above, start the app with `npm run dev`, open any public submission form, request a code and confirm that the message arrives through the existing Mailtrap account. Verify the code and submit. Also try a wrong code five times, wait five minutes to test expiry and submit without email verification.

The automated verification suite injects a mock OTP delivery function and does not send real email; do not change working Mailtrap credentials to run it.

## Content and integrations still needed

- Approved article bodies, dates, downloadable resources, event details and expanded service/case-study copy. Current resource categories show honest empty states.
- Approved portrait assets, client logos, testimonials and video media. The testimonial gallery remains empty until approved records are supplied.
- Additional source-defined route metadata and complex legacy layouts still require mapping to CMS records to be edited from the admin. Existing content remains intact as fallback.
- Actual client/employee authentication, dashboards, assignment tracking, payments, document storage and business calculators. Menu destinations explain their availability and provide a contact path; they are not implemented backend products.
- Official social and YouTube destination URLs; none are guessed.
- Firm-approved full privacy, terms and cookie policies. Current pages are brief contact/information notices, not a complete legal policy pack.

## Validation

`npm run build` and `npm run lint` are the production checks. Browser checks cover desktop, tablet and mobile widths, menu behavior, FAQs, directory filters, image loading, route availability and required form fields. Temporary reference extracts and browser artifacts are kept in ignored `.reference/`.
