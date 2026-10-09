import type { Metadata } from "next";
import Link from "next/link";
import GlobalEnquiryForm from "@/app/_components/global-enquiry-form";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import IndiaQuickNav from "../india/india-quick-nav";
import indiaStyles from "../india/page.module.css";
import styles from "./page.module.css";

const dubaiImage =
  "/images/uae-dubai-skyline.jpg";

export const metadata: Metadata = {
  title: "UAE Legal, Regulatory & Business Advisory",
  description:
    "Explore Astronis Global's legal, regulatory and business advisory services in the UAE, supporting businesses with market entry, investment, compliance, transactions and cross-border growth.",
  alternates: { canonical: "/global-presence/uae" },
  openGraph: {
    title: "UAE Legal, Regulatory & Business Advisory | Astronis Global",
    description:
      "Integrated legal, regulatory and business advisory for organisations operating, investing and expanding across the UAE.",
    url: "/global-presence/uae",
    type: "website",
  },
};

const quickLinks = [
  ["Overview", "overview"],
  ["Business Environment", "business-environment"],
  ["Regulatory Landscape", "regulatory-landscape"],
  ["Capabilities", "capabilities"],
  ["Industries", "industries"],
  ["Professionals", "professionals"],
  ["Insights", "insights"],
  ["FAQs", "faqs"],
  ["Enquire", "enquire"],
] as const;

const glanceRows = [
  ["Capital", "Abu Dhabi"],
  ["Region", "Middle East"],
  ["GDP", "USD 519 billion (approx.)"],
  ["Population", "10.5 million (approx.)"],
  ["Business environment", "Open, diversified and investor-friendly"],
  ["Key sectors", "Energy, oil & gas, financial services, real estate, tourism, technology, healthcare and manufacturing"],
  ["Key regulators", "ADGM, DIFC, SCA, Central Bank of the UAE, Ministry of Economy and free-zone authorities"],
  ["Our support", "End-to-end legal, regulatory and business advisory"],
] as const;

const businessAreas = [
  ["building", "Market Entry", "Strategy, structuring and market access", "/services/business-advisory-consulting"],
  ["file", "Company Establishment", "Mainland, free-zone and offshore options", "/services/corporate-commercial-advisory/entity-formation-business-setup"],
  ["globe", "Foreign Investment", "Regulatory approvals and compliance", "/services/fema-fdi-cross-border"],
  ["network", "M&A and Joint Ventures", "Transactions and strategic partnerships", "/services/corporate-commercial-advisory"],
  ["document", "Commercial Contracts", "Drafting, negotiation and risk management", "/services/corporate-commercial-advisory"],
  ["scale", "Tax & Regulatory", "Corporate tax, VAT and regulatory support", "/services/taxation-compliance"],
  ["people", "Employment & Mobility", "Workforce, visas and labour law advisory", "/services/hr-employment-labour"],
  ["chart", "Expansion & Growth", "Scaling your business across the region", "/services/business-advisory-consulting"],
] as const;

const corridorDirections = [
  {
    title: "India to UAE",
    flag: "/flag/Flag_of_India.svg.webp",
    items: [
      "Market Entry & Setup",
      "Outbound Investment",
      "Commercial Contracts",
      "Regulatory Compliance",
      "IP Protection",
      "Business Expansion",
    ],
  },
  {
    title: "UAE to India",
    flag: "/flag/uae.png",
    items: [
      "Investment into India",
      "Company Establishment",
      "FEMA & Regulatory Support",
      "Licensing & Approvals",
      "Tax & GST Advisory",
      "Transactions & Joint Ventures",
    ],
  },
] as const;

const industries = [
  ["Financial Services", "/Banking & Financial Services .png"],
  ["Technology & IT", "/Technology, IT & ITES .png"],
  ["Real Estate & Construction", "/Real Estate & Construction .png"],
  ["Hospitality & Tourism", "/Hospitality, Travel & Tourism .png"],
  ["Healthcare & Life Sciences", "/Healthcare & Pharmaceuticals .png"],
  ["E-commerce & Retail", "/Retail & E-Commerce .png"],
  ["Energy & Infrastructure", "/Banner-Energy, Power & Renewables .png"],
  ["Manufacturing & Industrial", "/Manufacturing & Industrial .png"],
] as const;

const journey = [
  ["Assess", "Understand your objectives"],
  ["Structure", "Design the right solution"],
  ["Establish", "Registrations and approvals"],
  ["Comply", "Ongoing regulatory support"],
  ["Operate", "Business and legal advisory"],
  ["Expand", "Scale across markets"],
  ["Protect & Resolve", "Manage risk and disputes"],
] as const;

const professionals = [
  {
    name: "Krishna Kumar Mishra",
    role: "Founder - Partner",
    focus: "Corporate · Regulatory · International",
    image: "/Professionals/krishna_kumar_mishra.jpeg",
    href: "/professionals/krishna-kumar-mishra",
  },
  {
    name: "Priti Mishra",
    role: "Partner",
    focus: "Civil · Corporate · IPR",
    image: "/Professionals/pritimishra.jpeg",
    href: "/professionals/priti-mishra",
  },
  {
    name: "S. N. Pandey",
    role: "Senior Associate",
    focus: "International Business · Arbitration",
    image: null,
    href: "/professionals",
  },
] as const;

const articles = [
  {
    date: "18 Sep 2026",
    category: "Tax & Regulatory",
    title: "UAE Corporate Tax: Key Considerations for Businesses in 2026",
    image: "/images/services/gst-and-indirect-tax-regulatory-support.webp",
  },
  {
    date: "08 Sep 2026",
    category: "Business Insight",
    title: "Opportunities for Indian Businesses in the UAE",
    image: "/international-network-hero.png",
  },
  {
    date: "26 Aug 2026",
    category: "Regulatory",
    title: "Recent Regulatory Developments in UAE Free Zones and DMCC",
    image: "/images/services/regulatory-and-compliance.webp",
  },
] as const;

const otherMarkets = [
  ["India", "/images/market-india.jpg", "/global-presence/india"],
  ["Singapore", "/images/market-singapore.jpg", "/global-presence/singapore"],
  ["UK", "/images/market-uk.jpg", "/global-presence/uk"],
  ["USA", "/images/market-usa.jpg", "/global-presence/usa"],
  ["EU", "/images/market-eu.jpg", "/global-presence/eu"],
  ["Middle East", dubaiImage, "/global-presence/middle-east"],
] as const;

const faqs = [
  [
    "What are the main business zones in the UAE?",
    "Businesses may establish on the mainland or in one of the UAE's free zones. The right option depends on the activity, ownership, licensing, location and intended operating model.",
  ],
  [
    "Can a foreign company own 100% of a business in the UAE?",
    "Many activities permit full foreign ownership, subject to the applicable activity, licensing authority and any strategic-impact or sector-specific restrictions. The current rules should be checked for each proposed business.",
  ],
  [
    "What are the key regulatory approvals required?",
    "Requirements can include trade-name reservation, initial approval, licence and activity approvals, establishment registrations and any sector or free-zone permissions relevant to the business.",
  ],
  [
    "How does the UAE corporate tax regime apply?",
    "Corporate tax treatment depends on taxable income, entity and free-zone status, qualifying activities, available reliefs and filing obligations. Businesses should review their own position against current UAE rules.",
  ],
  [
    "How can Astronis support our UAE–India business expansion?",
    "We coordinate market-entry planning, entity structuring, regulatory mapping, investment and transaction support, contracts and ongoing legal and compliance advice across the corridor.",
  ],
] as const;

export default function UaePage() {
  return (
    <div className={`${indiaStyles.page} ${styles.uaePage}`}>
      <div className={indiaStyles.breadcrumbWrap}>
        <nav className={indiaStyles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/global-presence">Global Presence</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">UAE</span>
        </nav>
      </div>

      <section className={indiaStyles.hero} aria-labelledby="uae-title">
        <div className={indiaStyles.heroPhoto}>
          <AssetImage
            src={dubaiImage}
            alt="Dubai skyline and Burj Khalifa at dusk"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>
        <div className={indiaStyles.heroInner}>
          <div className={indiaStyles.heroCopy}>
            <span className={indiaStyles.eyebrow}>Global Presence</span>
            <h1 id="uae-title">UAE</h1>
            <h2>Gateway to Opportunity.<br />A Strategic Global Hub.</h2>
            <p>
              Integrated legal, regulatory and business advisory support for
              organisations operating, investing and expanding across the UAE.
            </p>
            <div className={indiaStyles.heroActions}>
              <Link className={indiaStyles.primaryButton} href="#capabilities">
                Explore UAE Capabilities <Icon name="arrow" />
              </Link>
              <Link className={indiaStyles.secondaryButton} href="#enquire">
                Discuss Your Requirement <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <p className={`${indiaStyles.heroNote} ${styles.heroNote}`}>
            Business<br />Investment<br />Regulation<br />Connectivity
            <span />
            A stronger UAE. Stronger together.
          </p>
        </div>
      </section>

      <IndiaQuickNav items={quickLinks} ariaLabel="UAE page sections" />

      <section className={indiaStyles.overview} id="overview" aria-labelledby="overview-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.overviewCopy}>
            <span className={indiaStyles.eyebrow}>Understanding the UAE</span>
            <h2 id="overview-title">A dynamic economy at the crossroads of global trade.</h2>
            <p>
              The United Arab Emirates (UAE) has emerged as a leading global
              business hub, offering a stable economy, world-class
              infrastructure, a progressive regulatory framework and strategic
              access to key international markets. Astronis Global supports
              businesses in navigating the UAE&apos;s legal, regulatory and
              commercial landscape with practical, solution-oriented advice.
            </p>
            <Link className={indiaStyles.textLink} href="/global-presence">
              Learn More About UAE <Icon name="arrow" />
            </Link>
          </div>
          <aside className={indiaStyles.glance} aria-labelledby="glance-title">
            <h3 id="glance-title">UAE at a glance</h3>
            <dl>
              {glanceRows.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className={indiaStyles.business} id="business-environment" aria-labelledby="business-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.sectionHeading}>
            <div>
              <span className={indiaStyles.eyebrow}>Doing Business in the UAE</span>
              <h2 id="business-title">Comprehensive support across your business journey.</h2>
            </div>
            <Link className={indiaStyles.textLink} href="/services">
              View All Business Areas <Icon name="arrow" />
            </Link>
          </div>
          <div className={indiaStyles.businessGrid}>
            {businessAreas.map(([icon, title, description, href]) => (
              <Link className={indiaStyles.businessCard} href={href} key={title}>
                <Icon name={icon} />
                <strong>{title}</strong>
                <span>{description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={indiaStyles.regulatory} aria-label="UAE regulatory landscape and capabilities">
        <div className={indiaStyles.container}>
          <article className={indiaStyles.featureCard} id="regulatory-landscape">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Regulatory Landscape</span>
              <h2>A progressive and diversified regulatory environment.</h2>
              <p>
                We help businesses understand and comply with the UAE&apos;s
                multi-layered regulatory framework, including mainland,
                free-zone and special economic regimes.
              </p>
              <Link className={indiaStyles.textLink} href="/services/regulatory-and-compliance">
                Explore Regulatory Landscape <Icon name="arrow" />
              </Link>
            </div>
            <div className={indiaStyles.featureImage}>
              <AssetImage src="/images/services/regulatory-and-compliance.webp" alt="Regulatory and compliance advisory" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
          </article>
          <article className={`${indiaStyles.featureCard} ${indiaStyles.capabilityCard}`} id="capabilities">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Our Capabilities in the UAE</span>
              <h2>Practical solutions for complex business needs.</h2>
              <p>
                From market entry to regulatory compliance and dispute
                resolution, we provide integrated support through a
                multidisciplinary team.
              </p>
              <Link className={indiaStyles.textLink} href="/services">
                View All Relevant Services <Icon name="arrow" />
              </Link>
            </div>
            <div className={indiaStyles.featureImage}>
              <AssetImage src={dubaiImage} alt="Dubai business district and skyline" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
          </article>
        </div>
      </section>

      <section className={`${indiaStyles.marketSections} ${indiaStyles.wideStack} ${styles.uaeMarket}`} aria-label="UAE business corridor and industries">
        <div className={indiaStyles.container}>
          <section className={styles.corridor} aria-labelledby="corridor-title">
            <span className={indiaStyles.eyebrow}>India – UAE Business Corridor</span>
            <h2 id="corridor-title">Strengthening bilateral opportunities.</h2>
            <div className={styles.corridorGrid}>
              {corridorDirections.map((direction) => (
                <article className={styles.corridorCard} key={direction.title}>
                  <div className={styles.corridorCardHeading}>
                    <span className={styles.corridorFlag}>
                      <AssetImage src={direction.flag} alt="" fill sizes="36px" />
                    </span>
                    <h3>{direction.title}</h3>
                  </div>
                  <ul>
                    {direction.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <Link className={indiaStyles.textLink} href="#enquire">
              Explore the India-UAE Corridor <Icon name="arrow" />
            </Link>
          </section>

          <section className={`${indiaStyles.industries} ${styles.uaeIndustries}`} id="industries" aria-labelledby="industries-title">
            <div className={indiaStyles.industryHeading}>
              <span className={indiaStyles.eyebrow}>Industries We Support in the UAE</span>
              <h2 id="industries-title">Sector-focused advisory for a diversified economy.</h2>
              <Link className={indiaStyles.textLink} href="/industries">
                View All Industries <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.uaeIndustryGrid}>
              {industries.map(([name, image]) => (
                <Link href="/industries" className={indiaStyles.industryTile} key={name}>
                  <span className={indiaStyles.industryImage}>
                    <AssetImage src={image} alt={`${name} business sector`} fill sizes="(max-width: 760px) 45vw, 15vw" />
                  </span>
                  <strong>{name}</strong>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className={indiaStyles.journey} aria-labelledby="journey-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.journeyIntro}>
            <span className={indiaStyles.eyebrow}>From Opportunity to Operation</span>
            <h2 id="journey-title">Our advisory journey.</h2>
          </div>
          <ol className={indiaStyles.journeySteps}>
            {journey.map(([title, description], index) => (
              <li key={title}>
                <span className={indiaStyles.journeyNumber}>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <small>{description}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={indiaStyles.professionalSection} id="professionals" aria-labelledby="professionals-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.professionalIntro}>
            <span className={indiaStyles.eyebrow}>Professionals Supporting UAE</span>
            <h2 id="professionals-title">Experienced professionals. Global expertise.</h2>
            <Link className={indiaStyles.textLink} href="/professionals">
              View All Professionals <Icon name="arrow" />
            </Link>
          </div>
          <div className={indiaStyles.professionalGrid}>
            {professionals.map((person) => (
              <article className={indiaStyles.professionalCard} key={person.name}>
                <div className={indiaStyles.professionalPhoto}>
                  {person.image ? (
                    <AssetImage src={person.image} alt={person.name} fill sizes="(max-width: 760px) 80vw, 20vw" />
                  ) : (
                    <span aria-label={`${person.name} profile image unavailable`}>SP</span>
                  )}
                </div>
                <div className={indiaStyles.professionalInfo}>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                  <small>{person.focus}</small>
                  <Link href={person.href}>View Profile <Icon name="arrow" /></Link>
                </div>
              </article>
            ))}
          </div>
          <aside className={`${indiaStyles.networkIntro} ${styles.uaeNetwork}`} aria-labelledby="network-title">
            <Icon name="globe" className={styles.networkIcon} />
            <span className={indiaStyles.eyebrow}>Our International Network</span>
            <h2 id="network-title">Local insight. Global collaboration.</h2>
            <p>
              We work with a network of trusted international professionals and
              firms to support your objectives in the UAE and beyond.
            </p>
            <Link className={indiaStyles.textLink} href="/professionals/international-network">
              Explore Our Network <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>

      <section className={`${indiaStyles.discovery} ${indiaStyles.wideStack}`} aria-label="UAE insights, markets and FAQs">
        <div className={indiaStyles.container}>
          <section className={indiaStyles.insights} id="insights" aria-labelledby="insights-title">
            <div className={indiaStyles.discoveryHeading}>
              <div>
                <span className={indiaStyles.eyebrow}>Latest from UAE</span>
                <h2 id="insights-title">Insights &amp; Regulatory Updates</h2>
              </div>
              <Link className={indiaStyles.textLink} href="/insights">View All Insights <Icon name="arrow" /></Link>
            </div>
            <nav className={indiaStyles.insightFilters} aria-label="UAE insight categories">
              <Link href="/insights/articles" aria-current="page">Articles</Link>
              <Link href="/insights/legal-updates">Legal Updates</Link>
              <Link href="/insights/business-updates">Business Updates</Link>
              <Link href="/insights">Government Notifications</Link>
            </nav>
            <div className={indiaStyles.articleGrid}>
              {articles.map((article) => (
                <Link href="/insights" className={indiaStyles.articleCard} key={article.title}>
                  <span className={indiaStyles.articleImage}>
                    <AssetImage src={article.image} alt="" fill sizes="(max-width: 760px) 90vw, 24vw" />
                  </span>
                  <span className={indiaStyles.articleMeta}>{article.date} <i /> {article.category}</span>
                  <strong>{article.title}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className={indiaStyles.jurisdictions} aria-labelledby="markets-title">
            <span className={indiaStyles.eyebrow}>Explore Other Markets</span>
            <h2 id="markets-title">Expand Your Global Footprint</h2>
            <div className={indiaStyles.jurisdictionGrid}>
              {otherMarkets.map(([name, image, href]) => (
                <Link href={href} key={name}>
                  <span><AssetImage src={image} alt={`${name} skyline`} fill sizes="(max-width: 760px) 42vw, 12vw" /></span>
                  <strong>{name}</strong>
                </Link>
              ))}
            </div>
            <Link className={indiaStyles.textLink} href="/global-presence">
              View All Jurisdictions <Icon name="arrow" />
            </Link>
          </section>

          <section className={indiaStyles.faqs} id="faqs" aria-labelledby="faqs-title">
            <span className={indiaStyles.eyebrow}>Frequently Asked Questions</span>
            <h2 id="faqs-title">Answers to common queries.</h2>
            <div className={indiaStyles.faqList}>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<Icon name="chevron" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <Link className={indiaStyles.textLink} href="/faqs">View All FAQs <Icon name="arrow" /></Link>
          </section>
        </div>
      </section>

      <section className={styles.enquiry} id="enquire" aria-label="UAE enquiry">
        <div className={styles.enquiryIntro}>
          <AssetImage src={dubaiImage} alt="Dubai skyline along the coast" fill sizes="(max-width: 760px) 100vw, 30vw" />
          <div className={styles.enquiryIntroCopy}>
            <h2>Discuss Your UAE Requirement</h2>
            <p>Our team is here to help you explore opportunities in the UAE.</p>
          </div>
        </div>
        <div className={styles.enquiryForm}>
          <GlobalEnquiryForm
            context="international"
            defaultCategory="international"
            defaultSelection=""
            variant="market"
            title="Request a Consultation"
            description="Share your requirements and our team will connect you with the right advisor."
          />
        </div>
      </section>

      <section className={styles.contactStrip} aria-label="Contact Astronis Global">
        <div>
          <Icon name="phone" />
          <span><strong>Speak to Our Team</strong><a href="tel:+919311664455">+91 93116 64455</a></span>
        </div>
        <div>
          <Icon name="mail" />
          <span><strong>Email Us</strong><a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a></span>
        </div>
        <div>
          <Icon name="calendar" />
          <span><strong>Schedule a Consultation</strong><Link href="/contact">Let&apos;s discuss your requirements.</Link></span>
        </div>
      </section>
    </div>
  );
}