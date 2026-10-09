"use client";

import Image from "@/app/_components/asset-image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./expertise-page.module.css";

const practiceAreas = [
  { title: "Corporate & Commercial", image: "/images/services/corporate-and-commercial-advisory.webp", description: "Structuring | Contracts | Transactions | M&A | Joint Ventures | Governance" },
  { title: "Regulatory & Compliance", image: "/corporate-regulatory-hero.png", description: "Regulatory Strategy | Licensing | Governance | Approvals | Investigations" },
  { title: "Litigation & Dispute Resolution", image: "/images/services/litigation-and-dispute-resolution.webp", description: "Commercial Disputes | Arbitration | NCLT | DRT | NCLAT | Tribunals" },
  { title: "Banking, Finance & Investment", image: "/images/services/banking-nbfc-and-financial-services-advisory.webp", description: "Banking | NBFC | FinTech | Investment | Startup Funding" },
  { title: "Tax & Foreign Exchange", image: "/images/services/gst-and-indirect-tax-regulatory-support.webp", description: "GST | Indirect Tax | FEMA | FDI | ECB | Cross-Border Transactions" },
  { title: "Governance, Risk & Compliance", image: "/governance-secretarial-hero.png", description: "Corporate Governance | ESG | Risk Advisory | Forensic | Compliance" },
  { title: "Employment & Organisation", image: "/Professional & Business Services .png", description: "HR Compliance | Policies | Employment Contracts | Workplace" },
  { title: "Intellectual Property & Innovation", image: "/Technology&Digital/Banner- Legal Technology .png", description: "Trademark | Copyright | IP Strategy | Licensing | Enforcement" },
  { title: "Technology & Digital", image: "/Banner-Technology, IT & ITES .png", description: "AI | LegalTech | RegTech | Data Governance | Cybersecurity" },
  { title: "International & Cross-Border", image: "/globalpresence.png", description: "Market Entry | International Structuring | Foreign Investment | Global Advisory" },
];

const popularSearches = ["Company Law", "Regulatory Compliance", "FEMA & FDI", "Banking & NBFC", "GST", "IPR", "MSME", "Arbitration", "NCLT", "Employment", "RERA", "ESG"];
const featuredAreas = [
  { title: "Technology & Digital", description: "Advisory for AI, data, cybersecurity and digital transformation.", image: "/Banner-Technology, IT & ITES .png" },
  { title: "Financial Services", description: "Regulatory, investment and compliance expertise.", image: "/Banners-Banking, Financial Services & Insurance .png" },
  { title: "Infrastructure & Energy", description: "Project advisory, regulatory approvals and dispute support.", image: "/Banner-Infrastructure & Projects .png" },
  { title: "Healthcare & Life Sciences", description: "Regulatory, compliance and commercial advisory.", image: "/Banner-Healthcare & Medical Scien .png" },
];

const professionals = [
  { name: "Krishna Kumar Mishra", slug: "krishna-kumar-mishra", designation: "Founder Partner", practice: "Corporate, commercial & regulatory advisory", city: "New Delhi", image: "/Professionals/krishna_kumar_mishra.jpeg" },
  { name: "Priti Mishra", slug: "priti-mishra", designation: "Founder Partner", practice: "Litigation, matrimonial matters & compliance", city: "New Delhi", image: "/Professionals/pritimishra.jpeg" },
  { name: "Krishna Nand Mishra", slug: "krishna-nand-mishra", designation: "Professional Team", practice: "Legal, regulatory & business advisory", city: "New Delhi", image: "/Professionals/Krishna_nand.jpeg" },
  { name: "Puneet Kumar Verma", slug: "puneet-kumar-verma", designation: "Professional Team", practice: "Legal, regulatory & business advisory", city: "New Delhi", image: "/Professionals/Puneet_kumar.jpeg" },
];

const explorationGroups = [
  { title: "Explore by Industry", layout: "industry", items: [["Banking & Financial Services", "/Banking & Financial Services .png"], ["Technology & IT", "/Technology, IT & ITES .png"], ["Healthcare & Life Sciences", "/Healthcare & Pharmaceuticals .png"], ["Manufacturing", "/Manufacturing & Industrial .png"]] },
  { title: "Explore by Service", layout: "service", items: [["FEMA / FDI Advisory", "/Banner-Indus- FinTech & Digital Finance .png"], ["Regulatory & Compliance", "/corporate-regulatory-hero.png"], ["Arbitration & Disputes", "/images/services/litigation-and-dispute-resolution.webp"], ["IPR & Registrations", "/Technology&Digital/Banner- Legal Technology .png"]] },
  { title: "Explore by Jurisdiction", layout: "jurisdiction", items: [["India", "/hero_section.png"], ["UAE", "/globalpresence.png"], ["Singapore", "/Banners-Logistics, Transportation & Warehousing .png"], ["United Kingdom", "/about-menu-global-presence.png"]] },
];

const insights = [
  { category: "Legal Update", date: "12 Sep 2026", title: "Key Regulatory Developments in the Financial Services Sector", author: "By Astronis Team", image: "/Banners-Banking, Financial Services & Insurance .png" },
  { category: "Article", date: "05 Sep 2026", title: "AI Regulation in India: Emerging Legal Considerations", author: "By Priti Mishra", image: "/Technology&Digital/Banner- Data, AI & Automation .png" },
  { category: "Case Study", date: "02 Sep 2026", title: "Cross-Border Investment Structuring for a Technology Firm", author: "By Krishna Kumar Mishra", image: "/Banner-Technology, IT & ITES .png" },
  { category: "White Paper", date: "28 Aug 2026", title: "ESG Compliance for Indian Businesses: Legal and Regulatory", author: "By Astronis Team", image: "/Banner-Energy, Power & Renewables .png" },
];

const faqs = [
  ["How do I identify the right professional?", "Use the expertise search to explore practice areas and professionals relevant to your requirement."],
  ["Can my matter involve multiple practice areas?", "Yes. Complex requirements can be supported through an integrated advisory approach across relevant disciplines."],
  ["Can I search by jurisdiction?", "Yes. Use the jurisdiction filter to explore professionals and expertise across locations."],
  ["Do you support cross-border matters?", "Yes. Explore our international and cross-border expertise for global business requirements."],
];

const serviceOptions = ["Corporate & Commercial", "Regulatory & Compliance", "Litigation & Dispute Resolution", "Banking, Finance & Investment", "Tax & Foreign Exchange", "Intellectual Property & Innovation"];
const industryOptions = ["Banking & Financial Services", "Technology & IT", "Healthcare & Life Sciences", "Manufacturing", "Infrastructure & Energy"];
const jurisdictionOptions = ["India", "UAE", "Singapore", "United Kingdom"];
const locationOptions = ["New Delhi", "Mumbai", "Bengaluru", "Across India"];

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">→</span>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return <div className={styles.sectionHeading}><div>{eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}<h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export default function ExpertisePage() {
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("");
  const [service, setService] = useState("");
  const [industry, setIndustry] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [location, setLocation] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const visibleAreas = practiceAreas.filter((area) => {
    if (!filterApplied) return true;
    const haystack = `${area.title} ${area.description}`.toLowerCase();
    return [search, expertise, service, industry, jurisdiction, location].filter(Boolean).every((filter) => haystack.includes(filter.toLowerCase()) || area.title.toLowerCase().includes(filter.toLowerCase()));
  });

  const findExpertise = () => {
    setFilterApplied(true);
    document.getElementById("practice-areas")?.scrollIntoView({ behavior: "smooth" });
  };

  const sendEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const file = values.get("upload");
    const message = `Expertise Required: ${String(values.get("expertise") || "")}\n${String(values.get("message") || "")}${file instanceof File && file.name ? `\nSelected file: ${file.name}` : ""}`;
    setSubmitting(true);
    setFormStatus("");
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        formType: "service", name: values.get("name"), email: values.get("email"), company: values.get("organisation"), phone: values.get("phone"),
        service: values.get("service"), industry: values.get("industry"), country: values.get("jurisdiction"), location: values.get("jurisdiction"), message,
        consent: values.get("consent"), website: "", pageUrl: window.location.href, pathname: window.location.pathname, pageTitle: document.title, referrer: document.referrer,
      }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "We couldn't submit your enquiry.");
      setFormStatus(result.message);
      form.reset();
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "We couldn't submit your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image src="/hero_section.png" alt="A connected global business city" fill priority sizes="100vw" />
        <div className={styles.heroShade} /><div className={styles.heroInner}><div className={styles.heroCopy}>
          <span className={styles.eyebrow}>MULTIDISCIPLINARY EXPERTISE</span><h1>Expertise for Complex<br />Business Challenges.</h1>
          <p>Our multidisciplinary professionals bring together legal, regulatory, corporate, financial, governance and business expertise to address complex requirements across industries and jurisdictions.</p>
          <div className={styles.heroActions}><a className={styles.goldButton} href="#practice-areas">Explore Our Expertise <Arrow /></a><a className={styles.outlineButton} href="#professionals">Find a Professional <Arrow /></a></div>
        </div></div>
      </section>

      <section className={styles.searchPanel} aria-label="Search expertise">
        <div className={styles.searchTitle}>What can we help you with?</div>
        <label className={styles.searchInput}><span className={styles.magnifier} /><input id="expertise-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search expertise, service, business issue or regulatory requirement..." /></label>
        <div className={styles.filters}>
          <select aria-label="Expertise" value={expertise} onChange={(event) => setExpertise(event.target.value)}><option value="">Expertise</option>{practiceAreas.map((area) => <option key={area.title}>{area.title}</option>)}</select>
          <select aria-label="Service" value={service} onChange={(event) => setService(event.target.value)}><option value="">Service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <select aria-label="Industry" value={industry} onChange={(event) => setIndustry(event.target.value)}><option value="">Industry</option>{industryOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <select aria-label="Jurisdiction" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}><option value="">Jurisdiction</option>{jurisdictionOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <select aria-label="Location" value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Location</option>{locationOptions.map((option) => <option key={option}>{option}</option>)}</select>
          <button className={styles.navyButton} type="button" onClick={findExpertise}>Find Expertise <Arrow /></button>
        </div>
        <div className={styles.popular}><strong>Popular Searches:</strong>{popularSearches.map((term) => <button type="button" key={term} onClick={() => { setSearch(term); setExpertise(""); setService(""); setIndustry(""); setJurisdiction(""); setLocation(""); setFilterApplied(true); }}>{term}</button>)}</div>
      </section>

      <div className={styles.content}>
        <section id="practice-areas" className={styles.practiceSection}><SectionHeading eyebrow="OUR EXPERTISE" title="Expertise Across Practice Areas" text="A unified platform of legal, regulatory, financial and business expertise to support your most important decisions." />
          <div className={styles.practiceGrid}>{visibleAreas.map((area) => <article className={styles.practiceCard} key={area.title}>
            <div className={styles.practiceImage}><Image src={area.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1050px) 33vw, 20vw" /></div>
            <div className={styles.practiceBody}><span className={styles.practiceNumber}>{String(practiceAreas.indexOf(area) + 1).padStart(2, "0")}</span><h3>{area.title}</h3><p>{area.description}</p><Link href="/services">Explore Expertise <Arrow /></Link></div>
          </article>)}{visibleAreas.length === 0 && <p className={styles.noResults}>No matching expertise.</p>}</div>
        </section>

        <section className={styles.featuredSection}><SectionHeading eyebrow="FEATURED EXPERTISE" title="Expertise in Focus" text="Sector-relevant expertise to help you navigate opportunities, risks and regulatory change." />
          <div className={styles.featuredGrid}>{featuredAreas.map((area) => <article className={styles.featuredCard} key={area.title}><div className={styles.featuredImage}><Image src={area.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 25vw" /></div><div className={styles.featuredBody}><h3>{area.title}</h3><p>{area.description}</p><Link href="/professionals">Meet Our Experts <Arrow /></Link></div></article>)}</div>
        </section>

        <section id="professionals" className={styles.professionalsSection}>
          <div className={styles.professionalHeading}><h2>Our Legal Professionals</h2><span>{professionals.length} profiles</span></div>
          <div className={styles.professionalGrid}>{professionals.map((person) => <article className={styles.professionalCard} key={person.slug}>
            <div className={styles.professionalPhoto}><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" /></div>
            <div className={styles.professionalInfo}><h3>{person.name}</h3><span>{person.designation}</span><p>{person.practice}</p><small><span aria-hidden="true">⌖</span>{person.city}</small><Link className={styles.profileLink} href={`/professionals/${person.slug}`}>View Profile <Arrow /></Link></div>
          </article>)}</div>
        </section>

        <section className={styles.exploreGrid}>{explorationGroups.map((group) => <div className={`${styles.exploreColumn} ${group.layout === "service" ? styles.serviceGroup : ""} ${group.layout === "industry" ? styles.industryGroup : ""} ${group.layout === "jurisdiction" ? styles.jurisdictionGroup : ""}`} key={group.title}>
          <h2>{group.title}</h2><p>{group.title === "Explore by Industry" ? "Discover professionals with relevant sector experience." : group.title === "Explore by Service" ? "Find professionals for specific services and requirements." : "Professionals with experience across key jurisdictions."}</p>
          <div className={styles.exploreTiles}>{group.items.map(([title, image]) => <Link href={group.title === "Explore by Industry" ? "/industries" : group.title === "Explore by Service" ? "/services" : "/global-presence"} className={styles.exploreTile} key={title}><Image src={image} alt="" fill sizes="(max-width: 640px) 50vw, 15vw" /><span>{title}</span></Link>)}</div>
          <Link className={styles.exploreAll} href={group.title === "Explore by Industry" ? "/industries" : group.title === "Explore by Service" ? "/services" : "/global-presence"}>{group.title === "Explore by Industry" ? "Explore All Industries" : group.title === "Explore by Service" ? "Explore All Services" : "Explore All Jurisdictions"} <Arrow /></Link>
        </div>)}</section>

        <section className={styles.advisorySection}><div className={styles.advisoryCopy}><h2>One Requirement. Multiple Perspectives.</h2><p>Complex business requirements often require a combination of legal, regulatory, financial and strategic expertise.</p><a href="#enquiry" className={styles.advisoryButton}>Explore Our Integrated Advisory Model <Arrow /></a></div>
          <div className={styles.advisoryDiagram} aria-label="Integrated advisory across five disciplines"><span className={`${styles.orbitLabel} ${styles.legal}`}>Legal</span><span className={`${styles.orbitLabel} ${styles.regulatory}`}>Regulatory</span><span className={`${styles.orbitLabel} ${styles.financial}`}>Financial</span><span className={`${styles.orbitLabel} ${styles.governance}`}>Governance &amp; Risk</span><span className={`${styles.orbitLabel} ${styles.strategy}`}>Business &amp; Strategy</span><span className={styles.diagramCenter}>INTEGRATED<br />ADVISORY</span></div>
        </section>

        <section className={styles.insightsSection}><SectionHeading title="Insights by Our Professionals" text="Perspectives, analysis and updates from our multidisciplinary professionals." /><Link className={styles.viewInsights} href="/insights">View All Insights <Arrow /></Link>
          <div className={styles.insightsGrid}>{insights.map((insight) => <article className={styles.insightCard} key={insight.title}><div className={styles.insightImage}><Image src={insight.image} alt="" fill sizes="(max-width: 650px) 100vw, 25vw" /></div><div className={styles.insightCopy}><div className={styles.insightMeta}><span>{insight.category}</span><time>{insight.date}</time></div><h3>{insight.title}</h3><small>{insight.author}</small><Link href="/insights">Read Insight <Arrow /></Link></div></article>)}</div>
        </section>
      </div>

      <section className={styles.faqSection}>
        <div className={styles.faqGrid}>
          <div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2>Frequently Asked Questions</h2><p>Clear guidance on finding the right expertise, working across practice areas and navigating our services.</p><Link href="/faqs">View All FAQs <Arrow /></Link></div>
          <div className={styles.faqList}>{faqs.map(([question, answer], index) => <div className={styles.faqItem} key={question}><button type="button" aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? null : index)}>{question}<span aria-hidden="true">{faqOpen === index ? "−" : "+"}</span></button>{faqOpen === index && <p>{answer}</p>}</div>)}</div>
        </div>
      </section>

      <section id="enquiry" className={styles.enquirySection}>
        <div className={styles.enquiryGrid}>
          <div className={styles.enquiryCopy}>
            <span className={styles.eyebrow}>Let&apos;s find the right fit</span>
            <h2>Find the Right Professional for Your Requirement</h2>
            <p>Share your requirement and we will connect you with the most relevant professional.</p>
            <div className={styles.enquiryImage}><Image src="/professional-collaboration-hero.png" alt="Multidisciplinary professionals working together" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
            <a href="tel:+919311664455">+91 93116 64455</a>
            <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a>
          </div>
          <div className={styles.formPanel}>
            <span className={styles.eyebrow}>Start a conversation</span>
            <h3>Tell us about your requirement.</h3>
            <p>Share a few details and our team will get in touch to discuss your needs.</p>
            <form className={styles.enquiryForm} onSubmit={sendEnquiry}>
              <label>Name *<input name="name" autoComplete="name" placeholder="Your Name" required /></label><label>Organisation *<input name="organisation" autoComplete="organization" placeholder="Company / Organisation" required /></label><label>Email *<input name="email" type="email" autoComplete="email" placeholder="Your Email" required /></label><label>Phone *<input name="phone" type="tel" autoComplete="tel" placeholder="Your Phone" required /></label>
              <label>Expertise Required *<select name="expertise" required defaultValue=""><option value="" disabled>Select Expertise</option>{practiceAreas.map((area) => <option key={area.title}>{area.title}</option>)}</select></label><label>Service<select name="service" required defaultValue=""><option value="" disabled>Select Service</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>Industry<select name="industry" defaultValue=""><option value="">Select Industry</option>{industryOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>Jurisdiction<select name="jurisdiction" defaultValue=""><option value="" disabled>Select Jurisdiction</option>{jurisdictionOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className={styles.requirementField}>Brief Description of Requirement *<textarea name="message" placeholder="Tell us about your requirement" required minLength={10} /></label><label className={styles.uploadField}>Upload Supporting Document<input name="upload" type="file" accept=".pdf,.doc,.docx" /><small>PDF, DOC, image · Max 5 MB</small></label>
              <label className={styles.consent}><input type="checkbox" name="consent" value="yes" required /><span>I consent to Astronis Global processing the information submitted for responding to this enquiry.</span></label><button className={styles.navyButton} type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Enquiry"} <Arrow /></button>
              {formStatus && <p className={styles.formStatus} role="status">{formStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      <section className={styles.footerCta}><div className={styles.footerCtaInner}><div><h2>Complex Requirements Need the Right Expertise.</h2><p>Connect with professionals who understand the legal, regulatory, commercial and industry dimensions of your requirement.</p></div><div className={styles.footerActions}><a className={styles.goldButton} href="#professionals">Find a Professional <Arrow /></a><a className={styles.outlineButton} href="#enquiry">Submit an Enquiry <Arrow /></a></div></div></section>
    </div>
  );
}