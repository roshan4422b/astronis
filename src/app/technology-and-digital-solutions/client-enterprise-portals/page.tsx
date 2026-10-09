import type { Metadata } from "next";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import TechnologyEnquiryForm from "@/components/forms/TechnologyEnquiryForm";
import { professionals } from "@/app/professionals/leadership";
import { clientEnterprisePortalsPath, digitalBusinessInsights, digitalBusinessPath } from "@/content/digital-solutions";
import { dataAiPath } from "@/content/data-ai-solutions";
import { legalTechnologyPath } from "@/content/legal-technology";
import { regtechPath } from "@/content/regtech-solutions";
import styles from "./client-enterprise-portals.module.css";

export const metadata: Metadata = {
  title: "Client & Enterprise Portals | Secure Digital Business Solutions",
  description: "Secure client and enterprise portals that bring legal, regulatory and business advisory engagements together through transparent digital collaboration, document management and secure access.",
  alternates: { canonical: clientEnterprisePortalsPath },
  openGraph: {
    title: "Client & Enterprise Portals | ASTRONIS Global",
    description: "Secure digital portals for transparent collaboration, document management and connected business advisory engagements.",
    url: clientEnterprisePortalsPath,
    type: "website",
  },
};

const experienceFeatures = [
  ["shield", "Greater Transparency"],
  ["clock", "Faster Turnaround Times"],
  ["people", "Real-time Collaboration"],
  ["document", "Centralised Information"],
  ["lock", "Enhanced Security"],
  ["chart", "Better Decision-Making"],
] as const;

const challenges = [
  "Scattered communication across emails",
  "Difficulty tracking matter progress",
  "Version control and document management",
  "Limited visibility on compliance status",
  "Manual approval processes",
  "Data security and access control concerns",
];

const portalSolutions = [
  { title: "Client Portals", description: "Stay informed, access documents and track progress in real time.", image: "/professional-collaboration-hero.png", alt: "Business professionals collaborating on client work", href: "#core-modules" },
  { title: "Enterprise Portals", description: "Integrated view across legal, regulatory and business functions.", image: "/Technology, IT & ITES .png", alt: "Enterprise dashboard on a laptop", href: "#core-modules" },
  { title: "Compliance Portals", description: "Track obligations, timelines and regulatory updates.", image: "/FinTech & Digital Finance .png", alt: "Digital tools supporting financial and compliance work", href: regtechPath },
  { title: "Project & Transaction Portals", description: "Collaborate seamlessly on complex projects and transactions.", image: "/Professional & Business Services .png", alt: "Professional advisory team working together", href: legalTechnologyPath },
] as const;

const modules = [
  ["folder", "Document Management"],
  ["target", "Matter / Project Tracking"],
  ["chart", "Compliance Dashboards"],
  ["network", "Workflow Approvals"],
  ["chart", "Reporting & Analytics"],
  ["person", "Role-based Access"],
  ["calendar", "Notifications & Alerts"],
  ["people", "Collaboration Tools"],
  ["calendar", "Calendar & Milestones"],
  ["search", "Search & Knowledge Access"],
] as const;

const securityControls = [
  "Role-based access control",
  "Data encryption in transit and at rest",
  "Audit trails and activity logs",
  "Secure document exchange",
  "Global data protection alignment",
  "Regular security assessments",
];

const integrations = [
  ["mail", "Email & Collaboration Tools"],
  ["folder", "Document Repositories"],
  ["calendar", "Regulatory Platforms"],
  ["building", "Enterprise Systems (ERP/CRM)"],
  ["network", "Custom APIs & Third-Party Tools"],
] as const;

const journey = ["Onboard", "Configure", "Go Live", "Adopt", "Optimise"];
const implementation = ["Assess", "Design", "Build", "Deploy", "Support"];
const benefits = [
  "Improved client satisfaction",
  "Greater operational efficiency",
  "Real-time visibility and control",
  "Reduced compliance risk",
  "Scalable for growing needs",
];

const industries = [
  ["building", "Banking & Financial Services", "/industries/financial-services"],
  ["gear", "Manufacturing", "/industries/manufacturing"],
  ["building", "Real Estate & Construction", "/industries/real-estate-and-construction"],
  ["shield", "Healthcare & Life Sciences", "/industries/healthcare-and-pharma"],
  ["laptop", "Technology & E-Commerce", "/industries/it-and-ites"],
] as const;

const relatedSolutions = [
  ["Digital Business Solutions", digitalBusinessPath],
  ["RegTech & Compliance Technology", regtechPath],
  ["Legal Technology", legalTechnologyPath],
  ["Data, AI & Automation", dataAiPath],
  ["Cloud & Digital Infrastructure", `${digitalBusinessPath}#cloud-and-collaboration-solutions`],
  ["Cybersecurity & Data Protection", "/services/regulatory-and-compliance/data-protection"],
] as const;

const faqs = [
  ["Is my data secure on the client portal?", "Portal access and information handling are designed around your requirements, with role-based permissions, secure document exchange and agreed governance controls."],
  ["Can we get a customised portal for our organisation?", "Yes. We can shape the portal around your organisation's teams, workflows, users and reporting needs, while agreeing scope and responsibilities before implementation."],
  ["How will the portal improve communication and efficiency?", "A shared workspace can bring messages, documents, actions and status updates together, helping teams reduce repeated follow-ups and see what needs attention."],
  ["Can the portal integrate with our existing systems?", "Integration requirements are assessed during discovery. Available APIs, existing tools, data flows and security requirements inform the integration plan."],
  ["What kind of support do you provide after implementation?", "The support plan can include user onboarding, training, issue escalation, maintenance coordination and ongoing improvement, agreed to fit your operating model."],
] as const;

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Icon name="arrow" /></Link>;
}

export default function ClientEnterprisePortalsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="portals-title">
        <AssetImage src="/Technology, IT & ITES .png" alt="Enterprise dashboard on a laptop overlooking a connected city" fill loading="eager" sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">›</span>
            <Link href="/technology-and-digital-solutions">Technology &amp; Digital Solutions</Link><span aria-hidden="true">›</span>
            <span aria-current="page">Client &amp; Enterprise Portals</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Client &amp; Enterprise Portals</span>
            <h1 id="portals-title">A Smarter Way<br />to Work Together.</h1>
            <p className={styles.tagline}>Secure. Transparent. Collaborative.</p>
            <p>Our client and enterprise portals bring your legal, regulatory and business advisory engagements together on a single, secure digital platform.</p>
            <Link className={styles.button} href="#enquiry">Request a Demo <Icon name="arrow" /></Link>
          </div>
          <aside className={styles.heroMotto} aria-label="Connected people, clearer progress, stronger outcomes">
            <span>Connected.<br />People.<br />Clearer<br />Progress.<br />Stronger<br />Outcomes.</span>
            <span className={styles.mottoBrand}>Astronis<br />Global.</span>
          </aside>
        </div>
      </section>

      <section className={styles.experience} aria-labelledby="experience-title">
        <div className={`${styles.wrap} ${styles.experienceGrid}`}>
          <div className={styles.experienceCopy}>
            <h2 id="experience-title">Why Digital Client<br />Experience Matters</h2>
            <p>A seamless digital experience enhances transparency, speeds decision-making and helps you get greater value from every engagement.</p>
            <ArrowLink href="#approach">Explore Our Approach</ArrowLink>
          </div>
          <div className={styles.experienceFeatures}>
            {experienceFeatures.map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}
          </div>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.challengeSolutions}`} aria-label="Portal challenges and solutions">
        <div className={styles.challengePanel}>
          <h2>Common Portal Challenges</h2>
          <ul>{challenges.map((challenge) => <li key={challenge}><Icon name="shield" />{challenge}</li>)}</ul>
        </div>
        <div className={styles.solutionsPanel}>
          <div className={styles.sectionHeading}>
            <div><h2>Our Portal Solutions</h2><p>Customised, secure and scalable portals for clients and enterprises.</p></div>
            <ArrowLink href="/technology-and-digital-solutions">Explore All Solutions</ArrowLink>
          </div>
          <div className={styles.solutionCards}>
            {portalSolutions.map((solution) => <article className={styles.solutionCard} key={solution.title}>
              <div className={styles.solutionImage}><AssetImage src={solution.image} alt={solution.alt} fill sizes="(max-width: 540px) 90vw, (max-width: 900px) 44vw, 19vw" /></div>
              <div><h3>{solution.title}</h3><p>{solution.description}</p><ArrowLink href={solution.href}>Learn More</ArrowLink></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.moduleSecurity}`} id="core-modules">
        <div className={styles.modulesPanel}>
          <h2>Core Functional Modules</h2>
          <div className={styles.moduleGrid}>{modules.map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div>
        </div>
        <div className={styles.securityPanel}>
          <AssetImage src="/Technology&Digital/Banner- Cybersecurity & Data Protection .png" alt="Digital security shield protecting connected business data" fill sizes="(max-width: 800px) 100vw, 36vw" />
          <div className={styles.securityShade} />
          <div className={styles.securityContent}>
            <h2>Security &amp; Access Governance</h2>
            <ul>{securityControls.map((control) => <li key={control}><Icon name="shield" />{control}</li>)}</ul>
          </div>
          <p className={styles.securityMotto}>Your<br />Information.<br />Our Priority.</p>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.deliveryRow}`} id="approach">
        <div className={styles.integrationPanel}>
          <h2>Integration Capabilities</h2>
          <div className={styles.integrationList}>{integrations.map(([icon, title]) => <div key={title}><Icon name={icon} /><span>{title}</span></div>)}</div>
        </div>
        <div className={styles.journeyPanel}>
          <h2>Client Journey</h2>
          <ol className={styles.journey}>{journey.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
        </div>
        <div className={styles.implementationPanel}>
          <h2>Implementation Approach</h2>
          <ol className={styles.implementation}>{implementation.map((step, index) => <li key={step}><span>{step}</span>{index < implementation.length - 1 ? <Icon name="arrow" /> : null}</li>)}</ol>
          <p>A structured, low-disruption approach with continuous support.</p>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.valueRow}`}>
        <div className={styles.benefitsPanel}>
          <h2>Business Benefits</h2>
          <ul>{benefits.map((benefit) => <li key={benefit}><Icon name="shield" />{benefit}</li>)}</ul>
        </div>
        <div className={styles.industriesPanel}>
          <div className={styles.sectionHeading}><h2>Industries We Support</h2><ArrowLink href="/industries">View All Industries</ArrowLink></div>
          <div className={styles.industryGrid}>{industries.map(([icon, title, href]) => <Link href={href} key={title}><Icon name={icon} /><span>{title}</span></Link>)}<Link href="/industries"><Icon name="network" /><span>More Industries</span></Link></div>
        </div>
        <div className={styles.relatedPanel}>
          <div className={styles.sectionHeading}><h2>Related Technology Solutions</h2><ArrowLink href="/technology-and-digital-solutions">View All</ArrowLink></div>
          <div>{relatedSolutions.map(([title, href]) => <Link href={href} key={title}><Icon name="arrow" />{title}</Link>)}</div>
        </div>
      </section>

      <section className={styles.specialistsSection}>
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Connected expertise</span><h2>Our Technology Specialists</h2></div><ArrowLink href="/professionals">View All Professionals</ArrowLink></div>
          <div className={styles.specialistGrid}>
            {professionals.slice(0, 2).map((person) => <Link className={styles.specialistCard} href={`/professionals/${person.slug}`} key={person.slug}>
              <div className={styles.specialistPhoto}><AssetImage src={person.image} alt={person.name} fill sizes="(max-width: 800px) 40vw, 180px" /></div>
              <div><h3>{person.name}</h3><span>{person.role}</span><p>{person.expertise}</p><small>View Profile <Icon name="arrow" /></small></div>
            </Link>)}
            <Link className={styles.extendedTeam} href="/professionals">
              <AssetImage src="/professional-collaboration-hero.png" alt="Astronis multidisciplinary professionals working together" fill sizes="(max-width: 800px) 90vw, 420px" />
              <span><strong>Our Extended Team</strong><small>Lawyers · CS · CAs · Technology Consultants</small><b>Meet the team <Icon name="arrow" /></b></span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.insightsSection}`}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Perspectives that move you forward</span><h2>Latest Insights</h2></div><ArrowLink href="/insights">View All Insights</ArrowLink></div>
        <div className={styles.insightGrid}>{digitalBusinessInsights.map((insight) => <article className={styles.insightCard} key={insight.title}>
          <div className={styles.insightImage}><AssetImage src={insight.image} alt="" fill sizes="(max-width: 540px) 90vw, (max-width: 900px) 45vw, 30vw" /></div>
          <div><span>{insight.category}</span><h3>{insight.title}</h3><ArrowLink href={insight.href}>Read More</ArrowLink></div>
        </article>)}</div>
      </section>

      <section className={styles.faqSection}>
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <div className={styles.faqIntro}><span className={styles.eyebrow}>Your questions, answered</span><h2>Frequently Asked Questions</h2><p>Clear guidance on portal access, security, integrations and implementation.</p><ArrowLink href="/faqs">View All FAQs</ArrowLink></div>
          <div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.enquirySection} id="enquiry">
        <div className={`${styles.wrap} ${styles.enquiryGrid}`}>
          <div className={styles.enquiryCopy}>
            <span className={styles.eyebrow}>Let&apos;s build what comes next</span>
            <h2>Discuss Your Portal Requirements</h2>
            <p>Let&apos;s explore how a secure client or enterprise portal can support your business.</p>
            <div className={styles.enquiryImage}><AssetImage src="/Technology, IT & ITES .png" alt="Connected digital platform supporting business teams" fill sizes="(max-width: 800px) 90vw, 40vw" /></div>
            <a href="tel:+919311664455"><Icon name="phone" />+91 93116 64455</a>
            <a href="mailto:advisory@astronisglobal.com"><Icon name="mail" />advisory@astronisglobal.com</a>
          </div>
          <div className={styles.formPanel}>
            <span className={styles.eyebrow}>Start a conversation</span>
            <h3>Tell us about your portal requirements.</h3>
            <p>Share a few details and our team will get in touch to discuss your needs.</p>
            <TechnologyEnquiryForm defaultSolutionArea="Digital Business Solutions" defaultSolution="Client & Enterprise Portals" variant="compact" />
          </div>
        </div>
      </section>
    </div>
  );
}
