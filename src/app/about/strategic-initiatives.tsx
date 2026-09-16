import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import AboutResources from "./about-resources";
import styles from "./strategic-initiatives.module.css";

const pillars = [
  ["bulb", "Innovation-Led Thinking", "New ideas for emerging opportunities."],
  ["people", "Collaborative Ecosystems", "Connecting industry, academia and institutions."],
  ["chart", "Strategic Initiatives", "From a clear concept to practical implementation."],
  ["shield", "Sustainable Impact", "Lasting value for business and society."],
  ["globe", "Broader Outreach", "Contributing to inclusive growth and development."],
];
const approaches = [
  { title: "Business-Focused Projects", text: "Supporting businesses through advisory, compliance and growth initiatives.", image: "/Real Estate & Construction .png", label: "BUSINESS & GROWTH" },
  { title: "Innovation in Legal & Regulatory Solutions", text: "Bringing technology and insight together to simplify complex challenges.", image: "/Startups & Emerging Businesses .png", label: "IDEAS & INNOVATION" },
  { title: "Sustainable & Social Initiatives", text: "Supporting responsible business practices and community-focused projects.", image: "/nergy, Power & Renewables .png", label: "PEOPLE & PLANET" },
];
const initiatives = [
  { title: "Regulatory Enablement", text: "Simplifying compliance and supporting the ease of doing business.", icon: "scale", image: "/explore_services.png" },
  { title: "Industry Collaboration", text: "Working with industry bodies, startups and investors on shared opportunities.", icon: "people", image: "/Professional & Business Services .png" },
  { title: "Technology & Digital Solutions", text: "Advisory and implementation support for meaningful digital transformation.", icon: "globe", image: "/Technology, IT & ITES .png" },
  { title: "ESG & Sustainability", text: "Aligning projects with responsible business and sustainable growth.", icon: "shield", image: "/nergy, Power & Renewables .png" },
  { title: "Knowledge & Capacity Building", text: "Workshops, thought leadership and policy engagement to build understanding.", icon: "bulb", image: "/Part-10 .png" },
];
const featured = [
  ["chart", "Startup & MSME Support", "Advisory, mentoring and compliance support for emerging businesses."],
  ["shield", "Sustainability Projects", "Initiatives that encourage responsible and inclusive growth."],
  ["people", "Legal Awareness & Outreach", "Supporting legal literacy and greater understanding of rights and responsibilities."],
  ["globe", "Strategic Partnerships", "Collaboration with institutions, industry bodies and professional networks."],
];

export default function StrategicInitiatives() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/Part-10 .png" alt="Modern office overlooking a city skyline" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/about">About Us</Link><span>/</span><span aria-current="page">Projects, Innovation &amp; Strategic Initiatives</span></nav>
        <div className={styles.heroLayout}><div className={styles.heroCopy}><span className={styles.eyebrow}>PROJECTS, INNOVATION &amp; STRATEGIC INITIATIVES</span><h1>Ideas into Impact.<br />Solutions for a<br />Better Tomorrow.</h1><span className={styles.rule} /><p>Strategic projects, innovative solutions and collaborative initiatives that create lasting value for businesses, communities and the broader ecosystem.</p><Link className={styles.button} href="#strategic-initiatives">Explore Our Initiatives <Icon name="arrow" /></Link></div><aside className={styles.heroNote}>Legal insight.<br />Innovation.<br />Sustainable<br />impact.<span className={styles.rule} /><small>Purposeful ideas.<br />Practical progress.</small></aside></div>
      </div>
    </section>
    <section className={`container ${styles.pillars}`} aria-label="Our guiding approach">{pillars.map(([icon, title, text]) => <article key={title}><span className={styles.icon}><Icon name={icon} /></span><h2>{title}</h2><p>{text}</p></article>)}</section>
    <section className={styles.approachSection} aria-labelledby="approach-title"><div className={`container ${styles.approachLayout}`}><div className={styles.approachCopy}><span className={styles.eyebrow}>OUR APPROACH</span><h2 id="approach-title">Building Initiatives<br />That Matter.</h2><span className={styles.rule} /><p>We identify opportunities, design practical solutions and work with partners to address real business, regulatory and societal needs.</p><Link className={`${styles.button} ${styles.blue}`} href="/about/our-methodology">Our Approach <Icon name="arrow" /></Link></div><div className={styles.approachCards}>{approaches.map((item, index) => <article className={styles.approachCard} key={item.title}><div className={styles.approachImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 33vw, 25vw" /><span>0{index + 1}</span></div><div className={styles.approachBody}><span className={styles.eyebrow}>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>
    <section className={`container ${styles.initiativesSection}`} id="strategic-initiatives" aria-labelledby="initiatives-title"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>KEY AREAS OF FOCUS</span><h2 id="initiatives-title">Our Strategic Initiatives</h2></div><p>Connecting expertise with opportunity.<br />Turning shared ambition into action.</p></div><div className={styles.initiativeGrid}>{initiatives.map((item, index) => <Link href="/contact" className={styles.initiativeCard} key={item.title}><div className={styles.initiativeImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 20vw" /><span className={styles.cardIcon}><Icon name={item.icon} /></span></div><div className={styles.initiativeBody}><span className={styles.number}>INITIATIVE / 0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><span className={styles.cardAction}>Start a conversation <Icon name="arrow" /></span></div></Link>)}</div></section>
    <section className={styles.impactSection} aria-labelledby="impact-title"><div className={`container ${styles.impactLayout}`}><div className={styles.impactVisual}><Image src="/images/our-story/mountain-journey.jpg" alt="Mountain landscape symbolising long-term ambition" fill sizes="(max-width: 800px) 100vw, 50vw" /><div className={styles.impactCopy}><span className={styles.eyebrow}>PROGRESS WITH PURPOSE</span><h2 id="impact-title">A Stronger<br />Tomorrow Together.</h2><span className={styles.rule} /><p>Through our projects and strategic initiatives, we aim to create meaningful impact for businesses, communities and future generations.</p></div></div><div className={styles.featured}><span className={styles.eyebrow}>FEATURED INITIATIVES</span>{featured.map(([icon, title, text]) => <article key={title}><span className={styles.icon}><Icon name={icon} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <AboutResources />
    <section className={styles.cta}><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S TURN IDEAS INTO IMPACT</span><h2>Discuss a Project or Partnership</h2><p>Explore how we can collaborate on your next strategic initiative.</p></div><div className={styles.ctaActions}><Link href="/contact" className={styles.button}>Speak to an Advisor <Icon name="arrow" /></Link><Link href="/contact#enquiry-form" className={`${styles.button} ${styles.outline}`}>Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
