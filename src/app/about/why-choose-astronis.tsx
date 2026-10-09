import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { reasons, statistics } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import AboutResources from "./about-resources";
import styles from "./why-choose-astronis.module.css";

const icons = ["people", "globe", "building", "bulb", "mail", "shield", "pin", "globe", "scale", "chart"];
const explore = [
  ["file", "Our Story", "Our journey and evolution", "our-story"],
  ["bulb", "Vision & Mission", "Our purpose and direction", "mission-vision-and-purpose"],
  ["shield", "Core Values", "The principles that guide us", "core-values-and-professionals-principles"],
  ["document", "Our Methodology", "How we deliver results", "our-methodology"],
  ["globe", "Global Perspective", "Our international network", "global-perspective-and-international-network"],
  ["chart", "Projects & Initiatives", "Ideas for a better tomorrow", "projects-innovation-and-strategic-initiatives"],
];

export default function WhyChooseAstronis() {
  const testimonial = testimonials.find(item => item.status === "approved" && item.publicationConsent && item.quote);
  const impact = [statistics[0], statistics[4], statistics[2], statistics[3]];
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/Part-10 .png" alt="Modern boardroom overlooking the city" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/about">About Us</Link><span>/</span><span aria-current="page">Why Choose Astronis Global</span></nav>
        <div className={styles.heroLayout}><div className={styles.heroCopy}><span className={styles.eyebrow}>WHY CHOOSE ASTRONIS GLOBAL</span><h1>More Than Advice.<br />A True Partnership.</h1><span className={styles.rule} /><p>Domain expertise. Practical thinking. A shared commitment to your success. We bring legal, regulatory and business perspectives together to become a trusted partner in your growth journey.</p><Link className={styles.button} href="/contact">Partner With Us <Icon name="arrow" /></Link></div><aside className={styles.heroNote}>People.<br />Perspective.<br />Practice.<br />Progress.<span className={styles.rule} /><small>Your trusted partner for<br />a brighter tomorrow.</small></aside></div>
      </div>
    </section>
    <section className={styles.reasonsSection} aria-labelledby="difference-title"><div className="container"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>TEN REASONS. ONE TRUSTED PARTNER.</span><h2 id="difference-title">The Astronis Difference</h2></div><p>Legal insight, regulatory understanding and business acumen, brought together to deliver practical solutions for a changing world.</p></div><div className={styles.reasonGrid}>{reasons.map(([title, text], index) => <article className={styles.reasonCard} key={title}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><span className={styles.reasonIcon}><Icon name={icons[index]} /></span><h3>{title}</h3><p>{text}</p><span className={styles.cardRule} aria-hidden="true" /></article>)}</div></div></section>
    <section className={styles.impact} aria-labelledby="impact-title"><div className={`container ${styles.impactInner}`}><div><span className={styles.eyebrow}>OUR IMPACT</span><h2 id="impact-title">Trusted by Businesses.<br />Valued for Results.</h2></div><dl className={styles.stats}>{impact.map(([value, label]) => <div key={value}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></section>
    <section className={`container ${styles.trust}`} aria-labelledby="trust-title"><div className={styles.trustCopy}><span className={styles.eyebrow}>CLIENT TRUST</span><h2 id="trust-title">Building Lasting<br />Relationships</h2><span className={styles.rule} /><p>Our greatest recognition comes from the trust our clients place in us. We take pride in being a reliable partner in their most important decisions.</p><Link href="/testimonials" className={`${styles.button} ${styles.blue}`}>Our Client Stories <Icon name="arrow" /></Link></div><div className={styles.trustVisual}><Image src="/Part-10 .png" alt="" fill sizes="(max-width: 800px) 100vw, 60vw" />{testimonial ? <figure className={styles.quote}><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>{testimonial.quote}</blockquote><figcaption><strong>{testimonial.name}</strong><span>{testimonial.designation}</span><span>{testimonial.company}</span></figcaption></figure> : <div className={styles.quote}><span className={styles.eyebrow}>OUR COMMITMENT</span><h3>Clarity in advice.<br />Confidence in every step.</h3><p>A lasting partnership begins with understanding your business and the priorities that matter to you.</p></div>}</div></section>
    <section className={styles.exploreSection} aria-labelledby="explore-title"><div className="container"><span className={styles.eyebrow}>GET TO KNOW US</span><h2 id="explore-title">Explore More About Us</h2><div className={styles.exploreGrid}>{explore.map(([icon, title, text, slug]) => <Link href={`/about/${slug}`} key={slug}><Icon name={icon} /><h3>{title}</h3><p>{text}</p><span className={styles.exploreArrow}><Icon name="arrow" /></span></Link>)}</div></div></section>
    <AboutResources />
    <section className={styles.cta}><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S BUILD WHAT’S NEXT TOGETHER</span><h2>Partner with Astronis Global</h2><p>Connect with our team to support your business, today and for the future.</p></div><div className={styles.ctaActions}><Link href="/contact" className={styles.button}>Speak to an Advisor <Icon name="arrow" /></Link><Link href="/contact#enquiry-form" className={`${styles.button} ${styles.outline}`}>Submit an Enquiry <Icon name="arrow" /></Link></div></div></section>
  </div>;
}
