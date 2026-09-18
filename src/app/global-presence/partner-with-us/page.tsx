import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import Image from "@/app/_components/asset-image";
import PartnershipForm from "./partnership-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Partner With Us | Global Presence",
  description: "Explore international collaboration and partnership opportunities with Astronis Global.",
};

const models = [
  ["Referral Partnership", "Work together through trusted referrals in mutually relevant jurisdictions.", "referral"],
  ["Strategic Alliance", "Collaborate on specific practice areas, sectors or markets.", "alliance"],
  ["Co-Counsel Arrangement", "Jointly advise on complex cross-border matters.", "cocounsel"],
  ["Knowledge Collaboration", "Share insights, research and market intelligence.", "knowledge"],
] as const;

const benefits = [
  ["trophy", "Reputed brand and trusted presence"],
  ["globe", "Access to diverse markets and clients"],
  ["gear", "Multidisciplinary expertise"],
  ["people", "Collaborative and transparent approach"],
  ["network", "Opportunities for mutual growth"],
  ["handshake", "Long-term relationship focus"],
] as const;

const steps = [
  ["Initial Discussion", "Understand your expertise and objectives."],
  ["Evaluation", "Explore alignment and opportunities."],
  ["Structuring", "Discuss a suitable partnership model."],
  ["Agreement", "Finalize terms and formalize collaboration."],
  ["Engagement", "Begin working together and create value."],
] as const;

const tabs = [
  ["Overview", "overview"], ["Why Partner", "why"], ["Partnership Models", "models"],
  ["Our Expectations", "expectations"], ["Key Benefits", "benefits"],
  ["Application Process", "process"], ["FAQs", "faqs"], ["Enquire", "enquire"],
] as const;

export default function GlobalPartnerPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><div className={styles.heroInner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/global-presence">Global Presence</Link><span>›</span><span>Partner With Us</span></nav>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Global Presence</span><h1>Partner With Us</h1><h2>Collaborate. Create. Grow.</h2><p>We welcome collaborations with law firms, consultants and industry experts who share our commitment to excellence, integrity and client value. Together, we can create meaningful opportunities across borders.</p><Link href="#models">Explore Partnership Opportunities <Icon name="arrow" /></Link></div>
      <div className={styles.heroAside}><span>Shared<br />Expertise.</span><i /><span>Expanded<br />Opportunities.</span><i /><span>A Stronger<br />Tomorrow.<br />Together.</span></div>
    </div></section>

    <nav className={styles.sectionNav} aria-label="Partnership sections"><div>{tabs.map(([title, anchor]) => <a href={`#${anchor}`} key={anchor}>{title}</a>)}</div></nav>

    <section className={styles.overview} id="overview"><div className={styles.overviewCopy}><h2>Building a Stronger Global Network.</h2><p>Astronis Global is committed to building a trusted international network of professionals and firms to support our clients across key markets. We believe in long-term, mutually beneficial relationships based on shared values, complementary capabilities and a client-centric approach.</p><Link href="/about/global-perspective-and-international-network">Our Global Vision <Icon name="arrow" /></Link></div><div className={styles.overviewTiles}><div><Icon name="people" /><span>Collaborative<br />Growth</span></div><div><Icon name="globe" /><span>Cross-Border<br />Opportunities</span></div><div><Icon name="shield" /><span>Trusted<br />Partnerships</span></div><div><Icon name="chart" /><span>Greater<br />Client Value</span></div></div><div className={styles.overviewImage}><span>Local Expertise.<br />Global Impact.</span></div></section>

    <section className={styles.models} id="models"><div className={styles.sectionHeading}><h2>Partnership Models</h2><a href="#enquire">Explore All Models <Icon name="arrow" /></a></div><div className={styles.modelGrid}>{models.map(([title, description, image]) => <a href="#enquire" className={styles.modelCard} key={title}><span className={`${styles.modelImage} ${styles[image]}`} aria-hidden="true" /><span className={styles.modelBody}><strong>{title}</strong><small>{description}</small><Icon name="arrow" /></span></a>)}</div></section>

    <section className={styles.why} id="why"><h2>Why Partner with Astronis Global?</h2><div className={styles.benefits} id="benefits">{benefits.map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div></section>

    <section className={styles.process} id="process"><div className={styles.sectionHeading}><h2>Our Partnership Process</h2><a href="#enquire">Learn More About the Process <Icon name="arrow" /></a></div><ol>{steps.map(([title, description], index) => <li key={title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></section>

    <section className={styles.details} id="expectations"><div><span className={styles.eyebrow}>Our Expectations</span><h2>Built on Shared Standards.</h2><p>We look for partners who value professional integrity, clear communication, reliable delivery and practical advice for clients working across jurisdictions.</p></div><div id="faqs"><span className={styles.eyebrow}>Partnership FAQs</span><h2>Common Questions</h2><details><summary>Who can explore a partnership?</summary><p>Law firms, consultants and industry specialists with complementary expertise are welcome to get in touch.</p></details><details><summary>Is a particular partnership model required?</summary><p>No. We discuss the right structure together based on the work, jurisdictions and shared objectives.</p></details></div></section>

    <section className={styles.cta}><div><h2>Let&apos;s Explore Opportunities Together.</h2><p>We look forward to connecting with you and building a stronger, more collaborative global network.</p></div><a href="#enquire">Start a Conversation <Icon name="arrow" /></a></section>

    <section className={styles.enquiry} id="enquire"><div className={styles.enquiryInner}><div className={styles.enquiryCopy}><span className={styles.eyebrow}>Partner With Us</span><h2>Let&apos;s Build a Stronger Network Together.</h2><p>Tell us about your firm, expertise and the opportunities you&apos;d like to explore. Our team will get in touch for a detailed discussion.</p><div className={styles.enquiryImage}><Image src="/professional-collaboration-hero.png" alt="Professionals forming a partnership" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><PartnershipForm /></div></section>
  </div>;
}
