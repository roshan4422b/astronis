import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import IndiaQuickNav from "../india/india-quick-nav";
import indiaStyles from "../india/page.module.css";
import styles from "./page.module.css";

const nycImage = "/images/market-usa.jpg";

export const metadata: Metadata = {
  title: "USA Legal, Regulatory & Business Advisory",
  description:
    "Explore Astronis Global's legal, regulatory and business advisory services in the USA, supporting businesses with market entry, investment, compliance, transactions and cross-border growth.",
  alternates: { canonical: "/global-presence/usa" },
  openGraph: {
    title: "USA Legal, Regulatory & Business Advisory | Astronis Global",
    description:
      "Strategic legal, regulatory and business advisory support for organisations operating, investing and expanding in the United States.",
    url: "/global-presence/usa",
    type: "website",
  },
};

const quickLinks = [
  ["Overview", "overview"],
  ["Business Environment", "business-environment"],
  ["Regulatory Landscape", "regulatory-landscape"],
  ["Regulators", "regulators"],
  ["Capabilities", "capabilities"],
  ["Industries", "industries"],
  ["Professionals", "professionals"],
  ["Insights", "insights"],
  ["FAQs", "faqs"],
  ["Enquire", "enquire"],
] as const;

const glanceRows = [
  ["Capital", "Washington, D.C."],
  ["Region", "North America"],
  ["GDP (Nominal, 2024 est.)", "USD 28 trillion (approx.)"],
  ["Population", "334 million (approx.)"],
  ["Business environment", "Innovation-driven, open and competitive"],
  ["Key sectors", "Technology, financial services, healthcare, manufacturing, energy, consumer & retail"],
  ["Key regulators", "SEC, FCC, FDA, CFTC, FTC, IRS, USCIS and BIS"],
  ["Our support", "End-to-end legal, regulatory and business advisory"],
] as const;

const businessAreas = [
  ["building", "Market Entry", "Strategy, structuring and market access", "/services/business-advisory-consulting"],
  ["file", "Company Establishment", "Entity formation and compliance", "/services/corporate-commercial-advisory/entity-formation-business-setup"],
  ["globe", "Foreign Investment", "Regulatory framework and approvals", "/services/fema-fdi-cross-border"],
  ["network", "M&A and Joint Ventures", "Transactions and strategic partnerships", "/services/mergers-acquisitions-transactions"],
  ["document", "Commercial Contracts", "Contracting, distribution and risk management", "/services/corporate-commercial-advisory"],
  ["scale", "Tax & Regulatory", "Direct tax, state tax and regulatory support", "/services/taxation-compliance"],
  ["people", "Employment & Workforce", "HR, employment law and talent mobility", "/services/hr-employment-labour"],
  ["chart", "Expansion & Growth", "Scaling your business in the USA", "/services/business-advisory-consulting"],
] as const;

const corridorDirections = [
  {
    title: "India to USA",
    flag: "/flag/Flag_of_India.svg.webp",
    items: [
      "Market Entry & Expansion",
      "Outbound Investment",
      "Company Setup",
      "Commercial Contracts",
      "Regulatory Compliance",
      "IP Protection",
    ],
  },
  {
    title: "USA to India",
    flag: "/flag/usa.png",
    items: [
      "Investment into India",
      "Business Establishment",
      "FEMA & Regulatory Support",
      "Licensing & Approvals",
      "Tax & GST Advisory",
      "Transactions & Joint Ventures",
    ],
  },
] as const;

const industries = [
  ["Technology & IT", "/Technology, IT & ITES .png"],
  ["Financial Services", "/Banking & Financial Services .png"],
  ["Healthcare & Life Sciences", "/Banner-Consumer & Life Sciences .png"],
  ["Manufacturing", "/Manufacturing & Industrial .png"],
  ["Energy & Clean Tech", "/Banner-Energy, Power & Renewables .png"],
  ["Consumer & Retail", "/Banner- Indus- Retail & Consumer .png"],
  ["Media & Broadcasting", "/Media, Entertainment & Sports .png"],
  ["Real Estate & Construction", "/Real Estate & Construction .png"],
] as const;

const journey = [
  ["Assess", "Understand your objectives"],
  ["Structure", "Design the right solution"],
  ["Establish", "Regulatory filings and approvals"],
  ["Comply", "Ongoing regulatory support"],
  ["Operate", "Business and legal advisory"],
  ["Expand", "Scale across the USA"],
  ["Protect & Resolve", "Manage risk and disputes"],
] as const;

const professionals = [
  {
    name: "Krishna Kumar Mishra",
    role: "Founder Partner",
    focus: "Corporate · Regulatory · International",
    image: "/Professionals/krishna_kumar_mishra.jpeg",
    href: "/professionals/krishna-kumar-mishra",
  },
  {
    name: "Priti Mishra",
    role: "Partner",
    focus: "Cross-Border · Corporate · IPR",
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
    category: "Regulatory",
    title: "SEC Priorities for 2026: Key Takeaways",
    image: "/images/services/regulatory-and-compliance.webp",
  },
  {
    date: "10 Sep 2026",
    category: "Business Insight",
    title: "Opportunities for Indian Businesses in the U.S.",
    image: nycImage,
  },
  {
    date: "05 Sep 2026",
    category: "Business Update",
    title: "Recent Developments in U.S. Immigration Policy",
    image: "/images/services/hr-and-employment-advisory.webp",
  },
] as const;

const otherMarkets = [
  ["India", "/images/market-india.jpg", "/global-presence/india"],
  ["UAE", "/images/uae-dubai-skyline.jpg", "/global-presence/uae"],
  ["Singapore", "/images/market-singapore.jpg", "/global-presence/singapore"],
  ["UK", "/images/market-uk.jpg", "/global-presence/uk"],
  ["EU", "/images/market-eu.jpg", "/global-presence/eu"],
  ["Middle East", "/images/uae-dubai-skyline.jpg", "/global-presence/middle-east"],
] as const;

const faqs = [
  [
    "How can an Indian company establish a business in the USA?",
    "The right entity and operating structure depend on the business model, state, ownership and activities. We help assess formation options, registrations, governance and cross-border requirements.",
  ],
  [
    "What are the key regulatory approvals required?",
    "Requirements vary by state, sector and activity. Businesses may need federal, state or local registrations, licences and approvals from relevant industry regulators.",
  ],
  [
    "What are the tax considerations for foreign investors?",
    "Tax planning may involve federal and state income taxes, sales and use taxes, payroll obligations, withholding and treaty considerations. The appropriate analysis depends on the entity and its activities.",
  ],
  [
    "Which sectors offer the best opportunities in the USA?",
    "Opportunities span technology, financial services, healthcare, manufacturing, energy, consumer markets and many other sectors. Market selection should reflect your objectives and operating model.",
  ],
  [
    "How can Astronis support our USA expansion?",
    "We coordinate market-entry planning, entity structuring, regulatory mapping, investment and transaction support, contracts and ongoing legal and compliance advice.",
  ],
] as const;

export default function UsaPage() {
  return (
    <div className={`${indiaStyles.page} ${styles.usaPage}`}>
      <div className={indiaStyles.breadcrumbWrap}>
        <nav className={indiaStyles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/global-presence">Global Presence</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">USA</span>
        </nav>
      </div>

      <section className={indiaStyles.hero} aria-labelledby="usa-title">
        <div className={`${indiaStyles.heroPhoto} ${styles.heroPhoto}`}>
          <AssetImage
            className={styles.heroImage}
            src={nycImage}
            alt="New York and Manhattan skyline"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>
        <div className={indiaStyles.heroInner}>
          <div className={indiaStyles.heroCopy}>
            <span className={indiaStyles.eyebrow}>Global Presence</span>
            <h1 id="usa-title">USA</h1>
            <h2>Opportunity. Innovation.<br />Global Impact.</h2>
            <p>
              Strategic legal, regulatory and business advisory support for
              organisations operating, investing and expanding in the United
              States.
            </p>
            <div className={indiaStyles.heroActions}>
              <Link className={indiaStyles.primaryButton} href="#capabilities">
                Explore USA Capabilities <Icon name="arrow" />
              </Link>
              <Link className={indiaStyles.secondaryButton} href="#enquire">
                Discuss Your Requirement <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <p className={`${indiaStyles.heroNote} ${styles.heroNote}`}>
            Markets<br />Innovation<br />Investment<br />Talent<br />Global Growth
            <span />
            A stronger tomorrow together.
          </p>
        </div>
      </section>

      <IndiaQuickNav items={quickLinks} ariaLabel="USA page sections" />

      <section className={indiaStyles.overview} id="overview" aria-labelledby="overview-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.overviewCopy}>
            <span className={indiaStyles.eyebrow}>Understanding the USA</span>
            <h2 id="overview-title">A dynamic economy with global influence.</h2>
            <p>
              The United States offers one of the world&apos;s largest and most
              innovative economies, with deep capital markets, a strong
              regulatory framework and diverse opportunities across industries.
              Astronis Global supports businesses in navigating the U.S. legal,
              regulatory and commercial landscape with practical,
              solution-oriented advice.
            </p>
            <Link className={indiaStyles.textLink} href="/global-presence">
              Learn More About USA <Icon name="arrow" />
            </Link>
          </div>
          <aside className={indiaStyles.glance} aria-labelledby="glance-title">
            <h3 id="glance-title">USA at a glance</h3>
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
              <span className={indiaStyles.eyebrow}>Doing Business in the USA</span>
              <h2 id="business-title">Support across your business journey.</h2>
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

      <section className={indiaStyles.regulatory} aria-label="USA regulatory landscape and capabilities">
        <div className={indiaStyles.container}>
          <article className={indiaStyles.featureCard} id="regulatory-landscape">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Regulatory Landscape</span>
              <h2>A robust and multi-layered regulatory framework.</h2>
              <p>
                We help businesses navigate the complex U.S. regulatory
                environment across federal and state regulations, with proactive
                compliance and practical solutions.
              </p>
              <Link className={indiaStyles.textLink} href="/services/regulatory-and-compliance">
                Explore Regulatory Landscape <Icon name="arrow" />
              </Link>
            </div>
            <div className={indiaStyles.featureImage}>
              <AssetImage src="/images/services/regulatory-and-compliance.webp" alt="Regulatory compliance advisory for U.S. organisations" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
          </article>
          <article className={`${indiaStyles.featureCard} ${indiaStyles.capabilityCard}`} id="capabilities">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Our Capabilities in the USA</span>
              <h2>Practical solutions for global businesses.</h2>
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
              <AssetImage src="/Banking & Financial Services .png" alt="Modern American corporate district and financial services sector" fill sizes="(max-width: 760px) 100vw, 50vw" />
              <span className={styles.featureFlag} aria-hidden="true">
                <AssetImage src="/flag/usa.png" alt="" fill sizes="48px" />
              </span>
            </div>
          </article>
          <div className={indiaStyles.regulatorStrip} id="regulators">
            <span className={indiaStyles.eyebrow}>Key Regulators</span>
            <p>SEC <i /> FCC <i /> FDA <i /> CFTC <i /> FTC <i /> IRS <i /> USCIS <i /> BIS</p>
          </div>
        </div>
      </section>

      <section className={`${indiaStyles.marketSections} ${indiaStyles.wideStack} ${styles.usaMarket}`} aria-label="USA business corridor and industries">
        <div className={indiaStyles.container}>
          <section className={styles.corridor} aria-labelledby="corridor-title">
            <span className={indiaStyles.eyebrow}>India – USA Business Corridor</span>
            <h2 id="corridor-title">Bridging opportunities.</h2>
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
              Explore the India-USA Corridor <Icon name="arrow" />
            </Link>
          </section>

          <section className={`${indiaStyles.industries} ${styles.usaIndustries}`} id="industries" aria-labelledby="industries-title">
            <div className={indiaStyles.industryHeading}>
              <span className={indiaStyles.eyebrow}>Industries We Support in the USA</span>
              <h2 id="industries-title">Sector-focused advisory for a dynamic economy.</h2>
              <Link className={indiaStyles.textLink} href="/industries">
                Explore All Industries <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.usaIndustryGrid}>
              {industries.map(([name, image]) => (
                <Link href="/industries" className={indiaStyles.industryTile} key={name}>
                  <span className={indiaStyles.industryImage}>
                    <AssetImage src={image} alt={`${name} sector in the USA`} fill sizes="(max-width: 760px) 45vw, 15vw" />
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
            <span className={indiaStyles.eyebrow}>Professionals Supporting USA</span>
            <h2 id="professionals-title">Experienced professionals. Global perspective.</h2>
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
          <aside className={`${indiaStyles.networkIntro} ${styles.usaNetwork}`} aria-labelledby="network-title">
            <Icon name="globe" className={styles.networkIcon} />
            <span className={indiaStyles.eyebrow}>Our International Network</span>
            <h2 id="network-title">Local expertise. Global collaboration.</h2>
            <p>
              We work with a network of trusted international professionals and
              firms to support your cross-border objectives in the USA and
              beyond.
            </p>
            <Link className={indiaStyles.textLink} href="/professionals/international-network">
              Explore Our Network <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>

      <section className={`${indiaStyles.discovery} ${indiaStyles.wideStack}`} aria-label="USA insights, markets and FAQs">
        <div className={indiaStyles.container}>
          <section className={indiaStyles.insights} id="insights" aria-labelledby="insights-title">
            <div className={indiaStyles.discoveryHeading}>
              <div>
                <span className={indiaStyles.eyebrow}>Latest from USA</span>
                <h2 id="insights-title">Insights &amp; Regulatory Updates</h2>
              </div>
              <Link className={indiaStyles.textLink} href="/insights">View All Insights <Icon name="arrow" /></Link>
            </div>
            <nav className={indiaStyles.insightFilters} aria-label="USA insight categories">
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

      <section className={indiaStyles.cta} id="enquire" aria-labelledby="enquire-title">
        <div className={indiaStyles.ctaImage}>
          <AssetImage src={nycImage} alt="New York City skyline at dusk" fill sizes="100vw" />
        </div>
        <div className={indiaStyles.container}>
          <div>
            <h2 id="enquire-title">Discuss Your USA Requirement</h2>
            <p>Our team is here to help you explore opportunities in the USA.</p>
          </div>
          <Link className={indiaStyles.primaryButton} href="/contact#enquiry-form">
            Send an Enquiry <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}