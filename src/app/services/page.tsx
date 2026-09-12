import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import { industries, practices, serviceGroups } from "@/content/site";
import FAQ from "../home/faq";
import Insights from "../home/insights";
import SuccessStories from "../home/success-stories";
import EnquiryForm from "../contact/enquiry-form";
import ServiceDirectory from "./service-directory";
import styles from "./services.module.css";

export const metadata = { title: "Services", description: "Explore Astronis Global’s corporate, legal, regulatory and business advisory services. Integrated expertise for every stage of your business." };
const banners: Record<string, string> = {
  "corporate-advisory": "Part-10 .png", "regulatory-and-compliance": "overnment, Public Sector & Institutions .png",
  "litigation-and-dispute-resolution": "Part-6 .png", "business-advisory": "Professional & Business Services .png",
  "licensing-and-registrations": "Part-18 .png", "intellectual-property": "Technology, IT & ITES .png",
  "foreign-investment": "Part-9 .png", "taxation-and-compliance": "Banking & Financial Services .png",
  "business-formation": "Part-11 .png", "startup-advisory": "Startups & Emerging Businesses .png",
  "banking-rbi-nbfc": "Banking & Financial Services1 .png", contracts: "Part-14 .png", "corporate-transactions": "Part-16 .png",
};
const categories = [...practices, ...serviceGroups.filter(g => !practices.some(p => p.slug === g.slug)).map(g => ({ slug: g.slug, title: g.slug === "banking-rbi-nbfc" ? "Banking, RBI & NBFC" : g.title, description: `Specialist support for ${g.items.slice(0, 3).join(", ").toLowerCase()} and more.` }))];
const featured = [
  { title: "Mergers & Acquisitions", description: "Strategic guidance for transformational transactions.", slug: "corporate-transactions/manda", image: "Part-16 .png" },
  { title: "Corporate Restructuring", description: "Reshape your business for efficiency and growth.", slug: "corporate-advisory/corporate-restructuring", image: "Part-10 .png" },
  { title: "Joint Ventures", description: "Build partnerships with a shared vision for success.", slug: "corporate-advisory/joint-ventures", image: "Part-9 .png" },
  { title: "Commercial Contracts", description: "Clarity and protection in every business agreement.", slug: "contracts/commercial-contracts", image: "Part-14 .png" },
  { title: "Data Protection", description: "Strengthen trust through responsible data practices.", slug: "regulatory-and-compliance/data-protection", image: "Technology, IT & ITES .png" },
];
const steps = [["search", "Understand", "Your business & objectives"], ["chart", "Analyse", "Opportunities & risks"], ["bulb", "Strategise", "Practical solutions"], ["people", "Implement", "End-to-end support"], ["shield", "Deliver", "Long-term value"]];
function Action({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) { return <Link href="/contact" className={`${styles.action} ${outline ? styles.outline : ""}`}>{children}<Icon name="arrow" /></Link>; }
function Card({ title, description, slug, image }: { title: string; description: string; slug: string; image: string }) { return <Link href={`/services/${slug}`} className={styles.card}><div className={styles.cardImage}><Image src={`/${image}`} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div><div className={styles.cardBody}><h3>{title}</h3><p>{description}</p><span className={styles.cardLink}>Explore service <Icon name="arrow" /></span></div></Link>; }
export default function ServicesPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <Image src="/Part-6 .png" alt="" fill preload sizes="100vw" className={styles.heroImage} />
      <div className={`container ${styles.heroContent}`}><nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><span aria-current="page">Services</span></nav><span className={styles.eyebrow}>EXPERTISE THAT MOVES YOU FORWARD</span><h1>Our Services</h1><p className={styles.tagline}>Comprehensive. Integrated. Future-focused.</p><p className={styles.intro}>Legal clarity. Regulatory confidence. Business progress. We bring the right expertise together to help you navigate complexity and unlock your next opportunity.</p><Action>Speak to an Advisor</Action></div>
    </section>
    <section className={styles.section} aria-labelledby="categories-title"><div className="container"><div className={styles.sectionTop}><div><span className={styles.eyebrow}>OUR EXPERTISE</span><h2 id="categories-title">Explore Our Service Categories</h2></div><Link href="#all-services" className={styles.textLink}>Browse all services <Icon name="arrow" /></Link></div><div className={styles.categoryGrid}>{categories.map(s => <Card key={s.slug} {...s} image={banners[s.slug] || "Part-10 .png"} />)}</div></div></section>
    <section className={styles.solution}><Image src="/Real Estate & Construction .png" alt="" fill sizes="100vw" /><div className={`container ${styles.solutionContent}`}><span className={styles.eyebrow}>ONE PARTNER. A BROADER PERSPECTIVE.</span><h2>Integrated Solutions for<br />a Complex World</h2><p>We connect legal, regulatory and commercial expertise to deliver practical advice that works for your business.</p><Action>Discuss Your Requirements</Action></div></section>
    <section className={styles.approach} aria-labelledby="approach-title"><div className={`container ${styles.approachInner}`}><div><span className={styles.eyebrow}>OUR SERVICE APPROACH</span><h2 id="approach-title">From Insight<br />to Impact</h2><p>A clear path from understanding your challenge to putting the right solution into action.</p></div><ol className={styles.steps}>{steps.map(([icon, title, text], i) => <li key={title}><Icon name={icon} /><span className={styles.stepNumber}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
    <section className={`${styles.section} ${styles.featured}`} aria-labelledby="featured-title"><div className="container"><div className={styles.sectionTop}><div><span className={styles.eyebrow}>SUPPORT AT EVERY MILESTONE</span><h2 id="featured-title">Featured Services</h2></div><Link href="#all-services" className={styles.textLink}>View all services <Icon name="arrow" /></Link></div><div className={styles.featuredGrid}>{featured.map(s => <Card key={s.slug} {...s} />)}</div></div></section>
    <section className={styles.section}><div className="container"><div className={styles.sectionTop}><div><span className={styles.eyebrow}>SECTOR-SPECIFIC PERSPECTIVE</span><h2>Expertise Across Industries</h2></div><Link href="/industries" className={styles.textLink}>All industries <Icon name="arrow" /></Link></div><div className={styles.industryGrid}>{[industries[0], industries[1], industries[3], industries[4], industries[5], industries[2]].map(s => <Link href={`/industries/${s.slug}`} key={s.slug}><div className={styles.industryImage}><Image src={s.image} alt="" fill sizes="(max-width: 600px) 50vw, 16vw" /></div><h3>{s.title}</h3></Link>)}</div></div></section>
    <section id="all-services" className={styles.fullDirectory}><div className="container"><details><summary>Explore the complete service directory <Icon name="chevron" /></summary><ServiceDirectory /></details></div></section>
    <Insights />
    <SuccessStories />
    <FAQ />
    <section className="section service-consultation">
      <div className="container">
        <h2 className="service-consultation-title">Request a Service Consultation</h2>
        <div className="service-consultation-shell">
          <aside className="service-consultation-side">
            <h3>LET’S DISCUSS YOUR MATTER.</h3>
            <p>
              Share the nature of your requirement and our team will connect with
              you to understand the right approach for your business.
            </p>
            <div className="service-consultation-points">
              <p>Corporate, regulatory and commercial advisory</p>
              <p>End-to-end support from consultation to implementation</p>
              <p>Advice tailored to your industry, business model and jurisdiction</p>
            </div>
            <a href="tel:+919311664455" className="service-call-button" aria-label="Call Astronis Global">
              <Icon name="phone" />
            </a>
          </aside>
          <div className="service-consultation-form-wrap">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
    <section className={styles.contact}><div className={`container ${styles.contactInner}`}><div><span className={styles.eyebrow}>LET’S MOVE FORWARD, TOGETHER</span><h2>Find the Right Solution for You</h2><p>Tell us what your business needs. We’ll help you take the next step.</p></div><div className={styles.actions}><Action>Speak to an Advisor</Action><Action outline>Submit an Enquiry</Action></div></div></section>
  </div>;
}

