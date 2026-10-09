import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import CollaborateWithUsForm from "./collaborate-with-us-form";
import styles from "./collaborate-with-us.module.css";

const collaboratorTypes = [
  ["scale", "Law Firms", "(India & International)"],
  ["people", "Advocates & Legal Professionals"],
  ["document", "Chartered Accountants (CAs)"],
  ["file", "Company Secretaries (CS)"],
  ["building", "Regulatory & Policy Consultants"],
  ["network", "Industry & Subject-Matter Experts"],
  ["bulb", "Academic & Research Professionals"],
  ["people", "Consultants & Advisory Firms"],
  ["globe", "International Professionals & Firms"],
  ["handshake", "Strategic & Referral Partners"],
] as const;

const opportunities = [
  ["Client Referrals", "Refer clients for specific expertise or jurisdictional requirements.", "/images/services/cross-border-and-international-business-support.webp"],
  ["Joint Assignments", "Work together on complex transactions, disputes and regulatory matters.", "/images/services/business-advisory-and-consulting.webp"],
  ["International Matters", "Collaborate on cross-border matters through our global network.", "/international-network-hero.png"],
  ["Knowledge Sharing", "Share research, insights and sectoral expertise.", "/images/services/corporate-and-commercial-advisory.webp"],
] as const;

const benefits = [
  ["award", "Established Reputation", "A trusted brand with a proven track record since 2015."],
  ["network", "Multidisciplinary Capability", "Access to legal, regulatory, financial and business expertise under one platform."],
  ["india", "Pan-India Presence", "Strong presence across major cities and markets in India."],
  ["globe", "Global Network", "Collaboration through our international network across 30+ countries."],
  ["target", "Client-Centric Approach", "Focus on practical solutions and long-term value for clients."],
  ["document", "Transparent Engagement", "Clear process, professional standards and mutual trust."],
  ["bulb", "Knowledge & Insights", "Opportunities for joint research, publications and thought leadership."],
  ["handshake", "Long-Term Partnerships", "Build sustainable relationships for continued growth and mutual success."],
] as const;

const featured = [
  ["Cross-Border M&A Support", "Collaboration with international law firms.", "/images/services/cross-border-and-international-business-support.webp"],
  ["Regulatory Advisory", "Joint engagement with sector experts.", "/images/services/regulatory-and-compliance.webp"],
  ["Dispute Resolution", "Working with specialist counsel and experts.", "/images/services/arbitration-and-conciliation.webp"],
  ["Market Entry Support", "Collaboration for international business expansion.", "/globalpresence.png"],
] as const;

const questions = [
  ["Who can collaborate with Astronis Global?", "We welcome professionals, firms and organisations whose expertise complements legal, regulatory, corporate and business advisory matters."],
  ["What types of collaboration opportunities are available?", "Opportunities include client referrals, joint assignments, international matters and knowledge sharing."],
  ["Do you work with international professionals and firms?", "Yes. We work with international professionals and firms through our network across key jurisdictions."],
  ["How are client referrals managed?", "Referral discussions are handled directly, with clear communication and agreed professional responsibilities."],
  ["What are the engagement terms?", "The scope, responsibilities and engagement terms are discussed and agreed before work begins."],
] as const;

function SectionHeading({ title, description, className = "", headingId }: { title: string; description?: string; className?: string; headingId?: string }) {
  return <div className={`${styles.sectionHeading} ${className}`}>
    <h2 id={headingId}>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

export default function CollaborateWithUsPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/professional-collaboration-hero.png" alt="Professional partners collaborating across international markets" fill preload sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">Collaborate With Us</span></nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>PROFESSIONAL COLLABORATION</span>
          <h1>Collaborate<br />With Us.</h1>
          <p>Join hands with Astronis Global to deliver multidisciplinary legal, regulatory, corporate and business advisory solutions across India and international markets.</p>
          <div className={styles.heroActions}>
            <Link className={styles.goldButton} href="#enquiry">Submit Your Proposal <Icon name="arrow" /></Link>
            <Link className={styles.outlineButton} href="#network">Explore Our Network <Icon name="arrow" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className={`container ${styles.whoSection}`} aria-labelledby="who-title">
      <div className={styles.whoContent}>
        <SectionHeading headingId="who-title" title="Who Can Collaborate With Us?" description="We work with a wide range of professionals, firms and organisations to create value for clients across legal, regulatory, corporate and business advisory matters." />
        <div className={styles.collaboratorGrid}>
          {collaboratorTypes.map(([icon, title, supporting]) => <article className={styles.collaboratorCard} key={title}>
            <Icon name={icon} /><strong>{title}</strong>{supporting && <small>{supporting}</small>}
          </article>)}
        </div>
      </div>
      <article className={styles.featureCard}>
        <Image src="/Professional & Business Services .png" alt="Professional network partners meeting in an international business district" fill sizes="(max-width: 760px) 100vw, 34vw" />
        <div className={styles.featureShade} />
        <div><h2>Together for<br />Broader Possibilities.</h2><p>A connected professional ecosystem to serve clients across borders.</p></div>
      </article>
    </section>

    <section className={styles.opportunitySection} id="opportunities">
      <div className={`container ${styles.opportunityLayout}`}>
        <div className={styles.opportunityContent}>
          <SectionHeading title="Collaboration Opportunities" description="We welcome collaboration across a wide range of practice areas, sectors and jurisdictions." />
          <div className={styles.opportunityGrid}>
            {opportunities.map(([title, description, image]) => <article className={styles.opportunityCard} key={title}>
              <div className={styles.opportunityImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 50vw, 20vw" /></div>
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section className={`container ${styles.whySection}`} aria-labelledby="why-title">
      <SectionHeading headingId="why-title" title="Why Collaborate With Astronis Global?" description="We offer a trusted platform, deep expertise and a global outlook to our professional collaborators." />
      <div className={styles.benefitGrid}>
        {benefits.map(([icon, title, description]) => <article className={styles.benefitCard} key={title}>
          <Icon name={icon} /><h3>{title}</h3><p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.networkSection} id="network">
      <div className={`container ${styles.networkInner}`}>
        <div><h2>Our Global Professional Network</h2><p>We work with trusted professionals and firms across key jurisdictions to serve clients with local insight and international capability.</p></div>
        <div className={styles.stats}>
          <div><strong>30+</strong><span>Countries</span></div>
          <div><strong>100+</strong><span>Network Firms<br />&amp; Professionals</span></div>
          <div><strong>15+</strong><span>Industry Sectors</span></div>
          <div><strong>500+</strong><span>Collaborative<br />Engagements</span></div>
        </div>
        <div className={styles.networkMap}><Image src="/international-regions.png" alt="Map illustration of Astronis Global's international professional network" fill sizes="(max-width: 760px) 100vw, 28vw" /></div>
      </div>
    </section>

    <section className={`container ${styles.featuredSection}`}>
      <div className={styles.featuredContent}>
        <SectionHeading title="Featured Collaborations" description="Examples of how we work with professional partners (illustrative)." />
        <div className={styles.featuredGrid}>
          {featured.map(([title, description, image]) => <article className={styles.featuredCard} key={title}>
            <div><Image src={image} alt="" fill sizes="(max-width: 600px) 50vw, 20vw" /></div>
            <h3>{title}</h3><p>{description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={`container ${styles.faqGrid}`}>
        <div className={styles.faqIntro}>
          <span className={styles.faqEyebrow}>Your questions, answered</span>
          <SectionHeading headingId="faq-title" title="Frequently Asked Questions" />
          <Link className={styles.faqLink} href="/faqs">View All FAQs <Icon name="arrow" /></Link>
        </div>
        <div className={styles.faqList}>{questions.map(([question, answer]) => <details key={question}>
          <summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p>
        </details>)}</div>
      </div>
    </section>

    <section className={styles.enquirySection} id="enquiry" aria-labelledby="enquiry-title">
      <div className={`container ${styles.enquiryGrid}`}>
        <div className={styles.enquiryCopy}>
          <span className={styles.eyebrow}>PROFESSIONAL COLLABORATION</span>
          <h2 id="enquiry-title">Submit a Collaboration Enquiry</h2>
          <p>Tell us about your professional profile and collaboration interest. Our team will get in touch with you.</p>
          <div className={styles.enquiryImage}><Image src="/professional-collaboration-hero.png" alt="Professional partners discussing collaboration" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
          <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
          <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
        </div>
        <div className={styles.formPanel}><CollaborateWithUsForm /></div>
      </div>
    </section>

    <section className={styles.finalCta}>
      <Image src="/international-network-hero.png" alt="" fill sizes="100vw" />
      <div className={styles.ctaShade} />
      <div className={`container ${styles.ctaInner}`}>
        <div><h2>Let’s Build Stronger Collaborations.</h2><p>Partner with Astronis Global to create value for clients across legal, regulatory, corporate and business advisory matters.</p></div>
        <div className={styles.ctaActions}>
          <Link className={styles.goldButton} href="#enquiry">Submit Your Proposal <Icon name="arrow" /></Link>
          <Link className={styles.outlineButton} href="#network">Explore Our Network <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  </div>;
}
