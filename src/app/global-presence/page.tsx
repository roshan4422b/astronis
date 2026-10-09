import Image from "next/image";
import Link from "next/link";
import AssetImage from "../_components/asset-image";
import Icon from "../_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import { industries } from "@/content/site";
import styles from "./global-presence.module.css";

export const metadata = {
  title: "Global Presence & International Advisory Network | Astronis",
  description:
    "Explore Astronis Global's international advisory network across India, UAE, Singapore, UK, USA, Europe and the Middle East, supporting cross-border investment, India entry, overseas expansion and international business requirements.",
};

const metrics = [
  { value: "7+", label: "Key Regions" },
  { value: "30+", label: "Countries in Network" },
  { value: "1", label: "Integrated Advisory Platform" },
  { value: "Cross-Border", label: "Legal • Regulatory • Business" },
];

const regionCards = [
  {
    name: "India",
    flag: "/flag/Flag_of_India.svg.webp",
    description: "Our home market and primary platform for enterprise, regulatory and transaction advisory across key growth sectors.",
    tags: ["India Entry", "Corporate Advisory", "Regulatory", "Transactions"],
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/india",
  },
  {
    name: "USA",
    flag: "/flag/usa.png",
    description: "Support for strategic entry plans, funding structures and business alignment in a complex regulatory framework.",
    tags: ["Market Entry", "Investment", "Operations", "Commercial Contracts"],
    image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/usa",
  },
  {
    name: "UK",
    flag: "/flag/uk.png",
    description: "International market perspectives for transactions, governance and regulatory considerations in a highly active legal environment.",
    tags: ["Transactions", "Corporate", "Compliance", "International Growth"],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/uk",
  },
  {
    name: "UAE",
    flag: "/flag/uae.png",
    description: "Advisory support for business setup, market entry, investment activity and regional commercial structures.",
    tags: ["Middle East", "FDI", "Business Setup", "Commercial Strategy"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/uae",
  },
  {
    name: "Singapore",
    flag: "/flag/singapore.png",
    description: "Cross-border coordination and regional operational guidance for businesses navigating Asia-Pacific opportunities.",
    tags: ["Asia-Pacific", "Entity Structuring", "Tax", "Commercial Planning"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/singapore",
  },
  {
    name: "European Union",
    flag: "/flag/eu.png",
    description: "Jurisdiction-sensitive guidance for international commercial structures, operational planning and cross-border execution.",
    tags: ["Regulatory", "Compliance", "Transactions", "Business Expansion"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/european-union",
  },
  {
    name: "Middle East",
    flag: "/flag/uae.png",
    description: "Regional insight for businesses seeking to operate, invest and coordinate across the Gulf and wider MENA landscape.",
    tags: ["Regional Strategy", "Market Entry", "Commercial Structuring", "Cross-Border"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    href: "/global-presence/middle-east",
  },
];

const capabilityBlocks = [
  {
    title: "India Entry",
    copy: "Support for international businesses evaluating market entry, entity selection, approvals and operational setup in India.",
  },
  {
    title: "Foreign Investment",
    copy: "Guidance on FDI routes, structuring, documentation and regulatory considerations for strategic investment activity.",
  },
  {
    title: "Overseas Expansion",
    copy: "Support for Indian businesses exploring overseas entities, partnerships and cross-border growth structures.",
  },
  {
    title: "International Transactions",
    copy: "Practical coordination across due diligence, contracts, governance and execution for cross-border deals.",
  },
  {
    title: "Regulatory Coordination",
    copy: "Connecting legal, business and compliance requirements across multiple jurisdictions and stakeholders.",
  },
  {
    title: "International Business Structuring",
    copy: "Advisory across entity design, ownership arrangements, commercial alignment and strategic execution.",
  },
];

const journeySteps = [
  "Assess the Market",
  "Choose the Structure",
  "Understand Regulation",
  "Establish Operations",
  "Execute Transactions",
  "Maintain Compliance",
  "Expand Further",
];

const expertiseNodes = [
  "Corporate & Commercial",
  "FEMA / FDI",
  "Taxation",
  "Regulatory",
  "Banking & Financial Services",
  "Technology & Privacy",
  "Intellectual Property",
  "Employment",
  "Risk",
  "Sector Advisory",
];

const industryCards = industries.slice(0, 8);

const professionalFeatures = [
  "Local professionals",
  "Jurisdiction knowledge",
  "Sector experts",
  "Regulatory insight",
  "Collaborative delivery",
];

const collaborationStages = [
  ["One point of coordination", "A clear client-facing structure to keep priorities, timelines and communication aligned."],
  ["Relevant local expertise", "Connecting the right professionals and local understanding where jurisdictional context matters."],
  ["Integrated advice", "Combining corporate, regulatory and commercial perspectives to inform practical decisions."],
  ["Consistent delivery", "A coordinated approach to execution, review and ongoing support across markets."],
];

const knowledgeCategories = [
  "FEMA Updates",
  "FDI Guides",
  "RBI Updates",
  "India Entry",
  "International Tax",
  "Cross-Border Transactions",
  "Global Regulatory Updates",
  "Investment Guides",
  "FAQs",
  "Checklists",
];

const insights = corporateArticles.slice(0, 3);

export default function GlobalPresencePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Global Presence</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>Global Presence</span>
              <h1>Global Perspective. Local Insight. Connected Advisory.</h1>
              <p className={styles.heroText}>
                Astronis connects legal, regulatory, corporate and business expertise across jurisdictions to support clients entering India, expanding internationally and navigating complex cross-border requirements.
              </p>
              <div className={styles.actions}>
                <Link href="#network" className={styles.primaryButton}>
                  Explore Our Global Network
                </Link>
                <Link href="/global-presence/discuss-your-global-requirement" className={styles.secondaryButton}>
                  Discuss a Cross-Border Requirement
                </Link>
              </div>
            </div>


          </div>


        </div>
      </section>

      <section className={styles.metricsStrip}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metricItem}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="network" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Our Global Footprint</span>
              <h2>Connecting Businesses Across Key Markets</h2>
            </div>
          </div>

          <div className={styles.mapLayout}>
            <div className={styles.mapPanel}>
              <div className={styles.mapBackground} aria-hidden="true" />
              <div className={styles.mapPoint} style={{ left: "52%", top: "58%" }}>
                <span>India</span>
              </div>
              <div className={styles.mapPoint} style={{ left: "68%", top: "46%" }}>
                <span>UAE</span>
              </div>
              <div className={styles.mapPoint} style={{ left: "79%", top: "72%" }}>
                <span>Singapore</span>
              </div>
              <div className={styles.mapPoint} style={{ left: "36%", top: "29%" }}>
                <span>UK</span>
              </div>
              <div className={styles.mapPoint} style={{ left: "18%", top: "39%" }}>
                <span>USA</span>
              </div>
              <div className={styles.mapPoint} style={{ left: "47%", top: "20%" }}>
                <span>EU</span>
              </div>
              <div className={styles.mapPoint} style={{ left: "60%", top: "39%" }}>
                <span>Middle East</span>
              </div>
            </div>

            <div className={styles.mapInfo}>
              {regionCards.map((region) => (
                <article key={region.name} className={styles.regionInfo}>
                  <div className={styles.regionInfoHeader}>
                    <AssetImage className={styles.countryFlag} src={region.flag} alt={`${region.name} flag`} width={36} height={24} />
                    <h3>{region.name}</h3>
                  </div>
                  <p>{region.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Country & Jurisdiction Desks</span>
              <h2>Explore Our Key Markets</h2>
            </div>
          </div>

          <div className={styles.regionGrid}>
            {regionCards.map((region) => (
              <Link key={region.name} href={region.href} className={styles.regionCard}>
                <div className={styles.regionImage}>
                  <Image src={region.image} alt={region.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className={styles.regionBody}>
                  <h3>{region.name}</h3>
                  <p>{region.description}</p>
                  <div className={styles.tagRow}>
                    {region.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className={styles.cardLink}>
                    Explore {region.name} Desk
                    <Icon name="arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeadingLight}>
            <div>
              <span className={styles.sectionLabel}>Cross-Border Advisory</span>
              <h2>International Business Requires More Than Local Advice</h2>
            </div>
            <p>
              Cross-border projects often involve several connected considerations spanning corporate, regulatory, financial and commercial decision-making. We help clients connect those threads before they become obstacles.
            </p>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilityBlocks.map((item) => (
              <article key={item.title} className={styles.capabilityCard}>
                <span className={styles.cardNumber}>0{capabilityBlocks.indexOf(item) + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className={styles.darkActionRow}>
            <Link href="/services/foreign-investment" className={styles.primaryButton}>
              Explore FEMA, FDI & Cross-Border Services
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Supporting the Growth Journey</span>
              <h2>Supporting Businesses Across the International Growth Journey</h2>
            </div>
          </div>

          <div className={styles.journeyRow}>
            {journeySteps.map((step, index) => (
              <div key={step} className={styles.journeyStep}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureLayout}>
            <div className={styles.featureMedia}>
              <AssetImage src="/Part-9 .png" alt="Business leaders discussing India entry strategy" fill sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className={styles.featureContent}>
              <span className={styles.sectionLabel}>India Entry</span>
              <h2>Helping International Businesses Navigate the Indian Market</h2>
              <p>
                From market assessment and entity selection to regulatory strategy, documentation and operational setup, we help international businesses establish a practical India entry path.
              </p>
              <ul>
                <li>India entry strategy</li>
                <li>Entity selection and structuring</li>
                <li>FDI, FEMA and compliance mapping</li>
                <li>Licensing, tax and operational planning</li>
              </ul>
              <Link href="/services/foreign-investment" className={styles.inlineLink}>
                Explore India Entry Advisory <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSectionAlt}>
        <div className={styles.container}>
          <div className={styles.featureLayoutReverse}>
            <div className={styles.featureContent}>
              <span className={styles.sectionLabel}>Global Expansion</span>
              <h2>Supporting Indian Businesses Expanding Beyond India</h2>
              <p>
                We assist Indian companies entering new markets with overseas structuring, commercial planning, transaction support and cross-border coordination across connected jurisdictions.
              </p>
              <ul>
                <li>Overseas expansion planning</li>
                <li>ODI and international structuring</li>
                <li>Commercial contracts and coordination</li>
                <li>Cross-border governance and compliance</li>
              </ul>
              <Link href="/services/foreign-investment" className={styles.inlineLink}>
                Explore Cross-Border Advisory <Icon name="arrow" />
              </Link>
            </div>

            <div className={styles.featureMedia}>
              <AssetImage src="/international-network-hero.png" alt="International business expansion across regional markets" fill sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Global Industry Experience</span>
              <h2>Supporting International Businesses Across Diverse Sectors</h2>
            </div>
            <Link href="/industries" className={styles.linkButton}>
              Explore All Industries <Icon name="arrow" />
            </Link>
          </div>

          <div className={styles.industryGrid}>
            {industryCards.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} className={styles.industryCard}>
                <div className={styles.industryImage}>
                  <AssetImage src={industry.image} alt={industry.title} fill sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <span>{industry.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.professionalSection}>
        <div className={styles.container}>
          <div className={styles.professionalLayout}>
            <div className={styles.professionalContent}>
              <span className={styles.sectionLabel}>Professional Network</span>
              <h2>Local Perspective Through Connected Professional Relationships</h2>
              <p>
                Global matters often need more than one discipline or one jurisdictional lens. We work with aligned professionals to bring together local understanding, sector experience and coordinated execution.
              </p>
              <div className={styles.featureList}>
                {professionalFeatures.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <Link href="/professionals" className={styles.inlineLink}>
                Explore Our Professional Network <Icon name="arrow" />
              </Link>
            </div>
            <div className={styles.professionalPanel}>
              <div className={styles.panelBadge}>Network</div>
              <div className={styles.panelGrid}>
                <div>
                  <strong>Jurisdictional</strong>
                  <small>Knowledge</small>
                </div>
                <div>
                  <strong>Sector</strong>
                  <small>Insight</small>
                </div>
                <div>
                  <strong>Business</strong>
                  <small>Context</small>
                </div>
                <div>
                  <strong>Cross-Border</strong>
                  <small>Coordination</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>How We Work</span>
              <h2>How We Work Across Jurisdictions</h2>
            </div>
          </div>

          <div className={styles.collaborationGrid}>
            {collaborationStages.map(([title, text], index) => (
              <article key={title} className={styles.collaborationCard}>
                <span className={styles.stepCount}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Global Insights</span>
              <h2>Perspectives Across Markets & Regulations</h2>
            </div>
            <Link href="/global-presence/insights" className={styles.linkButton}>
              Explore Global Insights <Icon name="arrow" />
            </Link>
          </div>

          <div className={styles.insightsGrid}>
            {insights.map((article) => (
              <article key={article.slug} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <AssetImage src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className={styles.articleBody}>
                  <span className={styles.articleMeta}>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link href={`/insights/${article.slug}`} className={styles.inlineLink}>
                    Read Article <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.knowledgeSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeadingLight}>
            <div>
              <span className={styles.sectionLabel}>Knowledge Centre</span>
              <h2>Cross-Border Knowledge Centre</h2>
            </div>
            <Link href="/knowledge-centre" className={styles.linkButtonLight}>
              Visit Knowledge Centre <Icon name="arrow" />
            </Link>
          </div>

          <div className={styles.knowledgeGrid}>
            <div className={styles.knowledgeLead}>
              <div className={styles.knowledgeImage}>
                <AssetImage src="/Part-18 .png" alt="Cross-border decision-making and advisory" fill sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3>Practical guidance for international business and regulatory decisions.</h3>
              <p>
                Access thought leadership, structured updates and market-specific insights designed to help businesses navigate growth, regulation and international operations with greater clarity.
              </p>
            </div>

            <ul className={styles.categoryList}>
              {knowledgeCategories.map((category) => (
                <li key={category}>
                  <Link href="/knowledge-centre">
                    <span>{category}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.enquiryWrap}>
            <div className={styles.enquiryContent}>
              <span className={styles.sectionLabel}>Global Enquiry</span>
              <h2>Planning an International Move, Investment or Expansion?</h2>
              <p>
                Tell us the jurisdictions, transaction or business objective involved and our team will connect you with the relevant advisory capability.
              </p>
            </div>
            <div className={styles.enquiryActions}>
              <Link href="/global-presence/discuss-your-global-requirement" className={styles.primaryButton}>
                Discuss Your Global Requirement
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.finalWrap}>
            <span className={styles.sectionLabel}>Start the Conversation</span>
            <h2>Wherever Your Business Is Going, Start With the Right Structure</h2>
            <p>
              Connect with Astronis for coordinated corporate, regulatory and business advisory across markets and jurisdictions.
            </p>
            <div className={styles.finalActions}>
              <Link href="/global-presence/discuss-your-global-requirement" className={styles.primaryButton}>
                Discuss Your Global Requirement
              </Link>
              <Link href="/services/foreign-investment" className={styles.secondaryButton}>
                Explore Cross-Border Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
