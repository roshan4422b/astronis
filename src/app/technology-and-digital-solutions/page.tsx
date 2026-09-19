import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import Enquiry from "./enquiry";
import styles from "./technology.module.css";

export const metadata = {
  title: "Technology & Digital Solutions",
  description: "Integrated technology, legal, regulatory and business expertise. Explore digital business solutions, RegTech, legal technology, data and automation.",
};

const solutions = [
  { id: "digital-business", icon: "gear", title: "Digital Business Solutions", intro: "Streamline operations, enhance efficiency and enable growth through technology.", text: "Digital transformation, process automation and enterprise solutions.", image: "/Technology, IT & ITES .png" },
  { id: "regtech", icon: "shield", title: "RegTech & Compliance Technology", intro: "Stay ahead of regulatory change with intelligent compliance solutions.", text: "Compliance management, regulatory monitoring and risk intelligence.", image: "/hero_section.png" },
  { id: "legal-technology", icon: "file", title: "Legal Technology", intro: "Simplify legal operations with innovative tools and workflows.", text: "Contract management, e-discovery, matter management and legal automation.", image: "/Part-14 .png" },
  { id: "data-ai", icon: "network", title: "Data, AI & Automation", intro: "Transform data into insights and drive smarter decisions.", text: "Analytics, artificial intelligence and intelligent automation for better outcomes.", image: "/Banner - Indus - Artificial Intelligence .png" },
];
const sectors = [
  ["building", "Banking & Financial Services", "financial-services"],
  ["shield", "FinTech & NBFC", "fintech-and-digital-finance"],
  ["gear", "Manufacturing", "manufacturing"],
  ["building", "Real Estate & Construction", "real-estate-and-construction"],
  ["shield", "Healthcare & Life Sciences", "healthcare-and-pharma"],
  ["laptop", "E-Commerce & Technology", "e-commerce"],
  ["building", "Infrastructure & Energy", "infrastructure"],
  ["people", "Consumer & Retail", "retail-and-consumer"],
  ["rocket", "Startups & Emerging Businesses", "startups"],
];
const insights = [
  ["Regulatory intelligence", "Explore a changing compliance landscape", "/images/india-presence/mumbai.jpg", "/insights/legal-updates"],
  ["Technology perspectives", "Ideas for the future of legal services", "/Banner - Indus - Artificial Intelligence .png", "/insights/articles"],
  ["Business perspectives", "Digital transformation for sustainable growth", "/Technology, IT & ITES .png", "/insights/business-updates"],
];
const faqs = [
  ["How can technology solutions help my business?", "Technology can reduce repetitive work, improve visibility across your operations and make information easier to use. We begin with your business priorities to identify where digital tools can make a practical difference."],
  ["Do you provide customised solutions for specific industries?", "We shape the scope around your sector, existing systems and operational needs, bringing together business, legal and regulatory perspectives."],
  ["How do you ensure data security and confidentiality?", "We discuss data access, confidentiality and security requirements at the outset. Appropriate controls and responsibilities are agreed as part of the engagement and solution design."],
  ["Can you support implementation and ongoing support?", "Implementation planning, coordination, training and ongoing support can be included in the agreed scope. Our team will help define the support your organisation needs."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

export default function TechnologySolutionsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="technology-title">
      <Image src="/Technology, IT & ITES .png" alt="Connected digital systems and laptop overlooking a city skyline" fill preload sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Technology &amp; Digital Solutions</span><h1 id="technology-title">Technology. Intelligence.<br />Practical Outcomes.</h1><p>Integrating legal, regulatory and business expertise<br className={styles.desktopBreak} /> with technology to help you move forward with confidence.</p><Link className={styles.button} href="#solutions">Explore Our Solutions <Icon name="arrow" /></Link></div>
        <div className={styles.heroMotto}>Smarter.<br />Solutions.<br />Stronger.<br />Businesses.<span>Astronis<br />Global.</span></div>
      </div>
    </section>

    <nav className={`${styles.wrap} ${styles.pillars}`} aria-label="Technology solution areas">{solutions.map((solution) => <Link key={solution.id} href={`#${solution.id}`}><Icon name={solution.icon} /><div><h2>{solution.title}</h2><p>{solution.intro}</p></div><Icon name="arrow" /></Link>)}</nav>

    <section className={styles.pale}>
      <div className={`${styles.wrap} ${styles.overview}`}><div><h2>Turning Complex<br />Challenges into<br />Smarter Solutions.</h2><p>We understand the evolving needs of modern businesses and help you use technology with legal and regulatory insight to achieve practical, sustainable outcomes.</p><TextLink href="#approach">Learn More About Our Approach</TextLink></div><div className={styles.building}><Image src="/images/india-presence/mumbai.jpg" alt="Modern commercial buildings" fill sizes="(max-width: 760px) 90vw, 45vw" /><span>Ideas.<br />Solutions.<br />Progress.</span></div><ul className={styles.benefits}>{[["gear", "Greater Efficiency"], ["shield", "Stronger Compliance"], ["target", "Reduced Risk"], ["network", "Better Decision-Making"], ["chart", "Scalable Growth"]].map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul></div>
    </section>

    <section className={styles.solutionsSection} id="solutions"><div className={styles.wrap}><div className={styles.sectionHeading}><h2>Our Technology Solutions</h2><TextLink href="#enquiry">Discuss Your Solution</TextLink></div><div className={styles.solutionGrid}>{solutions.map((solution) => <article className={styles.card} key={solution.id} id={solution.id}><div className={styles.cardImage}><Image src={solution.image} alt="" fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 23vw" /></div><div className={styles.cardBody}><h3>{solution.title}</h3><p>{solution.text}</p><TextLink href={solution.id === "digital-business" ? "/technology-and-digital-solutions/digital-business-solutions" : solution.id === "regtech" ? "/technology-and-digital-solutions/regtech-and-compliance-technology" : solution.id === "legal-technology" ? "/technology-and-digital-solutions/legal-technology" : `?solution=${encodeURIComponent(solution.title)}#enquiry`}>Explore</TextLink></div></article>)}</div></div></section>

    <section className={`${styles.pale} ${styles.section}`}><div className={styles.wrap}><div className={styles.sectionHeading}><h2>Industries We Support</h2><TextLink href="/industries">Explore All Industries</TextLink></div><div className={styles.sectors}>{sectors.map(([icon, title, slug]) => <Link key={slug} href={`/industries/${slug}`}><Icon name={icon} /><span>{title}</span></Link>)}<Link href="/industries"><Icon name="network" /><span>More<br />Industries</span></Link></div></div></section>

    <section className={styles.approach} id="approach"><div className={`${styles.wrap} ${styles.approachInner}`}><div><h2>Our Approach</h2><p>Technology with a Human Perspective.</p><Link className={styles.lightButton} href="/about/our-methodology">Learn More <Icon name="arrow" /></Link></div><ol>{[["people", "Understand", "Your Needs"], ["bulb", "Design", "Practical Solutions"], ["gear", "Implement", "with Expertise"], ["person", "Enable", "Continuous Support"]].map(([icon, title, text]) => <li key={title}><Icon name={icon} /><span>{title}<br />{text}</span></li>)}</ol><span className={styles.approachMotto}>People.<br />Process.<br />Technology.<br />A stronger<br />tomorrow.</span></div></section>

    <section className={`${styles.wrap} ${styles.insightsSection}`} id="insights">
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Perspectives that move you forward</span><h2>Latest Insights</h2></div><TextLink href="/insights">View All Insights</TextLink></div>
      <div className={styles.insightGrid}>{insights.map(([category, title, image, href]) => <article className={styles.card} key={title}><div className={styles.insightImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 90vw, 30vw" /></div><div className={styles.cardBody}><small>{category}</small><h3>{title}</h3><TextLink href={href}>Read More</TextLink></div></article>)}</div>
    </section>

    <section className={styles.specialistsSection} id="specialists">
      <div className={`${styles.wrap} ${styles.specialists}`}>
        <div className={styles.teamImage}><Image src="/professional-collaboration-hero.png" alt="Professionals collaborating on business priorities" fill sizes="(max-width: 800px) 90vw, 48vw" /><span className={styles.imageCaption}><Icon name="people" /> Connected expertise. Shared ambition.</span></div>
        <div className={styles.specialistCopy}><span className={styles.eyebrow}>People behind the progress</span><h2>Our Technology Specialists</h2><p>A multidisciplinary team bringing together legal, regulatory and technology expertise.</p><p>From defining your priorities to supporting implementation, our professionals connect business understanding with practical digital solutions.</p><div className={styles.expertiseTags}><span>Legal &amp; regulatory</span><span>Business advisory</span><span>Digital transformation</span></div><Link className={styles.button} href="/professionals">Meet Our Team <Icon name="arrow" /></Link></div>
      </div>
    </section>

    <section className={`${styles.wrap} ${styles.faqSection}`} id="faq">
      <div><span className={styles.eyebrow}>Clarity before your next step</span><h2>Frequently Asked Questions</h2><p>Explore how we approach technology, collaboration and ongoing support.</p><TextLink href="/faqs">View All FAQs</TextLink></div>
      <div className={styles.faq}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className={styles.enquirySection} id="enquiry">
      <div className={`${styles.wrap} ${styles.enquiryGrid}`}>
        <div className={styles.enquiryCopy}><span className={styles.eyebrow}>Let&apos;s build what comes next</span><h2>Discuss Your Technology Requirements</h2><p>Bring us your business challenge. Together, we can identify the right technology, processes and expertise to help you move forward.</p><div className={styles.enquiryImage}><Image src="/Technology, IT & ITES .png" alt="Connected technology and digital business systems" fill sizes="(max-width: 800px) 90vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" /><span><small>Speak with our team</small>+91 93116 64455</span><Icon name="arrow" /></a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" /><span><small>Write to us</small>advisory@astronisglobal.com</span><Icon name="arrow" /></a></div>
        <div className={styles.enquiryPanel}><span className={styles.eyebrow}>Start a conversation</span><h3>Tell us what you have in mind.</h3><p>Share a few details and our team will get in touch to discuss your requirements.</p><Enquiry /></div>
      </div>
    </section>
  </div>;
}