import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { professionals } from "../professionals/leadership";
import AboutResources from "./about-resources";
import styles from "./leadership-page.module.css";

const disciplines = [
  ["scale", "Advocates", "Litigation, arbitration, regulatory & advisory"],
  ["shield", "Company Secretaries", "Corporate governance, compliance & filings"],
  ["chart", "Chartered Accountants", "Finance, taxation, audit and assurance"],
  ["people", "Legal Associates", "Research, drafting and case management"],
  ["bulb", "Consultants", "Regulatory, transaction and business advisory"],
  ["globe", "Specialist Network", "Technical and domain expert support"],
];
const culture = [
  ["shield", "Professional Excellence", "We uphold high standards in everything we do."],
  ["scale", "Ethical & Responsible", "We act with integrity, independence and accountability."],
  ["people", "Collaborative Approach", "We work together to deliver better solutions for clients."],
  ["bulb", "Continuous Learning", "We invest in knowledge, development and innovation."],
  ["globe", "Client-Centric Mindset", "We focus on building long-term and trusted relationships."],
];

function Action({ href, children, outline = false, blue = false }: { href: string; children: React.ReactNode; outline?: boolean; blue?: boolean }) {
  return <Link href={href} className={[styles.action, outline ? styles.outline : "", blue ? styles.blue : ""].join(" ")}>{children}<Icon name="arrow" /></Link>;
}

export default function LeadershipPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="leadership-title">
      <Image src="/Part-10 .png" alt="A contemporary boardroom overlooking the city" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">Leadership & Professionals</span></nav>
        <div className={styles.heroContent}><div className={styles.heroCopy}><span className={styles.eyebrow}>LEADERSHIP & PROFESSIONALS</span><h1 id="leadership-title">Experienced Professionals.<br />United by a Shared Purpose.</h1><span className={styles.rule} /><p>Our leadership and professionals bring deep expertise, sound judgement and a strong commitment to delivering practical, effective and ethical solutions for our clients.</p></div><p className={styles.heroNote}>Expertise.<br />Integrity.<br />Collaboration.<br />Excellence.<span className={styles.rule} /></p></div>
      </div>
    </section>

    <section className={`container ${styles.leadership}`} aria-labelledby="leaders-heading"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR LEADERSHIP</span><h2 id="leaders-heading">Guided by Experience. Driven by Values.</h2><p>Our leadership brings strategic vision, professional depth and a hands-on approach to building lasting relationships and delivering trusted advisory support.</p></div></div><div className={styles.leaderGrid}>{professionals.map(person => <article className={styles.leaderCard} key={person.slug}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 100vw, (max-width: 950px) 35vw, 20vw" /><span className={styles.portraitLabel}>ASTRONIS GLOBAL</span></div><div className={styles.profile}><span className={styles.role}>{person.role}</span><h3>{person.name}</h3><p className={styles.education}>{person.education}</p><p className={styles.enrolment}>{person.enrolment}</p><p className={styles.bio}>{person.description}</p><div className={styles.focus}><span>FOCUS AREAS</span><p>{person.expertise}</p></div><Link href={`/professionals/${person.slug}`} className={styles.profileLink}>View Professional Profile<Icon name="arrow" /></Link></div></article>)}</div></section>

    <section className={styles.strength} aria-labelledby="strength-title"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>OUR PROFESSIONAL STRENGTH</span><h2 id="strength-title">A Multidisciplinary Team.<br />Working Together for You.</h2><p>Our professionals include advocates, company secretaries, chartered accountants, consultants and specialists, working collaboratively to deliver integrated and result-oriented solutions.</p></div><span className={styles.sectionNote}>Different perspectives.<br />One shared commitment.</span></div><ul className={styles.disciplineGrid}>{disciplines.map(([icon, title, text]) => <li key={title}><span className={styles.iconBadge}><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></li>)}</ul></div></section>

    <section className={styles.culture} aria-labelledby="culture-title"><div className={`container ${styles.cultureGrid}`}><div className={styles.cultureCopy}><span className={styles.eyebrow}>OUR TEAM CULTURE</span><h2 id="culture-title">Collaboration.<br />Excellence.<br />Client Focus.</h2><span className={styles.rule} /><p>We believe the best outcomes come from teamwork, professional integrity and a shared commitment to our clients’ success.</p></div><div className={styles.cultureImage}><Image src="/Professional & Business Services .png" alt="A professional business environment supporting collaborative advisory work" fill sizes="(max-width: 700px) 100vw, 35vw" /></div><div className={styles.cultureValues}><span className={styles.eyebrow}>OUR PEOPLE. OUR STRENGTH.</span><ul>{culture.map(([icon, title, text]) => <li key={title}><Icon name={icon} /><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div></div></section>

    <section className={`container ${styles.meet}`} aria-labelledby="meet-title"><div className={styles.meetCopy}><span className={styles.eyebrow}>OUR PROFESSIONALS</span><h2 id="meet-title">Meet Our Professionals</h2><p>Get to know our team of dedicated professionals who bring expertise, experience and commitment to every engagement.</p><Action href="/professionals" blue>View All Professionals</Action></div><div className={styles.meetImage}><Image src="/Part-10 .png" alt="Professionals in conversation beside windows overlooking the city" fill sizes="(max-width: 700px) 100vw, 55vw" /><span>Shared knowledge. Stronger outcomes.</span></div></section>

    <AboutResources />

    <section className={styles.cta} aria-labelledby="leadership-cta-title"><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>JOIN OUR PROFESSIONAL JOURNEY</span><h2 id="leadership-cta-title">Be Part of Our Growing Team</h2><p>If you are passionate about law, regulation, business and creating impact, we would be happy to hear from you.</p></div><div className={styles.actions}><Action href="/about/careers">Explore Careers</Action><Action href="/contact#enquiry-form" outline>Get in Touch</Action></div></div></section>
  </div>;
}
