import Link from "next/link";
import AboutResources from "./about-resources";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import styles from "./vision-mission.module.css";

const statements = [
  { icon: "target", title: "Our Purpose", label: "WHY WE EXIST", text: "To empower businesses and communities through knowledge, integrity and innovation, by providing integrated legal, regulatory and business advisory solutions that create measurable and sustainable value." },
  { icon: "eye", title: "Our Vision", label: "OUR ASPIRATION", text: "To be a globally respected advisory firm, recognised for trusted relationships, practical solutions and meaningful impact across industries and jurisdictions." },
  { icon: "mountain", title: "Our Mission", label: "WHAT WE DO", text: "To deliver insight-led, client-centric and innovative solutions that help businesses establish, operate, protect, restructure and expand, while upholding the highest professional and ethical standards." },
];
const principles = [
  ["shield", "Integrity", "We do what is right, always."],
  ["people", "Client First", "Your objectives are our priority."],
  ["bulb", "Excellence", "Committed to high standards."],
  ["scale", "Independence", "Objective and unbiased advice."],
  ["lock", "Confidentiality", "Your trust matters."],
  ["handshake", "Collaboration", "Stronger together."],
  ["leaf", "Responsibility", "Creating value for generations."],
  ["globe", "Global Mindset", "Local insight. Global perspective."],
];
const aims = [
  ["chart", "Enable Growth", "Support businesses, investors and entrepreneurs at every stage."],
  ["file", "Strengthen Compliance", "Help navigate complex regulatory environments."],
  ["leaf", "Promote Responsible Business", "Encourage sustainable and ethical growth."],
  ["people", "Create Long-Term Value", "Build enduring relationships and positive impact."],
];
const impacts = [
  ["For Clients", "Practical solutions for real-world challenges.", "/Real Estate & Construction .png"],
  ["For People", "A platform for learning, growth and opportunity.", "/Professional & Business Services .png"],
  ["For Society", "Support for responsible and inclusive growth.", "/Agriculture & Agri-Business .png"],
  ["For the Future", "Committed to a more sustainable and resilient world.", "/Part-9 .png"],
];


function PurposeIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    target: <><circle cx="11" cy="13" r="9" /><circle cx="11" cy="13" r="5" /><circle cx="11" cy="13" r="1" /><path d="m11 13 9-9m-4 0 1-3 2 2 3 1-3 2h-3V4Z" /></>,
    eye: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" /><circle cx="12" cy="12" r="5" /></>,
    mountain: <><path d="m1 22 7-11 4 5m-7 6L15 6l9 16H1Zm10-10 4 3 3-3M15 6V1h6l-3 2 3 2h-6" /></>,
    lock: <><rect x="5" y="10" width="14" height="12" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v3" /><circle cx="12" cy="15" r="1" /></>,
    leaf: <><path d="M5 18C1 8 10 3 22 2c-1 12-6 20-15 16M3 22 17 8m-7 7-1-5m4 2 5 1" /></>,
    handshake: <><path d="m1 7 4-3 5 2 4-2 5 2 4 7-4 3-5 5-3-1-6-5-3 1-2-9Zm8-1-3 5 3 1 4-3 6 7M5 4l-3 9m17-7 2 8m-11 1 5 4m-8-1 3 3" /></>,
  };
  return paths[name] ? <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg> : <Icon name={name} />;
}

function Action({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return <Link href={href} className={`${styles.action} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>;
}

export default function VisionMission() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="vision-title">
      <Image src="/images/our-story/mountain-journey.jpg" alt="Mountain ranges stretching towards the horizon" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">Vision, Mission & Purpose</span></nav>
        <div className={styles.heroContent}><div><span className={styles.eyebrow}>VISION, MISSION & PURPOSE</span><h1 id="vision-title">Driven by Purpose.<br />Guided by Principles.<br />Committed to a Better Tomorrow.</h1><span className={styles.rule} /><p>At Astronis Global, our vision, mission and purpose define who we are, what we strive to achieve and the value we create for our clients, people and the wider business community.</p></div><p className={styles.heroNote}>People.<br />Business.<br />Society.<br />A stronger<br />tomorrow.<span className={styles.rule} /></p></div>
      </div>
    </section>

    <section className={styles.statements} aria-label="Our purpose, vision and mission"><div className={`container ${styles.statementGrid}`}>{statements.map(item => <article key={item.title}><div className={styles.statementHeading}><PurposeIcon name={item.icon} /><div><h2>{item.title}</h2><span className={styles.eyebrow}>{item.label}</span><span className={styles.rule} /></div></div><p>{item.text}</p></article>)}</div></section>

    <section className={`container ${styles.principles}`} aria-labelledby="principles-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR CORE PILLARS</span><h2 id="principles-title">Our Guiding Principles</h2></div><span className={styles.motto}>Integrity today. A stronger tomorrow.</span></div><ul className={styles.principleGrid}>{principles.map(([icon, title, text]) => <li key={title}><PurposeIcon name={icon} /><h3>{title}</h3><p>{text}</p></li>)}</ul></section>

    <section className={styles.strategy} aria-labelledby="strategy-title"><div className={`container ${styles.strategyGrid}`}><div className={styles.strategyCopy}><span className={styles.eyebrow}>OUR STRATEGIC AIMS</span><h2 id="strategy-title">Building a More<br />Resilient Tomorrow</h2><span className={styles.rule} /><p>We aim to contribute to a fairer, more transparent and more sustainable business environment by combining expertise, innovation and a long-term perspective in everything we do.</p><Action href="/about/our-methodology">Our Strategic Approach</Action></div><div className={styles.strategyImage}><Image src="/images/our-story/mountain-journey.jpg" alt="A hiker looking towards distant mountain peaks" fill sizes="(max-width: 700px) 100vw, 40vw" /><p>Higher<br />perspectives.<br />Bigger<br />possibilities.<span className={styles.rule} /></p></div><ul className={styles.aims}>{aims.map(([icon, title, text]) => <li key={title}><PurposeIcon name={icon} /><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div></section>

    <section className={`container ${styles.impact}`} aria-labelledby="impact-title"><div><span className={styles.eyebrow}>OUR IMPACT AREAS</span><h2 id="impact-title">Creating Value Beyond Business</h2><div className={styles.impactGrid}>{impacts.map(([title, text, image]) => <article key={title}><div className={styles.impactImage}><Image src={image} alt="" fill sizes="(max-width: 550px) 50vw, 20vw" /></div><div className={styles.impactCopy}><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><blockquote className={styles.quote}><span aria-hidden="true">“</span><p>A better tomorrow<br />is built by the choices<br />we make today.</p><span className={styles.rule} /></blockquote></section>

    <AboutResources />

    <section className={styles.cta} aria-labelledby="mission-cta-title"><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S SHAPE A BRIGHTER TOMORROW</span><h2 id="mission-cta-title">Partner with Astronis Global</h2><p>Discuss your objectives with our team and explore how we can support your growth journey.</p></div><div className={styles.actions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
