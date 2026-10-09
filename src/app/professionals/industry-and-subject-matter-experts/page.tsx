import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import { professionals } from "../leadership";
import IndustryExplorer from "./industry-explorer";
import ProfessionalsCarousel from "./professionals-carousel";
import styles from "./industry-experts.module.css";

export const metadata: Metadata = {
  title: "Experts by Industry",
  description:
    "Connect with industry-focused professionals providing legal, regulatory and business advisory expertise across key sectors.",
};

const industries = [
  { title: "Banking, Finance & Insurance", image: "/Banners-Banking, Financial Services & Insurance .png", href: "/industries/financial-services", searchTerms: "financial services banking regulatory compliance transactions risk governance tax india" },
  { title: "FinTech & Digital Finance", image: "/Banner-Indus- FinTech & Digital Finance .png", href: "/industries/fintech-and-digital-finance", searchTerms: "financial services banking technology regulatory compliance transactions digital india" },
  { title: "Technology & IT", image: "/Banner-Technology, IT & ITES .png", href: "/industries/it-and-ites", searchTerms: "digital technology regulatory compliance risk governance corporate india" },
  { title: "Artificial Intelligence", image: "/Banner - Indus - Artificial Intelligence .png", href: "/industries/artificial-intelligence", searchTerms: "technology digital regulatory compliance intellectual property india" },
  { title: "E-Commerce & Digital Businesses", image: "/Banner-E-Commerce & Digital Platforms .png", href: "/industries/e-commerce", searchTerms: "digital technology retail consumer regulatory compliance transactions india" },
  { title: "Manufacturing", image: "/Manufacturing & Industrial .png", href: "/industries/manufacturing", searchTerms: "industrial transactions structuring licensing approvals risk governance tax india" },
  { title: "Automobile & Automotive", image: "/Banner-Automotive & Mobility .png", href: "/industries/automotive-and-mobility", searchTerms: "automotive technology manufacturing transactions compliance india" },
  { title: "Infrastructure", image: "/Banner-Infrastructure & Projects .png", href: "/industries/infrastructure", searchTerms: "projects transactions structuring licensing approvals risk governance india" },
  { title: "Energy", image: "/Banner-Energy, Power & Renewables .png", href: "/industries/renewable-energy", searchTerms: "energy infrastructure regulatory compliance transactions risk governance india" },
  { title: "Mining & Natural Resources", image: "/Banner-Mining, Metals & Natural Resources .png", href: "/industries/mining-metals-and-natural-resources", searchTerms: "mining natural resources infrastructure licensing approvals risk governance india" },
  { title: "Logistics & Supply Chain", image: "/Banners-Logistics, Transportation & Warehousing .png", href: "/industries/logistics", searchTerms: "transportation infrastructure transactions compliance technology india" },
  { title: "Retail & Consumer", image: "/Banner- Indus- Retail & Consumer .png", href: "/industries/retail-and-consumer", searchTerms: "consumer retail e-commerce digital compliance transactions india" },
  { title: "Healthcare & Life Sciences", image: "/Banner-Healthcare & Medical Scien .png", href: "/industries/healthcare-and-pharma", searchTerms: "healthcare life sciences regulatory compliance licensing approvals india" },
  { title: "Pharmaceuticals, Food & Drugs", image: "/Banner-Pharmaceuticals, Food & Drugs .png", href: "/industries/healthcare-and-pharma", searchTerms: "pharmaceuticals healthcare regulatory compliance licensing approvals india" },
  { title: "Real Estate & Construction", image: "/Real Estate & Construction .png", href: "/industries/real-estate-and-construction", searchTerms: "real estate construction transactions structuring disputes compliance india" },
  { title: "Hospitality", image: "/Banners-hospitality, Travel & Touris .png", href: "/industries/hospitality", searchTerms: "hospitality travel tourism licensing approvals transactions india" },
  { title: "Media & Broadcasting", image: "/Banner-Media, Entertainment & Broadcasting .png", href: "/industries/media-and-entertainment", searchTerms: "media entertainment broadcasting technology intellectual property india" },
  { title: "Education & HR", image: "/Banner-Education & EdTech .png", href: "/industries/education", searchTerms: "education employment human resources regulatory compliance licensing india" },
  { title: "Agriculture & Agri-Business", image: "/Banner-Agriculture & Agri-Business .png", href: "/industries/agriculture-and-agri-business", searchTerms: "agriculture food regulatory compliance transactions india" },
  { title: "Aviation, Aerospace & Defence", image: "/Banner-Indus- Aviation, Aerospace & Defence .png", href: "/industries/aviation-aerospace-and-defence", searchTerms: "aviation aerospace defence regulatory compliance licensing international india" },
  { title: "Print & Electronic Media", image: "/Banner-Media, Entertainment & Broadcasting .png", href: "/industries/media-and-entertainment", searchTerms: "print electronic media broadcasting technology intellectual property india" },
  { title: "Consumer & Life Sciences", image: "/Banner-Consumer & Life Sciences .png", href: "/industries/healthcare-and-pharma", searchTerms: "consumer life sciences healthcare regulatory compliance india" },
  { title: "Government & Public Sector", image: "/Banner-Government, Public Sector  Institutions .png", href: "/industries/government-and-public-sector", searchTerms: "government public sector infrastructure regulatory compliance india" },
  { title: "Environmental & Sustainability", image: "/Banner-Energy, Power & Renewables .png", href: "/industries/renewable-energy", searchTerms: "environment sustainability energy regulatory compliance risk governance india" },
] as const;

const featuredIndustries = [
  { title: "FinTech & Digital Finance", description: <>Regulatory, investment, technology<br />and digital business expertise.</>, image: "/Banner-Indus- FinTech & Digital Finance .png", href: "/industries/fintech-and-digital-finance", link: "Meet FinTech Professionals" },
  { title: "Aviation, Aerospace & Defence", description: <>Regulatory, commercial, procurement<br />and strategic sector capabilities.</>, image: "/Banner-Indus- Aviation, Aerospace & Defence .png", href: "/industries/aviation-aerospace-and-defence", link: "Meet Sector Professionals" },
  { title: "Artificial Intelligence", description: <>AI governance, data, intellectual<br />property and technology advisory.</>, image: "/Banner - Indus - Artificial Intelligence .png", href: "/industries/artificial-intelligence", link: "Meet AI Professionals" },
  { title: "Healthcare & Life Sciences", description: <>Regulatory, compliance and<br />commercial advisory.</>, image: "/Banner-Healthcare & Medical Scien .png", href: "/industries/healthcare-and-pharma", link: "Meet Healthcare Professionals" },
] as const;

const capabilities = [
  ["shield", "Regulatory & Compliance", "/services/regulatory-and-compliance"],
  ["file", "Licensing & Approvals", "/services/licensing-registrations"],
  ["building", "Transactions & Structuring", "/services/corporate-and-commercial-advisory"],
  ["gear", "Risk & Governance", "/services/risk-governance-and-forensic-advisory"],
  ["scale", "Disputes & Resolution", "/services/litigation-dispute-resolution"],
  ["laptop", "Technology & Digital Advisory", "/technology-and-digital-solutions"],
  ["chart", "Tax & Foreign Exchange", "/services/taxation-compliance"],
  ["globe", "International Expansion", "/professionals/international-network"],
] as const;

const insights = [
  { category: "Legal Update", title: "RBI Issues New Guidelines for Digital Lending Platforms", author: "By Astronis Team", date: "12 Sep 2026", image: "/Banner-Indus- FinTech & Digital Finance .png", href: "/insights" },
  { category: "Article", title: "Regulatory Considerations for the AI Sector in India", author: "By Priti Mishra", date: "08 Sep 2026", image: "/Banner - Indus - Artificial Intelligence .png", href: "/insights" },
  { category: "Case Study", title: "Cross-Border Structuring for a Manufacturing Group", author: "By Krishna Kumar Mishra", date: "02 Sep 2026", image: "/Manufacturing & Industrial .png", href: "/insights" },
  { category: "White Paper", title: "ESG Compliance for Industrial and Infrastructure Projects", author: "By Astronis Team", date: "28 Aug 2026", image: "/Banner-Infrastructure & Projects .png", href: "/insights" },
] as const;

export default function IndustryExpertsPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="industry-title">
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/professionals">Professionals</Link><span aria-hidden="true">›</span><span aria-current="page">Experts by Industry</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Industry Expertise</span><h1 id="industry-title">Professionals Who<br />Understand Your Industry.</h1><p>Industry knowledge is essential to effective legal, regulatory and business advice. Our professionals combine multidisciplinary expertise with an understanding of sector-specific regulations, commercial structures and emerging opportunities.</p><div className={styles.heroActions}><a className={styles.goldButton} href="#industries">Find Your Industry <Icon name="arrow" /></a><a className={styles.outlineButton} href="#professionals">Find a Professional <Icon name="arrow" /></a></div></div>
        <div className={styles.heroCollage} aria-label="Industry sectors including aviation, infrastructure, manufacturing and healthcare">
          <Image src="/images/india-presence/mumbai.jpg" alt="Commercial city skyline" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          <div><Image src="/Banner-Indus- Aviation, Aerospace & Defence .png" alt="Aviation and aerospace industry" fill sizes="(max-width: 760px) 50vw, 25vw" /></div>
          <div><Image src="/Banner-Infrastructure & Projects .png" alt="Infrastructure and industrial projects" fill sizes="(max-width: 760px) 50vw, 25vw" /></div>
          <div><Image src="/Banner-Healthcare & Medical Scien .png" alt="Healthcare and life sciences" fill sizes="(max-width: 760px) 50vw, 25vw" /></div>
        </div>
      </div>
    </section>

    <IndustryExplorer items={industries} />

    <section className={styles.featuredSection} aria-labelledby="featured-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Featured Industries</span><h2 id="featured-title">Industry Expertise in Focus.</h2></div><p>Selected sectors where our professionals are actively advising on key regulatory, commercial and strategic matters.</p></div>
        <div className={styles.featuredGrid}>{featuredIndustries.map((industry) => <article className={styles.featuredCard} key={industry.title}><Link className={styles.featuredImage} href={industry.href}><Image src={industry.image} alt={industry.title} fill sizes="(max-width: 760px) 50vw, 25vw" /></Link><div><h3>{industry.title}</h3><p>{industry.description}</p><Link href={industry.href}>{industry.link} <Icon name="arrow" /></Link></div></article>)}</div>
      </div>
    </section>

    <section className={styles.professionalsSection} id="professionals" aria-labelledby="professionals-title">
      <div className={styles.wrap}>
        <div className={`${styles.sectionHeading} ${styles.professionalHeading}`}><h2 id="professionals-title">Our Legal Professionals</h2><span>{professionals.length} profiles</span></div>
        <ProfessionalsCarousel people={professionals} />
      </div>
    </section>

    <section className={styles.capabilitiesSection} aria-labelledby="capabilities-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Key Capabilities for This Industry</span><h2 id="capabilities-title">How We Support Your Industry.</h2></div><p>End-to-end legal, regulatory and business advisory support tailored to the sector&apos;s unique requirements.</p></div>
        <div className={styles.capabilityGrid}>{capabilities.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div>
      </div>
    </section>

    <section className={styles.insightsSection} aria-labelledby="insights-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Industry Insights</span><h2 id="insights-title">Latest Thinking for Your Industry.</h2></div><p>Perspectives, analysis and updates from our professionals.</p><Link href="/insights">View All Insights <Icon name="arrow" /></Link></div>
        <div className={styles.insightGrid}>{insights.map((insight) => <article className={styles.insightCard} key={insight.title}><Link className={styles.insightImage} href={insight.href}><Image src={insight.image} alt="" fill sizes="(max-width: 650px) 50vw, 25vw" /></Link><div><div className={styles.insightMeta}><span>{insight.category}</span><time>{insight.date}</time></div><h3>{insight.title}</h3><p>{insight.author}</p><Link href={insight.href}>Read Insight <Icon name="arrow" /></Link></div></article>)}</div>
      </div>
    </section>

    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}><div><h2>Sector Knowledge. Multidisciplinary Expertise.</h2><p>Connect with professionals who understand your industry&apos;s legal, regulatory, commercial and strategic requirements.</p></div><div className={styles.ctaActions}><a className={styles.goldButton} href="#industries">Find Your Industry Expert <Icon name="arrow" /></a><Link className={styles.outlineButton} href="/professionals/enquiry">Submit an Enquiry <Icon name="arrow" /></Link></div></div>
    </section>
  </div>;
}
