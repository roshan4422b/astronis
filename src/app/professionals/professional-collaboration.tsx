import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import styles from "./professional-collaboration.module.css";

const values = [
  ["handshake", "Trusted relationships"], ["bulb", "Complementary expertise"],
  ["people", "Shared perspective"], ["globe", "Cross-border opportunities"],
  ["chart", "Sustainable growth"],
];
const models = [
  ["arrow", "Referrals", "Connect clients with complementary expertise."],
  ["file", "Matter-based support", "Bring the right perspective to a specific brief."],
  ["people", "Local counsel", "Add local context to cross-border work."],
  ["scale", "Co-counsel arrangements", "Coordinate roles across complex matters."],
  ["document", "Research & knowledge", "Share insight where deeper analysis helps."],
  ["building", "Sector collaboration", "Combine industry and practice experience."],
  ["globe", "India entry support", "Work together on market-entry questions."],
  ["handshake", "International collaboration", "Build relationships across jurisdictions."],
];
const collaborators = ["Law firms and advocates", "Chartered accountants and accounting firms", "Company secretaries and governance advisors", "Regulatory and compliance specialists", "Industry and technical experts", "Consultants and advisory firms", "Academic and research institutions"];
const benefits = ["Access to complementary expertise", "Coordinated support across jurisdictions", "Knowledge and resource sharing", "Capacity for complex matters", "Opportunities for joint business development", "Mutual growth with professional independence"];
const areas = ["Corporate & commercial", "Regulatory & compliance", "Dispute resolution", "Tax and cross-border transactions", "Banking, finance & capital markets", "ESG, sustainability & risk", "Sector-focused advisory"];
const faqs = [
  ["Who can collaborate with Astronis Global?", "We welcome conversations with law firms, accountants, company secretaries, consultants and other professionals whose expertise complements our work."],
  ["Do collaborations require a formal agreement?", "The arrangement depends on the scope. Where needed, we agree clear terms covering responsibilities, confidentiality, client relationships and applicable professional obligations."],
  ["Can we work together on a single matter?", "Yes. Some collaborations are tailored to a particular matter, while others develop into longer-term working relationships."],
  ["Do you work with international firms?", "We are open to cross-border collaboration where our experience and local perspective can support a shared client objective."],
  ["How are conflicts and confidentiality handled?", "We assess each opportunity for conflicts and confidentiality needs before agreeing a scope of work."],
];

export default function ProfessionalCollaboration() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="collaboration-title"><Image src="/professional-collaboration-hero.png" alt="" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/professionals">Professionals</Link><span aria-hidden="true">/</span><span aria-current="page">Professional Collaboration</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>Professional collaboration</span><h1 id="collaboration-title">Stronger together.<br />Broader possibilities.</h1><p>We work with professional peers to bring complementary legal, regulatory and business perspectives to complex client needs.</p><div className={styles.heroActions}><a className={styles.button} href="#models">Explore collaboration <Icon name="arrow" /></a><Link className={styles.outlineButton} href="/professionals/enquiry">Partner with us <Icon name="arrow" /></Link></div></div><a className={styles.heroNote} href="#models"><Icon name="handshake" /><span>Different Expertise<br />A Shared Purpose</span><small>People / Partnership / Progress <Icon name="arrow" /></small></a></div></section>
    <main>
      <section className={`container ${styles.values}`} aria-label="Benefits of collaboration">{values.map(([icon,title])=><div key={title}><Icon name={icon} /><strong>{title}</strong></div>)}</section>
      <section className={`container ${styles.philosophy}`} aria-labelledby="philosophy-title"><div className={styles.philosophyImage}><Image src="/Professional & Business Services .png" alt="Professionals connecting across markets" fill sizes="(max-width: 800px) 100vw, 40vw" /></div><div className={styles.philosophyCopy}><span className={styles.eyebrow}>Our belief</span><h2 id="philosophy-title">Our collaboration philosophy</h2><p>We value long-term, trust-based relationships built on mutual respect, professional independence and a shared commitment to clients. Each opportunity begins with an open conversation about where our experience fits together.</p><Link href="/about/our-methodology">Our approach <Icon name="arrow" /></Link></div><blockquote>Together, we can bring broader perspective to clients across sectors and markets.</blockquote></section>
      <section id="models" className={`container ${styles.modelsSection}`} aria-labelledby="models-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Ways to work together</span><h2 id="models-title">Collaboration models</h2></div><Link href="/professionals/enquiry">Discuss a collaboration <Icon name="arrow" /></Link></div><div className={styles.modelsGrid}>{models.map(([icon,title,body],index)=><Link href="/professionals/enquiry" key={title}><span className={styles.modelNumber}>0{index+1}</span><span className={styles.modelIcon}><Icon name={icon} /></span><h3>{title}</h3><p>{body}</p><span className={styles.modelArrow}>Explore collaboration <Icon name="arrow" /></span></Link>)}</div></section>
      <section className={`container ${styles.detailGrid}`} aria-label="Collaboration details"><div><h2>Who we collaborate with</h2><ul>{collaborators.map(item=><li key={item}><Icon name="shield" />{item}</li>)}</ul></div><div><h2>Key benefits</h2><ul>{benefits.map(item=><li key={item}><Icon name="chart" />{item}</li>)}</ul></div><div><h2>Areas of collaboration</h2><ul>{areas.map(item=><li key={item}><Icon name="globe" />{item}</li>)}</ul></div></section>
      <section className={styles.processBand}><div className={`container ${styles.processGrid}`}><div className={styles.network}><Icon name="globe" /><div><span className={styles.eyebrow}>Connected expertise</span><h2>A wider view. Local understanding.</h2><p>We work with trusted professionals to bring the right knowledge to each opportunity.</p><Link href="/global-presence">Explore global presence <Icon name="arrow" /></Link></div></div><div className={styles.process}><span className={styles.eyebrow}>From first conversation to shared work</span><h2>Our collaboration process</h2><ol>{[["01","Connect","Tell us about your work."],["02","Assess","Explore shared opportunities."],["03","Align","Agree scope and roles."],["04","Collaborate","Work together with clarity."],["05","Grow","Build the relationship."]].map(([n,title,body])=><li key={n}><span>{n}</span><strong>{title}</strong><p>{body}</p></li>)}</ol></div></div></section>
      <section className={`container ${styles.bottomGrid}`}><div className={styles.faq} id="faq"><div className={styles.sectionHeading}><h2>Frequently asked questions</h2><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div><div className={styles.interest}><span className={styles.eyebrow}>Start a conversation</span><h2>Interested in collaborating?</h2><p>We welcome conversations with qualified professionals and firms who value thoughtful, independent and practical advice.</p><Link className={styles.button} href="/professionals/enquiry">Share your interest <Icon name="arrow" /></Link></div></section>
    </main>
  </div>;
}
