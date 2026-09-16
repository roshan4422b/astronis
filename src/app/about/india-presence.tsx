import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import AboutResources from "./about-resources";
import styles from "./india-presence.module.css";

const cities = [
  { name: "Delhi (NCR)", slug: "delhi", region: "New Delhi office · Northern India", lat: 28.61, lon: 77.21, text: "Policy, regulation and the corporate ecosystem.", image: "/images/india-presence/india-gate.jpg", landmark: "India Gate", imagePosition: "50% 45%", icon: "scale" },
  { name: "Mumbai", slug: "mumbai", region: "Western India", lat: 19.08, lon: 72.88, text: "Financial services, M&A and international business.", image: "/images/india-presence/mumbai.jpg", landmark: "Gateway of India", imagePosition: "50% 50%", icon: "chart" },
  { name: "Bengaluru", slug: "bengaluru", region: "Southern India", lat: 12.97, lon: 77.59, text: "Technology, startups and innovation.", image: "/images/india-presence/bengaluru.jpg", landmark: "Bangalore Palace", imagePosition: "50% 30%", icon: "bulb" },
  { name: "Chennai", slug: "chennai", region: "Southern India", lat: 13.08, lon: 80.27, text: "Manufacturing, automotive and exports.", image: "/images/india-presence/chennai.jpg", landmark: "Marina Beach", imagePosition: "50% 50%", icon: "building" },
  { name: "Kolkata", slug: "kolkata", region: "Eastern India", lat: 22.57, lon: 88.36, text: "Trade, infrastructure and eastern markets.", image: "/images/india-presence/kolkata.jpg", landmark: "Victoria Memorial", imagePosition: "50% 40%", icon: "globe" },
  { name: "Hyderabad", slug: "hyderabad", region: "Southern & Central India", lat: 17.39, lon: 78.49, text: "Pharma, life sciences and technology.", image: "/images/india-presence/hyderabad.jpg", landmark: "Charminar", imagePosition: "50% 25%", icon: "shield" },
  { name: "Ahmedabad", slug: "ahmedabad", region: "Western India", lat: 23.02, lon: 72.57, text: "Manufacturing, textiles and industrial growth.", image: "/images/india-presence/ahmedabad.jpg", landmark: "Adalaj Stepwell", imagePosition: "50% 50%", icon: "building" },
  { name: "Chandigarh", slug: "chandigarh", region: "Northern India", lat: 30.73, lon: 76.78, text: "Regional advisory and compliance.", image: "/images/india-presence/chandigarh.jpg", landmark: "Open Hand Monument", imagePosition: "50% 20%", icon: "file" },
  { name: "Lucknow", slug: "lucknow", region: "Northern India", lat: 26.85, lon: 80.95, text: "Government, infrastructure and emerging sectors.", image: "/images/india-presence/lucknow.jpg", landmark: "Rumi Darwaza", imagePosition: "50% 35%", icon: "people" },
];
const strengths = [
  ["pin", "Pan-India Presence", "Serving clients across major cities and industrial hubs."],
  ["people", "Multi-Sector Expertise", "Understanding local markets and industry-specific needs."],
  ["shield", "Trusted by Businesses", "From startups to established enterprises."],
  ["building", "Regional Support", "Responsive advice and practical solutions."],
  ["chart", "Enabling Growth", "Supporting business ambitions across regions."],
];

function Action({ href, children, outline = false, blue = false }: { href: string; children: React.ReactNode; outline?: boolean; blue?: boolean }) {
  return <Link href={href} className={[styles.action, outline ? styles.outline : "", blue ? styles.blue : ""].join(" ")}>{children}<Icon name="arrow" /></Link>;
}

function IndiaMap() {
  return <svg className={styles.map} viewBox="0 0 400 440" aria-label="India map showing nine key regional business centres">
    <image href="/images/india-presence/india-map.svg" width="400" height="440" />
    {cities.map(city => {
      const x = (city.lon - 67) * 12;
      const y = (38 - city.lat) * 13;
      const left = ["mumbai", "ahmedabad", "bengaluru", "chandigarh"].includes(city.slug);
      return <a key={city.slug} href={`#city-${city.slug}`} aria-label={`Explore ${city.name}`} className={styles.mapPin}>
        <title>{city.name}</title><circle cx={x} cy={y} r="10" fill={"#0064bb"} opacity=".15" /><path d="M0 0C-2-3-6-7-6-11a6 6 0 0 1 12 0C6-7 2-3 0 0Z" transform={`translate(${x} ${y})`} fill={"#0064bb"} stroke={"#fff"} strokeWidth="1" /><circle cx={x} cy={y-11} r="2" fill={"#fff"} />
        <text x={x + (left ? -10 : 10)} y={y - 5} textAnchor={left ? "end" : "start"} fill={"#12436e"} fontSize="10" fontFamily="Arial, sans-serif" fontWeight="600" paintOrder="stroke" stroke={"#f4faff"} strokeWidth="3" strokeLinejoin="round">{city.name}</text>
      </a>;
    })}
  </svg>;
}

export default function IndiaPresence() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="india-title"><div className={styles.heroPhoto}><Image src="/images/india-presence/india-gate.jpg" alt="India Gate in New Delhi at sunset" fill preload sizes="(max-width: 700px) 100vw, 65vw" /></div><div className={`container ${styles.heroInner}`}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">India Presence</span></nav><div className={styles.heroContent}><div className={styles.heroCopy}><span className={styles.eyebrow}>INDIA PRESENCE</span><h1 id="india-title">Across India.<br />Closer to You.</h1><p>Local insight, combined with deep sector knowledge, enables us to deliver practical, responsive and regionally relevant solutions for businesses across India.</p><Action href="#our-presence">Explore Our India Presence</Action></div><p className={styles.heroNote}>Local<br />insight.<br />National<br />impact.<span className={styles.rule} /><small>Integrated legal, regulatory and business advisory across India.</small></p></div></div></section>

    <section className={`container ${styles.strengths}`} aria-label="Our India capabilities">{strengths.map(([icon, title, text]) => <article key={title}><span className={styles.iconBadge}><Icon name={icon} /></span><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section id="our-presence" className={styles.presence} aria-labelledby="presence-title"><div className={`container ${styles.presenceGrid}`}><div className={styles.presenceCopy}><span className={styles.eyebrow}>OUR PRESENCE</span><h2 id="presence-title">Strategically Located.<br />Nationwide Reach.</h2><span className={styles.rule} /><p>We support businesses across key commercial and industrial centres, combining an understanding of regional dynamics with timely, effective and personalised advisory.</p><Action href="#delhi-office" blue>View Our New Delhi Office</Action></div><div className={styles.mapPanel}><IndiaMap /><span>Select a city to explore its regional focus</span></div><div className={styles.locations}><h2>Our Key Locations</h2><ul>{cities.map(city => <li key={city.slug}><Link href={`#city-${city.slug}`}><Icon name="pin" /><span><strong>{city.name}</strong><small>{city.region}</small></span></Link></li>)}</ul><p className={styles.coverageNote}>Regional advisory coverage coordinated through our New Delhi office and professional network.</p></div><aside className={styles.expansion}><span className={styles.eyebrow}>LOOKING AHEAD</span><h3>Expanding Possibilities</h3><span className={styles.rule} /><p>We continue to strengthen our connections across emerging business destinations to better serve clients and support new opportunities.</p><div className={styles.expansionImage}><Image src="/Real Estate & Construction .png" alt="" fill sizes="20vw" /></div><p className={styles.expansionQuote}>More connections.<br />Greater opportunities.</p></aside></div></section>

    <section className={`container ${styles.regions}`} aria-labelledby="regions-title"><span className={styles.eyebrow}>REGIONAL FOCUS. NATIONAL CAPABILITY.</span><h2 id="regions-title">Key Regional Strengths</h2><div className={styles.regionGrid}>{cities.map(city => <article id={`city-${city.slug}`} key={city.slug} className={styles.regionCard}><div className={styles.regionImage}><Image src={city.image} alt={`${city.landmark}, ${city.name}`} style={{ objectPosition: city.imagePosition }} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw" /></div><div className={styles.regionBody}><span className={styles.regionIcon}><Icon name={city.icon} /></span><span className={styles.regionLabel}>{city.region.split(" · ").pop()}</span><h3>{city.name}</h3><p>{city.text}</p><Link href="/contact#enquiry-form" aria-label={`Discuss advisory support in ${city.name}`}>Discuss Your Needs<Icon name="arrow" /></Link></div></article>)}</div></section>

    <section className={styles.commitment}><div className={`container ${styles.commitmentGrid}`}><div className={styles.commitmentImage}><Image src="/explore_services.png" alt="A modern commercial building" fill sizes="(max-width: 700px) 100vw, 30vw" /></div><div><span className={styles.eyebrow}>GROWING WITH INDIA</span><h2>Our Commitment to India</h2><span className={styles.rule} /><p>We are committed to contributing to India’s growth story by supporting businesses, investors and institutions with trusted legal, regulatory and business advisory services — across regions, sectors and stages of their journey.</p></div><ul>{[["chart", "Supporting Indian Businesses", "From startups to global enterprises."], ["shield", "Facilitating Compliance and Growth", "Across complex regulatory landscapes."], ["people", "Building Long-Term Partnerships", "Rooted in trust, driven by results."]].map(([icon, title, text]) => <li key={title}><Icon name={icon} /><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul></div></section>

    <section id="delhi-office" className={`container ${styles.office}`} aria-labelledby="office-title"><span className={styles.officeIcon}><Icon name="pin" /></span><div><span className={styles.eyebrow}>CONNECT WITH OUR TEAM</span><h2 id="office-title">Our New Delhi Office</h2><address>C-10/1, First Floor, Bhagwati Garden Extension,<br />Dwarka Mor, New Delhi – 110059, India</address></div><Action href="/contact" blue>Contact & Directions</Action></section>
    <AboutResources />
    <section className={styles.cta}><div className={`container ${styles.ctaInner}`}><div><span className={styles.eyebrow}>LET’S GROW TOGETHER</span><h2>Partner with Astronis Global</h2><p>Connect with our team to explore how we can support your business across India.</p></div><div className={styles.actions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
