import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import EnquiryForm from "../contact/enquiry-form";
import HeroFocus from "./hero-focus";
import styles from "./logistics.module.css";
import energy from "./renewable-energy.module.css";

const nav = [["overview", "Overview"], ["challenges", "Key Issues"], ["solutions", "Our Solutions"], ["regulatory", "Regulatory Landscape"], ["related", "Related Industries"], ["insights", "Insights"], ["faq", "FAQ"]];
const focus = ["Clean energy", "Energy security", "Regulatory compliance", "Project financing", "Sustainability", "Innovation"];
const capabilities = [
  ["shield", "Regulatory advisory", "Guidance on energy laws, approvals, licences and policy compliance."],
  ["bulb", "Project development", "Support across project structuring, contracts, financing and land arrangements."],
  ["chart", "Risk & contract management", "Manage regulatory, commercial and environmental risks through the project lifecycle."],
  ["globe", "Sustainability & ESG", "Advice on clean energy, carbon compliance and responsible business practices."],
];
const challenges = [
  ["Energy transition", "Move toward renewables and net-zero goals with a clear plan.", "/nergy, Power & Renewables .png"],
  ["Regulatory evolution", "Adapt to changing policies, approvals and market mechanisms.", "/Banner-Energy, Power & Renewables .png"],
  ["New technologies", "Assess storage, green hydrogen and other emerging solutions.", "/Technology, IT & ITES .png"],
  ["EV & clean mobility", "Connect power infrastructure with expanding electric transport networks.", "/Automotive & Mobility .png"],
  ["Financing & execution", "Coordinate funding, land, contracts and environmental requirements.", "/Infrastructure & Projects .png"],
];
const solutions = [
  ["file", "Regulatory clearances & approvals", "regulatory-and-compliance"],
  ["document", "Project contracts: EPC, O&M, PPA", "contracts"],
  ["building", "Land acquisition & due diligence", "corporate-advisory"],
  ["chart", "Project financing & investment", "business-advisory-and-consulting"],
  ["bulb", "Environmental & sustainability compliance", "esg-and-sustainability-advisory"],
  ["scale", "Dispute resolution & arbitration", "litigation-and-dispute-resolution"],
  ["people", "Policy & government engagement", "regulatory-and-compliance"],
  ["globe", "M&A and strategic partnerships", "corporate-advisory"],
];
const related = [
  ["Infrastructure & Projects", "infrastructure", "/Infrastructure & Projects .png"],
  ["Manufacturing & Industrial", "manufacturing", "/Manufacturing & Industrial .png"],
  ["Automotive & Mobility", "automotive-and-mobility", "/Automotive & Mobility .png"],
  ["Real Estate & Construction", "real-estate-and-construction", "/Real Estate & Construction .png"],
];
const faqs = [
  ["What approvals are required for a renewable energy project in India?", "Requirements vary by technology, project size and location. They may include land, grid connectivity, electricity, environmental and local approvals."],
  ["How does the Electricity Act affect power producers and distributors?", "It sets important rules for generation, transmission, distribution and trading. The exact obligations depend on the proposed activity and state framework."],
  ["What are the regulatory requirements for setting up a solar or wind project?", "Project planning should cover land, permits, grid access, offtake contracts, equipment standards and applicable state and central policies."],
  ["Can foreign investors invest in India’s renewable energy sector?", "Investment opportunities depend on the project structure and applicable foreign investment rules. We advise on entry, contracts and due diligence."],
  ["How are environment and forest clearances obtained for energy projects?", "The clearance route depends on project location, land use and environmental impact. We help map the applicable authorities and application steps."],
];

export default function RenewableEnergy() {
  return <div className={`${styles.page} ${energy.page}`}>
    <section className={styles.hero} aria-labelledby="energy-title"><Image src="/Banner-Energy, Power & Renewables .png" alt="Wind turbines and solar panels at sunset" fill preload sizes="100vw" /><div className={`container ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/industries">Industries</Link><span>›</span><span aria-current="page">Renewable Energy</span></nav>
      <div className={styles.heroMain}><span className={styles.eyebrow}>Industry focus</span><h1 id="energy-title">Energy, Power<br />& Renewables</h1><p className={styles.heroTagline}>Sustainable energy. Stronger economies. Cleaner tomorrow.</p><p className={styles.heroText}>Integrated legal, regulatory and strategic advice for developers, investors, manufacturers and institutions shaping the future of power and clean energy.</p><a className={styles.primaryButton} href="/professionals/enquiry">Speak to our experts <Icon name="arrow" /></a></div>
      <HeroFocus items={focus} />
    </div></section>
    <nav className={styles.sectionNav} aria-label="Renewable energy page sections"><div className={`container ${styles.navInner}`}>{nav.map(([id,label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a className={styles.navCta} href="#enquire">Enquire now <Icon name="arrow" /></a></div></nav>
    <div className={`container ${styles.contentGrid}`}>
      <main className={styles.main}>
        <section id="overview" className={styles.block}><span className={styles.eyebrow}>Industry overview</span><h2>Powering a<br /><em>sustainable future.</em></h2><p className={styles.lead}>India’s energy transition is creating new opportunities across renewable generation, storage, distribution and clean mobility. We help businesses plan projects, navigate regulation and manage risk throughout the energy value chain.</p><div className={styles.capabilities}>{capabilities.map(([icon,title,description]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section id="challenges" className={styles.block}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Our perspective</span><h2>Opportunities & challenges</h2></div><span>What is shaping energy <Icon name="arrow" /></span></div><div className={styles.challengeGrid}>{challenges.map(([title,description,image]) => <article key={title}><div className={styles.challengeImage}><Image src={image} alt="" fill sizes="(max-width: 700px) 80vw, 18vw" /></div><div className={styles.challengeBody}><h3>{title}</h3><p>{description}</p><Icon name="arrow" /></div></article>)}</div></section>
        <section id="solutions" className={styles.block}><span className={styles.eyebrow}>Integrated expertise</span><h2>Our solutions</h2><p className={styles.intro}>Connected advisory across the energy, power and renewables ecosystem.</p><div className={styles.solutionGrid}>{solutions.map(([icon,title,path]) => <Link href={`/services/${path}`} key={title}><Icon name={icon} /><span>{title}</span><Icon name="arrow" /></Link>)}</div></section>
        <section id="regulatory" className={styles.regulatory}><div><span className={styles.eyebrow}>Regulatory landscape</span><h2>Clear paths to cleaner power.</h2><p>Bring approvals, land, grid access, offtake and environmental duties into a practical project plan.</p><Link href="/services/regulatory-and-compliance">Explore regulatory advisory <Icon name="arrow" /></Link></div></section>
      </main>
      <section id="related" className={styles.relatedSection} aria-labelledby="related-title"><span className={styles.eyebrow}>Connected expertise</span><h2 id="related-title">Related industries</h2><div className={styles.relatedGrid}>{related.map(([title,slug,image]) => <Link href={`/industries/${slug}`} key={title}><span className={styles.relatedImage}><Image src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" /></span><span className={styles.relatedTitle}>{title}<Icon name="arrow" /></span></Link>)}</div></section>
      <section id="insights" className={styles.insightSection} aria-labelledby="insight-title"><div className={styles.insightImage}><Image src="/nergy, Power & Renewables .png" alt="Renewable energy facilities" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div className={styles.insightCopy}><span className={styles.eyebrow}>Featured insight</span><h2 id="insight-title">India’s renewable energy journey</h2><p>Explore the regulatory trends and opportunities shaping clean energy development.</p><Link href="/insights">View all insights <Icon name="arrow" /></Link></div></section>
    </div>
    <section id="faq" className={styles.faqSection} aria-labelledby="faq-title"><div className={`container ${styles.faqLayout}`}><div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2 id="faq-title">Frequently asked questions</h2><p>Find a clearer starting point for your energy and renewables project.</p><Link href="/faqs">View all FAQs <Icon name="arrow" /></Link></div><div className={styles.faqList}>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="enquire" className={styles.contact} aria-labelledby="enquire-title"><div className={`container ${styles.contactGrid}`}><div className={styles.contactCopy}><span className={styles.eyebrow}>Partner with us</span><h2 id="enquire-title">Partnering for a cleaner, greener tomorrow.</h2><p>Tell us about your energy project. We can help you navigate regulation, structure agreements and move toward delivery.</p><div className={styles.contactImage}><Image src="/Banner-Energy, Power & Renewables .png" alt="Solar power and wind energy" fill sizes="(max-width: 900px) 100vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formWrap}><EnquiryForm /></div></div></section>
  </div>;
}
