import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import IndiaQuickNav from "./india-quick-nav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "India Legal, Regulatory & Business Advisory",
  description:
    "Explore Astronis Global's legal, regulatory and business advisory services in India, supporting businesses with market entry, compliance, investment, transactions and growth.",
  alternates: { canonical: "/global-presence/india" },
  openGraph: {
    title: "India Legal, Regulatory & Business Advisory | Astronis Global",
    description:
      "Local depth and global perspective for businesses navigating India's legal, regulatory and commercial landscape.",
    url: "/global-presence/india",
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

const businessAreas = [
  ["building", "Market Entry", "Strategy and entry options", "/services/business-advisory-and-consulting"],
  ["file", "Company Establishment", "Entities, governance and compliance", "/services/business-formation"],
  ["globe", "Foreign Investment", "FDI, ODI and regulatory approvals", "/services/foreign-investment"],
  ["network", "M&A and Joint Ventures", "Transactions and strategic alliances", "/services/mergers-acquisitions-transactions"],
  ["document", "Commercial Contracts", "Contracts, distribution and risk management", "/services/corporate-and-commercial-advisory"],
  ["scale", "Tax & Regulatory", "Direct tax, indirect tax and regulatory support", "/services/taxation-compliance"],
  ["people", "Employment & Workforce", "HR, labour law and talent mobility", "/services/hr-and-employment-advisory"],
  ["chart", "Expansion & Growth", "Scaling your business in India", "/services/business-advisory-and-consulting"],
] as const;

const glanceRows = [
  ["Capital", "New Delhi"],
  ["Region", "Asia"],
  ["GDP", "USD 3.9 trillion (approx.)"],
  ["Population", "1.4+ billion (approx.)"],
  ["Business environment", "Growing, diverse and reform-driven"],
  ["Key sectors", "Manufacturing, technology, financial services, infrastructure, healthcare, consumer and green energy"],
  ["Key regulators", "MCA, SEBI, RBI, CCI, CBIC, IRDAI, PFRDA and TRAI"],
  ["Our support", "End-to-end legal, regulatory and business advisory"],
] as const;

const industries = [
  ["Manufacturing", "/Manufacturing & Industrial .png"],
  ["Technology & IT", "/Technology, IT & ITES .png"],
  ["Financial Services", "/Banking & Financial Services .png"],
  ["Infrastructure", "/Infrastructure & Projects .png"],
  ["Healthcare", "/Healthcare & Pharmaceuticals .png"],
  ["Consumer & Retail", "/Banner- Indus- Retail & Consumer .png"],
] as const;

const corridors = [
  ["UAE", "/flag/uae.png"],
  ["Singapore", "/flag/singapore.png"],
  ["UK", "/flag/uk.png"],
  ["USA", "/flag/usa.png"],
  ["EU", "/flag/eu.png"],
  ["Middle East", "/flag/uae.png"],
] as const;

const journey = [
  ["Assess", "Understand your goals"],
  ["Structure", "Design the right solution"],
  ["Establish", "Registrations and approvals"],
  ["Comply", "Ongoing regulatory support"],
  ["Operate", "Business and legal advisory"],
  ["Expand", "Scale and diversify"],
  ["Protect & Resolve", "Manage risk and disputes"],
] as const;

const professionals = [
  {
    name: "Krishna Kumar Mishra",
    role: "Founder Partner",
    focus: "Corporate · Regulatory · Litigation",
    image: "/Professionals/krishna_kumar_mishra.jpeg",
    href: "/professionals/krishna-kumar-mishra",
  },
  {
    name: "Priti Mishra",
    role: "Partner",
    focus: "Civil · Family · MSME · IPR",
    image: "/Professionals/pritimishra.jpeg",
    href: "/professionals/priti-mishra",
  },
  {
    name: "S. N. Pandey",
    role: "Senior Associate",
    focus: "Litigation · Arbitration",
    image: null,
    href: "/professionals",
  },
] as const;

const articles = [
  {
    date: "18 Sep 2026",
    category: "Regulatory",
    title: "India's Regulatory Priorities for 2026",
    image: "/corporate-regulatory-hero.png",
  },
  {
    date: "08 Sep 2026",
    category: "Business Insight",
    title: "Opportunities for Global Investors in India",
    image: "/Banking & Financial Services .png",
  },
  {
    date: "05 Sep 2026",
    category: "Legal Update",
    title: "Recent Judicial Developments of Relevance to Businesses",
    image: "/images/services/litigation-and-dispute-resolution.webp",
  },
] as const;

const jurisdictionTiles = [
  ["UAE", "/flag/uae.png", "/global-presence/uae"],
  ["Singapore", "/flag/singapore.png", "/global-presence/singapore"],
  ["UK", "/flag/uk.png", "/global-presence/uk"],
  ["USA", "/flag/usa.png", "/global-presence/usa"],
  ["EU", "/flag/eu.png", "/global-presence/eu"],
  ["Middle East", "/flag/uae.png", "/global-presence/middle-east"],
] as const;

const faqs = [
  [
    "How can a foreign company establish a business in India?",
    "The right route depends on the proposed activity, ownership and operating model. We help assess entity options, investment rules, registrations and the practical steps required to establish operations.",
  ],
  [
    "What are the key regulatory approvals for foreign investors?",
    "Approvals vary by sector, investment route and transaction structure. A review may include foreign investment rules, company law, sector regulators and reporting obligations.",
  ],
  [
    "Which sectors allow 100% FDI?",
    "Foreign investment limits and conditions differ across sectors and can change. We recommend checking the current consolidated FDI policy and applicable sector-specific rules for each proposal.",
  ],
  [
    "What are the tax considerations for businesses in India?",
    "Considerations can include corporate income tax, withholding, GST, transfer pricing and tax treaty issues. The appropriate analysis depends on the business, its transactions and operating structure.",
  ],
  [
    "How can Astronis support our India entry strategy?",
    "Our team can coordinate market-entry planning, entity structuring, regulatory mapping, establishment, contracts and ongoing legal and compliance support.",
  ],
] as const;

export default function IndiaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/global-presence">Global Presence</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">India</span>
        </nav>
      </div>

      <section className={styles.hero} aria-labelledby="india-title">
        <div className={styles.heroPhoto}>
          <AssetImage
            src="/images/india-presence/india-gate.jpg"
            alt="India Gate in New Delhi"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Global Presence</span>
            <h1 id="india-title">India</h1>
            <h2>Local Depth. Global Perspective.</h2>
            <p>
              Trusted legal, regulatory and business advisory support for a
              stronger, more competitive India.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="#capabilities">
                Explore India Capabilities <Icon name="arrow" />
              </Link>
              <Link className={styles.secondaryButton} href="/contact#enquiry-form">
                Discuss Your Requirement <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <p className={styles.heroNote}>
            People<br />Markets<br />Regulation<br />Opportunity
            <span />
            A stronger India.<br />A brighter tomorrow.
          </p>
        </div>
      </section>

      <IndiaQuickNav items={quickLinks} />

      <section className={styles.overview} id="overview" aria-labelledby="overview-title">
        <div className={styles.container}>
          <div className={styles.overviewCopy}>
            <span className={styles.eyebrow}>Understanding India</span>
            <h2 id="overview-title">A dynamic economy with global opportunities.</h2>
            <p>
              India is one of the world&apos;s fastest-growing major economies,
              offering a large domestic market, a talented workforce and a
              favourable policy environment for investment and innovation.
            </p>
            <p>
              Astronis Global supports domestic and international businesses in
              navigating India&apos;s legal, regulatory and commercial landscape
              with practical, solution-oriented advice.
            </p>
            <Link className={styles.textLink} href="/about/india-presence">
              Learn More About India <Icon name="arrow" />
            </Link>
          </div>
          <aside className={styles.glance} aria-labelledby="glance-title">
            <h3 id="glance-title">India at a glance</h3>
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

      <section className={styles.business} id="business-environment" aria-labelledby="business-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>Doing Business in India</span>
              <h2 id="business-title">Opportunity across every stage of growth.</h2>
            </div>
            <Link className={styles.textLink} href="/services">
              View All Business Areas <Icon name="arrow" />
            </Link>
          </div>
          <div className={styles.businessGrid}>
            {businessAreas.map(([icon, title, description, href]) => (
              <Link className={styles.businessCard} href={href} key={title}>
                <Icon name={icon} />
                <strong>{title}</strong>
                <span>{description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.regulatory} aria-label="Regulation and capabilities">
        <div className={styles.container}>
          <article className={styles.featureCard} id="regulatory-landscape">
            <div className={styles.featureCopy}>
              <span className={styles.eyebrow}>Regulatory Landscape</span>
              <h2>Navigating a complex but progressive framework.</h2>
              <p>
                We help businesses understand and navigate India&apos;s regulatory
                environment across sectors, with proactive compliance and
                practical solutions.
              </p>
              <Link className={styles.textLink} href="/services/regulatory-and-compliance">
                Explore Regulatory Overview <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.featureImage}>
              <AssetImage
                src="/images/services/litigation-and-dispute-resolution.webp"
                alt="Legal professionals supporting regulatory and dispute matters"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
          </article>
          <article className={`${styles.featureCard} ${styles.capabilityCard}`} id="capabilities">
            <div className={styles.featureCopy}>
              <span className={styles.eyebrow}>Our Capabilities in India</span>
              <h2>Integrated solutions for businesses in India.</h2>
              <p>
                From regulatory compliance to complex transactions and disputes,
                we offer end-to-end support through a multidisciplinary team.
              </p>
              <Link className={styles.textLink} href="/services">
                View All Relevant Services <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.featureImage}>
              <AssetImage
                src="/explore_services.png"
                alt="Contemporary commercial building in India"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
          </article>
          <div className={styles.regulatorStrip} id="regulators">
            <span className={styles.eyebrow}>Key Regulators</span>
            <p>MCA <i /> SEBI <i /> RBI <i /> CCI <i /> CBIC <i /> IRDAI <i /> PFRDA <i /> TRAI</p>
          </div>
        </div>
      </section>

      <section className={`${styles.marketSections} ${styles.wideStack}`} aria-label="Markets and industries">
        <div className={styles.container}>
          <section className={styles.corridors} aria-labelledby="corridors-title">
            <span className={styles.eyebrow}>India&apos;s Global Business Corridors</span>
            <h2 id="corridors-title">Connecting India to key global markets.</h2>
            <div className={styles.corridorList}>
              {corridors.map(([name, flag]) => (
                <Link href="/global-presence" key={name} aria-label={`Explore ${name}`}>
                  <span className={styles.flagCircle}>
                    <AssetImage src={flag} alt="" fill sizes="44px" />
                  </span>
                  <span>{name}</span>
                </Link>
              ))}
            </div>
            <Link className={styles.textLink} href="/global-presence">
              Explore Global Opportunities <Icon name="arrow" />
            </Link>
          </section>

          <section className={styles.industries} id="industries" aria-labelledby="industries-title">
            <div className={styles.industryHeading}>
              <span className={styles.eyebrow}>Industries We Support in India</span>
              <h2 id="industries-title">Sector-focused advisory for a growing economy.</h2>
            </div>
            <div className={styles.industryGrid}>
              {industries.map(([name, image]) => (
                <Link href="/industries" className={styles.industryTile} key={name}>
                  <span className={styles.industryImage}>
                    <AssetImage src={image} alt={`${name} in India`} fill sizes="(max-width: 700px) 45vw, 18vw" />
                  </span>
                  <strong>{name}</strong>
                </Link>
              ))}
            </div>
            <Link className={styles.textLink} href="/industries">
              Explore All Industries <Icon name="arrow" />
            </Link>
          </section>
        </div>
      </section>

      <section className={styles.journey} aria-labelledby="journey-title">
        <div className={styles.container}>
          <div className={styles.journeyIntro}>
            <span className={styles.eyebrow}>From Opportunity to Operation</span>
            <h2 id="journey-title">Our advisory journey.</h2>
          </div>
          <ol className={styles.journeySteps}>
            {journey.map(([title, description], index) => (
              <li key={title}>
                <span className={styles.journeyNumber}>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <small>{description}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.professionalSection} id="professionals" aria-labelledby="professionals-title">
        <div className={styles.container}>
          <div className={styles.professionalIntro}>
            <span className={styles.eyebrow}>Professionals in India</span>
            <h2 id="professionals-title">Experienced professionals. Practical solutions.</h2>
            <Link className={styles.textLink} href="/professionals">
              View All Professionals <Icon name="arrow" />
            </Link>
          </div>
          <div className={styles.professionalGrid}>
            {professionals.map((person) => (
              <article className={styles.professionalCard} key={person.name}>
                <div className={styles.professionalPhoto}>
                  {person.image ? (
                    <AssetImage src={person.image} alt={person.name} fill sizes="(max-width: 760px) 80vw, 24vw" />
                  ) : (
                    <span aria-label={`${person.name} profile image unavailable`}>SP</span>
                  )}
                </div>
                <div className={styles.professionalInfo}>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                  <small>{person.focus}</small>
                  <Link href={person.href}>View Profile <Icon name="arrow" /></Link>
                </div>
              </article>
            ))}
          </div>
          <aside className={styles.networkIntro} aria-labelledby="network-title">
            <Icon name="globe" className={styles.networkIcon} />
            <span className={styles.eyebrow}>Our International Network</span>
            <h2 id="network-title">Local expertise. Global collaboration.</h2>
            <p>
              We work with a network of trusted international professionals and
              firms to support your cross-border objectives.
            </p>
            <Link className={styles.textLink} href="/professionals/international-network">
              Explore Our Network <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>

      <section className={`${styles.discovery} ${styles.wideStack}`} aria-label="Insights, jurisdictions and FAQs">
        <div className={styles.container}>
          <section className={styles.insights} id="insights" aria-labelledby="insights-title">
            <div className={styles.discoveryHeading}>
              <div>
                <span className={styles.eyebrow}>Latest from India</span>
                <h2 id="insights-title">Insights &amp; Updates</h2>
              </div>
              <Link className={styles.textLink} href="/insights">View All Insights <Icon name="arrow" /></Link>
            </div>
            <nav className={styles.insightFilters} aria-label="Insight categories">
              <Link href="/insights/articles" aria-current="page">Articles</Link>
              <Link href="/insights/legal-updates">Legal Updates</Link>
              <Link href="/insights/business-updates">Business Updates</Link>
              <Link href="/insights">Government Notifications</Link>
            </nav>
            <div className={styles.articleGrid}>
              {articles.map((article) => (
                <Link href="/insights" className={styles.articleCard} key={article.title}>
                  <span className={styles.articleImage}>
                    <AssetImage src={article.image} alt="" fill sizes="(max-width: 760px) 90vw, 24vw" />
                  </span>
                  <span className={styles.articleMeta}>{article.date} <i /> {article.category}</span>
                  <strong>{article.title}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.jurisdictions} aria-labelledby="jurisdictions-title">
            <span className={styles.eyebrow}>Related Jurisdictions</span>
            <h2 id="jurisdictions-title">Explore Other Markets</h2>
            <div className={styles.jurisdictionGrid}>
              {jurisdictionTiles.map(([name, flag, href]) => (
                <Link href={href} key={name}>
                  <span><AssetImage src={flag} alt="" fill sizes="(max-width: 760px) 42vw, 12vw" /></span>
                  <strong>{name}</strong>
                </Link>
              ))}
            </div>
            <Link className={styles.textLink} href="/global-presence">
              View All Jurisdictions <Icon name="arrow" />
            </Link>
          </section>

          <section className={styles.faqs} id="faqs" aria-labelledby="faqs-title">
            <span className={styles.eyebrow}>Frequently Asked Questions</span>
            <h2 id="faqs-title">Answers to common queries.</h2>
            <div className={styles.faqList}>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<Icon name="chevron" /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <Link className={styles.textLink} href="/faqs">
              View All FAQs <Icon name="arrow" />
            </Link>
          </section>
        </div>
      </section>

      <section className={styles.cta} id="enquire" aria-labelledby="enquire-title">
        <div className={styles.ctaImage}>
          <AssetImage
            src="/images/india-presence/mumbai.jpg"
            alt="Mumbai waterfront, an important business centre in India"
            fill
            sizes="100vw"
          />
        </div>
        <div className={styles.container}>
          <div>
            <h2 id="enquire-title">Discuss Your India Requirement</h2>
            <p>Our team is here to help you explore opportunities in India.</p>
          </div>
          <Link className={styles.primaryButton} href="/contact#enquiry-form">
            Send an Enquiry <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}