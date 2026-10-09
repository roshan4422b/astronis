import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import AboutResources from "./about-resources";
import styles from "./core-values.module.css";

const values = [
  ["shield", "Integrity", "We do what is right. Always.", "Honesty and ethical judgement guide every decision and every relationship."],
  ["people", "Client First", "Your objectives are our priority.", "We listen closely and shape our advice around your goals and business context."],
  ["diamond", "Excellence", "Committed to high standards.", "Careful preparation, attention to detail and continuous learning define our work."],
  ["scale", "Independence", "Objective and unbiased advice.", "We bring independent judgement and a clear perspective to complex decisions."],
  ["lock", "Confidentiality", "Your trust matters.", "We treat the information you entrust to us with care, discretion and respect."],
  ["people", "Collaboration", "Stronger together.", "We combine different disciplines and perspectives to build practical solutions."],
  ["leaf", "Responsibility", "Creating value for generations.", "We consider the wider impact of our work on people, businesses and communities."],
  ["globe", "Global Mindset", "Local insight. Global perspective.", "We connect an understanding of local realities with opportunities beyond borders."],
];
const principles = [
  ["briefcase", "Professionalism", "Highest standards in every engagement."],
  ["target", "Objectivity", "Fact-based analysis and balanced advice."],
  ["document", "Accountability", "We take ownership of our work."],
  ["chart", "Long-Term Perspective", "Building enduring relationships."],
];
const impacts = [
  { title: "For Our Clients", text: "Trusted advice. Practical solutions.", image: "/Professional & Business Services .png", icon: "shield" },
  { title: "For Our People", text: "A culture of respect, opportunity and growth.", image: "/Part-10 .png", icon: "people" },
  { title: "For Society", text: "Responsible business and positive impact.", image: "/Real Estate & Construction .png", icon: "building" },
  { title: "For a Sustainable Future", text: "Committed to ethical and inclusive growth.", image: "/Agriculture & Agri-Business .png", icon: "leaf" },
];

function ValueIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    diamond: <><path d="m3 3-2 6 11 13L23 9l-3-6H3Zm-2 6h22M8 3 6 9l6 13 6-13-3-6M6 9l6-6 6 6" /></>,
    lock: <><rect x="4" y="10" width="16" height="12" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v3" /><circle cx="12" cy="15" r="1" /></>,
    leaf: <><path d="M5 18C1 8 10 3 22 2c-1 12-6 20-15 16M3 22 17 8m-7 7-1-5m4 2 5 1" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V3h8v4M2 12c6 4 14 4 20 0m-10 1v4" /></>,
    target: <><circle cx="11" cy="13" r="9" /><circle cx="11" cy="13" r="5" /><path d="m11 13 10-10m-5 0h5v5" /></>,
  };
  return paths[name] ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg> : <Icon name={name} />;
}

function Action({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return <Link href={href} className={`${styles.action} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>;
}

export default function CoreValues() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="core-values-title">
      <Image src="/Part-10 .png" alt="A contemporary office overlooking the city" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">Core Values & Professional Principles</span></nav>
        <div className={styles.heroContent}><div className={styles.heroCopy}><span className={styles.eyebrow}>OUR CORE VALUES</span><h1 id="core-values-title">Principles<br />in Practice.</h1><p className={styles.heroSubtitle}>Guiding our actions. Strengthening your trust.</p><p>Our core values and professional principles define who we are, how we work and the value we create for our clients, people and the wider business community.</p></div><div className={styles.heroNote}><span>Integrity builds<br />lasting<br />relationships.</span><span className={styles.rule} /><small>PEOPLE · PRINCIPLES · PROGRESS</small></div></div>
      </div>
    </section>

    <section className={`container ${styles.belief}`} aria-labelledby="belief-title">
      <div><span className={styles.eyebrow}>OUR BELIEF</span><h2 id="belief-title">Values Create Value</h2><span className={styles.rule} /><p>At Astronis Global, we believe that strong values are the foundation of sustainable growth. Our professional principles guide our decisions, shape our approach and ensure that we deliver solutions with integrity, objectivity and a long-term perspective.</p></div>
      <blockquote className={styles.quote}><span aria-hidden="true">“</span><p>Doing what is right, even when no one is watching, is the true measure of a professional.</p><span className={styles.rule} /></blockquote>
      <div className={styles.beliefImage}><Image src="/Part-14 .png" alt="Legal reference books and research materials in a professional office" fill sizes="(max-width: 700px) 100vw, 40vw" /><div><ValueIcon name="scale" /><span>Ethics. Integrity.<br />Trust. Excellence.</span></div></div>
    </section>

    <section className={styles.values} aria-labelledby="values-heading"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR CORE VALUES</span><h2 id="values-heading">Principles That Define Us</h2></div><p>Eight commitments.<br />One enduring standard.</p></div><div className={styles.valueGrid}>{values.map(([icon, title, tagline, text], index) => <article className={styles.valueCard} key={title}><div className={styles.cardTop}><span className={styles.iconBadge}><ValueIcon name={icon} /></span><span className={styles.cardNumber} aria-hidden="true">0{index + 1}</span></div><h3>{title}</h3><p className={styles.tagline}>{tagline}</p><p className={styles.valueDescription}>{text}</p><span className={styles.cardLine} aria-hidden="true" /></article>)}</div></div></section>

    <section className={styles.professional} aria-labelledby="professional-title"><div className={`container ${styles.professionalGrid}`}><div className={styles.professionalCopy}><span className={styles.eyebrow}>OUR PROFESSIONAL PRINCIPLES</span><h2 id="professional-title">A Responsible<br />Approach to Advisory</h2><p>We combine legal expertise, regulatory insight and commercial understanding with a strong ethical foundation, ensuring practical, responsible and sustainable solutions.</p><Action href="/about/our-methodology">Our Approach</Action></div><div className={styles.professionalImage}><Image src="/Part-10 .png" alt="Professionals in discussion beside windows overlooking a city" fill sizes="(max-width: 700px) 100vw, 35vw" /></div><ul className={styles.principles}>{principles.map(([icon, title, text]) => <li key={title}><span className={styles.principleIcon}><ValueIcon name={icon} /></span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div></section>

    <section className={`container ${styles.impact}`} aria-labelledby="impact-title"><div className={styles.impactIntro}><span className={styles.eyebrow}>VALUES IN ACTION</span><h2 id="impact-title">Turning Principles<br />into Impact</h2><span className={styles.rule} /><p>Our values are reflected in the way we work with clients, support our people, contribute to society and build a more resilient and inclusive future.</p></div><div className={styles.impactGrid}>{impacts.map(item => <article className={styles.impactCard} key={item.title}><div className={styles.impactImage}><Image src={item.image} alt="" fill sizes="(max-width: 700px) 50vw, 20vw" /></div><div className={styles.impactBody}><span className={styles.impactIcon}><ValueIcon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

    <AboutResources />

    <section className={styles.cta} aria-labelledby="values-cta-title"><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S MOVE FORWARD TOGETHER</span><h2 id="values-cta-title">Partner with Astronis Global</h2><p>Work with a team that values integrity, delivers excellence and is committed to your long-term success.</p></div><div className={styles.actions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
