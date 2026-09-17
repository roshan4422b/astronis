import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { industries } from "@/content/site";
import { professionals } from "../leadership";
import IndustryExplorer from "./industry-explorer";
import styles from "./by-industry.module.css";

export const metadata = {
  title: "Professionals by Industry",
  description: "Explore sector-focused advisory and connect with Astronis Global professionals.",
};

const featured = [
  ["building", "Manufacturing", "manufacturing"],
  ["chart", "Financial services", "financial-services"],
  ["bulb", "Technology & IT", "it-and-ites"],
  ["shield", "Healthcare & pharma", "healthcare-and-pharma"],
  ["globe", "Real estate & projects", "real-estate-and-construction"],
  ["people", "Professional services", "professional-and-business-services"],
];
const strengths = [
  ["chart", "Sector context", "Advice informed by how your market works."],
  ["document", "Regulatory perspective", "Understand the obligations behind each decision."],
  ["shield", "Risk awareness", "Identify issues early and plan practical controls."],
  ["people", "Joined-up expertise", "Bring legal, regulatory and business views together."],
  ["globe", "Cross-border outlook", "Consider the markets and partners involved."],
  ["bulb", "Growth planning", "Build sound foundations for what comes next."],
];

export default function ProfessionalsByIndustry() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="industry-title"><Image src="/Banner-Infrastructure & Projects .png" alt="Construction planning and infrastructure projects" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span aria-current="page">By Industry</span></nav><div className={styles.heroCopy}><span className={styles.eyebrow}>Industry & subject-matter perspective</span><h1 id="industry-title">Industry insight.<br />Practical solutions.<br />Real impact.</h1><p>Explore the sectors we advise and connect with professionals who can help you frame your legal, regulatory and business questions.</p><div className={styles.heroActions}><a href="#explore" className={styles.button}>Explore industries <Icon name="arrow" /></a><Link href="/professionals/enquiry" className={styles.outlineButton}>Speak to our team <Icon name="arrow" /></Link></div></div></div></section>
    <main>
      <section id="explore" className={`container ${styles.explorerSection}`} aria-labelledby="explore-title"><div className={styles.explorerHeader}><span className={styles.eyebrow}>Find your sector</span><h2 id="explore-title">Explore industry expertise</h2><p>Search or select an industry to see its dedicated advisory page.</p></div><IndustryExplorer items={industries} /></section>
      <section className={`container ${styles.featuredSection}`} aria-labelledby="featured-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Connected sectors</span><h2 id="featured-title">A few areas where we work</h2></div><Link href="/industries">View all industries <Icon name="arrow" /></Link></div><div className={styles.featuredGrid}>{featured.map(([icon,title,slug])=><Link href={`/industries/${slug}`} key={slug}><Icon name={icon} /><strong>{title}</strong><Icon name="arrow" /></Link>)}</div></section>
      <section id="professionals" className={styles.professionalsBand} aria-labelledby="people-title"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Meet our team</span><h2 id="people-title">Professionals who connect the perspectives</h2><p>Explore our published profiles, then tell us about your industry and the advice you need.</p></div><Link href="/professionals">View all professionals <Icon name="arrow" /></Link></div><div className={styles.peopleGrid}>{professionals.map(person=><article key={person.slug}><Link className={styles.personImage} href={`/professionals/${person.slug}`}><Image src={person.image} alt={person.name} fill sizes="(max-width: 650px) 50vw, 25vw" /></Link><div><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><Link href={`/professionals/${person.slug}`}>View profile <Icon name="arrow" /></Link></div></article>)}</div></div></section>
      <section className={`container ${styles.perspective}`} aria-labelledby="perspective-title"><div className={styles.perspectiveImage}><Image src="/Professional & Business Services .png" alt="Professionals collaborating across markets" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div><span className={styles.eyebrow}>Deeper industry perspective</span><h2 id="perspective-title">Sector knowledge. Joined-up advice.</h2><p>Industry context changes the questions worth asking. We bring legal, regulatory and commercial perspectives together to help you identify priorities and move forward with clarity.</p><Link href="/about/our-methodology" className={styles.button}>Our approach <Icon name="arrow" /></Link></div></section>
      <section className={`container ${styles.strengthsSection}`} aria-labelledby="strengths-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Why sector perspective matters</span><h2 id="strengths-title">Support shaped around your business</h2></div><Link href="/services">Explore services <Icon name="arrow" /></Link></div><div className={styles.strengthsGrid}>{strengths.map(([icon,title,body])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className={styles.cta}><div className="container"><div><span className={styles.eyebrow}>Start a conversation</span><h2>Let’s turn industry insight into action.</h2><p>Tell us about your sector, challenge or next opportunity.</p></div><div><a href="#explore" className={styles.outlineButton}>Explore industries <Icon name="arrow" /></a><Link href="/professionals/enquiry" className={styles.button}>Submit an enquiry <Icon name="arrow" /></Link></div></div></section>
    </main>
  </div>;
}
