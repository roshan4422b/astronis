import Link from "next/link";
import AboutResources from "./about-resources";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { industries } from "@/content/site";
import styles from "./our-story.module.css";

// Milestones follow the supplied Our Story reference.
const milestones = [
  ["2015", "A strong foundation", "Founded with a focus on legal services."],
  ["2017", "Broadening our expertise", "Expanded practice areas and client advisory support."],
  ["2019", "Building capability", "Strengthened regulatory and corporate advisory capabilities."],
  ["2021", "Stronger together", "Built a multidisciplinary professional network and alliances."],
  ["2023", "A broader platform", "Evolved into Astronis Global with a broader advisory platform."],
  ["2025", "Looking ahead", "Growing our global perspective and future-ready initiatives."],
  ["Beyond", "Lasting value", "Creating long-term value for businesses, people and the planet."],
];
const purpose = [
  ["chart", "Our Purpose", "To empower businesses and communities through knowledge, integrity and innovation."],
  ["bulb", "Our Vision", "To be a globally respected advisory firm recognised for trusted relationships and sustainable impact."],
  ["globe", "Our Mission", "To deliver insightful solutions that create measurable value for a better, more resilient tomorrow."],
];
const values = [["shield", "Integrity"], ["scale", "Independence"], ["bulb", "Excellence"], ["people", "Accountability"], ["file", "Confidentiality"], ["calendar", "Responsiveness"], ["people", "Collaboration"], ["globe", "Long-Term Perspective"]];
const impact = [["11+", "Years of Experience"], ["Diverse", "Client Base"], ["Multi-sector", "Expertise"], ["Pan India", "Presence"], ["Global", "Advisory Support"], ["Long-term", "Relationships"]];
const services = [
  { title: "Corporate & Commercial", text: "Structures for growth.", image: "/Real Estate & Construction .png", href: "/services/corporate-advisory" },
  { title: "Regulatory Services", text: "Compliance for confidence.", image: "/Part-18 .png", href: "/services/regulatory-and-compliance" },
  { title: "Litigation & Dispute Resolution", text: "Protection through representation.", image: "/Part-14 .png", href: "/services/litigation-and-dispute-resolution" },
  { title: "Business Advisory", text: "Insights for what’s next.", image: "/Professional & Business Services .png", href: "/services/business-advisory-and-consulting" },
];
const sectors = ["Manufacturing", "Financial Services", "Healthcare & Pharma", "Real Estate & Construction", "IT & ITES", "Retail & Consumer"].map(title => industries.find(item => item.title === title)!);

function Action({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return <Link href={href} className={`${styles.action} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>;
}
function Title({ label, children, id }: { label: string; children: React.ReactNode; id?: string }) {
  return <><span className={styles.eyebrow}>{label}</span><h2 id={id}>{children}</h2></>;
}

export default function OurStory() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="story-title">
      <div className={styles.heroPhoto}><Image src="/images/our-story/mountain-journey.jpg" alt="A hiker looking out across an alpine mountain range" fill preload sizes="(max-width: 700px) 100vw, 65vw" /></div>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}><nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">Our Story</span></nav><span className={styles.eyebrow}>OUR STORY</span><h1 id="story-title">A Journey of<br />Purpose, Progress<br />and Possibilities.</h1><span className={styles.rule} /><p>From a focused legal practice to a multidisciplinary global advisory platform, Astronis Global has evolved with a clear purpose — to help businesses navigate complexity and build a better, more resilient tomorrow.</p></div>
        <p className={styles.heroNote}>Higher<br />perspectives.<br />Stronger<br />businesses.<br />A brighter<br />tomorrow.<span className={styles.rule} /></p>
      </div>
    </section>

    <section className={`container ${styles.beginnings}`} aria-labelledby="beginnings-title">
      <div><Title label="OUR BEGINNINGS" id="beginnings-title">It Started with a Belief.</Title><span className={styles.rule} /><p>Astronis Global was founded on a simple belief — that businesses, investors and entrepreneurs deserve trusted, practical and forward-looking professional advice to navigate an increasingly complex legal, regulatory and commercial environment.</p><p>What began as a dedicated legal practice has grown into an integrated advisory platform, combining law, regulation, business and strategy.</p><Action href="/about/core-values">Our Values</Action></div>
      <blockquote className={styles.quote}><span aria-hidden="true">“</span><p>To be a trusted partner in every client’s journey towards growth.</p><span className={styles.rule} /></blockquote>
      <div className={styles.office}><Image src="/Part-11 .png" alt="A contemporary office with a world map and city views" fill sizes="(max-width: 700px) 100vw, 40vw" /><div><span>ASTRONIS <small>GLOBAL</small></span><p>Ideas. Guidance. Action.<br />A more resilient tomorrow.</p></div></div>
    </section>

    <section className={styles.journey} aria-labelledby="milestones-title"><div className="container"><div className={styles.sectionHeading}><div><Title label="OUR JOURNEY" id="milestones-title">Key Milestones<span className={styles.titleDot}>.</span></Title></div><p>Each chapter builds on the last.<br />An evolving journey. A stronger tomorrow.</p></div><ol className={styles.timeline}>{milestones.map(([year, title, text], i) => <li key={year}>
      <span className={styles.timelineDot} aria-hidden="true" />
      <div className={styles.milestoneTop}><span className={styles.milestoneIcon}><Icon name={["scale", "building", "shield", "people", "globe", "chart", "arrow"][i]} /></span><span className={styles.chapter}>{i === milestones.length - 1 ? "THE NEXT CHAPTER" : `CHAPTER ${String(i + 1).padStart(2, "0")}`}</span></div>
      <div className={styles.milestoneContent}><span className={styles.year}>{year}</span><div><h3>{title}</h3><p>{text}</p></div></div>
    </li>)}</ol><div className={styles.journeyFoot}><span>Rooted in purpose. Always moving forward.</span><span className={styles.journeyLine} aria-hidden="true" /><Icon name="arrow" /></div></div></section>

    <section className={`container ${styles.purpose}`} aria-label="Our purpose, vision and mission"><div className={styles.compass}><Image src="/images/our-story/compass.jpg" alt="A compass representing direction and purpose" fill sizes="(max-width: 700px) 100vw, 40vw" /><p>Guiding businesses<br />towards a<br />brighter tomorrow.</p></div><div className={styles.purposeCopy}><span className={styles.eyebrow}>OUR PURPOSE, VISION & MISSION</span><div className={styles.purposeGrid}>{purpose.map(([icon, title, text]) => <article key={title}><Icon name={icon} /><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>

    <section className={styles.values} aria-labelledby="story-values-title"><div className={`container ${styles.valuesInner}`}><div><Title label="OUR CORE VALUES" id="story-values-title">Principles That<br />Shape Our Journey</Title></div><ul>{values.map(([icon, title]) => <li key={title}><Icon name={icon} /><span>{title}</span></li>)}</ul></div></section>

    <section className={styles.impact} aria-label="Our impact at a glance"><Image src="/Part-5 .png" alt="" fill sizes="100vw" /><div className="container"><span className={styles.eyebrow}>OUR IMPACT AT A GLANCE</span><dl>{impact.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl></div></section>

    <section className={`container ${styles.global}`} aria-labelledby="story-global-title"><div><Title label="A BROADER PERSPECTIVE" id="story-global-title">From India to the World</Title><p>Our journey is no longer limited by borders. We work with businesses across India and internationally, supporting their ambitions with local insight and global perspective.</p><Action href="/global-presence">Explore Global Presence</Action></div><div className={styles.globalImage}><Image src="/Part-9 .png" alt="A connected globe and international business skyline" fill sizes="(max-width: 700px) 100vw, 45vw" /></div><p className={styles.globalNote}>Local insight.<br />Global opportunities.<span className={styles.rule} /></p></section>

    <section className={styles.darkCollection} aria-labelledby="story-services-title"><div className={`container ${styles.collection}`}><div className={styles.sectionHeading}><div><Title label="SOLUTIONS ACROSS THE JOURNEY" id="story-services-title">Explore Our Key Services</Title></div><Action href="/services">View All Services</Action></div><div className={styles.serviceGrid}>{services.map(item => <Link href={item.href} className={styles.card} key={item.title}><div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" /></div><div className={styles.cardBody}><h3>{item.title}</h3><p>{item.text}</p><span className={styles.cardArrow}><Icon name="arrow" /></span></div></Link>)}</div></div></section>

    <section className={`container ${styles.collection}`} aria-labelledby="story-industries-title"><div className={styles.sectionHeading}><div><Title label="INDUSTRIES WE UNDERSTAND" id="story-industries-title">Diverse Sectors. Focused Solutions.</Title></div><Action href="/industries">Explore All Industries</Action></div><div className={styles.industryGrid}>{sectors.map(item => <Link href={`/industries/${item.slug}`} className={styles.card} key={item.slug}><div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 17vw" /></div><div className={styles.industryBody}><h3>{item.title}</h3><Icon name="arrow" /></div></Link>)}</div></section>

    <AboutResources />

    <section className={`container ${styles.resources}`} aria-label="Continue your journey with Astronis">

      <article><Title label="CAREERS & COLLABORATION">Build a Meaningful Career</Title><div className={styles.resourceContent}><div className={styles.resourceImage}><Image src="/Professional & Business Services .png" alt="" fill sizes="(max-width: 700px) 30vw, 12vw" /></div><div><ul><li>Work with us</li><li>For professionals</li><li>International collaboration</li><li>Be part of our journey</li></ul><Action href="/about/careers">Explore Careers</Action></div></div></article>
      <article><Title label="FREQUENTLY ASKED QUESTIONS">Quick Answers</Title><div className={styles.resourceContent}><span className={styles.question} aria-hidden="true">?</span><div><ul><li>What does Astronis Global do?</li><li>Who do we work with?</li><li>Do we work internationally?</li><li>How can I engage your team?</li></ul><Action href="/faqs">View FAQs</Action></div></div></article>
    </section>

    <section className={styles.cta} aria-labelledby="story-cta-title"><Image src="/Part-5 .png" alt="" fill sizes="100vw" /><div className={`container ${styles.ctaInner}`}><div><Title label="LET’S BUILD WHAT’S NEXT" id="story-cta-title">Partner with Astronis Global</Title><p>Discuss your objectives with our team and explore how we can support your next move.</p></div><div className={styles.actions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
