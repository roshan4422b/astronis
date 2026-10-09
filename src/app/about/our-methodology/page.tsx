import Link from "next/link";
import AboutResources from "../about-resources";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./methodology.module.css";

const philosophy = [
  ["people", "Client-Centric", "Your objectives at the centre."],
  ["bulb", "Practical", "Solutions that work in the real world."],
  ["building", "Integrated", "Legal, regulatory and commercial perspective."],
  ["target", "Outcome-Focused", "Measurable and sustainable results."],
  ["shield", "Ethical", "Integrity in every engagement."],
  ["people", "Collaborative", "A true extension of your team."],
  ["globe", "Forward-Looking", "Anticipating change. Creating opportunities."],
  ["chart", "Value-Driven", "Long-term partnerships beyond transactions."],
];
const steps = [
  ["search", "Understand", "We listen to your objectives, assess the context and identify key issues."],
  ["document", "Assess", "We analyse legal, regulatory and commercial aspects to map risks and opportunities."],
  ["settings", "Structure", "We design practical, customised strategies and solution options."],
  ["people", "Advise", "We provide clear, actionable and business-oriented recommendations."],
  ["chart", "Implement", "We support execution with documentation, filings and stakeholder coordination."],
  ["shield", "Monitor", "We track compliance, regulatory changes and emerging risks."],
  ["target", "Evolve", "We continue to support your growth with ongoing advisory and strategic guidance."],
];
const differences = [
  ["bulb", "Multidisciplinary Expertise", "Legal, regulatory, tax, financial and industry insight."],
  ["target", "Proactive Risk Management", "Identify and address issues before they escalate."],
  ["people", "Dedicated Advisory Support", "Responsive, accessible and solution-oriented."],
  ["chart", "Focus on Long-Term Value", "Building enduring relationships, not just transactions."],
];
const outcomes = [["target", "Greater Clarity"], ["settings", "Reduced Risk"], ["chart", "Faster Execution"], ["people", "Better Decisions"], ["globe", "Long-Term Success"]];

export const metadata = {
  title: "Our Methodology",
  description: "Explore Astronis Global’s seven-step methodology: understand, assess, structure, advise, implement, monitor and evolve. A structured approach for practical, lasting outcomes.",
  alternates: { canonical: "/about/our-methodology" },
};

function MethodIcon({ name }: { name: string }) {
  if (name === "target") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="13" r="9" /><circle cx="11" cy="13" r="5" /><path d="m11 13 10-10m-5 0h5v5" /></svg>;
  if (name === "settings") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 2-1 3-3 1-3 3 2 3-2 3 3 3 3 1 1 3h6l1-3 3-1 3-3-2-3 2-3-3-3-3-1-1-3H9Z" /><circle cx="12" cy="12" r="4" /></svg>;
  return <Icon name={name} />;
}
function Action({ href, children, outline = false, blue = false }: { href: string; children: React.ReactNode; outline?: boolean; blue?: boolean }) {
  return <Link href={href} className={[styles.action, outline ? styles.outline : "", blue ? styles.blue : ""].join(" ")}>{children}<Icon name="arrow" /></Link>;
}

export default function MethodologyPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="methodology-title">
      <Image src="/Part-10 .png" alt="A modern boardroom overlooking the city" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">Our Methodology</span></nav>
        <div className={styles.heroContent}><div className={styles.heroCopy}><span className={styles.eyebrow}>OUR METHODOLOGY</span><h1 id="methodology-title">A Structured Approach<br />for Real Outcomes.</h1><span className={styles.rule} /><p>We combine legal expertise, regulatory insight and commercial understanding through a disciplined, collaborative and solution-oriented methodology to help our clients navigate complexity and achieve sustainable success.</p><Action href="#our-process">Our Approach</Action></div><div className={styles.heroNote}>Strategy.<br />Execution.<br />Results.<span className={styles.rule} /><small>A clearer path to<br />a stronger tomorrow.</small></div></div>
      </div>
    </section>

    <section className={`container ${styles.philosophy}`} aria-labelledby="philosophy-title"><div className={styles.intro}><span className={styles.eyebrow}>OUR PHILOSOPHY</span><h2 id="philosophy-title">Insight. Structure.<br />Collaboration. Impact.</h2><span className={styles.rule} /><p>Our methodology is built on the belief that the best solutions emerge when deep legal knowledge, regulatory foresight, commercial practicality and client collaboration come together.</p></div><div className={styles.philosophyGrid}>{philosophy.map(([icon, title, text]) => <article key={title}><span className={styles.iconBadge}><MethodIcon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className={styles.process} id="our-process" aria-labelledby="process-title"><div className="container"><div className={styles.processHeading}><div><span className={styles.eyebrow}>OUR PROCESS</span><h2 id="process-title">A Seven-Step Methodology</h2><p>A structured, transparent and collaborative process designed to deliver clarity, reduce risk and create lasting value.</p></div><Action href="/contact#enquiry-form" blue>Discuss Your Requirements</Action></div><ol className={styles.steps}>{steps.map(([icon, title, text], index) => <li key={title}><div className={styles.stepTop}><span className={styles.stepNumber}>0{index + 1}</span><span className={styles.stepIcon}><MethodIcon name={icon} /></span></div><h3>{title}</h3><p>{text}</p><span className={styles.stepConnector} aria-hidden="true"><Icon name="arrow" /></span></li>)}</ol><div className={styles.processFoot}><span>Clarity at every step. Commitment at every stage.</span><span aria-hidden="true" /><Icon name="arrow" /></div></div></section>

    <section className={`container ${styles.difference}`} aria-labelledby="difference-title"><div className={styles.differenceImage}><Image src="/explore_services.png" alt="Contemporary glass architecture representing a strong business foundation" fill sizes="(max-width: 700px) 100vw, 33vw" /><p>Complex<br />challenges.<br />Clearer<br />solutions.<span className={styles.rule} /></p></div><div className={styles.differenceCopy}><span className={styles.eyebrow}>OUR DIFFERENTIATOR</span><h2 id="difference-title">More Than Advice.<br />A Partnership.</h2><span className={styles.rule} /><p>Our methodology goes beyond traditional advisory. We combine legal precision with commercial sense, ensuring solutions that are practical, implementable and aligned with your long-term goals.</p></div><ul className={styles.differenceList}>{differences.map(([icon, title, text]) => <li key={title}><span className={styles.iconBadge}><MethodIcon name={icon} /></span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></section>

    <section className={styles.outcomes} aria-labelledby="outcomes-title"><div className={`container ${styles.outcomesInner}`}><div><span className={styles.eyebrow}>THE CLIENT VALUE</span><h2 id="outcomes-title">Turning Strategy into<br />Sustainable Growth</h2><span className={styles.rule} /></div><ul>{outcomes.map(([icon, title]) => <li key={title}><MethodIcon name={icon} /><h3>{title}</h3></li>)}</ul></div></section>

    <AboutResources />

    <section className={styles.cta} aria-labelledby="methodology-cta-title"><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S BUILD WHAT’S NEXT TOGETHER</span><h2 id="methodology-cta-title">Partner with Astronis Global</h2><p>Discuss your objectives with our team and discover how our methodology can support your growth.</p></div><div className={styles.actions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
