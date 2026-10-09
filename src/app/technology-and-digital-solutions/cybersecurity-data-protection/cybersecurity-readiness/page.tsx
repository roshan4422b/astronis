import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import TechnologyEnquiryForm from "@/components/forms/TechnologyEnquiryForm";
import { professionals } from "@/app/professionals/leadership";
import { digitalBusinessPath, cybersecurityReadinessPath } from "@/content/digital-solutions";
import { dataAiPath } from "@/content/data-ai-solutions";
import { regtechPath } from "@/content/regtech-solutions";
import sharedStyles from "../../digital-business-solutions/digital-business.module.css";
import regtechStyles from "../../regtech-and-compliance-technology/regtech.module.css";
import cybersecurityStyles from "./cybersecurity-readiness.module.css";
import clientStyles from "../../client-enterprise-portals/client-enterprise-portals.module.css";

const styleKeys = [...new Set([...Object.keys(sharedStyles), ...Object.keys(regtechStyles), ...Object.keys(cybersecurityStyles)])];
const styles = Object.fromEntries(styleKeys.map((key) => [key, [sharedStyles[key], regtechStyles[key], cybersecurityStyles[key]].filter(Boolean).join(" ")])) as Record<string, string>;

export const metadata: Metadata = {
  title: "Cybersecurity Readiness",
  description: "Assess your cybersecurity posture, identify security gaps and build a practical roadmap for stronger protection, governance and business resilience.",
  alternates: { canonical: cybersecurityReadinessPath },
  openGraph: {
    title: "Cybersecurity Readiness | Astronis Global",
    description: "Assess your security posture, identify gaps and build a practical roadmap for stronger protection and resilience.",
    url: cybersecurityReadinessPath,
    type: "website",
  },
};

const readinessAreas = [
  ["person", "Identity & Access", "Strong identity controls and secure access management."],
  ["shield", "Data Protection", "Protect sensitive business and personal information."],
  ["chart", "Security Monitoring", "Improve visibility into threats and suspicious activity."],
  ["globe", "Cloud Security", "Strengthen security across cloud and hybrid environments."],
  ["network", "Incident Response", "Improve preparedness for cybersecurity incidents."],
  ["scale", "Governance & Compliance", "Align security practices with applicable requirements."],
] as const;

const solutions = [
  { title: "Cyber Risk Assessment", description: "Identify security risks and strengthen your overall security posture.", image: "/Technology&Digital/Banner- Cybersecurity & Data Protection .png", detail: "Review your environment, key threats and current safeguards to establish clear priorities." },
  { title: "Security Posture Assessment", description: "Understand your current security capabilities, controls and gaps.", image: "/Technology, IT & ITES .png", detail: "Develop a practical view of existing controls, ownership and areas that need attention." },
  { title: "Identity & Access Readiness", description: "Review identity, authentication and access management capabilities.", image: "/Part-8 .png", detail: "Assess how users, privileged accounts and third parties gain access to critical systems." },
  { title: "Cloud Security Readiness", description: "Assess cloud security controls, configurations and operational readiness.", image: "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png", detail: "Review cloud governance, configurations and shared responsibilities across environments." },
  { title: "Incident Response Readiness", description: "Evaluate preparedness, response processes and recovery capabilities.", image: "/Professional & Business Services .png", detail: "Clarify response roles, escalation paths, communications and recovery dependencies." },
  { title: "Governance & Compliance Readiness", description: "Review cybersecurity governance, policies and compliance considerations.", image: "/FinTech & Digital Finance .png", detail: "Connect security oversight and policy responsibilities to the requirements relevant to your organisation." },
] as const;

const benefits = [
  "Stronger security posture",
  "Better visibility of cyber risks",
  "Clearer security priorities",
  "Improved regulatory readiness",
  "Greater business resilience",
];

const methodology = [
  ["Assess", "Evaluate current security posture and capabilities.", "search"],
  ["Identify", "Identify gaps, weaknesses and areas requiring attention.", "target"],
  ["Prioritise", "Prioritise improvements based on business risk and impact.", "chart"],
  ["Strengthen", "Develop practical recommendations and improvement actions.", "shield"],
  ["Optimise", "Establish a roadmap for continuous improvement.", "gear"],
] as const;

const sectors = [
  ["building", "Banking & Financial Services", "financial-services"],
  ["shield", "Healthcare & Life Sciences", "healthcare-and-pharma"],
  ["gear", "Manufacturing", "manufacturing"],
  ["building", "Real Estate & Construction", "real-estate-and-construction"],
  ["laptop", "Technology & E-Commerce", "it-and-ites"],
  ["document", "Education & Skill Development", "education"],
] as const;

const related = [
  ["RegTech & Compliance Technology", regtechPath],
  ["Data, AI & Automation", dataAiPath],
  ["IT & Technology Advisory", "/industries/it-and-ites"],
  ["Risk & Governance", "/services/risk-governance-and-forensic-advisory"],
  ["Business Continuity Planning", "/services/business-advisory-and-consulting"],
  ["Cloud & Infrastructure Advisory", `${digitalBusinessPath}#cloud-and-collaboration-solutions`],
] as const;

const insights = [
  { category: "Cybersecurity readiness", title: "Cybersecurity Readiness – What Businesses Need to Know", image: "/Technology, IT & ITES .png", href: "/insights/articles" },
  { category: "Security posture", title: "Building a Stronger Cybersecurity Posture", image: "/Technology&Digital/Banner- Cybersecurity & Data Protection .png", href: "/insights/business-updates" },
  { category: "Business resilience", title: "From Security Gaps to Cyber Resilience", image: "/Technology&Digital/Banner- Cloud & Digital Infrastructure .png", href: "/insights/legal-updates" },
] as const;

const faqs = [
  ["What is a Cybersecurity Readiness Assessment?", "It is a structured review of your organisation’s security capabilities, controls and preparedness. The assessment helps identify gaps and establish practical priorities for improvement."],
  ["How do you assess our current cybersecurity posture?", "We discuss your operating environment, review relevant policies and controls, and work with key stakeholders to understand how security responsibilities are managed."],
  ["What areas are covered in the assessment?", "The scope can include identity and access, data protection, monitoring, cloud security, incident response, governance and the systems most important to your operations."],
  ["Can the assessment identify compliance-related gaps?", "Yes. We can consider relevant legal, regulatory and contractual requirements alongside your current policies, governance and control evidence."],
  ["Can you help us implement the recommended improvements?", "We can help prioritise recommendations and discuss the advisory, governance and implementation support suited to your organisation."],
] as const;

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

function ClientTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={clientStyles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

export default function CybersecurityReadinessPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="cybersecurity-title">
      <AssetImage src="/Technology, IT & ITES .png" alt="Enterprise cybersecurity dashboard and connected technology environment" fill preload sizes="100vw" />
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">›</span>
          <Link href="/technology-and-digital-solutions">Technology &amp; Digital Solutions</Link><span aria-hidden="true">›</span>
          <span>Cybersecurity &amp; Data Protection</span><span aria-hidden="true">›</span>
          <span aria-current="page">Cybersecurity Readiness</span>
        </nav>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Cybersecurity Readiness</span>
          <h1 id="cybersecurity-title">Cybersecurity<br />Readiness</h1>
          <p className={styles.tagline}>Know Your Security Posture. Strengthen Your Resilience.</p>
          <p>Understand your organisation&apos;s cybersecurity posture, identify critical gaps and establish a practical roadmap for stronger protection, governance and business resilience.</p>
          <Link className={styles.button} href="#enquiry">Assess Your Readiness <Icon name="arrow" /></Link>
        </div>
        <aside className={styles.motto}>Security.<br />Readiness.<br />Resilience.<br />Governance.<br />Protection.<span>Astronis<br />Global.</span></aside>
      </div>
    </section>

    <section className={styles.challengeSection} id="areas" aria-labelledby="areas-title">
      <div className={`${styles.wrap} ${styles.challenges}`}>
        <div>
          <h2 id="areas-title">Key Cybersecurity<br />Readiness Areas</h2>
          <p>Cybersecurity readiness requires a clear understanding of your organisation&apos;s security capabilities, risks and resilience.</p>
          <TextLink href="#approach">Explore Our Approach</TextLink>
        </div>
        <div className={styles.challengeItems}>{readinessAreas.map(([icon, title, description]) => <div key={title}><Icon name={icon} /><h3>{title}</h3><p className={styles.areaDescription}>{description}</p></div>)}</div>
      </div>
    </section>

    <section className={`${styles.wrap} ${styles.section}`} id="solutions">
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Clarity. Protection. Resilience.</span><h2>Our Cybersecurity Readiness Solutions</h2></div><TextLink href="#enquiry">Explore All Solutions</TextLink></div>
      <div className={styles.solutions}>{solutions.map((solution) => <article className={styles.card} key={solution.title}>
        <div className={styles.solutionImage}><AssetImage src={solution.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1000px) 30vw, 16vw" /><span className={styles.iconBadge}><Icon name="shield" /></span></div>
        <div className={styles.cardBody}><h3>{solution.title}</h3><p>{solution.description}</p><details className={styles.solutionDetail}><summary>Learn More <Icon name="arrow" /></summary><p>{solution.detail}</p><TextLink href="#enquiry">Discuss this solution</TextLink></details></div>
      </article>)}</div>
    </section>

    <section className={styles.implementation} id="approach">
      <div className={styles.benefits}><h2>Business Benefits</h2><ul>{benefits.map((benefit) => <li key={benefit}><Icon name="shield" />{benefit}</li>)}</ul></div>
      <div className={styles.steps}><span className={styles.eyebrow}>From assessment to action</span><h2>Our Cybersecurity Readiness Methodology</h2><ol>{methodology.map(([title, body, icon], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><Icon className={styles.stepIcon} name={icon} /><h3>{title}</h3><p>{body}</p></li>)}</ol></div>
      <div className={styles.approachImage}><AssetImage src="/images/india-presence/mumbai.jpg" alt="Modern commercial building representing secure, resilient business operations" fill sizes="20vw" /><span>Secure.<br />Compliant.<br />Resilient.<br />Together.</span></div>
    </section>

    <div className={`${styles.wrap} ${styles.connections}`}>
      <section><div className={styles.sectionHeading}><h2>Industries We Support</h2><TextLink href="/industries">View All Industries</TextLink></div><div className={styles.industries}>{sectors.map(([icon, title, slug]) => <Link href={`/industries/${slug}`} key={slug}><Icon name={icon} /><span>{title}</span></Link>)}</div></section>
      <section><div className={styles.sectionHeading}><h2>Related Solutions</h2><TextLink href="/technology-and-digital-solutions">View All Solutions</TextLink></div><div className={styles.related}>{related.map(([title, href]) => <Link href={href} key={title}><Icon name="arrow" />{title}</Link>)}</div></section>
    </div>

    <section className={clientStyles.specialistsSection}>
      <div className={clientStyles.wrap}>
        <div className={clientStyles.sectionHeading}><div><span className={clientStyles.eyebrow}>Connected expertise</span><h2>Our Technology Specialists</h2></div><ClientTextLink href="/professionals">View All Professionals</ClientTextLink></div>
        <div className={clientStyles.specialistGrid}>
          {professionals.slice(0, 2).map((person) => <Link className={clientStyles.specialistCard} href={`/professionals/${person.slug}`} key={person.slug}><div className={clientStyles.specialistPhoto}><AssetImage src={person.image} alt={person.name} fill sizes="(max-width: 800px) 40vw, 180px" /></div><div><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><small>View Profile <Icon name="arrow" /></small></div></Link>)}
          <Link className={clientStyles.extendedTeam} href="/professionals"><AssetImage src="/professional-collaboration-hero.png" alt="Astronis legal, regulatory and technology professionals working together" fill sizes="(max-width: 800px) 90vw, 420px" /><span><strong>Our Extended Team</strong><small>Lawyers · CS · CAs · Technology &amp; Security Consultants</small><b>Meet the team <Icon name="arrow" /></b></span></Link>
        </div>
      </div>
    </section>

    <section className={`${clientStyles.wrap} ${clientStyles.insightsSection}`}>
      <div className={clientStyles.sectionHeading}><div><span className={clientStyles.eyebrow}>Ideas for your next step</span><h2>Latest Insights</h2></div><ClientTextLink href="/insights">View All Insights</ClientTextLink></div>
      <div className={clientStyles.insightGrid}>{insights.map((insight) => <article className={clientStyles.insightCard} key={insight.title}><div className={clientStyles.insightImage}><AssetImage src={insight.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 900px) 45vw, 30vw" /></div><div><span>{insight.category}</span><h3>{insight.title}</h3><ClientTextLink href={insight.href}>Read More</ClientTextLink></div></article>)}</div>
    </section>

    <section className={clientStyles.faqSection}>
      <div className={`${clientStyles.wrap} ${clientStyles.faqGrid}`}>
        <div className={clientStyles.faqIntro}><span className={clientStyles.eyebrow}>Your questions, answered</span><h2>Frequently Asked Questions</h2><p>Clear guidance on assessing your cybersecurity posture, priorities and next steps.</p><ClientTextLink href="/faqs">View All FAQs</ClientTextLink></div>
        <div className={clientStyles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section className={clientStyles.enquirySection} id="enquiry">
      <div className={`${clientStyles.wrap} ${clientStyles.enquiryGrid}`}>
        <div className={clientStyles.enquiryCopy}>
          <span className={clientStyles.eyebrow}>Start a conversation</span>
          <h2>Discuss Your Cybersecurity Requirements</h2>
          <p>Let&apos;s build a stronger and more resilient security environment together.</p>
          <div className={clientStyles.enquiryImage}><AssetImage src="/Technology, IT & ITES .png" alt="Connected digital platform supporting business security" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
          <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
          <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
        </div>
        <div className={clientStyles.formPanel}>
          <span className={clientStyles.eyebrow}>Cybersecurity enquiry</span>
          <h3>Tell us about your security priorities.</h3>
          <p>Share a few details and our team will get in touch to discuss your needs.</p>
          <TechnologyEnquiryForm defaultSolutionArea="Digital Business Solutions" defaultSolution="Cybersecurity Readiness" variant="compact" />
        </div>
      </div>
    </section>
  </div>;
}
