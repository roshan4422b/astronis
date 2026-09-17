import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import media from "./media-entertainment.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Content creation", "Compliance & distribution", "Monetisation", "Intellectual property", "Digital platforms", "A brighter tomorrow"];
const capabilities = [
  ["shield", "Regulatory compliance", "Guidance for broadcasting, OTT, advertising and sector-specific requirements."],
  ["bulb", "IP & content protection", "Protecting copyright, trademarks, formats and other creative assets."],
  ["people", "Commercial support", "Structuring contracts, licences, partnerships and revenue models."],
  ["globe", "Global market access", "Support for co-productions, distribution and cross-border collaborations."],
];
const challenges = [
  ["Evolving content landscape", "Adapt to digital-first consumption and new content formats.", "/Banner-Media, Entertainment & Broadcasting .png"],
  ["Regulatory dynamics", "Navigate a complex and changing regulatory environment.", "/Media, Entertainment & Sports .png"],
  ["Monetisation & distribution", "Structure rights, licensing and multi-platform distribution.", "/Technology, IT & ITES .png"],
  ["Talent, contracts & IP", "Protect creative talent and intellectual property across formats.", "/Media, Entertainment & Sports .png"],
  ["Global collaborations", "Build international partnerships and co-production opportunities.", "/Banner-Media, Entertainment & Broadcasting .png"],
];
const solutions = [
  ["file", "Regulatory advisory & licensing", "regulatory-and-compliance"],
  ["document", "Production & distribution agreements", "contracts"],
  ["shield", "Copyright & trademark protection", "intellectual-property-rights"],
  ["scale", "Defamation & reputation management", "litigation-and-dispute-resolution"],
  ["bulb", "Advertising & compliance", "regulatory-and-compliance"],
  ["globe", "OTT & digital platform advisory", "business-advisory-and-consulting"],
  ["chart", "Media investment & M&A support", "corporate-advisory"],
  ["people", "Dispute resolution & arbitration", "litigation-and-dispute-resolution"],
];
const related = [
  ["Technology, IT & ITES", "it-and-ites", "/Technology, IT & ITES .png"],
  ["E-Commerce & Digital Platforms", "e-commerce", "/Retail & E-Commerce .png"],
  ["Telecommunications", "telecommunications", "/Telecommunications & Digital Infrastructure .png"],
  ["Education & EdTech", "education", "/Education & EdTech .png"],
];
const faqs = [
  ["What approvals are required for OTT platforms in India?", "The requirements depend on the platform, content and business model. We help identify applicable digital media, content and operational obligations."],
  ["How is content on digital platforms regulated?", "Digital content is subject to a combination of laws, rules and platform obligations. We support reviews of content policies, workflows and compliance responsibilities."],
  ["What are the key legal considerations in co-production agreements?", "Rights ownership, financing, creative control, delivery, distribution, revenue sharing and dispute mechanisms should be clearly documented."],
  ["How can intellectual property rights be protected in media and entertainment?", "Protection may include copyright and trademark registration, clear ownership clauses, licensing terms and enforcement planning."],
  ["What are the advertising compliance requirements in India?", "Requirements vary by product, medium and claim. We advise on applicable standards, disclosures, endorsements and review processes."],
];

export default function MediaEntertainment() {
  return <div className={`${styles.page} ${media.page}`}>
    <section className={styles.hero} aria-labelledby="media-title"><Image src="/Banner-Media, Entertainment & Broadcasting .png" alt="Media production studio with a professional camera" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Media & Entertainment</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="media-title">Media, Entertainment<br />& Broadcasting</h1><p className={styles.heroTagline}>Ideas. Content. Creativity. Wider horizons.</p><p className={styles.heroText}>Practical legal, regulatory and strategic advice for production companies, broadcasters, OTT platforms, creators and brands bringing stories to audiences everywhere.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="Media page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Stories that connect<br /><em>the world.</em></h2><p className={styles.lead}>India’s media, entertainment and broadcasting sector is changing quickly as digital platforms reshape how stories are made, shared and valued. We help media businesses turn creative ambition into sustainable commercial growth.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>What is shaping the sector <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Connected advice from content creation and rights protection to distribution and growth.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Clarity for every creative decision.</h2><p>From content standards and platform obligations to advertising, licensing and rights, we help you move with confidence.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/Media, Entertainment & Sports .png" alt="Media and entertainment production" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">The future of digital content in India</h2><p>Explore the legal and commercial questions shaping the next era of media.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for your media and entertainment plans.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Partnering for creative possibilities.</h2><p>Tell us what you are creating. We can help you protect your ideas, navigate regulation and build a sustainable media business.</p><div className={styles.contactImage}><Image src="/Banner-Media, Entertainment & Broadcasting .png" alt="Camera and broadcast production studio" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
