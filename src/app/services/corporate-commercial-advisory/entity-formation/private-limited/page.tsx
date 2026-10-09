import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { corporateArticles } from "@/content/corporate-articles";
import { testimonials } from "@/content/testimonials";
import PageSectionNav from "../_components/page-section-nav";
import pageLayoutStyles from "../_components/entity-formation-page.module.css";
import styles from "../public-limited-company/public-limited-company.module.css";
import PrivateLimitedFaq from "./private-limited-faq";

export const metadata: Metadata = {
  title: "Private Limited Company Incorporation in India | Astronis Global",
  description:
    "Plan and incorporate a private limited company in India with coordinated support for structure, filings, documentation and post-incorporation requirements.",
  alternates: {
    canonical: "/services/corporate-commercial-advisory/entity-formation-business-setup/private-limited-company-incorporation",
  },
};

const nav = [
  ["Overview", "overview"],
  ["Benefits", "benefits"],
  ["Structure", "structure"],
  ["Comparison", "comparison"],
  ["Process", "process"],
  ["Documents", "documents"],
  ["Requirements", "requirements"],
  ["Fees", "fees"],
  ["FAQs", "faqs"],
];

const services = [
  ["search", "Name Reservation", "Review proposed company names and coordinate reservation."],
  ["file", "Incorporation with ROC", "Coordinate incorporation filings with the Registrar of Companies."],
  ["document", "MOA & AOA Drafting", "Prepare constitutional documents around the proposed business and governance."],
  ["person", "Director & Shareholder Details", "Organise identity, address and incorporation information for participants."],
  ["building", "Registered Office Support", "Coordinate registered-office proof and related declarations."],
  ["award", "Digital Signature Certificates", "Coordinate DSC requirements for proposed directors and subscribers."],
  ["people", "Director Identification Numbers", "Include DIN requirements in the incorporation filing plan."],
  ["percent", "PAN & TAN Assistance", "Coordinate tax identifiers as part of the incorporation process."],
  ["building", "Bank Account Assistance", "Support the next steps for opening the company's bank account."],
  ["shield", "Initial Compliance Guidance", "Identify governance records and immediate post-incorporation responsibilities."],
  ["globe", "Activity-Specific Registrations", "Map applicable registrations and sector permissions to the business activity."],
  ["calendar", "Post-Incorporation Advisory", "Plan follow-on compliance and advisory support around the company's needs."],
];

const benefits = [
  ["shield", "Limited liability", "Shareholders' liability is generally limited to the amount unpaid on their shares, subject to law and individual circumstances."],
  ["building", "Separate legal entity", "The company has a legal identity distinct from its shareholders and can hold assets and enter into contracts."],
  ["calendar", "Perpetual succession", "The company's continuity is not ordinarily affected by a change in its membership."],
  ["chart", "Fundraising options", "A share-based structure can support investment discussions, subject to the company's plans and applicable requirements."],
  ["percent", "Tax and incentive assessment", "Corporate tax treatment and any available deductions or incentives depend on eligibility and current law."],
  ["gem", "Credibility for growth", "A formal company structure can support confidence with customers, suppliers, lenders and potential investors."],
];

const comparison = [
  ["Minimum members", "2", "7", "2", "2", "1", "1"],
  ["Separate legal entity", "Yes", "Yes", "Yes", "No", "Yes", "No"],
  ["Limited liability", "Yes", "Yes", "Yes", "No", "Yes", "No"],
  ["Perpetual succession", "Yes", "Yes", "Yes", "No", "Yes", "No"],
  ["Ease of fundraising", "High", "Very high", "Moderate", "Limited", "Moderate", "Limited"],
  ["Compliance requirements", "Moderate to high", "High", "Moderate", "Low", "Moderate", "Low"],
  ["Suitable for", "Startups and growing businesses", "Larger businesses and public fundraising", "Professional services and flexible ventures", "Closely held businesses", "Single-founder businesses", "Individual businesses"],
  ["Taxation", "Company taxation", "Company taxation", "Firm taxation", "Firm taxation", "Company taxation", "Individual taxation"],
];

const process = [
  ["Consultation & structure planning", "Align ownership, activities and growth plans with a suitable structure."],
  ["Name reservation", "Submit proposed names for review and reservation, subject to availability and processing."],
  ["Document preparation", "Prepare the incorporation information, declarations and MOA and AOA for review."],
  ["Filing with ROC", "File the incorporation application and supporting documents with the Registrar of Companies."],
  ["Certificate of incorporation", "Receive the certificate after the application is approved."],
  ["PAN, TAN & bank account", "Coordinate tax identifiers and next steps for the company's bank account."],
  ["Post-incorporation compliances", "Set up initial records, governance routines and applicable ongoing filings."],
];

const documents = [
  "Proposed company name(s)",
  "PAN, Aadhaar and address proof of all directors and shareholders",
  "Passport photographs of directors and shareholders",
  "Address proof for the registered office",
  "Digital Signature Certificate (DSC)",
  "Director Identification Number (DIN), where required",
  "Draft Memorandum of Association (MOA) and Articles of Association (AOA)",
  "Nominee consent, if applicable",
  "Business activity details and sector licences, if applicable",
];

const requirements = [
  ["people", "Minimum members", "At least two members are generally required."],
  ["building", "Minimum directors", "At least two directors; residency requirements apply."],
  ["chart", "Minimum capital", "There is no prescribed minimum paid-up capital; plan capital for the business."],
  ["pin", "Registered office", "A registered office address in India with supporting proof is required."],
];

const faqs: [string, string][] = [
  ["What is a Private Limited Company?", "It is a company incorporated under the Companies Act with a legal identity separate from its members and liability generally limited to the unpaid amount on shares. Its ownership, governance and compliance requirements should be considered against the proposed business."],
  ["What is the minimum number of members and directors?", "A private company generally requires at least two members and two directors. Director residency and other statutory requirements should be checked for the proposed company."],
  ["Is there any minimum capital requirement?", "There is no prescribed minimum paid-up capital for incorporation. The initial capital should be considered in light of the business plan and practical funding requirements."],
  ["Can a foreign national invest in a Private Limited Company?", "Foreign investment may be permitted subject to the applicable sectoral limits, entry routes, pricing, reporting and other FEMA and regulatory requirements. The proposed activity and investor details should be reviewed before proceeding."],
];

function Heading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`${styles.heading} ${light ? styles.lightHeading : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function PrivateLimitedCompanyPage() {
  const review = testimonials.find(
    (item) =>
      item.status === "approved" &&
      item.publicationConsent &&
      item.service === "Corporate & Commercial Advisory",
  );
  const articles = corporateArticles.slice(0, 3);

  return (
    <div className={styles.page} data-text-size="plus-two">
      <section className={styles.hero} id="overview">
        <Image
          src="/corporate-regulatory-hero.png"
          alt="Corporate professionals discussing a business plan"
          fill
          priority
          sizes="(max-width: 850px) 100vw, 50vw"
          className={styles.heroImage}
        />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <Link href="/services/corporate-commercial-advisory">Corporate &amp; Commercial</Link>
            <span>/</span>
            <Link href="/services/corporate-commercial-advisory#entity-formation-business-setup">Entity Formation &amp; Business Setup</Link>
            <span>/</span>
            <span aria-current="page">Private Limited Company Incorporation</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>CORPORATE &amp; COMMERCIAL ADVISORY · ENTITY FORMATION</span>
            <h1>Private Limited Company Incorporation</h1>
            <h2>A strong foundation for sustainable business growth.</h2>
            <p>
              Plan and incorporate a private limited company with coordinated support for
              ownership, documentation, regulatory filings and the requirements that follow.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/professionals/enquiry">
                Get Started <Icon name="arrow" />
              </Link>
              <Link className={styles.secondary} href="/contact">
                Schedule a Consultation <Icon name="calendar" />
              </Link>
            </div>
          </div>
          <div className={styles.heroNote}>
            <span>FORMATION WITH A LONG VIEW</span>
            <strong>Structure first.<br />Then grow with clarity.</strong>
            <p>Connect incorporation, governance and your next business priorities.</p>
          </div>
        </div>
      </section>

      <div className={pageLayoutStyles.pageNavLayout}>
        <div className={pageLayoutStyles.pageContent}>
          <section className={styles.services}>
        <div className="container">
          <Heading
            eyebrow="PRIVATE LIMITED COMPANY"
            title="Build a strong, credible and scalable business"
            text="Build a strong, credible and scalable business with formation support connected to its ownership, governance and operating needs."
          />
          <div className={styles.serviceGrid}>
            {services.map(([icon, title, text]) => (
              <article className={styles.serviceCard} key={title}>
                <span className={styles.icon}><Icon name={icon} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.benefits} id="benefits">
        <div className={`container ${styles.benefitLayout}`}>
          <div>
            <Heading
              eyebrow="KEY BENEFITS"
              title="Why choose a Private Limited Company?"
              text="A recognised structure for founders, shareholders and growing businesses planning for continuity and investment."
            />
            <div className={styles.benefitGrid}>
              {benefits.map(([icon, title, text]) => (
                <article key={title}>
                  <span className={styles.icon}><Icon name={icon} /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
          <aside className={styles.benefitPanel}>
            <span>BUILT AROUND YOUR BUSINESS</span>
            <h3>A considered foundation for the next chapter.</h3>
            <p>Align the entity, ownership and governance with the way the business intends to operate and grow.</p>
            <Link href="#process">Explore the process <Icon name="arrow" /></Link>
          </aside>
        </div>
      </section>

      <section className={styles.tax} id="structure">
        <div className={`container ${styles.taxGrid}`}>
          <div>
            <Heading
              eyebrow="BUSINESS STRUCTURE & TAX ASPECTS"
              title="Business structure & tax aspects"
              text="Consider the company's separate identity, capital plans and ongoing obligations as part of a joined-up formation decision."
              light
            />
            <ul className={styles.taxPoints}>
              {[
                ["building", "Separate legal identity", "The company holds a legal identity distinct from its members."],
                ["percent", "Corporate tax treatment", "Profits are subject to applicable corporate tax rules and current provisions."],
                ["gem", "Incentives and deductions", "Availability depends on eligibility, business activity and applicable law."],
                ["chart", "Access to funding", "A company structure can support equity, venture capital and lending discussions."],
                ["award", "Credibility and reputation", "Formal governance and company records can support market confidence."],
              ].map(([icon, title, text]) => (
                <li key={title}><Icon name={icon} /><div><strong>{title}</strong><p>{text}</p></div></li>
              ))}
            </ul>
          </div>
          <figure className={styles.taxImage}>
            <Image src="/Part-16 .png" alt="A modern business district representing company growth" fill sizes="(max-width: 850px) 100vw, 42vw" />
            <figcaption>Structure for today.<br /><strong>Readiness for tomorrow.</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.comparison} id="comparison">
        <div className="container">
          <Heading
            eyebrow="COMPARATIVE ANALYSIS"
            title="Which structure is right for you?"
            text="A high-level comparison of common business structures. Suitability and tax treatment depend on individual circumstances and current law."
          />
          <div className={styles.tableWrap} role="region" aria-label="Business structure comparison table" tabIndex={0}>
            <table>
              <thead>
                <tr>{["Features", "Private Limited Company", "Public Limited Company", "LLP", "Partnership Firm", "One Person Company", "Sole Proprietorship"].map((title, index) => (
                  <th key={title} className={index === 1 ? styles.focusCol : ""}>{title}</th>
                ))}</tr>
              </thead>
              <tbody>{comparison.map((row) => (
                <tr key={row[0]}>{row.map((cell, index) => (
                  <td key={`${row[0]}-${index}`} className={index === 1 ? styles.focusCol : ""}>{cell}</td>
                ))}</tr>
              ))}</tbody>
            </table>
          </div>
          <p className={styles.tableNote}>This comparison is for general information and is not a substitute for advice on your proposed structure.</p>
        </div>
      </section>

      <section className={styles.process} id="process">
        <div className="container">
          <Heading
            eyebrow="INCORPORATION PROCESS"
            title="Simple, transparent and timely"
            text="A clear sequence of decisions and filings, coordinated around complete information and authority processing."
          />
          <ol className={styles.timeline}>
            {process.map(([title, description], index) => (
              <li key={title}>
                <span className={styles.stepNum}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.stepIcon}><Icon name={["people", "search", "document", "file", "award", "building", "calendar"][index]} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.documents} id="documents">
        <div className={`container ${styles.documentGrid}`}>
          <div>
            <Heading
              eyebrow="DOCUMENTS REQUIRED"
              title="Key documents for incorporation"
              text="We will confirm the documents needed for your circumstances and the current filing process."
            />
            <ul className={styles.checklist}>{documents.map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
          </div>
          <div className={styles.documentImage}>
            <Image src="/Part-18 .png" alt="Company incorporation documents prepared for review" fill sizes="(max-width: 800px) 100vw, 45vw" />
            <span>Prepared with care.<br /><strong>Filed with clarity.</strong></span>
          </div>
        </div>
      </section>

      <section className={styles.requirements} id="requirements">
        <div className="container">
          <Heading
            eyebrow="KEY REQUIREMENTS"
            title="Members, directors & capital"
            text="A concise view of the core requirements for incorporating a private limited company in India."
          />
          <div className={styles.requirementGrid}>
            {requirements.map(([icon, title, text], index) => (
              <article key={title}>
                <span className={styles.requirementIcon}><Icon name={icon} /></span>
                <small>0{index + 1}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pricing} id="fees">
        <div className="container">
          <Heading
            eyebrow="OUR PROFESSIONAL FEES"
            title="Transparent and value-driven"
            text="Choose a starting scope. Final fees and government charges depend on the specific requirements and confirmed scope."
          />
          <div className={styles.priceGrid}>
            <article className={styles.priceCard}>
              <span>FORMATION ESSENTIALS</span>
              <h3>Basic Package</h3>
              <strong className={styles.price}>₹9,999<small>/-</small></strong>
              <ul>{["Name reservation", "Incorporation with ROC", "Drafting of MOA & AOA", "PAN, TAN and bank account assistance"].map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
              <Link className={styles.priceButton} href="/professionals/enquiry">Get Started <Icon name="arrow" /></Link>
            </article>
            <article className={`${styles.priceCard} ${styles.featuredPrice}`}>
              <span>EXTENDED BUSINESS SUPPORT</span>
              <h3>Comprehensive Package</h3>
              <strong className={styles.price}>₹14,999<small>/-</small></strong>
              <ul>{["All Basic Package services", "GST registration", "Director DIN & DSC coordination", "Initial compliance guidance", "Post-incorporation advisory"].map((item) => <li key={item}><Icon name="shield" />{item}</li>)}</ul>
              <Link className={styles.priceButton} href="/contact">Schedule a Consultation <Icon name="arrow" /></Link>
            </article>
            <article className={styles.customPrice}>
              <span>FOR COMPLEX REQUIREMENTS</span>
              <h3>Customised Quote</h3>
              <p>For multiple directors, foreign shareholders, sector-specific compliances or other tailored requirements.</p>
              <Link href="/professionals/enquiry">Get a Quote <Icon name="arrow" /></Link>
            </article>
          </div>
          <p className={styles.priceNote}>Professional fees are indicative. Applicable taxes, statutory fees and third-party costs may be additional.</p>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <Heading
            eyebrow="KEY FEATURES"
            title="Key features of a Private Limited Company"
            text="Core characteristics to weigh alongside your ownership, funding and governance plans."
            light
          />
          <div className={styles.featureStrip}>
            {[
              ["building", "Separate legal entity"],
              ["shield", "Limited liability protection"],
              ["calendar", "Perpetual succession"],
              ["gem", "Enhanced credibility"],
              ["chart", "Fundraising options"],
              ["percent", "Tax treatment"],
              ["globe", "Market opportunities"],
              ["rocket", "Expansion and global operations"],
            ].map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}
          </div>
        </div>
      </section>

      <section className={styles.faq} id="faqs">
        <div className={`container ${styles.faqLayout}`}>
          <div>
            <Heading
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title="A few useful answers"
              text="Get familiar with the main considerations before beginning a company incorporation."
            />
            <Link href="/faqs">Browse all FAQs <Icon name="arrow" /></Link>
          </div>
          <PrivateLimitedFaq faqs={faqs} styles={{ list: styles.faqList }} />
        </div>
      </section>

      {review && (
        <section className={styles.testimonial}>
          <div className="container">
            <Heading
              eyebrow="CLIENT PERSPECTIVE"
              title="Clear advice. Practical direction."
              text="A perspective shared with permission by a client of our corporate and commercial advisory team."
            />
            <figure>
              <span className={styles.quoteMark}>“</span>
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <strong>{review.name}</strong>
                <span>{review.designation}, {review.company}</span>
                <span className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating || 0)}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className={styles.insights}>
        <div className="container">
          <div className={styles.sectionTop}>
            <Heading eyebrow="INSIGHTS" title="Latest articles, updates and events" />
            <Link href="/insights">View all insights <Icon name="arrow" /></Link>
          </div>
          <div className={styles.articleGrid}>
            {articles.map((article) => (
              <article key={article.slug}>
                <Link href={`/insights/${article.slug}`} className={styles.articleImage}>
                  <Image src={article.image} alt="" fill sizes="(max-width: 650px) 100vw, 33vw" />
                </Link>
                <div>
                  <span>{article.category} · Astronis Insights</span>
                  <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <Link href={`/insights/${article.slug}`} className={styles.readMore}>Read insight <Icon name="arrow" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.knowledge}>
        <div className="container">
          <Heading
            eyebrow="KNOWLEDGE CENTRE"
            title="Guides, checklists and templates"
            text="Practical starting points to help organise your incorporation planning."
          />
          <div className={styles.resourceGrid}>
            {[
              ["CHECKLIST", "Private Limited Company Incorporation PDF", "file"],
              ["GUIDE", "Guide: MOA & AOA", "document"],
              ["TEMPLATE", "Template: Board Resolution", "folder"],
              ["CALENDAR", "Key Compliance Calendar", "calendar"],
            ].map(([type, title, icon]) => (
              <Link href="/knowledge-centre" key={type}>
                <span className={styles.icon}><Icon name={icon} /></span>
                <small>{type}</small>
                <h3>{title}</h3>
                <span className={styles.resourceAction}>Explore resource <Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <div className="container">
          <Heading eyebrow="SHARE YOUR EXPERIENCE WITH ASTRONIS GLOBAL" title="Your experience matters" />
          <div className={styles.experienceGrid}>
            <article><Icon name="message" /><div><h3>Write a review</h3><p>Share your experience and help us serve you better.</p></div><Link href="/testimonials">Write a Review <Icon name="arrow" /></Link></article>
            <article><Icon name="play" /><div><h3>Record a video testimonial</h3><p>Share your video feedback about your journey with Astronis Global.</p></div><Link href="/testimonials">Record a Video <Icon name="arrow" /></Link></article>
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className="container">
          <span>YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Ready to incorporate your Private Limited Company?</h2>
          <p>Let our experts guide you through a seamless and compliant incorporation process.</p>
          <Link href="/contact">Schedule a Consultation <Icon name="arrow" /></Link>
        </div>
      </section>
        </div>
        <PageSectionNav items={nav.map(([label, id]) => ({ id, label }))} />
      </div>
    </div>
  );
}
