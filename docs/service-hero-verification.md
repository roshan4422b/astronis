# Main service hero verification

Checked against the production build served locally. Every route returned HTTP 200 and its rendered HTML contained the configured hero image URL. The 11 service entries render through the shared `ServiceHero` and `service-template.module.css`.

| Status | Main service route | Hero image |
| --- | --- | --- |
| [x] | `/services/corporate-commercial-advisory` | `/images/services/corporate-and-commercial-advisory.webp` |
| [x] | `/services/regulatory-services` | `/images/services/regulatory-and-compliance.webp` |
| [x] | `/services/litigation-dispute-resolution` | `/images/services/litigation-and-dispute-resolution.webp` |
| [x] | `/services/business-advisory-contracts` | `/images/services/business-advisory-and-consulting.webp` |
| [x] | `/services/licensing-registrations` | `/images/services/licensing-and-registrations.webp` |
| [x] | `/services/intellectual-property-right-services` | `/images/services/intellectual-property-rights.webp` |
| [x] | `/services/fema-fdi-cross-border` | `/images/services/fema-fdi-and-foreign-exchange-advisory.webp` |
| [x] | `/services/taxation-compliance` | `/images/services/gst-and-indirect-tax-regulatory-support.webp` |
| [x] | `/services/banking-insolvency-restructuring-advisory` | `/images/services/banking-nbfc-and-financial-services-advisory.webp` |
| [x] | `/services/industrial-employment-forensics-advisory` | `/images/services/risk-governance-and-forensic-advisory.webp` |
| [x] | `/services/environmental-technology-sector-specific` | `/images/services/esg-and-sustainability-advisory.webp` |

The shared `Header` and `ServicesMenu` remain the navigation implementation. Service category navigation continues to use the shared `SectionNavigation` component. Responsive breakpoints remain centralized in the service template stylesheet.

Visual screenshot review at desktop and mobile sizes is not complete: local headless Chrome and Edge could not start their GPU renderer in this environment. The supplied reference URL was also inaccessible. The production build and direct route/image checks passed.
