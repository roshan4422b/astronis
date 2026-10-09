import Link from "next/link";
import Image from "../../_components/asset-image";
import Icon from "../../_components/icon";
import { professionals } from "../../professionals/leadership";
import { dataAiSolutions } from "@/content/data-ai-solutions";
import Enquiry from "../enquiry";
import sharedStyles from "../digital-business-solutions/digital-business.module.css";
import dataStyles from "./data-ai.module.css";
const styles = { ...sharedStyles, ...Object.fromEntries(Object.entries(dataStyles).map(([key, value]) => [key, [sharedStyles[key], value].filter(Boolean).join(' ')])) };

export const metadata = {
  title: "Data, AI & Automation",
  description: "Turn data into decisions with AI solutions, analytics, intelligent automation, research, predictive insights, regulatory intelligence and business dashboards.",
};

const challenges = [["network", "Smarter Decisions"], ["gear", "Higher Efficiency"], ["shield", "Reduced Operational Risk"], ["chart", "Scalable Growth"], ["document", "Data-Driven Compliance"], ["globe", "Future-Ready Operations"]];
const steps = [["Discover", "Understand your data, processes and goals"], ["Design", "Build a tailored solution roadmap"], ["Develop", "Implement and integrate with existing systems"], ["Deploy", "Enable adoption and measure outcomes"], ["Support", "Provide continuous monitoring and improvement"]];
const sectors = [["building", "Banking & Financial Services", "/industries/financial-services"], ["shield", "Healthcare & Life Sciences", "/industries/healthcare-and-pharma"], ["gear", "Manufacturing", "/industries/manufacturing"], ["building", "Real Estate & Construction", "/industries/real-estate-and-construction"], ["laptop", "Technology & E-Commerce", "/industries/e-commerce"], ["network", "More Industries", "/industries"]];
const principles = [["shield", "Ethical AI Practices"], ["shield", "Data Privacy & Security"], ["document", "Regulatory Compliance"], ["people", "Transparency & Accountability"], ["person", "Human-Centric Approach"]];
const insights = [["AI perspectives", "Explore AI in the regulatory ecosystem", "/images/india-presence/mumbai.jpg", "/insights/articles"], ["Data & intelligence", "Data analytics for smarter compliance management", "/Technology, IT & ITES .png", "/insights/legal-updates"], ["Operational improvement", "Automation in legal operations: trends and opportunities", "/Professional & Business Services .png", "/insights/business-updates"]];
const faqs = [
  ["How can AI and automation help my business?", "AI and automation can help organise information, surface patterns and reduce repetitive tasks. We start with your business goals and assess where these tools can add practical value, with clear measures and human oversight."],
  ["Is our data secure with your solutions?", "We assess data handling, access and confidentiality requirements before designing a solution. Controls, responsibilities and review arrangements are agreed as part of the scope, including how data is used by any third-party tools."],
  ["Do you provide customised solutions for specific industries?", "We consider your sector, workflows, existing systems and regulatory context when defining the roadmap. Data readiness, integration needs and business priorities guide the proposed solution."],
  ["How do you ensure responsible and ethical use of AI?", "We discuss appropriate use cases, data quality, transparency and human review at the design stage. Outputs and performance should be evaluated for the intended use, with clear ownership and processes for identifying errors and limitations."],
  ["What kind of support do you provide after implementation?", "Training, monitoring, maintenance coordination and ongoing improvements can be included in the engagement. The support scope, performance measures and responsibilities are agreed before deployment."],
];
function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

export default function DataAiPage() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="data-ai-title">
      <Image src="/Technology, IT & ITES .png" alt="Connected data dashboards and digital business intelligence" fill preload sizes="100vw" />
      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/technology-and-digital-solutions">Technology &amp; Digital Solutions</Link><span aria-hidden="true">›</span><span aria-current="page">Data, AI & Automation</span></nav>
        <div className={styles.heroCopy}><span className={styles.eyebrow}>Data, AI & Automation</span><h1 id="data-ai-title">From Data to<br />Decisions. From Insight<br />to Impact.</h1><p className={styles.tagline}>Harnessing the power of data, AI and automation to solve complex business, legal and regulatory challenges.</p><Link className={styles.button} href="#enquiry">Discuss Your Requirements <Icon name="arrow" /></Link></div>
        <aside className={styles.motto}>Intelligence.<br />Automation.<br />Opportunity.<br />A smarter<br />tomorrow.<span>Astronis<br />Global.</span></aside>
      </div>
    </section>

    <section className={styles.challengeSection}><div className={`${styles.wrap} ${styles.challenges}`}><div><h2>Turn Your Data<br />Into a Strategic Advantage.</h2><p>We help organisations unlock the value of their data through AI-driven insights, intelligent automation and scalable technology solutions.</p><TextLink href="#approach">Explore Our Approach</TextLink></div><div className={styles.challengeItems}>{challenges.map(([icon, title]) => <div key={title}><Icon name={icon} /><h3>{title}</h3></div>)}</div></div></section>

    <section className={`${styles.wrap} ${styles.section}`} id="solutions"><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Intelligence that moves business forward.</span><h2>Our Data, AI & Automation Solutions</h2></div><TextLink href="/technology-and-digital-solutions">Explore All Solutions</TextLink></div><div className={styles.solutions}>{dataAiSolutions.map((solution) => <article className={styles.card} id={solution.id} key={solution.id}><div className={styles.solutionImage}><Image src={solution.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 1000px) 30vw, 14vw" /><span className={styles.iconBadge}><Icon name={solution.icon} /></span></div><div className={styles.cardBody}><h3>{solution.title}</h3><p>{solution.description}</p><details className={styles.solutionDetail}><summary>Learn More <Icon name="arrow" /></summary><p>{solution.detail}</p><TextLink href={`?solution=${encodeURIComponent(solution.title)}#enquiry`}>Discuss this solution</TextLink></details></div></article>)}</div></section>

    <section className={styles.implementation} id="approach"><div className={styles.benefits}><h2>Business Benefits</h2><ul>{["Data-driven decision-making", "Operational efficiency", "Reduced compliance risk", "Cost optimisation", "Scalable and future-ready operations"].map((benefit) => <li key={benefit}><Icon name="shield" />{benefit}</li>)}</ul></div><div className={styles.steps}><span className={styles.eyebrow}>From ambition to action</span><h2>Our Implementation Methodology</h2><ol>{steps.map(([title, body], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></div><div className={styles.approachImage}><Image src="/images/india-presence/mumbai.jpg" alt="Modern commercial architecture" fill sizes="20vw" /><span>Insights.<br />Automation.<br />Progress.<br />A brighter tomorrow.</span></div></section>

    <div className={`${styles.wrap} ${styles.governance}`}>
      <section aria-labelledby="governance-title"><h2 id="governance-title">Responsible AI &amp; Data Governance</h2><div className={styles.principles}>{principles.map(([icon, title]) => <div key={title}><Icon name={icon} /><h3>{title}</h3></div>)}</div></section>
      <section><div className={styles.sectionHeading}><h2>Key Industries</h2><TextLink href="/industries">Explore All Industries</TextLink></div><div className={styles.industries}>{sectors.map(([icon, title, href]) => <Link href={href} key={href}><Icon name={icon} /><span>{title}</span></Link>)}</div></section>
    </div>
    <section className={styles.teamSection}><div className={styles.wrap}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Connected expertise</span><h2>Technology Specialists</h2></div><TextLink href="/professionals">View All Professionals</TextLink></div><div className={styles.team}>{professionals.slice(0, 2).map((person) => <Link className={styles.person} key={person.slug} href={`/professionals/${person.slug}`}><div className={styles.portrait}><Image src={person.image} alt={person.name} fill sizes="(max-width: 540px) 90vw, 25vw" /></div><div><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><Icon name="arrow" /></div></Link>)}<Link className={styles.extendedTeam} href="/professionals"><Image src="/professional-collaboration-hero.png" alt="Our wider professional network" fill sizes="(max-width: 800px) 90vw, 40vw" /><div><span className={styles.eyebrow}>A multidisciplinary perspective</span><h3>Our Extended Team</h3><p>Legal, regulatory and business expertise, brought together around your needs.</p><span>Meet our professionals <Icon name="arrow" /></span></div></Link></div></div></section>

    <section className={`${styles.wrap} ${styles.section}`}><div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Ideas for your next step</span><h2>Latest Insights</h2></div><TextLink href="/insights">View All Insights</TextLink></div><div className={styles.insights}>{insights.map(([category, title, image, href]) => <article className={styles.card} key={title}><div className={styles.insightImage}><Image src={image} alt="" fill sizes="(max-width: 540px) 90vw, 30vw" /></div><div className={styles.cardBody}><span className={styles.eyebrow}>{category}</span><h3>{title}</h3><TextLink href={href}>Read More</TextLink></div></article>)}</div></section>

    <section className={styles.faqSection}><div className={`${styles.wrap} ${styles.faqGrid}`}><div><span className={styles.eyebrow}>Your questions, answered</span><h2>Frequently Asked Questions</h2><p>Clear guidance on data, automation, responsible AI and ongoing support.</p><TextLink href="/faqs">View All FAQs</TextLink></div><div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className={styles.enquirySection} id="enquiry"><div className={`${styles.wrap} ${styles.enquiryGrid}`}><div className={styles.enquiryCopy}><span className={styles.eyebrow}>Turn your ambitions into measurable outcomes.</span><h2>Discuss Your Data, AI & Automation Requirements</h2><p>Let&apos;s explore how we can help you turn data and technology into measurable outcomes.</p><div className={styles.enquiryImage}><Image src="/Technology, IT & ITES .png" alt="Digital technology connecting business systems" fill sizes="(max-width: 800px) 90vw, 40vw" /></div><a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a><a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a></div><div className={styles.formPanel}><span className={styles.eyebrow}>Start a conversation</span><h3>Tell us about your requirements.</h3><p>Our team will get in touch for a detailed discussion.</p><Enquiry defaultService="Data, AI & Automation" /></div></div></section>
  </div>;
}
