import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import IndiaQuickNav from "../india/india-quick-nav";
import indiaStyles from "../india/page.module.css";
import styles from "./page.module.css";

const quickLinks = [
  ["Overview", "overview"],
  ["Business Environment", "business-environment"],
  ["Regulatory Landscape", "regulatory-landscape"],
  ["Key Markets", "key-markets"],
  ["Capabilities", "capabilities"],
  ["Industries", "industries"],
  ["Professionals", "professionals"],
  ["Insights", "insights"],
  ["FAQs", "faqs"],
  ["Enquire", "enquire"],
] as const;

const businessAreas = [
  ["building", "Market Entry", "Strategy and jurisdiction selection", "/services/business-advisory-and-consulting"],
  ["file", "Company Establishment", "Mainland, Free Zone and offshore options", "/services/business-formation"],
  ["globe", "Foreign Investment", "Regulatory approvals and incentives", "/services/foreign-investment"],
  ["network", "M&A and Joint Ventures", "Transactions and strategic partnerships", "/services/mergers-acquisitions-transactions"],
  ["document", "Commercial Contracts", "Contracting, distribution and risk management", "/services/corporate-and-commercial-advisory"],
  ["scale", "Tax & Regulatory", "Direct tax, VAT and regulatory support", "/services/taxation-compliance"],
  ["people", "Employment & Workforce", "HR, employment law and workforce mobility", "/services/hr-and-employment-advisory"],
  ["chart", "Expansion & Growth", "Scaling your business across the region", "/services/business-advisory-and-consulting"],
] as const;

const glanceRows = [
  ["Region", "Middle East"],
  ["Key Markets", "UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Jordan and wider GCC"],
  ["Combined GDP (2024 est.)", "USD 3.6 trillion (approx.)"],
  ["Population", "~450 million (approx.)"],
  ["Business Environment", "Investment-driven, diversified, reform-oriented"],
  ["Key Sectors", "Energy, Infrastructure, Real Estate, Financial Services, Technology, Healthcare, Tourism"],
  ["Key Regulators", "Central Banks, Capital Market Authorities, Free Zone Authorities, Sector Regulators"],
  ["Our Support", "End-to-end legal, regulatory and business advisory"],
] as const;

const corridorDirections = [
  {
    title: "India → Middle East",
    flag: "/flag/Flag_of_India.svg.webp",
    items: [
      "Market Entry & Expansion",
      "Outbound Investment",
      "Commercial Contracts",
      "Regulatory Compliance",
      "FEMA Advisory",
      "Talent Mobility",
    ],
  },
  {
    title: "Middle East → India",
    flag: "/flag/uae.png",
    items: [
      "Investment into India",
      "Business Establishment",
      "Licensing & Approvals",
      "Tax & GST Advisory",
      "Joint Ventures & Collaborations",
      "Transactions & Dispute Support",
    ],
  },
] as const;

const industries = [
  ["Energy & Natural Resources", "/Banner-Energy, Power & Renewables .png"],
  ["Infrastructure & Construction", "/Real Estate & Construction .png"],
  ["Financial Services", "/Banking & Financial Services .png"],
  ["Real Estate & Hospitality", "/Real Estate & Construction .png"],
  ["Technology & Innovation", "/Technology, IT & ITES .png"],
  ["Healthcare & Life Sciences", "/Healthcare & Pharmaceuticals .png"],
  ["Manufacturing & Industrial", "/Manufacturing & Industrial .png"],
  ["Aviation & Logistics", "/Aviation, Aerospace & Defence .png"],
] as const;

const journey = [
  ["Assess", "Understand your objectives"],
  ["Structure", "Design the right solution"],
  ["Establish", "Regulatory filings and approvals"],
  ["Comply", "Ongoing regulatory support"],
  ["Operate", "Business and legal advisory"],
  ["Expand", "Scale across the region"],
  ["Protect & Resolve", "Manage risk and disputes"],
] as const;

const professionals = [
  {
    name: "Krishna Kumar Mishra",
    role: "Founder Partner",
    focus: "Corporate • Regulatory • International",
    image: "/Professionals/krishna_kumar_mishra.jpeg",
    href: "/professionals/krishna-kumar-mishra",
  },
  {
    name: "Priti Mishra",
    role: "Partner",
    focus: "Cross-Border • Corporate • IPR",
    image: "/Professionals/pritimishra.jpeg",
    href: "/professionals/priti-mishra",
  },
  {
    name: "S. N. Pandey",
    role: "Senior Associate",
    focus: "International Business • Arbitration",
    image: null,
    href: "/professionals",
  },
] as const;

const articles = [
  {
    date: "18 Sep 2026",
    category: "Tax & Regulatory",
    title: "UAE Introduces New Corporate Tax Clarifications for Free Zones",
    image: "/images/uae-dubai-skyline.jpg",
  },
  {
    date: "10 Sep 2026",
    category: "Business",
    title: "Saudi Arabia's New Investment Incentives – Key Opportunities",
    image: "/images/uae-dubai-skyline.jpg",
  },
  {
    date: "05 Sep 2026",
    category: "Regulatory",
    title: "Qatar's Evolving Regulatory Framework for Foreign Investors",
    image: "/images/uae-dubai-skyline.jpg",
  },
] as const;

const otherMarkets = [
  ["India", "/images/market-india.jpg", "/global-presence/india"],
  ["UAE", "/images/uae-dubai-skyline.jpg", "/global-presence/uae"],
  ["Singapore", "/images/market-singapore.jpg", "/global-presence/singapore"],
  ["UK", "/images/market-uk.jpg", "/global-presence/uk"],
  ["USA", "/images/market-usa.jpg", "/global-presence/usa"],
  ["EU", "/images/market-eu.jpg", "/global-presence/european-union"],
] as const;

const faqs = [
  [
    "Which countries are covered under Middle East advisory?",
    "We support businesses across the key Gulf markets and wider Middle East region, including the UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Jordan and other GCC jurisdictions.",
  ],
  [
    "What are the key sectors for investment in the region?",
    "The region offers strong opportunities in energy, infrastructure, real estate, financial services, technology, healthcare, tourism and industrial manufacturing.",
  ],
  [
    "How can an Indian company establish a business in the UAE?",
    "The route depends on the business activity, intended market, ownership model and whether the company is set up in the mainland, a free zone or another suitable structure.",
  ],
  [
    "What regulatory approvals are typically required?",
    "Requirements can include company registration, licensing, sector approvals, real-estate or project permissions, tax registration and compliance with local authority rules.",
  ],
  [
    "How does Astronis support cross-border operations in the Middle East?",
    "We work across market entry, regulatory compliance, commercial structuring, licensing, corporate governance and transaction support to help clients operate smoothly and compliantly.",
  ],
] as const;

export const metadata: Metadata = {
  title: "Middle East Global Presence | Astronis Global",
  description:
    "Strategic legal, regulatory and business advisory support for organisations operating, investing and expanding across the Middle East.",
  alternates: { canonical: "/global-presence/middle-east" },
  openGraph: {
    title: "Middle East | Global Presence | Astronis Global",
    description:
      "Opportunity. Partnership. Growth. Advisory support across the Middle East.",
    url: "/global-presence/middle-east",
    type: "website",
  },
};

export default function MiddleEastPage() {
  return (
    <div className={`${indiaStyles.page} ${styles.middleEastPage}`}>
      <div className={indiaStyles.breadcrumbWrap}>
        <nav className={indiaStyles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/global-presence">Global Presence</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Middle East</span>
        </nav>
      </div>

      <section className={`${indiaStyles.hero} ${styles.middleEastHero}`} aria-labelledby="middle-east-title">
        <div className={`${indiaStyles.heroPhoto} ${styles.heroPhoto}`}>
          <AssetImage
            src="/images/uae-dubai-skyline.jpg"
            alt="Dubai skyline at sunset with modern towers and Burj Khalifa"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
          <span className={styles.heroFlag} aria-hidden="true">
            <AssetImage src="/flag/uae.png" alt="" fill sizes="100px" />
          </span>
        </div>
        <div className={indiaStyles.heroInner}>
          <div className={indiaStyles.heroCopy}>
            <span className={indiaStyles.eyebrow}>Global Presence</span>
            <h1 id="middle-east-title">Middle East</h1>
            <h2>Opportunity. Partnership. Growth.</h2>
            <p>
              Strategic legal, regulatory and business advisory support for
              organisations operating, investing and expanding across the
              Middle East.
            </p>
            <div className={indiaStyles.heroActions}>
              <Link className={indiaStyles.primaryButton} href="#capabilities">
                Explore Middle East Capabilities <Icon name="arrow" />
              </Link>
              <Link className={indiaStyles.secondaryButton} href="#enquire">
                Discuss Your Requirement <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <p className={`${indiaStyles.heroNote} ${styles.heroNote}`}>
            Investment<br />
            Regulation<br />
            Infrastructure<br />
            Innovation<br />
            Regional Growth
            <span />
            A stronger<br />
            tomorrow together.
          </p>
        </div>
      </section>

      <IndiaQuickNav items={quickLinks} ariaLabel="Middle East page sections" />

      <section className={indiaStyles.overview} id="overview" aria-labelledby="overview-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.overviewCopy}>
            <span className={indiaStyles.eyebrow}>Understanding the Middle East</span>
            <h2 id="overview-title">A region of strategic opportunity.</h2>
            <p>
              The Middle East is a dynamic and strategically important region,
              offering significant opportunities across trade, investment,
              infrastructure, energy, technology and services. Astronis Global
              supports businesses in navigating the legal, regulatory and
              commercial landscape across key Middle Eastern markets with
              practical, solution-oriented advice.
            </p>
            <Link className={indiaStyles.textLink} href="/global-presence">
              Learn More About the Middle East <Icon name="arrow" />
            </Link>
          </div>
          <aside className={indiaStyles.glance} aria-labelledby="glance-title">
            <h3 id="glance-title">Middle East at a glance</h3>
            <dl>
              {glanceRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className={indiaStyles.business} id="business-environment" aria-labelledby="business-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.sectionHeading}>
            <div>
              <span className={indiaStyles.eyebrow}>Doing Business in the Middle East</span>
              <h2 id="business-title">Support for your business journey.</h2>
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

      <section className={indiaStyles.regulatory} aria-label="Middle East regulatory landscape and capabilities">
        <div className={indiaStyles.container}>
          <article className={indiaStyles.featureCard} id="regulatory-landscape">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Regulatory Landscape</span>
              <h2>A dynamic and evolving regulatory environment.</h2>
              <p>
                We help businesses understand and comply with the regulatory
                framework across key Middle Eastern jurisdictions, including
                sector-specific regulations, licensing requirements and
                government initiatives.
              </p>
              <Link className={indiaStyles.textLink} href="/services/regulatory-and-compliance">
                Explore Regulatory Landscape <Icon name="arrow" />
              </Link>
            </div>
            <div className={indiaStyles.featureImage}>
              <AssetImage
                src="/images/uae-dubai-skyline.jpg"
                alt="Middle East skyline and waterfront architecture"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
          </article>

          <article className={`${indiaStyles.featureCard} ${indiaStyles.capabilityCard}`} id="capabilities">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Our Capabilities in the Middle East</span>
              <h2>Practical solutions for complex requirements.</h2>
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
              <AssetImage
                src="/images/services/business-advisory-and-consulting.webp"
                alt="Modern Gulf architecture and infrastructure"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
          </article>

          <div className={indiaStyles.regulatorStrip} id="key-markets">
            <span className={indiaStyles.eyebrow}>Key Markets</span>
            <p>UAE <i /> Saudi Arabia <i /> Qatar <i /> Kuwait <i /> Oman <i /> Bahrain <i /> Jordan</p>
          </div>
        </div>
      </section>

      <section className={`${indiaStyles.marketSections} ${indiaStyles.wideStack} ${styles.middleEastMarkets}`} aria-label="India – Middle East corridor and industry support">
        <div className={indiaStyles.container}>
          <section className={styles.corridor} aria-labelledby="corridor-title">
            <span className={indiaStyles.eyebrow}>India – Middle East Business Corridor</span>
            <h2 id="corridor-title">Building stronger business ties.</h2>
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
                    {direction.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <Link className={indiaStyles.textLink} href="#enquire">
              Explore the India–Middle East Corridor <Icon name="arrow" />
            </Link>
          </section>

          <section className={`${indiaStyles.industries} ${styles.middleEastIndustries}`} id="industries" aria-labelledby="industries-title">
            <div className={indiaStyles.industryHeading}>
              <span className={indiaStyles.eyebrow}>Key Industries in the Middle East</span>
              <h2 id="industries-title">Sector-focused advisory for a growing region.</h2>
              <Link className={indiaStyles.textLink} href="/industries">
                Explore All Industries <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.industryGrid}>
              {industries.map(([name, image]) => (
                <Link href="/industries" className={indiaStyles.industryTile} key={name}>
                  <span className={indiaStyles.industryImage}>
                    <AssetImage src={image} alt={`${name} sector`} fill sizes="(max-width: 760px) 45vw, 15vw" />
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
            <span className={indiaStyles.eyebrow}>Professionals Supporting the Middle East</span>
            <h2 id="professionals-title">Experienced professionals. Regional insight.</h2>
            <Link className={indiaStyles.textLink} href="/professionals">
              View All Professionals <Icon name="arrow" />
            </Link>
          </div>
          <div className={indiaStyles.professionalGrid}>
            {professionals.map((person) => (
              <article className={indiaStyles.professionalCard} key={person.name}>
                <div className={indiaStyles.professionalPhoto}>
                  {person.image ? (
                    <AssetImage
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 760px) 80vw, 20vw"
                    />
                  ) : (
                    <span aria-label={`${person.name} profile image unavailable`}>SP</span>
                  )}
                </div>
                <div className={indiaStyles.professionalInfo}>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                  <small>{person.focus}</small>
                  <Link href={person.href}>
                    View Profile <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <aside className={`${indiaStyles.networkIntro} ${styles.networkIntro}`} aria-labelledby="network-title">
            <Icon name="globe" className={styles.networkIcon} />
            <span className={indiaStyles.eyebrow}>Our International Network</span>
            <h2 id="network-title">Local expertise. Global collaboration.</h2>
            <p>
              We work with a network of trusted international professionals and
              firms to support your cross-border objectives across the Middle
              East and beyond.
            </p>
            <Link className={indiaStyles.textLink} href="/professionals/international-network">
              Explore Our Network <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>

      <section className={`${indiaStyles.discovery} ${indiaStyles.wideStack}`} aria-label="Middle East insights and markets">
        <div className={indiaStyles.container}>
          <section className={indiaStyles.insights} id="insights" aria-labelledby="insights-title">
            <div className={indiaStyles.discoveryHeading}>
              <div>
                <span className={indiaStyles.eyebrow}>Latest from the Middle East</span>
                <h2 id="insights-title">Insights &amp; Regulatory Updates</h2>
              </div>
              <Link className={indiaStyles.textLink} href="/insights">
                View All Insights <Icon name="arrow" />
              </Link>
            </div>
            <nav className={indiaStyles.insightFilters} aria-label="Middle East insight categories">
              <Link href="/insights" aria-current="page">Articles</Link>
              <Link href="/insights/legal-updates">Legal Updates</Link>
              <Link href="/insights/market-developments">Market Developments</Link>
              <Link href="/insights/government-initiatives">Government Initiatives</Link>
            </nav>
            <div className={indiaStyles.articleGrid}>
              {articles.map((article) => (
                <Link href="/insights" className={indiaStyles.articleCard} key={article.title}>
                  <span className={indiaStyles.articleImage}>
                    <AssetImage src={article.image} alt="" fill sizes="(max-width: 760px) 90vw, 24vw" />
                  </span>
                  <span className={indiaStyles.articleMeta}>
                    {article.date} <i /> {article.category}
                  </span>
                  <strong>{article.title}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className={indiaStyles.jurisdictions} aria-labelledby="markets-title">
            <span className={indiaStyles.eyebrow}>Explore Other Markets</span>
            <h2 id="markets-title">Discover New Opportunities</h2>
            <div className={indiaStyles.jurisdictionGrid}>
              {otherMarkets.map(([name, image, href]) => (
                <Link href={href} key={name}>
                  <span>
                    <AssetImage src={image} alt={`${name} skyline`} fill sizes="(max-width: 760px) 42vw, 12vw" />
                  </span>
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
                  <summary>
                    {question}
                    <Icon name="chevron" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <Link className={indiaStyles.textLink} href="/faqs">
              View All FAQs <Icon name="arrow" />
            </Link>
          </section>
        </div>
      </section>

      <section className={indiaStyles.cta} id="enquire" aria-labelledby="enquire-title">
        <div className={indiaStyles.ctaImage}>
          <AssetImage src="/images/uae-dubai-skyline.jpg" alt="Desert city skyline in the Middle East" fill sizes="100vw" />
        </div>
        <div className={indiaStyles.container}>
          <div>
            <h2 id="enquire-title">Discuss Your Middle East Requirement</h2>
            <p>Our team is here to help you explore opportunities across the region.</p>
          </div>
          <Link className={indiaStyles.primaryButton} href="/contact#enquiry-form">
            Send an Enquiry <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}
