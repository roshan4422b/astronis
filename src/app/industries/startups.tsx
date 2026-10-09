import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroPriorities from "./hero-priorities";
import { industries, stories } from "@/content/site";
import styles from "./manufacturing.module.css";
import estate from "./real-estate.module.css";
import startup from "./startups.module.css";

const navigation = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["ecosystem", "Ecosystem Support"], ["stories", "Success Stories"], ["insights", "Insights"], ["faq", "FAQ"]];
const audiences = [["bulb", "Founders & Emerging Businesses"], ["file", "Technology & SaaS Companies"], ["chart", "Investors & Venture Funds"], ["people", "Incubators & Accelerators"], ["globe", "Digital Platforms"], ["shield", "Fintech, Healthtech & Deep Tech"]];
const benefits = [
  ["bulb", "Business-Focused Advice", "Practical support tailored to your product, market and stage of growth."],
  ["shield", "Regulatory Confidence", "Clear guidance on incorporation, compliance and evolving rules."],
  ["people", "Investor Readiness", "Documentation and governance that support productive investment discussions."],
  ["globe", "Room to Scale", "Structures, agreements and risk planning for new markets and partnerships."],
];
const challenges = [
  ["From Idea to Incorporation", "Startups & Emerging Businesses .png", "Choose a structure, document founder roles and establish sound governance.", "corporate-advisory/corporate-structuring"],
  ["Fundraising & Investment", "FinTech & Digital Finance .png", "Prepare for diligence, negotiate terms and understand investor rights.", "startup-and-investment-advisory"],
  ["IP & Product Protection", "Technology, IT & ITES .png", "Protect ownership of the brand, software and ideas that set you apart.", "intellectual-property-rights"],
  ["Privacy & Compliance", "Banner-Technology, IT & ITES .png", "Build a compliant product and manage data and contractual responsibilities.", "regulatory-and-compliance/data-protection"],
  ["Expansion & Partnerships", "Banner-Startups & Emerging Businesses .png", "Plan new market entry, commercial alliances and cross-border growth.", "business-advisory-and-consulting"],
];
const solutions = [
  ["building", "Company Formation & Structuring", "corporate-advisory/corporate-structuring"],
  ["chart", "Fundraising & Investor Documentation", "startup-and-investment-advisory"],
  ["shield", "Regulatory & Compliance Advisory", "regulatory-and-compliance"],
  ["file", "Contracts & Commercial Advisory", "contracts"],
  ["bulb", "IP Strategy & Protection", "intellectual-property-rights"],
  ["people", "Employment & ESOP Structuring", "hr-and-employment-advisory"],
  ["globe", "Cross-Border Expansion", "cross-border-and-international-business-support"],
  ["scale", "Dispute Resolution & Risk", "litigation-and-dispute-resolution"],
];
const phases = [
  ["01", "Launch", "Entity formation, founder arrangements and early contracts"],
  ["02", "Fund", "Investment terms, diligence and governance"],
  ["03", "Scale", "People, products, partnerships and new markets"],
];
const faqs = [
  ["What is the best legal structure for a startup in India?", "The right structure depends on ownership, liability, funding plans, tax considerations and how you intend to operate. We can assess these factors with you before incorporation."],
  ["Which agreements should founders put in place early?", "Founder arrangements, IP assignment, employment and contractor agreements, customer terms and confidentiality documents can help clarify responsibilities and ownership."],
  ["How can a startup prepare for fundraising?", "Keep a clean cap table, corporate records, financial information, material contracts and IP ownership documents ready. Review proposed terms and governance rights before signing."],
  ["How do we protect our software, brand and ideas?", "A coordinated approach can include trade mark and copyright protection, confidentiality measures, clear IP ownership in contracts and, where suitable, patent or design advice."],
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className={styles.textLink}>{children}<Icon name="arrow" /></Link>; }
function Heading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) { return <div><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{title}</h2></div>; }

export default function Startups() {
  return <div className={`${styles.page} ${estate.page} ${startup.page}`}>
    <section className={`${styles.hero} ${estate.hero} ${startup.hero}`} aria-labelledby="startups-title">
      <Image src="/Banner-Startups & Emerging Businesses .png" alt="Startup workspace overlooking a growing city" fill preload sizes="100vw" />
      <div className={`container ${styles.heroInner}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">Startups</span></nav>
        <div className={`${styles.heroCopy} ${startup.heroCopy}`}><span className={styles.eyebrow}>Industry Focus</span><h1 id="startups-title">Startups &<br />Technology</h1><p className={styles.tagline}>From ideas to impact. Build what comes next.</p><p className={styles.heroDescription}>We partner with founders, scale-ups and technology-led businesses at every stage, providing legal, regulatory and strategic support to help them innovate, attract investment and grow with confidence.</p><Link className={styles.button} href="/professionals/enquiry">Speak to Our Experts<Icon name="arrow" /></Link></div>
        <HeroPriorities title="Build what is next" items={[["bulb", "Innovate"], ["building", "Incorporate"], ["chart", "Raise"], ["shield", "Comply"], ["globe", "Scale"], ["people", "Go global"]]} />
      </div>
    </section>
    <nav className={styles.sectionNav} aria-label="Startups page sections"><div className={`container ${styles.navInner}`}>{navigation.map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navEnquire} href="#enquire">Enquire Now<Icon name="arrow" /></a></div></nav>

    <section id="overview" className={styles.section} aria-labelledby="overview-title"><div className="container"><div className={`${styles.overviewGrid} ${startup.overviewGrid}`}><div><Heading eyebrow="Industry Overview" title="Empowering the Next Generation of Innovators" id="overview-title" /><p className={styles.lead}>India’s startup ecosystem is creating new opportunities across sectors, markets and technologies.</p><p>We support founders, investors and growth-stage businesses with joined-up legal, regulatory and commercial advice. From early structuring to international expansion, our work helps ambitious teams navigate complexity and build for the long term.</p></div><div className={`${styles.sectors} ${startup.sectors}`}><span className={styles.eyebrow}>Who We Work With</span><h3>Across the innovation ecosystem</h3><ul>{audiences.map(([icon,title])=><li key={title}><Icon name={icon} />{title}</li>)}</ul></div></div><div className={`${styles.benefits} ${startup.benefits}`}>{benefits.map(([icon,title,text])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section id="challenges" className={`${styles.section} ${styles.pale}`} aria-labelledby="challenges-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Perspective" title="Key Opportunities & Challenges" id="challenges-title" /><TextLink href="#enquire">Discuss Your Priorities</TextLink></div><div className={`${styles.challengeGrid} ${startup.challengeGrid}`}>{challenges.map(([title,photo,text,path],index)=><article key={title} className={`${styles.challengeCard} ${startup.challengeCard}`}><div className={`${styles.challengeImage} ${startup.challengeImage}`}><Image src={`/${photo}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 20vw" /><span>0{index+1}</span></div><details><summary><h3>{title}</h3><span className={styles.plus}>+</span></summary><div className={styles.challengeDetail}><p>{text}</p><TextLink href={`/services/${path}`}>Explore Support</TextLink></div></details></article>)}</div></div></section>

    <section id="solutions" className={styles.section} aria-labelledby="solutions-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Our Solutions" title="Expertise for Every Stage of Growth" id="solutions-title" /><p>Connected legal, regulatory and business support for the startup journey.</p></div><div className={estate.solutions}>{solutions.map(([icon,title,path])=><Link className={estate.solution} href={`/services/${path}`} key={title}><Icon name={icon} /><h3>{title}</h3><Icon name="arrow" /></Link>)}</div></div></section>

    <section id="ecosystem" className={estate.regulatory} aria-labelledby="ecosystem-title"><div className={`container ${estate.regulatoryGrid}`}><div><Heading eyebrow="Ecosystem Support" title="From First Steps to the Next Market" id="ecosystem-title" /><p>We bring the right advice together as your team, product and ambitions evolve.</p><TextLink href="#enquire">Plan Your Next Move</TextLink></div><div className={estate.lifecycle}>{phases.map(([n,title,text])=><div key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <section id="stories" className={`${styles.section} ${startup.storiesSection}`} aria-labelledby="stories-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Selected Work" title="Experience That Moves Businesses Forward" id="stories-title" /><TextLink href="/success-stories">Explore Success Stories</TextLink></div><div className={startup.storyGrid}>{[stories[1],stories[4],stories[6]].map(story=><Link key={story.slug} href={`/success-stories/${story.slug}`} className={startup.storyCard}><div className={startup.storyImage}><Image src={story.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div><span>{story.category}</span><h3>{story.title}</h3><p>{story.description}</p><strong>Read story <Icon name="arrow" /></strong></div></Link>)}</div></div></section>

    <section id="insights" className={styles.section} aria-labelledby="insights-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Featured Perspective" title="Ideas for Ambitious Businesses" id="insights-title" /><TextLink href="/insights">View All Insights</TextLink></div><article className={estate.feature}><div className={estate.featureImage}><Image src="/Startups & Emerging Businesses .png" alt="Ideas and opportunities for growing businesses" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={estate.featureCopy}><span className={styles.eyebrow}>Startups & Technology</span><h3>Build the Foundations for Sustainable Growth</h3><p>Explore the questions that matter as a startup moves from launch to investment and scale.</p><details className={estate.insightDetails}><summary>Read More<span className={styles.plus}>+</span></summary><div><p>Clear founder arrangements, ownership of technology, sound commercial contracts and usable governance can make future decisions easier. Revisit these foundations as your team, customers and investors change.</p><TextLink href="#enquire">Discuss Your Business</TextLink></div></details></div></article></div></section>

    <section id="related" className={styles.related} aria-labelledby="related-title"><div className="container"><div className={styles.sectionHeading}><Heading eyebrow="Connected Expertise" title="Related Industries" id="related-title" /><TextLink href="/industries">View All Industries</TextLink></div><div className={styles.relatedGrid}>{[industries[1],industries[17],industries[2],industries[4]].map(industry=><Link href={`/industries/${industry.slug}`} key={industry.slug}><div className={styles.relatedImage}><Image src={industry.image} alt="" fill sizes="(max-width: 600px) 50vw, 25vw" /></div><h3>{industry.title}<Icon name="arrow" /></h3></Link>)}</div></div></section>

    <section id="faq" className={`${styles.section} ${styles.pale}`} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div><Heading eyebrow="Your Questions, Answered" title="Frequently Asked Questions" id="faq-title" /><p>Answers to common questions from founders and growing technology businesses.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqList}>{faqs.map(([question,answer])=><details key={question}><summary>{question}<span className={styles.plus}>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section id="enquire" className={`${styles.section} ${styles.contact}`} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner With Us</span><h2 id="enquire-title">From Ideas to Lasting Impact.</h2><p>Build your next chapter with practical legal, regulatory and strategic support.</p><div className={`${styles.contactImage} ${startup.contactImage}`}><Image src="/Banner-Startups & Emerging Businesses .png" alt="Workspace with a view of global opportunity" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
