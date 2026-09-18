import Link from "next/link";
import Icon from "./icon";
import styles from "./about-menu.module.css";

const columns = [
  [
    ["building", "About Astronis Global", "Who we are, what we do and what we stand for.", "/about/about-astronis-global"],
    ["file", "Our Story", "Our journey, milestones and evolution.", "/about/our-story"],
    ["target", "Mission, Vision & Purpose", "Our direction for a stronger, more compliant future.", "/about/mission-vision-and-purpose"],
    ["gem", "Core Values & Professional Principles", "The values that guide our people and our work.", "/about/core-values-and-professionals-principles"],
  ],
  [
    ["people", "The Astronis Difference", "What sets us apart.", "/about/the-astronis-difference"],
    ["network", "Our Integrated Advisory Model", "A multidisciplinary approach for end-to-end solutions.", "/about/our-integrated-advisory-model"],
    ["gear", "Our Methodology", "A structured, practical and client-focused approach.", "/about/our-methodology"],
    ["person", "Leadership & Professionals", "Experienced professionals driving client success.", "/about/leadership-and-professionals"],
  ],
  [
    ["india", "India Presence", "Across key locations, closer to your business.", "/about/india-presence"],
    ["globe", "Global Perspective & International Network", "Cross-border capabilities and global collaboration.", "/about/global-perspective-and-international-network"],
    ["bulb", "Projects, Innovation & Strategic Initiatives", "Building solutions for tomorrow.", "/about/projects-innovation-and-strategic-initiatives"],
    ["award", "Why Choose Astronis Global", "Trusted. Integrated. Result-driven.", "/about/why-choose-astronis-global"],
    ["people", "Our Clients", "Building long-term relationships.", "/clients"],
  ],
] as const;

const quickLinks = [
  ["trophy", "Our Achievements", "Milestones that inspire us", "/about"],
  ["people", "Join Our Team", "Build a rewarding career", "/about/careers"],
  ["file", "Latest Insights", "News, updates and thought leadership", "/insights"],
  ["message", "Get in Touch", "Start a conversation with our team", "/contact"],
] as const;

export default function AboutMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return <div className={`mega-menu ${styles.menu}`} id={id}>
    <div className={styles.intro}>
      <div><span className={styles.eyebrow}>About Astronis Global</span><h2>Purpose. People. Perspective. Performance.</h2><p>A global mindset with local insight, delivering integrated legal, regulatory and business advisory solutions.</p></div>
      <Link href="/about" onClick={onNavigate}><strong>Learn More About Us <Icon name="arrow" /></strong><small>Our journey, values and vision for the future.</small></Link>
    </div>
    <div className={styles.body}>
      <div className={styles.columns}>{columns.map((column, index) => <div className={styles.column} key={index}>{column.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title} className={styles.item}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span><span className={styles.chevron} aria-hidden="true">›</span></Link>)}</div>)}</div>
      <aside className={styles.feature}>
        <div className={styles.featureVisual}><span className={styles.eyebrow}>A global mindset.<br />Local insight.</span><span className={styles.rule} /><h3>Building<br />Trusted<br />Partnerships<br />Worldwide.</h3><Link href="/global-presence" onClick={onNavigate}>Our Global Presence <Icon name="arrow" /></Link></div>
        <div className={styles.stats}><div><strong>11+</strong><span>Years<br />of Experience</span></div><div><strong>1000+</strong><span>Advisory<br />Assignments</span></div><div><strong>30+</strong><span>Countries<br />in Network</span></div></div>
      </aside>
    </div>
    <div className={styles.footer}>{quickLinks.map(([icon, title, description, href]) => <Link href={href} onClick={onNavigate} key={title}><Icon name={icon} /><span><strong>{title}</strong><small>{description}</small></span></Link>)}</div>
  </div>;
}
