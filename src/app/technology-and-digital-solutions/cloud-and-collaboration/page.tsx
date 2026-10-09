import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import TechnologyEnquiryForm from "@/components/forms/TechnologyEnquiryForm";
import { professionals } from "@/app/professionals/leadership";
import { cloudCollaborationInsights, cloudCollaborationPath, digitalBusinessPath } from "@/content/digital-solutions";
import { dataAiPath } from "@/content/data-ai-solutions";
import { regtechPath } from "@/content/regtech-solutions";
import { cybersecurityReadinessPath } from "@/content/digital-solutions";
import sharedStyles from "../digital-business-solutions/digital-business.module.css";
import regtechStyles from "../regtech-and-compliance-technology/regtech.module.css";
import clientStyles from "../client-enterprise-portals/client-enterprise-portals.module.css";
import cloudStyles from "./cloud-and-collaboration.module.css";

const styleKeys = [...new Set([...Object.keys(sharedStyles), ...Object.keys(regtechStyles), ...Object.keys(cloudStyles)])];
const styles = Object.fromEntries(styleKeys.map((key) => [key, [sharedStyles[key], regtechStyles[key], cloudStyles[key]].filter(Boolean).join(" ")])) as Record<string, string>;

export const metadata: Metadata = {
  title: "Cloud & Digital Infrastructure | ASTRONIS Global",
  description: "We help businesses modernise their IT infrastructure, migrate to the cloud and build resilient, high-performance digital environments.",
  alternates: { canonical: cloudCollaborationPath },
  openGraph: {
    title: "Cloud & Digital Infrastructure | ASTRONIS Global",
    description: "We help businesses modernise their IT infrastructure, migrate to the cloud and build resilient, high-performance digital environments.",
    url: cloudCollaborationPath,
    type: "website",
  },
};

const features = [
  ["cloud", "Greater Scalability"],
  ["gear", "Improved Operational Efficiency"],
  ["shield", "Enhanced Security & Resilience"],
  ["percent", "Optimised Cost Management"],
  ["people", "Enable Business Innovation"],
  ["chart", "Support Future Growth"],
] as const;

const solutions = [
  { title: "Cloud Strategy & Advisory", description: "Define the right cloud strategy for your business goals.", image: "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png", detail: "Define the right cloud strategy for your business goals." },
  { title: "Cloud Migration", description: "Plan and execute secure and seamless migration to cloud environments.", image: "/Technology, IT & ITES .png", detail: "Plan and execute secure and seamless migration to cloud environments." },
  { title: "Infrastructure Modernisation", description: "Upgrade legacy systems for better performance and reliability.", image: "/Banner-Technology, IT & ITES .png", detail: "Upgrade legacy systems for better performance and reliability." },
  { title: "Hybrid & Multi-Cloud Solutions", description: "Design and manage flexible, hybrid and multi-cloud architectures.", image: "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png", detail: "Design and manage flexible, hybrid and multi-cloud architectures." },
  { title: "Managed Infrastructure Services", description: "Ensure continuous monitoring, maintenance and support.", image: "/Technology&Digital/Banner-Technology & Digital.png", detail: "Ensure continuous monitoring, maintenance and support." },
  { title: "Green & Sustainable IT Infrastructure", description: "Build energy-efficient and environmentally responsible systems.", image: "/nergy, Power & Renewables .png", detail: "Build energy-efficient and environmentally responsible systems." },
] as const;

const benefits = [
  "Higher system reliability",
  "Improved performance and speed",
  "Reduced infrastructure costs",
  "Enhanced data security",
  "Scalable for future growth",
  "Support for digital transformation",
];

const steps = [
  ["Assess", "Evaluate your current infrastructure and goals", "search"],
  ["Design", "Create a customised implementation roadmap", "gear"],
  ["Implement", "Deploy and integrate digital solutions within minimal disruption", "network"],
  ["Optimise", "Monitor, refine and enhance performance", "chart"],
  ["Support", "Provide ongoing management and assistance", "cloud"],
] as const;

const industries = [
  ["building", "Banking & Financial Services", "/industries/financial-services"],
  ["shield", "Healthcare & Life Sciences", "/industries/healthcare-and-pharma"],
  ["gear", "Manufacturing", "/industries/manufacturing"],
  ["building", "Real Estate & Construction", "/industries/real-estate-and-construction"],
  ["laptop", "Technology & E-Commerce", "/industries/it-and-ites"],
  ["document", "Education & Skill Development", "/industries/education"],
] as const;

const related = [
  ["Digital Business Solutions", digitalBusinessPath],
  ["Data, AI & Automation", dataAiPath],
  ["Cybersecurity & Data Protection", cybersecurityReadinessPath],
  ["RegTech & Compliance Technology", regtechPath],
  ["Managed Services Advisory", "/services/technology-privacy-digital"],
  ["IT Strategy & Governance", "/industries/it-and-ites"],
] as const;

const faqs = [
  ["Which cloud platform is right for my business?", ""],
  ["How do you ensure data security in the cloud?", ""],
  ["Can you help migrate our existing infrastructure?", ""],
  ["Do you provide ongoing managed services?", ""],
  ["How do you ensure minimal disruption during implementation?", ""],
] as const;

const specialistCaptions: Record<string, readonly [string, string]> = {
  "krishna-kumar-mishra": ["Founder Partner", "Technology Advisory | Digital Transformation"],
  "priti-mishra": ["Partner", "Cloud & Infrastructure | Risk & Compliance"],
};

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

function ClientTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={clientStyles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

export default function CloudCollaborationPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="cloud-title">
      <AssetImage src="/Technology&Digital/Banner- Cloud & Digital Infrastructure .png" alt="Cloud infrastructure supporting a connected enterprise workplace" fill preload sizes="100vw" />
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/technology-and-digital-solutions">Technology &amp; Digital Solutions</Link><span aria-hidden="true">›</span><span aria-current="page">Cloud &amp; Digital Infrastructure</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Cloud &amp; Digital Infrastructure</span><h1 id="cloud-title">A Stronger<br />Foundation for<br />What&apos;s Next.</h1><p className={styles.tagline}>Secure. Scalable. Future-Ready.</p><p>We help businesses modernise their IT infrastructure, migrate to the cloud and build resilient, high-performance digital environments.</p><Link className={styles.button} href="#solutions">Discuss Your Infrastructure Needs <Icon name="arrow" /></Link></div>
        <aside className={styles.motto}>Scalable.<br />Technology.<br />Stronger.<br />Businesses.<span>Astronis<br />Global.</span></aside>
      </div>
    </section>

    <section className={styles.challengeSection} aria-labelledby="cloud-matters-title"><div className={`${styles.wrap} ${styles.challenges}`}><div><h2 id="cloud-matters-title">Why Cloud &amp; Digital<br />Infrastructure Matters</h2><p>A modern, secure and scalable infrastructure is essential for business continuity, operational efficiency and long-term growth within a digital-first world.</p><TextLink href="#approach">Explore Our Approach</TextLink></div><div className={styles.challengeItems}>{features.map(([icon, title]) => <div key={title}><Icon name={icon} /><h3>{title}</h3></div>)}</div></div></section>

    <section className={`${styles.wrap} ${styles.section}`} id="solutions"><div className={styles.sectionHeading}><h2>Our Cloud &amp; Digital Infrastructure Solutions</h2><TextLink href="#enquiry">Explore All Solutions</TextLink></div><div className={styles.solutions}>{solutions.map((solution) => <article className={styles.card} key={solution.title}><div className={styles.solutionImage}><AssetImage src={solution.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1000px) 30vw, 16vw" /></div><div className={styles.cardBody}><h3>{solution.title}</h3><p>{solution.description}</p><TextLink href="#enquiry">Learn More</TextLink></div></article>)}</div></section>

    <section className={styles.implementation} id="approach"><div className={styles.benefits}><h2>Business Benefits</h2><ul>{benefits.map((benefit) => <li key={benefit}><Icon name="shield" />{benefit}</li>)}</ul></div><div className={styles.steps}><h2>Our Implementation Approach</h2><ol>{steps.map(([title, description, icon], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><Icon className={styles.stepIcon} name={icon} /><h3>{title}</h3><p>{description}</p></li>)}</ol></div><div className={styles.approachImage}><AssetImage src="/images/india-presence/mumbai.jpg" alt="Modern commercial infrastructure" fill sizes="20vw" /><span>Modern<br />Infrastructure<br />For a Brighter<br />Tomorrow.</span></div></section>

    <div className={`${styles.wrap} ${styles.connections}`}><section><div className={styles.sectionHeading}><h2>Industries We Support</h2><TextLink href="/industries">View All Industries</TextLink></div><div className={styles.industries}>{industries.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span></Link>)}</div></section><section><div className={styles.sectionHeading}><h2>Related Solutions</h2><TextLink href="/technology-and-digital-solutions">View All Solutions</TextLink></div><div className={styles.related}>{related.map(([title, href]) => <Link href={href} key={title}><Icon name="arrow" />{title}</Link>)}</div></section></div>

    <section className={clientStyles.specialistsSection}>
      <div className={clientStyles.wrap}>
        <div className={clientStyles.sectionHeading}><div><span className={clientStyles.eyebrow}>Connected expertise</span><h2>Our Technology Specialists</h2></div><ClientTextLink href="/professionals">View All Professionals</ClientTextLink></div>
        <div className={clientStyles.specialistGrid}>
          {professionals.slice(0, 2).map((person) => {
            const [role, caption] = specialistCaptions[person.slug] ?? [person.role, person.expertise];
            return <Link className={clientStyles.specialistCard} href={`/professionals/${person.slug}`} key={person.slug}>
              <div className={clientStyles.specialistPhoto}><AssetImage src={person.image} alt={person.name} fill sizes="(max-width: 800px) 40vw, 180px" /></div>
              <div><h3>{person.name}</h3><span>{role}</span><p>{caption}</p><small>View Profile <Icon name="arrow" /></small></div>
            </Link>;
          })}
          <Link className={clientStyles.extendedTeam} href="/professionals">
            <AssetImage src="/professional-collaboration-hero.png" alt="Cloud architects, security experts and infrastructure consultants" fill sizes="(max-width: 800px) 90vw, 420px" />
            <span><strong>Our Extended Team</strong><small>Cloud Architects | Security Experts | Infrastructure Consultants</small><b>Meet the team <Icon name="arrow" /></b></span>
          </Link>
        </div>
      </div>
    </section>

    <section className={`${clientStyles.wrap} ${clientStyles.insightsSection}`}>
      <div className={clientStyles.sectionHeading}><div><span className={clientStyles.eyebrow}>Perspectives that move you forward</span><h2>Latest Insights</h2></div><ClientTextLink href="/insights">View All Insights</ClientTextLink></div>
      <div className={clientStyles.insightGrid}>{cloudCollaborationInsights.map((insight) => <article className={clientStyles.insightCard} key={insight.title}>
        <div className={clientStyles.insightImage}><AssetImage src={insight.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 900px) 45vw, 30vw" /></div>
        <div><span>{insight.date}</span><h3>{insight.title}</h3><ClientTextLink href={insight.href}>Read More</ClientTextLink></div>
      </article>)}</div>
    </section>

    <section className={clientStyles.faqSection}>
      <div className={`${clientStyles.wrap} ${clientStyles.faqGrid}`}>
        <div className={clientStyles.faqIntro}><span className={clientStyles.eyebrow}>Your questions, answered</span><h2>Frequently Asked Questions</h2><p>Clear guidance on cloud migration, security, infrastructure modernisation and ongoing support.</p><ClientTextLink href="/faqs">View All FAQs</ClientTextLink></div>
        <div className={clientStyles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary>{answer ? <p>{answer}</p> : null}</details>)}</div>
      </div>
    </section>

    <section className={clientStyles.enquirySection} id="enquiry">
      <div className={`${clientStyles.wrap} ${clientStyles.enquiryGrid}`}>
        <div className={clientStyles.enquiryCopy}>
          <span className={clientStyles.eyebrow}>Let&apos;s build what comes next</span>
          <h2>Discuss Your Cloud &amp; Infrastructure Requirements</h2>
          <p>Let&apos;s explore how we can help you build a scalable, secure and future-ready infrastructure.</p>
          <div className={clientStyles.enquiryImage}><AssetImage src="/Technology&Digital/Banner- Cloud & Digital Infrastructure .png" alt="Cloud infrastructure supporting a connected enterprise workplace" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
          <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
          <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
        </div>
        <div className={clientStyles.formPanel}>
          <span className={clientStyles.eyebrow}>Start a conversation</span>
          <h3>Tell us about your cloud and infrastructure requirements.</h3>
          <p>Share a few details and our team will get in touch to discuss your needs.</p>
          <TechnologyEnquiryForm defaultSolutionArea="Digital Business Solutions" defaultSolution="Cloud & Collaboration Solutions" variant="compact" />
        </div>
      </div>
    </section>
  </div>;
}
