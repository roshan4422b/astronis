import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import AboutResources from "./about-resources";
import { reasons } from "@/content/site";
import styles from "./astronis-difference.module.css";

const advisoryPillars = [
  ["scale", "Integrated Perspective", "Legal, regulatory, business and commercial insight."],
  ["people", "End-to-End Support", "From establishment to expansion and beyond."],
  ["shield", "Regulatory Understanding", "Deep insight into India's evolving ecosystem."],
  ["target", "Dispute to Growth", "Capability across advisory, compliance and disputes."],
  ["chart", "Sector Knowledge", "Experience across diverse industries."],
  ["bulb", "Practical Solutions", "Commercially sound and workable advice."],
  ["pin", "Pan-India Capability", "Representation and advisory across jurisdictions."],
  ["globe", "Global Collaboration", "International perspective and trusted networks."],
];

const traditional = ["Legal advice in isolation", "Separate compliance support", "Business advice without legal depth", "Financial focus with limited regulatory insight"];
const astronis = ["Corporate Advisory", "Regulatory Services", "Legal & Litigation", "Business Advisory"];
const reasonsWithNumber = reasons.slice(0, 10);

function Action({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return <Link href={href} className={`${styles.action} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>;
}

function DifferenceIcon({ name }: { name: string }) {
  if (name === "target") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="13" r="9" /><circle cx="11" cy="13" r="5" /><path d="m11 13 10-10m-5 0h5v5" /></svg>;
  return <Icon name={name} />;
}

export default function AstronisDifference() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="difference-title">
      <Image src="/Part-9 .png" alt="Astronis Global office building in a modern city" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">The Astronis Difference</span></nav>
        <div className={styles.heroContent}><div className={styles.heroCopy}><span className={styles.eyebrow}>THE ASTRONIS DIFFERENCE</span><h1 id="difference-title">A Broader Perspective.<br />A Stronger Partner.</h1><span className={styles.rule} /><p>Where legal insight, regulatory understanding, commercial sense and strategic thinking come together.</p><Action href="#integrated-model">Discover Our Approach</Action></div><aside className={styles.heroNote}>More than advice.<br />A long-term<br />advantage.<span className={styles.rule} /></aside></div>
      </div>
    </section>

    <section className={`container ${styles.overview}`} id="integrated-model" aria-labelledby="overview-title">
      <div className={styles.overviewCopy}><span className={styles.eyebrow}>WHY ASTRONIS GLOBAL</span><h2 id="overview-title">A Truly Integrated<br />Advisory Platform</h2><span className={styles.rule} /><p>Astronis Global is not just a law firm, not just a compliance consultant, and not just a business advisory company. We combine legal expertise, regulatory understanding, commercial insight and strategic thinking to deliver practical, implementable and sustainable solutions for businesses, investors, institutions and entrepreneurs across India&apos;s evolving business landscape.</p><Action href="/about/our-methodology">Our Methodology</Action></div>
      <div className={styles.pillarGrid}>{advisoryPillars.map(([icon, title, text]) => <article key={title}><span className={styles.iconBadge}><DifferenceIcon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className={styles.comparison} aria-labelledby="comparison-title"><div className="container"><div className={styles.comparisonHeading}><span className={styles.eyebrow}>THE TRADITIONAL APPROACH</span><h2 id="comparison-title">Fragmented Advice. Fragmented Results.</h2></div><div className={styles.comparisonGrid}><div className={styles.traditional}><ul>{traditional.map((item, index) => <li key={item}><span><Icon name={["briefcase", "shield", "people", "chart"][index]} /></span><strong>{item}</strong><small>{["Legal advice in isolation", "Regulatory support only", "Business insight without legal depth", "Financial focus with limited regulatory insight"][index]}</small></li>)}</ul></div><div className={styles.vs} aria-hidden="true">VS</div><div className={styles.astronisModel}><span className={styles.modelMark}>ASTRONIS<small>GLOBAL</small></span><h2>One Partner. Multiple Capabilities.</h2><div>{astronis.map((item) => <span key={item}>{item}</span>)}</div><p>Integrated. Strategic. Practical. Focused on Your Success.</p></div></div></div></section>

    <section className={`container ${styles.reasons}`} aria-labelledby="reasons-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>THE REASONS CLIENTS CHOOSE ASTRONIS GLOBAL</span><h2 id="reasons-title">Capability That Moves You Forward</h2></div><p>Ten ways our difference becomes practical value.</p></div><div className={styles.reasonGrid}>{reasonsWithNumber.map(([title, text], index) => <article key={title}><span className={styles.reasonNumber}>{String(index + 1).padStart(2, "0")}</span><span className={styles.reasonIcon}><DifferenceIcon name={["people", "target", "document", "bulb", "message", "people", "pin", "globe", "people", "handshake"][index]} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className={styles.commitment} aria-labelledby="commitment-title"><Image src="/Part-14 .png" alt="Chess pieces representing clear strategic decisions" fill sizes="100vw" /><div className={`container ${styles.commitmentInner}`}><div><span className={styles.eyebrow}>OUR COMMITMENT</span><h2 id="commitment-title">Your Objectives.<br />Our Priority.</h2><p>We take a solutions-oriented approach, combining professional rigour with commercial practicality, to help you navigate complexity, manage risk and achieve your business goals with confidence.</p><Action href="/contact">Let&apos;s Work Together</Action></div><div className={styles.commitmentNote}>Complex<br />challenges.<br /><strong>Clearer<br />solutions.</strong></div></div></section>

    <AboutResources />

    <section className={styles.cta} aria-labelledby="difference-cta-title"><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET&apos;S CREATE A STRONGER TOMORROW</span><h2 id="difference-cta-title">Start a Conversation</h2><p>Discover how Astronis Global can support your business with integrated, practical and strategic solutions.</p></div><div className={styles.actions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
