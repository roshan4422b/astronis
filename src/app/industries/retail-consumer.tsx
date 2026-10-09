import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import shared from "./logistics.module.css";
import base from "./artificial-intelligence.module.css";
import styles from "./retail-consumer.module.css";

const focus = [
  ["shield", "Consumer product compliance"],
  ["globe", "E-commerce regulations"],
  ["bulb", "Brand & intellectual property"],
  ["people", "Franchise & distribution"],
  ["document", "Advertising & marketing"],
  ["chart", "Supply chain & logistics"],
];
const pillars = [
  ["chart", "Market entry & expansion", "Advice for new channels, store rollouts, digital brands and partnerships."],
  ["shield", "Regulatory compliance", "Support for product, packaging, labelling, advertising and consumer obligations."],
  ["bulb", "Brand protection", "Practical advice for trademarks, licensing, counterfeiting and brand value."],
  ["globe", "Growth & sustainability", "Build resilient operations and responsible consumer relationships."],
];
const sectors = [
  ["Retail chains", "Department stores · speciality retail", "/Retail & E-Commerce .png"],
  ["FMCG & consumer products", "Food · beverages · household", "/FMCG, Food & Consumer Products .png"],
  ["E-commerce & marketplaces", "Online retail · digital platforms", "/Banner-E-Commerce & Digital Platforms .png"],
  ["Direct-to-consumer brands", "Lifestyle · digital-first products", "/Banner- Indus- Retail & Consumer .png"],
  ["Fashion & lifestyle", "Apparel · footwear · accessories", "/Textiles, Apparel & Lifestyle .png"],
  ["Consumer durables", "Appliances · electronics · devices", "/Technology, IT & ITES .png"],
  ["Food & beverage", "Packaged foods · hospitality", "/FMCG FOOD .png"],
  ["Premium brands", "Luxury · jewellery · watches", "/FMCG, Food & Consumer ProductsA .png"],
];
const solutions = [
  ["file", "Regulatory approvals & compliance", "/services/licensing-and-registrations"],
  ["document", "Commercial contracts", "/services/contracts"],
  ["people", "Franchise & distribution", "/services/business-advisory-and-consulting"],
  ["shield", "Advertising & consumer law", "/services/regulatory-and-compliance"],
  ["bulb", "Brand & intellectual property", "/services/intellectual-property-rights"],
  ["chart", "Workforce & operations", "/services/employment-and-labour"],
  ["globe", "Cross-border growth", "/services/foreign-investment"],
  ["scale", "Dispute resolution", "/services/litigation-and-dispute-resolution"],
];
const related = [
  ["E-commerce & digital platforms", "e-commerce", "/Retail & E-Commerce .png"],
  ["Manufacturing & industrial", "manufacturing", "/Manufacturing & Industrial .png"],
  ["FinTech & digital finance", "fintech-and-digital-finance", "/FinTech & Digital Finance .png"],
  ["Media & entertainment", "media-and-entertainment", "/Media, Entertainment & Sports .png"],
];
const faqs = [
  ["What product compliance should a consumer business review?", "Requirements depend on the product and market. Common areas include safety, packaging, labelling, advertising, licensing and consumer rights."],
  ["Do online marketplaces face different obligations from retailers?", "Responsibilities can differ with the platform model, control over listings, payment flows and customer relationship. Terms and compliance processes should reflect those roles."],
  ["How can a brand protect its name and designs?", "Trademark and design protection, clear ownership terms, licensing controls and monitoring help safeguard brand assets."],
  ["What should a franchise or distribution agreement cover?", "Territory, standards, supply, pricing, intellectual property, data, termination and dispute processes all warrant clear agreement."],
  ["How can a retailer manage consumer complaints?", "Accessible complaint channels, clear policies, trained teams and consistent records help resolve issues and identify recurring risks."],
];

export default function RetailConsumer() {
  return <div className={`${shared.page} ${base.page} ${styles.page}`}>
    <section className={`${shared.hero} ${base.hero} ${styles.hero}`} aria-labelledby="retail-title"><Image src="/Banner- Indus- Retail & Consumer .png" alt="Shopping bags and retail display" fill preload sizes="100vw" /><div className={`container ${shared.heroInner} ${base.heroInner} ${styles.heroInner}`}><nav className={shared.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Retail & Consumer</span></nav><div className={shared.heroMain}><span className={shared.eyebrow}>Industry focus</span><h1 id="retail-title">Retail & Consumer</h1><p className={shared.heroTagline}>Brands that grow. Trust that lasts.</p><p className={shared.heroText}>Legal, regulatory and business advice for retailers, consumer brands, FMCG companies, marketplaces and digital-first businesses navigating a changing market.</p><Link className={shared.primaryButton} href="#enquire">Speak to our experts <Icon name="arrow" /></Link></div><aside className={base.heroStatement} aria-label="Our approach">Brands.<br />Markets.<br />Consumers.<br />Opportunity.<strong>A stronger tomorrow.</strong></aside></div></section>
    <nav className={shared.sectionNav} aria-label="Page sections"><div className={`container ${shared.navInner}`}>{[["overview","Overview"],["sectors","Key sectors"],["solutions","Our solutions"],["approach","Our approach"],["related","Related industries"],["insights","Insights"],["faq","FAQ"]].map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<a className={shared.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <main className={`container ${base.content}`}>
      <section id="overview" className={base.section}><div className={base.overviewGrid}><div><span className={shared.eyebrow}>Industry overview</span><h2>Brands today. <em>Stronger tomorrow.</em></h2><p className={base.lead}>Retail and consumer markets move quickly. We help businesses build trusted brands while meeting the rules that shape products, stores and digital channels.</p><p>Our connected advice spans compliance, contracts, intellectual property, people and market expansion, helping teams make confident commercial decisions.</p></div><div className={base.focusPanel}><span className={base.focusHeading}>Where we help</span>{focus.map(([icon,title])=><div key={title}><span><Icon name={icon} /></span><strong>{title}</strong></div>)}</div></div><div className={base.pillars}>{pillars.map(([icon,title,body])=><article key={title}><Icon name={icon} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section id="sectors" className={base.section}><div className={base.heading}><div><span className={shared.eyebrow}>Across consumer markets</span><h2>Key sectors we support</h2></div><Link href="#enquire">Discuss your business <Icon name="arrow" /></Link></div><div className={base.applications}>{sectors.map(([title,subtitle,image])=><article key={title}><div className={base.applicationImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></div><div><h3>{title}</h3><p>{subtitle}</p></div></article>)}</div></section>
      <section id="solutions" className={base.section}><span className={shared.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p>Practical advice across the retail and consumer business lifecycle.</p><div className={base.solutions}>{solutions.map(([icon,title,href])=><Link href={href} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
      <section id="approach" className={base.governance}><div><span className={shared.eyebrow}>Built for consumer businesses</span><h2>From market entry to lasting loyalty.</h2><p>Good foundations help brands move quickly, protect what makes them distinctive and earn consumer trust.</p><Link href="#enquire">Talk to our team <Icon name="arrow" /></Link></div><div className={base.governanceSteps}>{[["01","Launch","Structure products, channels and commercial relationships."],["02","Protect","Strengthen compliance, brand rights and consumer processes."],["03","Expand","Support distribution, partnerships and new markets."]].map(([number,title,body])=><div key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></div>)}</div></section>
      <section id="related" className={base.section}><span className={shared.eyebrow}>Connected sectors</span><h2>Related industries</h2><div className={base.relatedGrid}>{related.map(([title,slug,image])=><Link href={`/industries/${slug}`} key={slug}><span className={base.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></span><span>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={base.insight}><div className={base.insightImage}><Image src="/Retail & E-Commerce .png" alt="Retail and digital commerce" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span className={shared.eyebrow}>Featured insight</span><h2>Ideas for the consumer economy</h2><p>Explore the commercial and compliance questions shaping retail and digital marketplaces.</p><Link href="/insights">Explore insights <Icon name="arrow" /></Link></div></section>
    </main>
    <section id="faq" className={shared.faqSection}><div className={`container ${shared.faqLayout}`}><div className={shared.faqIntro}><span className={shared.eyebrow}>Your questions, answered</span><h2>Frequently asked questions</h2><p>Clear starting points for building a consumer-facing business.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={shared.faqList}>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
    <section id="enquire" className={shared.contact} aria-labelledby="enquire-title"><div className={`container ${shared.contactGrid}`}><div className={shared.contactCopy}><span className={shared.eyebrow}>Partner with us</span><h2 id="enquire-title">Trusted advice for consumer growth.</h2><p>Tell us about your brand or retail business. We can help you protect it, meet regulatory expectations and plan what comes next.</p><div className={shared.contactImage}><Image src="/Banner- Indus- Retail & Consumer .png" alt="Retail shopping and consumer products" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={shared.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
