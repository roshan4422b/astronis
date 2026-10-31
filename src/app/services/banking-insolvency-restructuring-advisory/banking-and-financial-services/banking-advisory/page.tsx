import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { getServiceChildHeroImage } from "@/data/services";
import ServiceChildPageLayout from "@/app/services/_template/service-child-page-layout";
import PageStyles from "@/app/services/corporate-commercial-advisory/entity-formation/public-limited-company/public-limited-company.module.css";
import styles from "./banking-advisory.module.css";

export const metadata: Metadata = {
  title: "Banking Advisory | Banking & Financial Services | Astronis",
  description: "Advisory for banking transactions, lending documentation, borrower-lender relationships and regulatory compliance.",
  alternates: { canonical: "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/banking-advisory" },
};

export default function BankingAdvisoryPage() {
  const heroImage = getServiceChildHeroImage("banking-advisory", "banking-insolvency-restructuring-advisory")
    ?? "/services/banking-nbfc-and-financial-services-advisory.webp";
  const services = [
    ["building", "Banking Regulatory & Compliance Advisory", "Advise on applicable banking laws, directions and regulatory correspondence."],
    ["document", "Corporate Lending & Credit Facility Advisory", "Support term sheets, facility documents and lending arrangements."],
    ["file", "Loan, Security & Guarantee Documentation", "Draft and review security agreements, mortgages and guarantees."],
    ["shield", "Banking Disputes & Enforcement Advisory", "Assist with contractual disputes, enforcement and recovery."],
  ];
  const audience = [
    ["Banks and financial institutions", "For lending, documentation, compliance and enforcement matters."],
    ["Businesses and borrowers", "For credit facilities, financing negotiations and security arrangements."],
    ["Investors and promoters", "For transaction support involving lenders, financial assets or regulated entities."],
    ["Fintech and lending businesses", "For legal support on their relationships with banks and other financial partners."],
  ];
  const considerations = [
    ["Regulatory context", "Identify the relevant regulator, entity type and directions that apply to the specific matter."],
    ["Commercial terms", "Review key terms, conditions precedent, representations, covenants and default provisions."],
    ["Security and priority", "Check the proposed security package, supporting approvals and registration requirements."],
    ["Ongoing obligations", "Plan for reporting, information sharing, compliance and post-transaction responsibilities."],
  ];
  const process = [
    ["Understand the matter", "Review the transaction, parties, objectives and immediate requirements."],
    ["Assess documents and risks", "Identify key legal, regulatory and commercial issues for discussion."],
    ["Agree the support plan", "Set the work scope, responsibilities and milestones based on the matter."],
    ["Draft, negotiate and close", "Support documentation, stakeholder discussions and agreed closing steps."],
  ];
  const documentGroups = [
    ["Transaction documents", "Term sheets, sanction letters, facility agreements and correspondence."],
    ["Entity and approval records", "Constitutional documents, board approvals and authorisations relevant to the transaction."],
    ["Security information", "Details of proposed collateral, title or asset records, existing charges and guarantees."],
    ["Existing obligations", "Prior facility documents, amendments, covenants and material lender communications."],
  ];
  const faqs = [
    ["What does banking advisory cover?", "It can include lending and credit documentation, security arrangements, regulatory considerations and related disputes. The exact support depends on the transaction and the parties involved."],
    ["Can you assist both lenders and borrowers?", "Support can be scoped for a lender, borrower or another stakeholder. The engagement scope and any potential conflicts are assessed before work begins."],
    ["What should I share for an initial review?", "A short summary of the matter and the relevant term sheet, facility documents or correspondence are useful starting points. Share only information you are authorised to disclose."],
    ["How long will an advisory matter take, and what will it cost?", "Timing and fees depend on the scope, document volume, transaction complexity and stakeholder response times. These can be discussed once the matter is understood."],
  ];
  const relatedServices = [
    ["RBI Regulatory", "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/rbi-regulatory", "Regulatory advice for matters involving RBI frameworks and communications."],
    ["NBFC Compliance", "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/nbfc-compliance", "Compliance support for non-banking financial companies."],
    ["Financial Services Regulatory", "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/financial-services-regulatory", "Regulatory support across financial services activities."],
    ["Financial Institution Advisory", "/services/banking-insolvency-restructuring-advisory/banking-and-financial-services/financial-institution-advisory", "Legal support for financial institutions and their operations."],
  ];

  return (
    <div className={PageStyles.page}>
      <section className={`${PageStyles.hero} service-child-page-hero`} id="overview">
        <Image src={heroImage} alt="Banking advisory" fill priority className={PageStyles.heroImage} />
        <div className={`container ${PageStyles.heroInner}`}>
          <nav className={PageStyles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory">Banking, Insolvency & Restructuring Advisory</Link><span>/</span><Link href="/services/banking-insolvency-restructuring-advisory#banking-and-financial-services">Banking &amp; Financial Services</Link><span>/</span><span aria-current="page">Banking Advisory</span></nav>
          <div className={PageStyles.heroCopy}><span className={PageStyles.eyebrow}>BANKING &amp; FINANCIAL SERVICES · BANKING ADVISORY</span><h1>Banking Advisory</h1><h2 className="service-child-hero-subtitle">Navigating Banking Regulations. Securing Financial Transactions.</h2><div className={PageStyles.actions}><Link className={PageStyles.secondary} href="/contact">Schedule a Consultation <Icon name="calendar" /></Link></div></div>
        </div>
      </section>

      <ServiceChildPageLayout
        items={[
          { id: "services", label: "Services" },
          { id: "benefits", label: "Overview & benefits" },
          { id: "audience", label: "Who we support" },
          { id: "framework", label: "Regulatory framework" },
          { id: "process", label: "Our approach" },
          { id: "documents", label: "Documents" },
          { id: "faqs", label: "FAQs" },
          { id: "insights", label: "Knowledge centre" },
          { id: "related-services", label: "Related services" },
          { id: "consultation", label: "Get in touch" },
        ]}
      >
      <section className={`${PageStyles.services} ${styles.bankingServices}`} id="services">
        <div className="container">
          <div className={PageStyles.heading}><span className={PageStyles.eyebrow}>OUR BANKING ADVISORY SERVICES</span><h2>Practical legal and regulatory support for banking transactions</h2><p>Support across lending documentation, security structures, dispute resolution and bank regulatory matters.</p></div>

          <div className={PageStyles.serviceGrid}>
            {services.map(([icon, title, description]) => (
              <article className={PageStyles.serviceCard} key={String(title)}>
                <span className={`${PageStyles.icon} ${styles.cardIcon}`}><Icon name={String(icon)} /></span>
                <h3>{String(title)}</h3>
                <p>{String(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="benefits" aria-labelledby="banking-overview-title">
        <div className={`container ${styles.splitSection}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>BANKING ADVISORY, MADE CLEAR</span>
            <h2 id="banking-overview-title">Bring legal clarity to complex financial arrangements</h2>
            <p>Banking matters connect commercial decisions with detailed documentation and regulatory requirements. Advice starts with the transaction context and focuses on helping parties understand their rights, responsibilities and next steps.</p>
          </div>
          <aside className={styles.highlightPanel}>
            <span>OUR FOCUS</span>
            <h3>Clear advice, careful documentation and practical execution</h3>
            <p>Support is tailored to the parties, the facility structure and the stage of the matter.</p>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tintedSection}`} id="audience" aria-labelledby="banking-audience-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>WHO WE SUPPORT</span>
            <h2 id="banking-audience-title">Advice shaped around your role in the transaction</h2>
            <p>Whether you are arranging, providing or receiving finance, we help clarify the legal work involved.</p>
          </div>
          <div className={styles.audienceGrid}>
            {audience.map(([title, description], index) => (
              <article className={styles.infoCard} key={title}>
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="framework" aria-labelledby="banking-framework-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>REGULATORY &amp; TRANSACTIONAL CONTEXT</span>
            <h2 id="banking-framework-title">A joined-up view of banking matters</h2>
            <p>The rules and documentation that matter depend on the institution, product, parties and transaction. Our review considers the relevant context rather than treating every facility alike.</p>
          </div>
          <div className={styles.frameworkGrid}>
            {considerations.map(([title, description]) => (
              <article className={styles.frameworkCard} key={title}>
                <span aria-hidden="true" className={styles.frameworkMarker} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.comparison}>
            <div>
              <span className={styles.eyebrow}>LENDER PERSPECTIVE</span>
              <h3>Structure, enforceability and risk management</h3>
              <p>Focus on clear facility terms, appropriate approvals, security documentation and defined borrower obligations.</p>
            </div>
            <div>
              <span className={styles.eyebrow}>BORROWER PERSPECTIVE</span>
              <h3>Clarity, workable obligations and informed decisions</h3>
              <p>Focus on understanding pricing and conditions, ongoing covenants, available remedies and the practical effect of proposed terms.</p>
            </div>
          </div>
          <p className={styles.disclaimer}>Applicable requirements are transaction-specific and should be confirmed against current law and the facts of each matter.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tintedSection}`} id="process" aria-labelledby="banking-process-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>A CLEAR WORKING PROCESS</span>
            <h2 id="banking-process-title">From initial review to a considered next step</h2>
            <p>We align the legal work to your transaction priorities and the information available.</p>
          </div>
          <ol className={styles.processList}>
            {process.map(([title, description], index) => (
              <li className={styles.processStep} key={title}>
                <span className={styles.processNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} id="documents" aria-labelledby="banking-documents-title">
        <div className={`container ${styles.documentsLayout}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>PREPARING FOR A REVIEW</span>
            <h2 id="banking-documents-title">Documents that help us understand the matter</h2>
            <p>The relevant records vary by transaction. These are common starting points, not a fixed checklist.</p>
          </div>
          <div className={styles.documentList}>
            {documentGroups.map(([title, description], index) => (
              <article className={styles.documentItem} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <aside className={styles.documentNote}>
            <h3>Timing and fees</h3>
            <p>These depend on the scope, urgency, transaction complexity and documents to be reviewed. We can discuss an appropriate scope and fee arrangement after an initial understanding of the matter.</p>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tintedSection}`} id="faqs" aria-labelledby="banking-faq-title">
        <div className={`container ${styles.faqLayout}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>COMMON QUESTIONS</span>
            <h2 id="banking-faq-title">Banking advisory FAQs</h2>
            <p>Have a matter that is not covered here? Our team can help identify the right next step.</p>
            <Link className={styles.textLink} href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.faqList}>
            {faqs.map(([question, answer]) => (
              <details className={styles.faqItem} key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="insights" aria-labelledby="banking-insights-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>KEEP INFORMED</span>
            <h2 id="banking-insights-title">Insights for financial decision-makers</h2>
            <p>Explore the Astronis knowledge resources for practical perspectives and updates.</p>
          </div>
          <div className={styles.resourceGrid}>
            <Link href="/insights" className={styles.resourceCard}><span>01 / INSIGHTS</span><h3>Articles &amp; perspectives</h3><p>Browse legal and business perspectives from across our practice areas.</p><span className={styles.resourceAction}>Explore insights ↗</span></Link>
            <Link href="/insights/legal-updates" className={styles.resourceCard}><span>02 / UPDATES</span><h3>Legal &amp; regulatory updates</h3><p>Visit our updates section for recent legal and regulatory developments.</p><span className={styles.resourceAction}>View updates ↗</span></Link>
            <Link href="/knowledge-centre" className={styles.resourceCard}><span>03 / RESOURCES</span><h3>Knowledge centre</h3><p>Find research, reference materials and resources for decision-makers.</p><span className={styles.resourceAction}>Visit the centre ↗</span></Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tintedSection}`} id="related-services" aria-labelledby="banking-related-title">
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>EXPLORE MORE</span>
            <h2 id="banking-related-title">Related banking and financial services</h2>
            <p>Explore adjacent services that may be relevant to your matter.</p>
          </div>
          <div className={styles.relatedGrid}>
            {relatedServices.map(([title, href, description]) => (
              <Link className={styles.relatedCard} href={href} key={href}>
                <span>{title}</span><p>{description}</p><span className={styles.relatedArrow} aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.consultation} id="consultation" aria-labelledby="banking-consultation-title">
        <div className={`container ${styles.consultationInner}`}>
          <div>
            <span className={styles.eyebrow}>LET’S DISCUSS YOUR MATTER</span>
            <h2 id="banking-consultation-title">Need clarity on a banking transaction?</h2>
            <p>Share a brief outline of your requirements and our team will help you explore the appropriate next step.</p>
          </div>
          <Link className={styles.consultationButton} href="/contact">Schedule a consultation <Icon name="arrow" /></Link>
        </div>
      </section>
      </ServiceChildPageLayout>

    </div>
  );
}
