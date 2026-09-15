import Link from "next/link";
import AboutResources from "./about-resources";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { industries, statistics } from "@/content/site";
import styles from "./about-astronis-global.module.css";

type VisualCard = { title: string; image: string; href: string };
const advisory = [
  { icon: "building", title: "Corporate Advisory", text: "Structures for growth.", href: "/services/corporate-advisory" },
  { icon: "document", title: "Regulatory Advisory", text: "Compliance for confidence.", href: "/services/regulatory-and-compliance" },
  { icon: "scale", title: "Legal & Litigation", text: "Protection through representation.", href: "/services/litigation-and-dispute-resolution" },
  { icon: "chart", title: "Business Advisory", text: "Insights for what’s next.", href: "/services/business-advisory-and-consulting" },
];
const purpose = [
  { icon: "chart", title: "Our Purpose", text: "To empower businesses and communities through knowledge, integrity and innovation." },
  { icon: "bulb", title: "Our Vision", text: "To be a globally respected advisory firm recognised for trusted relationships and sustainable impact." },
  { icon: "globe", title: "Our Mission", text: "To deliver insightful solutions that create measurable value for a better, more resilient tomorrow." },
];
const values = [["shield", "Integrity"], ["people", "Accountability"], ["scale", "Independence"], ["file", "Confidentiality"], ["bulb", "Excellence"], ["globe", "Responsibility"]];
const differences = [["people", "Multidisciplinary Expertise"], ["bulb", "Practical Solutions"], ["shield", "Long-Term Partnerships"], ["globe", "India Reach. Global Outlook."]];
const lifecycle = [
  { title: "Establish", icon: "building", phase: "Foundation", text: "Turn your ambition into a business with the right entity and registrations." },
  { title: "Structure", icon: "document", phase: "Foundation", text: "Align ownership, governance and commercial arrangements with your goals." },
  { title: "Fund", icon: "chart", phase: "Foundation", text: "Prepare for investment, financing and the next chapter of growth." },
  { title: "Operate", icon: "people", phase: "Resilience", text: "Keep everyday decisions grounded in clear contracts and sound processes." },
  { title: "Comply", icon: "file", phase: "Resilience", text: "Navigate regulatory obligations with a coordinated, practical approach." },
  { title: "Protect", icon: "shield", phase: "Resilience", text: "Safeguard your interests, intellectual property and long-term business value." },
  { title: "Resolve", icon: "scale", phase: "Evolution", text: "Move forward through strategic representation and dispute resolution." },
  { title: "Restructure", icon: "bulb", phase: "Evolution", text: "Adapt your organisation to changing priorities and new opportunities." },
  { title: "Expand", icon: "globe", phase: "Evolution", text: "Enter new markets with local insight and a connected global perspective." },
];
const industryCards: VisualCard[] = ["Manufacturing", "Financial Services", "Healthcare & Pharma", "Real Estate & Construction", "IT & ITES"].map(title => {
  const industry = industries.find(item => item.title === title)!;
  return { title: industry.title, image: industry.image, href: `/industries/${industry.slug}` };
});
const serviceCards: VisualCard[] = [
  { title: "Corporate & Commercial", image: "/Real Estate & Construction .png", href: "/services/corporate-advisory" },
  { title: "Regulatory Services", image: "/Part-18 .png", href: "/services/regulatory-and-compliance" },
  { title: "Litigation & Dispute Resolution", image: "/Part-14 .png", href: "/services/litigation-and-dispute-resolution" },
  { title: "Business Advisory", image: "/Professional & Business Services .png", href: "/services/business-advisory-and-consulting" },
];
const initiatives: VisualCard[] = [
  { title: "Global Alliance & Collaboration", image: "/Part-9 .png", href: "/global-presence/global-network" },
  { title: "Knowledge & Insights", image: "/Part-14 .png", href: "/knowledge-centre" },
  { title: "Technology & Digital Solutions", image: "/Technology, IT & ITES .png", href: "/business-tools" },
  { title: "ESG & Sustainability", image: "/nergy, Power & Renewables .png", href: "/industries/renewable-energy" },
];

function Action({ href, children, outline = false }: { href: string; children: React.ReactNode; outline?: boolean }) {
  return <Link href={href} className={`${styles.action} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>;
}

function Title({ eyebrow, children, id }: { eyebrow: string; children: React.ReactNode; id?: string }) {
  return <><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{children}</h2></>;
}

function Cards({ items, five = false }: { items: VisualCard[]; five?: boolean }) {
  return <div className={`${styles.cards} ${five ? styles.fiveCards : ""}`}>{items.map(item => <Link className={styles.card} href={item.href} key={item.title}><div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw" /></div><div className={styles.cardTitle}><h3>{item.title}</h3><Icon name="arrow" /></div></Link>)}</div>;
}

export default function AboutAstronisGlobal() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="astronis-title">
      <Image src="/Part-9 .png" alt="" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/about">About Us</Link><span aria-hidden="true">›</span><span aria-current="page">About Astronis Global</span></nav>
          <span className={styles.eyebrow}>ABOUT ASTRONIS GLOBAL</span>
          <h1 id="astronis-title">Global Insight.<br />Practical Solutions.<br />Lasting Value.</h1>
          <span className={styles.rule} />
          <p>Astronis Global is a Corporate, Regulatory, Legal & Litigation and Business Advisory firm, helping businesses, investors and institutions navigate complexity and create sustainable growth in India and across borders.</p>
        </div>
        <dl className={styles.stats}>{statistics.map(([value, label], i) => <div key={label}><dt><span className={styles.statIcon}><Icon name={["calendar", "people", "pin", "globe", "file", "building"][i]} /></span><span>{value}</span></dt><dd>{label}</dd></div>)}</dl>
      </div>
    </section>

    <section className={`container ${styles.overview}`} aria-labelledby="who-we-are-title">
      <div className={styles.copy}><Title eyebrow="WHO WE ARE" id="who-we-are-title">An Integrated Advisory<br />Partner for a Complex World</Title><span className={styles.rule} /><p>Astronis Global provides integrated professional services across corporate and commercial advisory, regulatory compliance, legal & litigation, and business advisory. Our approach combines legal understanding, regulatory insight, commercial awareness and strategic thinking to help clients establish, operate, protect, restructure and expand their businesses.</p><Action href="/about/our-story">Our Story</Action></div>
      <div className={styles.advisory}>{advisory.map(item => <Link href={item.href} key={item.title}><Icon name={item.icon} /><h3>{item.title}</h3><p>{item.text}</p></Link>)}</div>
    </section>

    <section className={styles.purpose} aria-label="Our purpose, vision and mission"><div className="container"><span className={styles.eyebrow}>OUR PURPOSE, VISION & MISSION</span><div className={styles.purposeGrid}>{purpose.map(item => <article key={item.title}><Icon name={item.icon} /><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</div></div></section>

    <section className={`container ${styles.values}`} aria-labelledby="values-title">
      <div className={styles.valuesVisual}><Image src="/Part-5 .png" alt="Mountain peaks reflected in a calm lake" fill sizes="(max-width: 700px) 100vw, 50vw" /><p>Guided by principles.<br />Driven by a<br />bigger tomorrow.</p></div>
      <div className={styles.valuesCopy}><Title eyebrow="OUR VALUES" id="values-title">Principles That Guide Us</Title><ul className={styles.valueList}>{values.map(([icon, title]) => <li key={title}><Icon name={icon} />{title}</li>)}</ul><Action href="/about/core-values">Explore Our Values</Action></div>
    </section>

    <section className={styles.difference} aria-labelledby="difference-title"><div className={`container ${styles.differenceInner}`}><div className={styles.copy}><Title eyebrow="OUR ASTRONIS DIFFERENCE" id="difference-title">More Than Advisory.<br />A Strategic Partner.</Title><span className={styles.rule} /><p>We bring together legal, regulatory, commercial and business perspectives to deliver practical, implementable solutions.</p></div><div><div className={styles.differenceGrid}>{differences.map(([icon, title]) => <div key={title}><Icon name={icon} /><h3>{title}</h3></div>)}</div><div className={styles.center}><Action href="/about/why-choose-us">Why Choose Astronis</Action></div></div></div></section>

    <section className={styles.lifecycle} aria-labelledby="lifecycle-title">
      <div className="container">
        <div className={styles.lifecycleHeading}><div><Title eyebrow="THE BUSINESS LIFECYCLE" id="lifecycle-title">Every Stage. A Clear Direction.</Title></div><p>From your first decision to your next horizon, an advisory partner for the entire journey.</p></div>
        <ol className={styles.stageGrid}>{lifecycle.map((stage, i) => <li key={stage.title} className={styles.stage}>
          <div className={styles.stageTop}><span className={styles.stageIcon}><Icon name={stage.icon} /></span><span className={styles.stageNumber}>{String(i + 1).padStart(2, "0")}</span></div>
          <span className={styles.stagePhase}>{stage.phase}</span><h3>{stage.title}</h3><p>{stage.text}</p>
          <div className={styles.stageFoot}><span>{i === lifecycle.length - 1 ? "Your next horizon" : `Next: ${lifecycle[i + 1].title}`}</span><Icon name="arrow" /></div>
        </li>)}</ol>
        <div className={styles.lifecycleFooter}><span>One partner. Every milestone.</span><Action href="/contact">Plan Your Next Step</Action></div>
      </div>
    </section>

    <section className={`container ${styles.collection}`} aria-labelledby="industries-title"><div className={styles.collectionIntro}><Title eyebrow="INDUSTRIES WE UNDERSTAND" id="industries-title">Diverse Industries.<br />Focused Solutions.</Title><Action href="/industries">Explore All Industries</Action></div><Cards items={industryCards} five /></section>

    <section className={`container ${styles.collection}`} aria-labelledby="services-title"><div className={styles.collectionIntro}><Title eyebrow="OUR SERVICES" id="services-title">End-to-End Advisory<br />Across Sectors.</Title><Action href="/services">Explore Our Services</Action></div><Cards items={serviceCards} /></section>

    <section className={`container ${styles.presence}`} aria-label="Our India and international presence">
      <article className={styles.presenceCard}><div className={styles.presenceCopy}><Title eyebrow="INDIA PRESENCE">Nationwide Capability</Title><ul><li>Advisory across all major jurisdictions</li><li>Representation before key courts & tribunals</li><li>Engagement with regulatory authorities</li><li>A strong network of professionals</li></ul><Action href="/about/india-presence">View India Presence</Action></div><div className={styles.presenceVisual}><Image src="/Infrastructure & Projects .png" alt="India’s urban infrastructure and business landscape" fill sizes="(max-width: 700px) 45vw, 25vw" /><span><Icon name="pin" /> PAN INDIA</span></div></article>
      <article className={styles.presenceCard}><div className={styles.presenceCopy}><Title eyebrow="GLOBAL PERSPECTIVE">International Reach.<br />Local Insight.</Title><ul><li>Cross-border advisory support</li><li>India entry and outbound expansion</li><li>International professional network</li><li>Strategic collaborations</li></ul><Action href="/global-presence">Explore Global Presence</Action></div><div className={styles.presenceVisual}><Image src="/Part-9 .png" alt="A connected globe and international city skyline" fill sizes="(max-width: 700px) 45vw, 25vw" /><span><Icon name="globe" /> GLOBAL OUTLOOK</span></div></article>
    </section>

    <section className={`container ${styles.collection}`} aria-labelledby="initiatives-title"><div className={styles.collectionIntro}><Title eyebrow="OUR PROJECTS & STRATEGIC INITIATIVES" id="initiatives-title">Building for a<br />Better Tomorrow</Title><Action href="/about/vision-and-mission">Our Vision & Mission</Action></div><Cards items={initiatives} /></section>

    <AboutResources />

    <section className={`container ${styles.resources}`} aria-label="Explore more at Astronis">

      <article><Title eyebrow="CAREERS & COLLABORATION">Let’s Build What’s Next</Title><div className={styles.resourceBody}><ul><li>Join our team</li><li>Work with us</li><li>For professionals</li><li>International collaboration</li></ul><div className={styles.resourceImage}><Image src="/Professional & Business Services .png" alt="" fill sizes="(max-width: 700px) 30vw, 12vw" /></div></div><Action href="/about/careers">Explore Opportunities</Action></article>
      <article><Title eyebrow="FREQUENTLY ASKED QUESTIONS">Quick Answers</Title><div className={styles.resourceBody}><ul><li>What do we do?</li><li>Who do we work with?</li><li>Do we work internationally?</li><li>How can I engage Astronis?</li></ul><span className={styles.question} aria-hidden="true">?</span></div><Action href="/faqs">View FAQs</Action></article>
    </section>

    <section className={styles.cta} aria-labelledby="partner-title"><Image src="/Part-5 .png" alt="" fill sizes="100vw" /><div className={`container ${styles.ctaInner}`}><div><Title eyebrow="LET’S START A CONVERSATION" id="partner-title">Partner with Astronis Global</Title><p>Discuss your objectives with our team and explore how we can support your next move.</p></div><div className={styles.ctaActions}><Action href="/contact">Speak to an Advisor</Action><Action href="/contact#enquiry-form" outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}
