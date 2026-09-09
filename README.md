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

## Enquiry delivery

The form has browser and server validation, consent, a honeypot, same-origin checks, field limits and delivery error handling. It does not pretend to submit successfully when delivery is not configured.

Set these server-only variables in `.env.local` or your hosting environment:

```dotenv
ENQUIRY_WEBHOOK_URL=https://your-backend.example/enquiries
ENQUIRY_WEBHOOK_TOKEN=your-optional-bearer-token
TESTIMONIAL_WEBHOOK_URL=https://your-backend.example/testimonials
TESTIMONIAL_WEBHOOK_TOKEN=your-optional-bearer-token
```

`POST /api/enquiry` forwards validated JSON to the configured HTTPS endpoint. A successful upstream response must mean the enquiry has been durably accepted. The website does not send a separate email acknowledgement. The user receives an on-screen acknowledgement only after a successful upstream response.

`POST /api/testimonials` forwards multipart form data, including optional photo/video, with `status=pending-review`. Videos may be recorded in supported browsers or uploaded as MP4, WebM or MOV (20 MB maximum). Photos may be JPG or PNG (3 MB maximum). Camera access requires localhost or HTTPS and browser permission.

These endpoints are integration adapters, not a database, CMS, inbox or moderation dashboard. Configure durable storage, upload scanning, rate limiting and reviewer access in the receiving backend before enabling public submissions. Configure your hosting request-size limits for video uploads. Test with the chosen backend before launch.

## Content and integrations still needed

- Approved article bodies, dates, downloadable resources, event details and expanded service/case-study copy. Current resource categories show honest empty states.
- Approved portrait assets, client logos, testimonials and video media. The testimonial gallery remains empty until approved records are supplied.
- A CMS and editorial publishing/moderation workflow. Current content is maintained in source files.
- Actual client/employee authentication, dashboards, assignment tracking, payments, document storage and business calculators. Menu destinations explain their availability and provide a contact path; they are not implemented backend products.
- Official social and YouTube destination URLs; none are guessed.
- Firm-approved full privacy, terms and cookie policies. Current pages are brief contact/information notices, not a complete legal policy pack.

## Validation

`npm run build` and `npm run lint` are the production checks. Browser checks cover desktop, tablet and mobile widths, menu behavior, FAQs, directory filters, image loading, route availability and required form fields. Temporary reference extracts and browser artifacts are kept in ignored `.reference/`.
