import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./join-network.module.css";

export const metadata = {
  title: "Join Our Professional Network",
  description: "Explore collaboration opportunities with Astronis Global and share your professional profile with our team.",
};

const application = "/professionals/enquiry?network=join";
const benefits = [
  ["globe", "Collaborate Across Borders"], ["chart", "Expand Your Practice"], ["people", "Access New Opportunities"],
  ["file", "Work on Meaningful Matters"], ["shield", "Be Part of a Trusted Network"], ["bulb", "Create Lasting Impact"],
] as const;
const professions = [
  ["scale", "Law Firms & Advocates"], ["chart", "Chartered Accountants"], ["file", "Company Secretaries"],
  ["shield", "Regulatory & Compliance Experts"], ["people", "Industry Consultants"], ["bulb", "Subject-Matter Specialists"],
] as const;
const reasons = [
  "Access diverse client opportunities", "Collaborate on cross-border and multidisciplinary matters", "Enhance your professional visibility",
  "Work with an experienced team", "Share knowledge and keep learning", "Build long-term, mutually beneficial relationships",
];
const areas = [
  ["building", "Corporate & Commercial Advisory"], ["shield", "Regulatory & Compliance"], ["scale", "Dispute Resolution & Arbitration"],
  ["chart", "Tax, Accounting & Financial Advisory"], ["people", "Industry-Specific Advisory"], ["globe", "International Market Support"],
  ["file", "Research, Knowledge & Training"], ["handshake", "Other areas of mutual interest"],
] as const;
const criteria = [
  "Relevant qualifications and professional membership where applicable", "Experience in your area of practice",
  "Good professional standing", "Commitment to ethical standards", "Willingness to collaborate and share expertise",
];
const standards = [
  "Integrity and confidentiality", "High standards of professional conduct", "Client-focused advice",
  "Careful conflict checks", "Compliance with applicable laws and rules", "Mutual respect and transparency",
];
const steps = [
  ["01", "Share Your Profile", "Tell us about your work and experience."],
  ["02", "Our Review", "We review your background and areas of expertise."],
  ["03", "Discussion", "We explore potential ways to collaborate."],
  ["04", "Onboarding", "We agree practical roles and next steps."],
  ["05", "Collaborate", "We work together when the right opportunity arises."],
] as const;
const faqs = [
  ["Is there a registration fee to join?", "There is no fee to share your profile or start a conversation with our team. Any future engagement terms are discussed for the specific opportunity."],
  ["Can I join as an individual professional?", "Yes. We welcome enquiries from qualified individual professionals as well as firms and specialist teams."],
  ["Will I receive client referrals?", "Collaboration depends on client needs, relevant expertise and applicable professional obligations. We cannot promise referrals or a set volume of work."],
  ["How are conflicts of interest handled?", "Potential conflicts, confidentiality and professional responsibilities are reviewed before a matter or collaboration proceeds."],
  ["Can international professionals join?", "Yes. We welcome conversations with professionals outside India where local knowledge and complementary expertise may support shared client needs."],
] as const;

export default function JoinProfessionalNetworkPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="join-title"><Image src="/join-professional-network-hero.png" alt="" fill preload sizes="100vw" /><div className={styles.heroShade} /><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/professionals">Professionals</Link><span aria-hidden="true">/</span><span aria-current="page">Join Our Professional Network</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>Join Our Professional Network</span><h1 id="join-title">Together for<br />Greater Possibilities.</h1><p>Connect with a growing professional network. Explore collaboration across legal, regulatory and business matters in India and international markets.</p><div className={styles.heroActions}><Link className={styles.primaryButton} href={application}>Submit Your Profile <Icon name="arrow" /></Link><Link className={styles.outlineButton} href="/professionals/partner-with-us">Explore Collaboration Opportunities <Icon name="arrow" /></Link></div></div><a className={styles.heroNote} href="#benefits"><Icon name="people" /><span>Shared Expertise<br />Wider Reach<br />Greater Impact</span><small>Discover the benefits <Icon name="arrow" /></small></a></div></section>

    <main><div className={styles.wrap}>
      <section className={styles.benefitStrip} id="benefits" aria-label="Benefits of joining our professional network">{benefits.map(([icon,title]) => <div key={title}><Icon name={icon} /><strong>{title}</strong></div>)}</section>

      <section className={styles.whoSection} aria-labelledby="who-title"><div><span className={styles.eyebrow}>A community of expertise</span><h2 id="who-title">Who Can Join?</h2><p>We welcome qualified professionals and firms who share a commitment to integrity, excellence and client-focused solutions.</p></div><div className={styles.professionGrid}>{professions.map(([icon,title]) => <div key={title}><Icon name={icon} /><strong>{title}</strong></div>)}</div></section>

      <section className={styles.reasonsSection} aria-label="Why join and where to collaborate"><div className={styles.featureImage}><Image src="/join-professional-network-feature.png" alt="Professionals reviewing plans together" fill sizes="(max-width: 760px) 100vw, 32vw" /></div><div className={styles.listCard}><h2>Why Join Astronis Global?</h2><ul>{reasons.map(item => <li key={item}><Icon name="shield" />{item}</li>)}</ul></div><div className={styles.listCard}><h2>Areas of Collaboration</h2><ul>{areas.map(([icon,title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div></section>

      <section className={styles.criteriaSection} aria-label="Network expectations"><div className={styles.listCard}><h2>Eligibility Criteria</h2><ul>{criteria.map(item => <li key={item}><Icon name="shield" />{item}</li>)}</ul></div><div className={styles.listCard}><h2>Our Professional Standards</h2><ul>{standards.map(item => <li key={item}><Icon name="shield" />{item}</li>)}</ul></div><blockquote><span aria-hidden="true">“</span><p>Alone we can do so little; together we can do so much.</p><cite>Our belief</cite></blockquote></section>

      <section className={styles.processSection} aria-labelledby="process-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>A clear path forward</span><h2 id="process-title">How to Join — A Simple Process</h2></div></div><div className={styles.processGrid}><ol>{steps.map(([number,title,description]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>)}</ol><aside><h3>Ready to Join?</h3><p>Share your background and areas of expertise to start a conversation with our team.</p><Link href={application}>Submit Your Profile <Icon name="arrow" /></Link></aside></div></section>

      <section className={styles.bottomGrid}><div className={styles.faq} aria-labelledby="faq-title"><div className={styles.sectionHeading}><h2 id="faq-title">Frequently Asked Questions</h2><Link href="/faqs">View All FAQs <Icon name="arrow" /></Link></div>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div><div className={styles.finalCard}><span className={styles.eyebrow}>Your next connection</span><h2>Let’s Build the Future Together.</h2><p>Bring your expertise to a network built around thoughtful collaboration and practical client solutions.</p><Link className={styles.primaryButton} href={application}>Connect With Us <Icon name="arrow" /></Link></div></section>
    </div></main>
  </div>;
}
