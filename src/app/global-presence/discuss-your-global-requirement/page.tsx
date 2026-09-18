import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import EnquiryForm from "./enquiry-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Discuss Your Global Requirements",
  description: "Tell Astronis Global about your cross-border legal, regulatory or business advisory requirements.",
};

const support = [
  ["globe", "Market Entry Support", "Regulatory, legal and commercial guidance in new jurisdictions."],
  ["file", "Regulatory & Compliance", "Understand and meet local legal and regulatory requirements."],
  ["scale", "Cross-Border Transactions", "Support for investments, joint ventures, M&A and commercial arrangements."],
  ["people", "International Dispute Support", "Strategic advice and representation across jurisdictions."],
  ["handshake", "Connect With Our Network", "Leverage our trusted international partners and advisors."],
] as const;

const steps = [
  ["We Receive Your Enquiry", "Our team will review your details."],
  ["We Analyse Your Needs", "We assess your requirement and identify the right experts."],
  ["We Connect You", "You will be connected with our relevant team or international partner."],
  ["We Support You", "We work with you towards practical, solution-oriented outcomes."],
] as const;

export default function GlobalRequirementPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/global-presence">Global Presence</Link><span>›</span><span>Enquire</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Global Enquiry</span><h1>Discuss Your<br />Global Requirements.</h1><h2>One conversation. A world of possibilities.</h2><p>Whether you are exploring a new market, managing regulatory requirements, seeking legal support or looking for a trusted international partner, our team is here to help.</p></div>
        <div className={styles.heroAside}><span>Global<br />Perspective.<br />Practical<br />Solutions.</span><i /><span>Astronis<br />Global.</span></div>
      </div>
    </section>

    <div className={styles.content}>
      <aside className={styles.support}><h2>How We Can Help</h2><div className={styles.supportList}>{support.map(([icon, title, description]) => <div className={styles.supportItem} key={title}><Icon name={icon} /><div><h3>{title}</h3><p>{description}</p></div></div>)}</div><div className={styles.supportImage}><h3>Local Expertise.<br />Global Impact.</h3><i /><span>Your trusted<br />global partner.</span></div></aside>
      <div className={styles.right}><EnquiryForm /><section className={styles.next}><h2>What Happens Next?</h2><ol>{steps.map(([title, description], index) => <li key={title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></section></div>
    </div>

    <section className={styles.cta}><div className={styles.ctaInner}><span className={styles.eyebrow}>A stronger tomorrow, together.</span><h2>Global Opportunities Await.</h2><p>Let&apos;s start a conversation and explore how Astronis Global can support your next chapter.</p><Link href="#global-enquiry-form">Get in Touch <Icon name="arrow" /></Link></div></section>
  </div>;
}
