import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { professionals } from "../leadership";
import ProfessionalCollaboration from "../professional-collaboration";
import styles from "./profile.module.css";

type Professional = (typeof professionals)[number];
const focusBySlug: Record<string, string[]> = {
  "krishna-kumar-mishra": ["Corporate & commercial advisory", "Regulatory compliance", "Business advisory", "Dispute resolution"],
  "priti-mishra": ["Litigation", "Matrimonial matters", "Compliance advisory", "Practical dispute solutions"],
  "krishna-nand-mishra": ["Legal advisory", "Regulatory matters", "Business advisory"],
  "puneet-kumar-verma": ["Legal advisory", "Regulatory matters", "Business advisory"],
};
const serviceLinks = [
  ["building", "Corporate Advisory", "/services/corporate-advisory"],
  ["shield", "Regulatory Services", "/services/regulatory-and-compliance"],
  ["scale", "Litigation & Disputes", "/services/litigation-and-dispute-resolution"],
  ["chart", "Business Advisory", "/services/business-advisory"],
];

export function generateStaticParams() {
  return [...professionals.map((p) => ({ slug: p.slug })), { slug: "partner-with-us" }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = professionals.find((p) => p.slug === slug);
  return { title: slug === "partner-with-us" ? "Professional Collaboration" : person?.name, description: person ? `Learn about ${person.name} at Astronis Global.` : "Explore professional collaboration with Astronis Global." };
}
function ProfilePage({ person }: { person: Professional }) {
  const enquiry = `/professionals/enquiry?professional=${person.slug}`;
  const related = professionals.filter((item) => item.slug !== person.slug);
  const focus = focusBySlug[person.slug] || [person.expertise];
  return <div className={styles.page}>
    <div className={styles.wrap}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/professionals">Professionals</Link><span>›</span><span>{person.name}</span></nav>
      <section className={styles.hero} aria-labelledby="profile-name">
        <div className={styles.heroPhoto}><Image src={person.image} alt={person.name} fill sizes="(max-width: 720px) 100vw, 360px" priority /></div>
        <div className={styles.heroCopy}><span className={styles.kicker}>{person.role}</span><h1 id="profile-name">{person.name}</h1><p className={styles.credentials}>{person.education}</p><p className={styles.expertise}>{person.expertise}</p><span className={styles.rule} /><p className={styles.intro}>{person.description}</p></div>
        <aside className={styles.contactCard} aria-label="Connect with this professional"><div><Icon name="mail" /><a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a></div><div><Icon name="phone" /><a href="tel:+919311664455">+91 93116 64455</a></div><div><Icon name="pin" /><span>New Delhi, India</span></div><Link className={styles.button} href={enquiry}>Send an Enquiry <Icon name="arrow" /></Link></aside>
      </section>
      <nav className={styles.tabs} aria-label="Profile sections"><a href="#overview">Overview</a><a href="#expertise">Expertise</a><a href="#services">Services</a><a href="#education">Education</a><a href="#related">Related Professionals</a></nav>
      <div className={styles.contentGrid}>
        <aside className={styles.leftRail}><div className={styles.statement}><Icon name="scale" /><p>Practical advice.<br />Clear perspective.<br />Lasting relationships.</p><span /></div><div className={styles.focusCard} id="expertise"><h2>Areas of Focus</h2><ul>{focus.map((area) => <li key={area}><Icon name="shield" />{area}</li>)}</ul><Link href={enquiry}>Discuss Your Requirements <Icon name="arrow" /></Link></div></aside>
        <div className={styles.mainContent}><section id="overview"><span className={styles.kicker}>PROFESSIONAL PROFILE</span><h2>Professional Overview</h2><p>{person.description}</p><p>{person.name} is part of Astronis Global’s team supporting clients with considered legal, regulatory and business advice. Connect with our team to discuss how this experience relates to your requirements.</p></section>
          <section id="services"><div className={styles.sectionHeading}><h2>Relevant Services</h2><Link href="/services">View All Services <Icon name="arrow" /></Link></div><div className={styles.serviceGrid}>{serviceLinks.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
          <section className={styles.practiceBlock}><h2>How We Can Help</h2><p>Our multidisciplinary team combines legal knowledge, regulatory insight and business understanding to help clients move forward with clarity.</p><Link className={styles.textLink} href={enquiry}>Connect with {person.name.split(" ")[0]} <Icon name="arrow" /></Link></section>
        </div>
        <aside className={styles.rightRail}><section className={styles.quickInfo}><h2>Quick Info</h2><dl><div><Icon name="people" /><dt>Position</dt><dd>{person.role}</dd></div><div><Icon name="pin" /><dt>Location</dt><dd>New Delhi, India</dd></div><div><Icon name="scale" /><dt>Focus</dt><dd>{person.expertise}</dd></div></dl></section><section className={styles.detailCard} id="education"><h2>Education</h2><p>{person.education}</p></section><section className={styles.detailCard}><h2>Professional Details</h2><p>{person.enrolment}</p></section><section className={styles.railCta}><h2>Let’s Discuss How We Can Work Together.</h2><Link className={styles.button} href={enquiry}>Send an Enquiry <Icon name="arrow" /></Link></section></aside>
      </div>
      <section className={styles.related} id="related"><div className={styles.sectionHeading}><h2>Related Professionals</h2><Link href="/professionals">View All Professionals <Icon name="arrow" /></Link></div><div className={styles.relatedGrid}>{related.map((item) => <article key={item.slug} className={styles.relatedCard}><Link href={`/professionals/${item.slug}`} className={styles.relatedPhoto}><Image src={item.image} alt={item.name} fill sizes="(max-width: 600px) 45vw, 140px" /></Link><div><h3>{item.name}</h3><p>{item.role}</p><Link href={`/professionals/${item.slug}`}>View Profile <Icon name="arrow" /></Link></div></article>)}</div></section>
    </div>
    <section className={styles.bottomCta}><div className={styles.wrap}><span>PEOPLE · PERSPECTIVE · PROGRESS · TOGETHER</span><h2>Need Expert Advice?</h2><p>Connect with our professionals for strategic legal, regulatory and business solutions.</p><Link className={styles.button} href={enquiry}>Schedule a Consultation <Icon name="arrow" /></Link></div></section>
  </div>;
}
export default async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "partner-with-us") return <ProfessionalCollaboration />;
  const person = professionals.find((p) => p.slug === slug);
  if (!person) notFound();
  return <ProfilePage person={person} />;
}
