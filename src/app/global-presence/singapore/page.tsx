import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import IndiaQuickNav from "../india/india-quick-nav";
import indiaStyles from "../india/page.module.css";
import styles from "./page.module.css";

const singaporeImage = "/images/singapore-marina-bay.jpg";

export const metadata: Metadata = {
  title: "Singapore Legal, Regulatory & Business Advisory",
  description:
    "Explore Astronis Global's legal, regulatory and business advisory services in Singapore, supporting businesses with market entry, investment, compliance, transactions and cross-border growth across Asia-Pacific.",
  alternates: { canonical: "/global-presence/singapore" },
  openGraph: {
    title: "Singapore Legal, Regulatory & Business Advisory | Astronis Global",
    description:
      "Strategic legal, regulatory and business advisory support for organisations operating, investing and expanding in Singapore and across Asia-Pacific.",
    url: "/global-presence/singapore",
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
  ["Capital", "Singapore"],
  ["Region", "Asia-Pacific"],
  ["GDP (Nominal, 2024 est.)", "USD 501 billion (approx.)"],
  ["Population", "6.0 million (approx.)"],
  ["Business environment", "Stable, open and innovation-driven"],
  ["Key sectors", "Financial services, technology, trade & logistics, life sciences and professional services"],
  ["Key regulators", "ACRA, MAS, IRAS, MOM and IMDA"],
  ["Our support", "End-to-end legal, regulatory and business advisory"],
] as const;

const businessAreas = [
  ["building", "Market Entry", "Strategy and structuring options", "/services/business-advisory-consulting"],
  ["file", "Company Establishment", "Incorporation, governance and compliance", "/services/corporate-commercial-advisory/entity-formation-business-setup"],
  ["globe", "Foreign Investment", "Regulatory framework and incentives", "/services/fema-fdi-cross-border"],
  ["network", "M&A and Joint Ventures", "Transactions and strategic partnerships", "/services/mergers-acquisitions-transactions"],
  ["document", "Commercial Contracts", "Contracting, distribution and risk management", "/services/corporate-commercial-advisory"],
  ["scale", "Tax & Regulatory", "Direct tax, GST and regulatory support", "/services/taxation-compliance"],
  ["people", "Employment & Workforce", "HR, employment law and talent mobility", "/services/hr-employment-labour"],
  ["chart", "Expansion & Growth", "Scaling your business in Asia", "/services/business-advisory-consulting"],
] as const;

const corridorDirections = [
  {
    title: "India to Singapore",
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
    title: "Singapore to India",
    flag: "/flag/singapore.png",
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
  ["Financial Services", "/Banking & Financial Services .png"],
  ["Technology & IT", "/Technology, IT & ITES .png"],
  ["Life Sciences", "/Banner-Consumer & Life Sciences .png"],
  ["Trade & Logistics", "/Logistics, Transportation & Warehousing .png"],
  ["Manufacturing", "/Manufacturing & Industrial .png"],
  ["Consumer & Retail", "/Banner- Indus- Retail & Consumer .png"],
  ["Professional Services", "/Professional & Business Services .png"],
  ["Real Estate & Construction", "/Real Estate & Construction .png"],
] as const;

const journey = [
  ["Assess", "Understand your objectives"],
  ["Structure", "Design the right solution"],
  ["Establish", "Registrations and approvals"],
  ["Comply", "Ongoing regulatory support"],
  ["Operate", "Business and legal advisory"],
  ["Expand", "Scale across Asia-Pacific"],
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
    focus: "Corporate · Commercial · IPR",
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
    title: "MAS Updates on Digital Asset Regulatory Framework",
    image: "/images/services/regulatory-and-compliance.webp",
  },
  {
    date: "08 Sep 2026",
    category: "Business Insight",
    title: "Opportunities for Indian Businesses in Singapore",
    image: singaporeImage,
  },
  {
    date: "04 Sep 2026",
    category: "Tax & Business",
    title: "Singapore Budget 2026: Key Takeaways for Businesses",
    image: "/images/services/banking-nbfc-and-financial-services-advisory.webp",
  },
] as const;

const otherMarkets = [
  ["India", "/images/market-india.jpg", "/global-presence/india"],
  ["UAE", "/images/uae-dubai-skyline.jpg", "/global-presence/uae"],
  ["UK", "/images/market-uk.jpg", "/global-presence/uk"],
  ["USA", "/images/market-usa.jpg", "/global-presence/usa"],
  ["EU", "/images/market-eu.jpg", "/global-presence/eu"],
  ["Middle East", "/images/uae-dubai-skyline.jpg", "/global-presence/middle-east"],
] as const;

const faqs = [
  [
    "How can an Indian company set up a business in Singapore?",
    "The process depends on the proposed activity, ownership and operating model. We help assess entity options, incorporation steps, governance requirements and cross-border considerations.",
  ],
  [
    "What regulatory approvals are required?",
    "Requirements vary by activity and sector. In addition to company registration, businesses may need licences, permits or approvals from regulators such as MAS, IMDA or MOM.",
  ],
  [
    "What are the tax implications in Singapore?",
    "Tax considerations may include corporate income tax, GST, withholding tax, transfer pricing and treaty matters. The right analysis depends on the entity, business activities and transactions.",
  ],
  [
    "Are there incentives for foreign investors?",
    "Singapore offers programmes and incentives for qualifying activities, subject to applicable eligibility criteria and approval. Businesses should assess current schemes against their investment and operating plans.",
  ],
  [
    "How can Astronis support our Singapore entry?",
    "We coordinate market-entry planning, entity structuring, regulatory mapping, investment and transaction support, contracts and ongoing legal and compliance advice.",
  ],
] as const;

export default function SingaporePage() {
  return (
    <div className={`${indiaStyles.page} ${styles.singaporePage}`}>
      <div className={indiaStyles.breadcrumbWrap}>
        <nav className={indiaStyles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/global-presence">Global Presence</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Singapore</span>
        </nav>
      </div>

      <section className={indiaStyles.hero} aria-labelledby="singapore-title">
        <div className={indiaStyles.heroPhoto}>
          <AssetImage
            src={singaporeImage}
            alt="Marina Bay and Singapore's downtown skyline"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>
        <div className={indiaStyles.heroInner}>
          <div className={indiaStyles.heroCopy}>
            <span className={indiaStyles.eyebrow}>Global Presence</span>
            <h1 id="singapore-title">Singapore</h1>
            <h2>A Trusted Partner in Asia-Pacific.</h2>
            <p>
              Strategic legal, regulatory and business advisory support for
              organisations operating, investing and expanding in Singapore and
              across the Asia-Pacific region.
            </p>
            <div className={indiaStyles.heroActions}>
              <Link className={indiaStyles.primaryButton} href="#capabilities">
                Explore Singapore Capabilities <Icon name="arrow" />
              </Link>
              <Link className={indiaStyles.secondaryButton} href="#enquire">
                Discuss Your Requirement <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <p className={`${indiaStyles.heroNote} ${styles.heroNote}`}>
            Innovation<br />Regulation<br />Talent<br />Opportunity
            <span />
            A stronger Asia-Pacific together.
          </p>
        </div>
      </section>

      <IndiaQuickNav items={quickLinks} ariaLabel="Singapore page sections" />

      <section className={indiaStyles.overview} id="overview" aria-labelledby="overview-title">
        <div className={indiaStyles.container}>
          <div className={indiaStyles.overviewCopy}>
            <span className={indiaStyles.eyebrow}>Understanding Singapore</span>
            <h2 id="overview-title">A global business hub with lasting opportunities.</h2>
            <p>
              Singapore is a leading international business and financial
              centre, known for its stable economy, transparent regulatory
              framework and strategic location in Asia. Astronis Global supports
              businesses in navigating Singapore&apos;s legal, regulatory and
              commercial landscape with practical, solution-oriented advice.
            </p>
            <Link className={indiaStyles.textLink} href="/global-presence">
              Learn More About Singapore <Icon name="arrow" />
            </Link>
          </div>
          <aside className={indiaStyles.glance} aria-labelledby="glance-title">
            <h3 id="glance-title">Singapore at a glance</h3>
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
              <span className={indiaStyles.eyebrow}>Doing Business in Singapore</span>
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

      <section className={indiaStyles.regulatory} aria-label="Singapore regulatory landscape and capabilities">
        <div className={indiaStyles.container}>
          <article className={indiaStyles.featureCard} id="regulatory-landscape">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Regulatory Landscape</span>
              <h2>A transparent and progressive regulatory framework.</h2>
              <p>
                We help businesses understand and comply with Singapore&apos;s
                regulatory environment across sectors, with practical and
                commercial solutions.
              </p>
              <Link className={indiaStyles.textLink} href="/services/regulatory-and-compliance">
                Explore Regulatory Landscape <Icon name="arrow" />
              </Link>
            </div>
            <div className={indiaStyles.featureImage}>
              <AssetImage src={singaporeImage} alt="Singapore business district around Marina Bay" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
          </article>
          <article className={`${indiaStyles.featureCard} ${indiaStyles.capabilityCard}`} id="capabilities">
            <div className={indiaStyles.featureCopy}>
              <span className={indiaStyles.eyebrow}>Our Capabilities in Singapore</span>
              <h2>Practical solutions for global businesses.</h2>
              <p>
                From market entry to compliance and dispute resolution, we
                provide integrated support through a multidisciplinary team.
              </p>
              <Link className={indiaStyles.textLink} href="/services">
                View All Relevant Services <Icon name="arrow" />
              </Link>
            </div>
            <div className={indiaStyles.featureImage}>
              <AssetImage src="/images/services/business-advisory-and-consulting.webp" alt="Business advisory for companies entering Singapore" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
          </article>
          <div className={indiaStyles.regulatorStrip} id="regulators">
            <span className={indiaStyles.eyebrow}>Key Regulators</span>
            <p>ACRA <i /> MAS <i /> IRAS <i /> MOM <i /> IMDA</p>
          </div>
        </div>
      </section>

      <section className={`${indiaStyles.marketSections} ${indiaStyles.wideStack} ${styles.singaporeMarket}`} aria-label="Singapore corridor and industries">
        <div className={indiaStyles.container}>
          <section className={styles.corridor} aria-labelledby="corridor-title">
            <span className={indiaStyles.eyebrow}>India – Singapore Business Corridor</span>
            <h2 id="corridor-title">Connecting two dynamic economies.</h2>
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
              Explore the India-Singapore Corridor <Icon name="arrow" />
            </Link>
          </section>

          <section className={`${indiaStyles.industries} ${styles.singaporeIndustries}`} id="industries" aria-labelledby="industries-title">
            <div className={indiaStyles.industryHeading}>
              <span className={indiaStyles.eyebrow}>Industries We Support in Singapore</span>
              <h2 id="industries-title">Sector-focused advisory for a dynamic economy.</h2>
              <Link className={indiaStyles.textLink} href="/industries">
                Explore All Industries <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.singaporeIndustryGrid}>
              {industries.map(([name, image]) => (
                <Link href="/industries" className={indiaStyles.industryTile} key={name}>
                  <span className={indiaStyles.industryImage}>
                    <AssetImage src={image} alt={`${name} sector in Singapore`} fill sizes="(max-width: 760px) 45vw, 15vw" />
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
            <span className={indiaStyles.eyebrow}>Professionals Supporting Singapore</span>
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
          <aside className={`${indiaStyles.networkIntro} ${styles.singaporeNetwork}`} aria-labelledby="network-title">
            <Icon name="globe" className={styles.networkIcon} />
            <span className={indiaStyles.eyebrow}>Our International Network</span>
            <h2 id="network-title">Local expertise. Global collaboration.</h2>
            <p>
              We work with a network of trusted international professionals and
              firms to support your cross-border objectives in Singapore and
              beyond.
            </p>
            <Link className={indiaStyles.textLink} href="/professionals/international-network">
              Explore Our Network <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>

      <section className={`${indiaStyles.discovery} ${indiaStyles.wideStack}`} aria-label="Singapore insights, markets and FAQs">
        <div className={indiaStyles.container}>
          <section className={indiaStyles.insights} id="insights" aria-labelledby="insights-title">
            <div className={indiaStyles.discoveryHeading}>
              <div>
                <span className={indiaStyles.eyebrow}>Latest from Singapore</span>
                <h2 id="insights-title">Insights &amp; Regulatory Updates</h2>
              </div>
              <Link className={indiaStyles.textLink} href="/insights">View All Insights <Icon name="arrow" /></Link>
            </div>
            <nav className={indiaStyles.insightFilters} aria-label="Singapore insight categories">
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
          <AssetImage src={singaporeImage} alt="Singapore Marina Bay skyline at dusk" fill sizes="100vw" />
        </div>
        <div className={indiaStyles.container}>
          <div>
            <h2 id="enquire-title">Discuss Your Singapore Requirement</h2>
            <p>Our team is here to help you explore opportunities in Singapore.</p>
          </div>
          <Link className={indiaStyles.primaryButton} href="/contact#enquiry-form">
            Send an Enquiry <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}