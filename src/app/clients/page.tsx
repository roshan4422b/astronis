import Image from "@/app/_components/asset-image";
import Link from "next/link";
import { corporateArticles } from "@/content/corporate-articles";
import { clients } from "@/content/clients";
import { industries } from "@/content/site";
import styles from "./clients.module.css";

export const metadata = {
  title: "Our Clients | Trusted Business & Advisory Relationships | Astronis",
  description:
    "Explore selected Astronis client relationships across financial services, technology, manufacturing, healthcare, real estate and other industries, supported by integrated corporate, regulatory, legal and business advisory expertise.",
};

const metrics = [
  { value: "11+", label: "Years of Experience" },
  { value: "1000+", label: "Advisory Assignments" },
  { value: "30+", label: "Countries in Network" },
  { value: "Multi-Sector", label: "Advisory Experience" },
];

const clientTypes = [
  { title: "Large Enterprises", text: "Complex structures, governance requirements and multi-stakeholder decision-making." },
  { title: "Growth Companies", text: "Expansion plans, operational structure and strategic commercial decisions at scale." },
  { title: "Startups & Founders", text: "Early-stage support across formation, investment, compliance and execution." },
  { title: "Financial Institutions", text: "Regulatory, transaction and governance-sensitive advisory built around business risk." },
  { title: "Investors", text: "Commercial due diligence, structuring and oversight in evolving investment environments." },
  { title: "Professional Firms", text: "Practice governance, operational support and business arrangements across legal and advisory services." },
  { title: "International Businesses", text: "Cross-border coordination, structure and market entry support for growth-minded enterprises." },
  { title: "Institutions & Organisations", text: "Advisory support for public and institutional stakeholders navigating complexity." },
];

const pillars = [
  {
    title: "Understand the Business",
    text: "Advice begins with understanding the organisation, transaction and commercial objective.",
  },
  {
    title: "Connect the Expertise",
    text: "Bring together relevant legal, regulatory, financial and sector perspectives.",
  },
  {
    title: "Stay Practical",
    text: "Translate complexity into clear actions and decisions for the people making them.",
  },
  {
    title: "Build Continuity",
    text: "Support businesses as their needs evolve across growth, regulation and transactions.",
  },
];

const engagementJourney = [
  { number: "01", title: "Understand", text: "Clarify the objective, business context and decision points." },
  { number: "02", title: "Assess", text: "Review legal, regulatory, commercial and operational considerations." },
  { number: "03", title: "Connect Expertise", text: "Bring together the relevant professionals and subject-matter perspectives." },
  { number: "04", title: "Advise", text: "Translate the issues into practical options and next steps." },
  { number: "05", title: "Implement", text: "Coordinate actions, documentation and stakeholder communication." },
  { number: "06", title: "Stay Engaged", text: "Support evolving needs through growth, change and strategic events." },
];

const knowledgeCategories = [
  "Articles",
  "Legal Updates",
  "Business Updates",
  "RBI Circulars",
  "SEBI Updates",
  "MCA Updates",
  "GST Updates",
  "Guides & Checklists",
  "White Papers",
  "FAQs",
];

const industryCards = industries.slice(0, 8).map((industry) => ({
  title: industry.title,
  image: industry.image,
  href: `/industries/${industry.slug}`,
}));

const insightArticles = corporateArticles.slice(0, 3);

export default function ClientsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>Our Clients</span>
              <h1>Trusted by Organisations Across Industries, Markets &amp; Business Stages</h1>
              <p className={styles.heroText}>
                Astronis works with businesses, financial institutions, professional organisations and sector leaders across diverse industries, supporting complex legal, regulatory, corporate and business requirements.
              </p>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Start a Conversation
                </Link>
                <Link href="/services" className={styles.secondaryButton}>
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.metrics}`} aria-label="Verified Astronis experience metrics">
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.logoSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Selected Relationships</span>
              <h2>A Glimpse of Organisations We Have Worked With</h2>
            </div>
            <p>
              Across industries, our focus remains the same: practical advice, responsive engagement and solutions aligned with business realities.
            </p>
          </div>

          <div className={styles.logoGrid} aria-label="Selected Astronis client relationships">
            {clients.map((client) => (
              <div key={client.name} className={styles.logoCard}>
                <Image src={client.logo} alt={`${client.name} logo`} width={220} height={90} />
              </div>
            ))}
          </div>
          <p className={styles.logoDisclaimer}>
            Logos and names are displayed for identification of selected client relationships and experience where appropriate. They do not imply endorsement, ongoing engagement or exclusivity.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>How We Work</span>
              <h2>More Than an Engagement. A Long-Term Advisory Relationship.</h2>
            </div>
            <p>
              Astronis brings together legal understanding, regulatory insight, business context and practical execution to support organisations through change, complexity and growth.
            </p>
          </div>
          <div className={styles.pillarGrid}>
            {pillars.map((pillar) => (
              <article key={pillar.title} className={styles.pillar}>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.clientTypes}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Who We Work With</span>
              <h2>Advisory Support Across Different Types of Organisations</h2>
            </div>
          </div>
          <div className={styles.typeGrid}>
            {clientTypes.map((type) => (
              <article key={type.title} className={styles.typeCard}>
                <h3>{type.title}</h3>
                <p>{type.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.industrySection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Industry Coverage</span>
              <h2>Relationships Across Diverse Industries</h2>
            </div>
            <Link href="/industries" className={styles.linkButton}>
              Explore All Industries
            </Link>
          </div>
          <div className={styles.industryGrid}>
            {industryCards.map((industry) => (
              <Link key={industry.title} href={industry.href} className={styles.industryCard}>
                <div className={styles.industryThumb}>
                  <Image src={industry.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
                <strong>{industry.title}</strong>
                <span>
                  Explore <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.expertiseSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Integrated Expertise</span>
              <h2>One Client Relationship. Multiple Areas of Expertise.</h2>
            </div>
          </div>
          <div className={styles.expertiseWrap}>
            <div className={styles.expertiseItem}>
              <strong>Corporate</strong>
              <p>Structuring, governance and strategic business decisions.</p>
            </div>
            <div className={styles.expertiseItem}>
              <strong>Regulatory</strong>
              <p>Compliance obligations, approvals and operational resilience.</p>
            </div>
            <div className={styles.expertiseNode}>
              <strong>Client Requirement</strong>
            </div>
            <div className={styles.expertiseItem}>
              <strong>Legal</strong>
              <p>Commercial, disputes, documentation and risk assessment.</p>
            </div>
            <div className={styles.expertiseItem}>
              <strong>Tax</strong>
              <p>Transaction, compliance and tax-efficient planning support.</p>
            </div>
            <div className={styles.expertiseItem}>
              <strong>Risk</strong>
              <p>Operational, regulatory and strategic oversight within context.</p>
            </div>
            <div className={styles.expertiseItem}>
              <strong>Technology</strong>
              <p>Digital, data and business transformation considerations.</p>
            </div>
            <div className={styles.expertiseItem}>
              <strong>Business Advisory</strong>
              <p>Commercial guidance aligned with execution and growth.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.journeySection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>How We Work</span>
              <h2>How We Work With Clients</h2>
            </div>
          </div>
          <div className={styles.journeyGrid}>
            {engagementJourney.map((step) => (
              <article key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.insightsSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Client Experience</span>
              <h2>Explore Our Insights</h2>
            </div>
            <Link href="/insights" className={styles.linkButton}>
              Explore All Insights
            </Link>
          </div>
          <div className={styles.insightsGrid}>
            {insightArticles.map((article) => (
              <article key={article.slug} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className={styles.articleBody}>
                  <span className={styles.articleMeta}>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link href={`/insights/${article.slug}`} className={styles.inlineLink}>
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.knowledgeSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>Knowledge Centre</span>
              <h2>Knowledge That Supports Better Decisions</h2>
            </div>
            <Link href="/knowledge-centre" className={styles.linkButton}>
              Visit Knowledge Centre
            </Link>
          </div>
          <div className={styles.knowledgeGrid}>
            <div className={styles.feature}>
              <div className={styles.featureImage}>
                <Image src="/Part-14 .png" alt="Business professionals reviewing advisory knowledge" fill sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3>Practical guidance for business, legal and regulatory questions.</h3>
              <p>
                Access thought leadership, updates and sector-focused content designed to help leaders navigate decisions with greater clarity and confidence.
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

      <section className={`${styles.section} ${styles.finalCta}`}>
        <div className={`${styles.container} ${styles.finalWrap}`}>
          <span className={styles.sectionLabel}>Start a Conversation</span>
          <h2>Let’s Build a Trusted Advisory Relationship</h2>
          <p>
            Tell us about your business, regulatory or strategic requirement and connect with the right Astronis team.
          </p>
          <div className={styles.finalActions}>
            <Link href="/contact" className={`${styles.primaryButton} ${styles.finalButton}`}>
              Start a Conversation
            </Link>
            <Link href="/services" className={`${styles.secondaryButton} ${styles.finalSecondaryButton}`}>
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
