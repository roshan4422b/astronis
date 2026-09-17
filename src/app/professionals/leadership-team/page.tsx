import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import Link from "next/link";
import { professionals } from "../leadership";
import styles from "./leadership-team.module.css";

export const metadata = {
  title: "Leadership Team",
  description: "Meet the professionals guiding Astronis Global's legal, regulatory and business advisory work.",
};

const founders = professionals.slice(0, 2);
const team = professionals.slice(2);
const values = [
  ["shield", "Integrity in action"],
  ["people", "Client-centred approach"],
  ["chart", "Practical solutions"],
  ["globe", "Collaborative leadership"],
  ["scale", "Responsible advisory"],
  ["bulb", "Continuous learning"],
];
const disciplines = [
  ["building", "Corporate advisory"],
  ["document", "Regulatory services"],
  ["scale", "Legal & litigation"],
  ["chart", "Business advisory"],
];
const pathways = [
  ["scale", "Explore our services", "View all services", "/services"],
  ["building", "Industries we serve", "Explore all industries", "/industries"],
  ["globe", "Global collaboration", "See our presence", "/global-presence"],
  ["people", "Find a professional", "Browse our team", "/professionals"],
];

export default function LeadershipTeamPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="leadership-title">
      <Image src="/PR1 Banner .png" alt="" fill sizes="100vw" preload className={styles.heroImage} />
      <div className={styles.heroShade} />
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span>Leadership Team</span></nav>
        <div className={styles.heroText}><span className={styles.eyebrow}>THE PEOPLE BEHIND OUR PERSPECTIVE</span><h1 id="leadership-title">Leadership with Perspective.<br />Expertise with Responsibility.</h1><p>Guiding a multidisciplinary team to deliver practical, innovative and responsible solutions for a complex and evolving world.</p></div>
      </div>
    </section>

    <section className={styles.founders} aria-labelledby="founders-title"><div className={styles.wrap}>
      <div className={styles.sectionLabel} id="founders-title">FOUNDER & PRINCIPAL LEADERSHIP</div>
      <div className={styles.founderList}>{founders.map((person, index) => <article className={styles.founder} key={person.slug}>
        <Link href={`/professionals/${person.slug}`} className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 320px" /></Link>
        <div className={styles.profile}><span className={styles.profileIndex}>0{index + 1} / LEADERSHIP</span><h2>{person.name}</h2><p className={styles.role}>{person.role}</p><p className={styles.credentials}>{person.education}</p><p className={styles.expertise}>{person.expertise}</p><p className={styles.description}>{person.description}</p><div className={styles.details}><span><Icon name="pin" />New Delhi, India</span><span><Icon name="building" />{person.enrolment}</span></div><Link className={styles.profileButton} href={`/professionals/${person.slug}`}>View Full Profile <Icon name="arrow" /></Link></div>
        <aside className={styles.quote}><span aria-hidden="true"><Icon name={index === 0 ? "scale" : "shield"} /></span><p>{index === 0 ? "Corporate, commercial and regulatory perspective for complex business decisions." : "Practical legal guidance with care, clarity and a focus on client needs."}</p><small>Leadership focus<br />{person.role}</small></aside>
      </article>)}</div>
    </div></section>

    <section className={styles.teamSection} aria-labelledby="team-title"><div className={styles.wrap}>
      <div className={styles.sectionTop}><div className={styles.sectionLabel} id="team-title">OUR LEADERSHIP TEAM</div><Link href="/professionals">Meet Our Professionals <Icon name="arrow" /></Link></div>
      <div className={styles.teamGrid}>{team.map(person => <article className={styles.teamCard} key={person.slug}><Link href={`/professionals/${person.slug}`} className={styles.teamPortrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 600px) 50vw, 230px" /></Link><div><h3>{person.name}</h3><p>{person.expertise}</p><Link href={`/professionals/${person.slug}`}>View Profile <Icon name="arrow" /></Link></div></article>)}</div>
    </div></section>

    <section className={styles.philosophy} aria-labelledby="philosophy-title"><div className={`${styles.wrap} ${styles.philosophyGrid}`}>
      <div><h2 id="philosophy-title">Our Leadership Philosophy</h2><div className={styles.values}>{values.map(([icon, label]) => <div key={label}><Icon name={icon} /><span>{label}</span></div>)}</div></div>
      <div className={styles.model}><h2>Integrated Leadership Model</h2><div className={styles.disciplines}>{disciplines.map(([icon, label]) => <div key={label}><Icon name={icon} /><span>{label}</span></div>)}</div><p>Strategic leadership & direction across every practice</p></div>
    </div></section>

    <section className={styles.explore}><div className={styles.wrap}><div className={styles.exploreGrid}>
      <div className={styles.insight}><span className={styles.sectionLabel}>LEADERSHIP INSIGHTS</span><h2>Ideas shaped by experience.</h2><p>Explore perspectives from our team on legal, regulatory and business developments.</p><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div>
      <div className={styles.global}><Icon name="globe" /><div><h2>Leadership Across Borders</h2><p>Working with a global network of professionals to support cross-border opportunities and international clients.</p><Link href="/global-presence">Explore Our Global Network <Icon name="arrow" /></Link></div></div>
    </div><div className={styles.pathways}>{pathways.map(([icon, title, caption, href]) => <Link href={href} key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{caption}</small></span><Icon name="arrow" /></Link>)}</div></div></section>

    <section className={styles.cta}><Image src="/Part-10 .png" alt="" fill sizes="100vw" /><div><h2>Let’s Build a Stronger Tomorrow</h2><p>Connect with our leadership team to discuss your business, regulatory or legal requirements.</p><div><Link href="/professionals/enquiry">Speak to Our Leadership <Icon name="arrow" /></Link><Link href="/professionals/enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
