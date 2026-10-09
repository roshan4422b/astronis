import Link from "next/link";
import type { ReactNode } from "react";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import CollaborationForm from "./professional-collaboration-form";
import styles from "./professional-collaboration.module.css";

const benefits = [
  ["globe", "Pan-India Presence", "Access to a strong presence across key Indian markets."],
  ["network", "Global Network", "Collaborate with our international network across 30+ countries."],
  ["people", "Multidisciplinary Expertise", "Legal, regulatory, financial and business advisory capabilities."],
  ["gear", "Client-Centric Approach", "Collaborative and practical solutions for complex matters."],
  ["handshake", "Mutual Growth", "Opportunities for referrals, joint assignments and strategic partnerships."],
  ["document", "Transparent Framework", "Clear engagement terms and professional standards."],
  ["shield", "Reputation & Trust", "Work with a trusted and established professional and business advisory."],
  ["chart", "Shared Opportunities", "Create new opportunities through complementary expertise and trusted partnerships."],
] as const;

const steps = [
  ["01", "Connect", "Initiate a discussion about collaboration opportunities."],
  ["02", "Evaluate", "Understand mutual capabilities, practice areas and markets."],
  ["03", "Align", "Define scope, engagement structure and terms."],
  ["04", "Collaborate", "Work together on client matters and opportunities."],
  ["05", "Grow", "Build a long-term and mutually beneficial relationship."],
] as const;

const models = [
  ["Referral Partnership", "Refer clients for matters within our mutual expertise.", "/images/services/business-advisory-and-consulting.webp"],
  ["Joint Client Engagements", "Work together on specific assignments and transactions.", "/images/services/cross-border-and-international-business-support.webp"],
  ["International Network Collaboration", "Cross-border support through our global network.", "/international-network-hero.png"],
  ["Knowledge & Research Collaboration", "Share insights, research and thought leadership.", "/images/services/corporate-and-commercial-advisory.webp"],
  ["Strategic Alliances", "Long-term partnerships for mutual growth in key markets.", "/globalpresence.png"],
] as const;

const networkPoints = [
  ["globe", "30+ Countries"],
  ["building", "Law Firms"],
  ["people", "Advisory Firms"],
  ["gear", "Subject-Matter Experts"],
  ["file", "Industry Specialists"],
] as const;

const collaboratorTypes = [
  ["scale", "Law Firms"],
  ["people", "Advocates & Legal Professionals"],
  ["document", "Chartered Accountants"],
  ["file", "Company Secretaries"],
  ["bulb", "Consultants"],
  ["gear", "Industry Experts"],
  ["network", "Academic & Research Professionals"],
  ["globe", "International Professional Firms"],
] as const;

const questions = [
  ["Who can collaborate with Astronis Global?", "We welcome law firms, professional service firms, subject-matter experts and industry specialists."],
  ["What types of collaboration opportunities are available?", "Referral partnerships, joint client engagements, international network collaboration, knowledge and research collaboration, and strategic alliances."],
  ["Do you work with international law firms and professionals?", "Yes. We welcome conversations with international law firms and professionals across our global network."],
  ["How are client referrals managed?", "Referral opportunities are discussed directly and handled with agreed responsibilities, clear communication and professional standards."],
  ["Can we collaborate on specific assignments?", "Yes. Collaboration can be structured around a specific assignment, client need or transaction."],
  ["What are the engagement terms?", "The scope, roles and engagement terms are agreed transparently before work begins."],
  ["How do I initiate a collaboration discussion?", "Complete the enquiry form on this page and our team will follow up about your collaboration opportunity."],
  ["Does Astronis Global have a formal referral policy?", "Please contact our team to discuss the applicable referral framework for your proposed collaboration."],
] as const;

function SectionTitle({ children, note, id }: { children: ReactNode; note?: string; id?: string }) {
  return <div className={styles.sectionTitle}>
    <h2 id={id}>{children}</h2>
    {note && <p>{note}</p>}
  </div>;
}

export default function ProfessionalCollaboration() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/professional-collaboration-hero.png" alt="Professionals building a global business partnership" fill preload sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/professionals">Professionals</Link><span aria-hidden="true">›</span><span aria-current="page">Professional Collaboration</span>
        </nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>PROFESSIONAL COLLABORATION</span>
          <h1>Collaborate for<br />Greater Impact.</h1>
          <p>We collaborate with law firms, professional service firms, subject-matter experts and industry specialists to deliver comprehensive and value-driven solutions across jurisdictions.</p>
          <div className={styles.heroActions}>
            <Link className={styles.goldButton} href="#collaborate">Collaborate With Us <Icon name="arrow" /></Link>
            <Link className={styles.outlineButton} href="#network">Explore Our Network <Icon name="arrow" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className={`container ${styles.whySection}`} aria-labelledby="why-title">
      <div className={styles.whyHeading}>
        <SectionTitle id="why-title" note="We believe in building trusted, long-term collaborations that create value for clients, professionals and our global network.">Why Collaborate With Astronis Global?</SectionTitle>
      </div>
      <div className={styles.benefitGrid}>
        {benefits.map(([icon, title, description]) => <article className={styles.benefitCard} key={title}>
          <Icon name={icon} />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.processSection} aria-labelledby="process-title">
      <div className={`container ${styles.processLayout}`}>
        <div className={styles.processImage}>
          <Image src="/images/services/business-advisory-and-consulting.webp" alt="Professionals discussing a collaboration opportunity" fill sizes="(max-width: 800px) 100vw, 38vw" />
        </div>
        <div className={styles.processContent}>
          <SectionTitle id="process-title" note="A structured and transparent approach to professional collaboration.">Our Collaboration Process</SectionTitle>
          <ol className={styles.steps}>
            {steps.map(([number, title, description]) => <li key={number}>
              <span className={styles.stepIcon}><Icon name={number === "01" ? "message" : number === "02" ? "search" : number === "03" ? "document" : number === "04" ? "handshake" : "chart"} /></span>
              <span className={styles.stepNumber}>{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>)}
          </ol>
        </div>
      </div>
    </section>

    <section className={`container ${styles.modelsSection}`} aria-labelledby="models-title">
      <div className={styles.sectionTitleRow}>
        <SectionTitle id="models-title" note="Flexible collaboration models to suit different professional requirements.">Collaboration Models</SectionTitle>
      </div>
      <div className={styles.modelGrid}>
        {models.map(([title, description, image]) => <article className={styles.modelCard} key={title}>
          <Link className={styles.modelImage} href="#collaborate" aria-label={`Learn more about ${title}`}>
            <Image src={image} alt="" fill sizes="(max-width: 760px) 50vw, 20vw" />
          </Link>
          <div className={styles.modelCopy}>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link href="#collaborate">Learn More <Icon name="arrow" /></Link>
          </div>
        </article>)}
      </div>
    </section>

    <section className={styles.networkSection} id="network">
      <div className={`container ${styles.networkLayout}`}>
        <div className={styles.networkOverview}>
          <SectionTitle id="network-title">Our Global Professional Network</SectionTitle>
          <p className={styles.networkIntro}>We collaborate with trusted professionals, law firms and advisors across key international markets.</p>
          <div className={styles.networkDetails}>
            <div className={styles.mapImage}><Image src="/international-regions.png" alt="Astronis Global network across India and international markets" fill sizes="(max-width: 760px) 100vw, 30vw" /></div>
            <ul>{networkPoints.map(([icon, text]) => <li key={text}><Icon name={icon} />{text}</li>)}</ul>
          </div>
          <Link className={styles.textLink} href="/professionals/international-network">Explore Our Global Network <Icon name="arrow" /></Link>
        </div>
        <div className={styles.whoSection}>
          <SectionTitle>Who Can Collaborate With Us?</SectionTitle>
          <p className={styles.networkIntro}>We welcome collaboration from a wide range of professionals and firms.</p>
          <div className={styles.typeGrid}>
            {collaboratorTypes.map(([icon, label]) => <div className={styles.typeCard} key={label}><Icon name={icon} /><span>{label}</span></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.statsSection} aria-labelledby="stats-title">
      <Image src="/international-network-hero.png" alt="" fill sizes="(max-width: 760px) 100vw, 34vw" className={styles.statsImage} />
      <div className={`container ${styles.statsInner}`}>
        <div className={styles.statsText}><h2 id="stats-title">Successful Collaborations</h2><p>Our collaborative approach has enabled us to deliver value on complex and multi-jurisdictional matters.</p></div>
        <div className={styles.stat}><strong>1000+</strong><span>Advisory<br />Assignments</span></div>
        <div className={styles.stat}><strong>30+</strong><span>Countries in<br />Our Network</span></div>
        <div className={styles.stat}><strong>50+</strong><span>Collaborating<br />Firms &amp; Experts</span></div>
      </div>
    </section>

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={`container ${styles.faqGrid}`}>
        <div className={styles.faqIntro}>
          <span className={styles.eyebrow}>Your questions, answered</span>
          <SectionTitle id="faq-title">Frequently Asked Questions</SectionTitle>
          <Link className={styles.textLink} href="/faqs">View All FAQs <Icon name="arrow" /></Link>
        </div>
        <div className={styles.faqList}>
          {questions.map(([question, answer]) => <details key={question}>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </div>
    </section>

    <section className={styles.enquirySection} id="collaborate">
      <div className={`container ${styles.enquiryGrid}`}>
        <div className={styles.enquiryCopy}>
          <span className={styles.eyebrow}>Professional Collaboration</span>
          <h2>Collaborate With Us</h2>
          <p>Let&apos;s explore how we can work together.</p>
          <div className={styles.enquiryImage}><Image src="/professional-collaboration-hero.png" alt="Professionals meeting to discuss a collaboration" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
          <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
          <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
        </div>
        <div className={styles.formPanel}>
          <CollaborationForm />
        </div>
      </div>
    </section>

    <section className={styles.finalCta}>
      <Image src="/professional-collaboration-hero.png" alt="" fill sizes="100vw" className={styles.ctaImage} />
      <div className={styles.ctaShade} />
      <div className={`container ${styles.ctaInner}`}>
        <div><h2>Build Stronger Partnerships.<br />Deliver Greater Value.</h2><p>Collaborate with Astronis Global and be part of a trusted network delivering comprehensive legal, regulatory and business advisory solutions.</p></div>
        <div className={styles.ctaActions}>
          <Link className={styles.goldButton} href="#collaborate">Collaborate With Us <Icon name="arrow" /></Link>
          <Link className={styles.outlineButton} href="#network">Explore Our Network <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  </div>;
}
