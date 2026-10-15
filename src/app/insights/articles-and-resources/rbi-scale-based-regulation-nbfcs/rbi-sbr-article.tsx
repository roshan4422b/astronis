import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import Link from "next/link";
import { testimonials } from "@/content/testimonials";
import { ShareControls, TableOfContents } from "./article-controls";
import styles from "./rbi-sbr-article.module.css";

const insightLinks = [
  ["Structure of the four-layer framework", "four-layer-framework"],
  ["Key regulatory requirements", "capital-prudential-norms"],
  ["Governance, compliance and risk management", "governance-cco"],
  ["Practical steps for NBFCs", "practical-compliance"],
  ["Astronis perspective and key takeaways", "astronis-perspective"],
] as const;

const whySbr = [
  ["target", "Enable proportionate and risk-based regulation"],
  ["chart", "Strengthen financial stability"],
  ["network", "Address emerging risks from scale and complexity"],
  ["shield", "Enhance governance, compliance and consumer protection"],
] as const;

const layers = [
  {
    id: "base-layer",
    name: "Base Layer",
    code: "NBFC-BL",
    summary:
      "Non-deposit taking NBFCs below ₹1,000 crore and specified categories.",
    points: [
      "Non-deposit taking NBFCs below ₹1,000 crore.",
      "Includes specified categories as per RBI.",
    ],
  },
  {
    id: "middle-layer",
    name: "Middle Layer",
    code: "NBFC-ML",
    summary:
      "All deposit-taking NBFCs, non-deposit taking NBFCs with assets of ₹1,000 crore and above, and specified categories.",
    points: [
      "All deposit-taking NBFCs.",
      "Non-deposit taking NBFCs with assets of ₹1,000 crore and above.",
      "Includes specified categories as per RBI.",
    ],
  },
  {
    id: "upper-layer",
    name: "Upper Layer",
    code: "NBFC-UL",
    summary:
      "NBFCs specifically identified by RBI for enhanced regulation, including top ten eligible NBFCs by asset size.",
    points: [
      "NBFCs specifically identified by RBI for enhanced regulation.",
      "Ten eligible NBFCs by asset size reside in this layer.",
    ],
  },
  {
    id: "top-layer",
    name: "Top Layer",
    code: "NBFC-TL",
    summary:
      "Ideally expected to remain empty and can be populated if RBI sees substantial increased systemic risk in an Upper Layer NBFC.",
    points: [
      "Ideally expected to remain empty.",
      "Can be populated if RBI sees substantial increased systemic risk in an Upper Layer NBFC.",
    ],
  },
] as const;

const regulatoryAreas = [
  {
    id: "capital-prudential-norms",
    icon: "bank",
    title: "Capital & Prudential Norms",
    text: "Progressively higher prudential requirements with increase in scale, activity and risk profile.",
  },
  {
    id: "governance-cco",
    icon: "people",
    title: "Governance & Compliance",
    text: "Enhanced board oversight, independent compliance function and CCO for NBFC-ML and NBFC-UL.",
  },
  {
    id: "risk-compliance",
    icon: "shield",
    title: "Risk Management",
    text: "Stronger risk management frameworks tailored to the size, complexity and riskiness of the NBFC.",
  },
  {
    id: "asset-quality",
    icon: "checklist",
    title: "Asset Quality & Provisioning",
    text: "Robust asset classification and provisioning standards aligned with regulatory expectations.",
  },
  {
    id: "customer-protection",
    icon: "handshake",
    title: "Customer Protection",
    text: "Stronger measures for fair practices, grievance redressal and customer-centric conduct.",
  },
  {
    id: "digital-lending",
    icon: "laptop",
    title: "Digital Lending",
    text: "Heightened oversight on digital lending arrangements, including due diligence, outsourcing and customer disclosures.",
  },
] as const;

const checklist = [
  "Assess layer classification, activity and risk profile.",
  "Review applicability of regulatory requirements for your layer.",
  "Establish/strengthen compliance function and CCO for NBFC-ML and NBFC-UL.",
  "Enhance governance, risk management and internal controls.",
  "Strengthen customer protection and digital lending compliance.",
  "Conduct periodic gap assessment and board-level review.",
] as const;

const takeaways = [
  "SBR introduces a four-layer regulatory framework based on size, activity and riskiness.",
  "Regulatory intensity increases progressively from Base to Top Layer.",
  "NBFC-ML and NBFC-UL require an independent compliance function and CCO.",
  "NBFCs should proactively assess their layer, strengthen governance and compliance, and build long-term resilience.",
] as const;

const faqs = [
  [
    "What is Scale-Based Regulation (SBR) for NBFCs?",
    "SBR is RBI’s framework for classifying NBFCs into Base, Middle, Upper and Top Layers, with regulatory expectations that generally increase in line with their size, activity and perceived risk.",
  ],
  [
    "What are the key differences between the four layers?",
    "The layers distinguish NBFCs by criteria such as deposit-taking status, asset size, specified activities and RBI identification. The Upper Layer attracts enhanced requirements, while the Top Layer is intended for an Upper Layer NBFC if systemic risk materially increases.",
  ],
  [
    "How are NBFCs classified into different layers?",
    "Classification depends on applicable RBI criteria, including asset size and business category. RBI also identifies eligible NBFCs for the Upper Layer using its prescribed methodology. NBFCs should verify their classification against current RBI directions.",
  ],
  [
    "Do regulations for lower layers automatically apply to higher layers?",
    "Regulations applicable to lower layers generally flow upward to higher layers unless RBI states otherwise. Additional requirements may apply to higher layers.",
  ],
] as const;

const services = [
  {
    icon: "bank",
    title: "Regulatory Advisory",
    text: "Support for SBR implementation and regulatory engagement.",
    href: "/services/regulatory-services",
  },
  {
    icon: "shield",
    title: "Compliance & Risk Advisory",
    text: "Design and strengthening of compliance and risk management frameworks.",
    href: "/services/banking-rbi-financial-services",
  },
  {
    icon: "people",
    title: "Governance & Board Advisory",
    text: "Enhancing board effectiveness and governance structures.",
    href: "/services/corporate-commercial-advisory",
  },
  {
    icon: "laptop",
    title: "Digital & Technology Risk",
    text: "Advisory on digital lending, outsourcing and technology risk management.",
    href: "/technology-and-digital-solutions",
  },
] as const;

const resources = [
  {
    icon: "checklist",
    title: "NBFC SBR Compliance Checklist",
    text: "Practical checklist for NBFCs under SBR.",
    format: "PDF",
  },
  {
    icon: "document",
    title: "Four-Layer Classification Guide",
    text: "Detailed guide to the four-layer regulatory framework.",
    format: "PDF",
  },
  {
    icon: "people",
    title: "Board & CCO Governance Checklist",
    text: "Key governance considerations for NBFC-ML and NBFC-UL.",
    format: "PDF",
  },
  {
    icon: "file",
    title: "Regulatory Gap Assessment Template",
    text: "Template to assess regulatory gaps under SBR.",
    format: "Excel",
  },
] as const;

const mediaItems = [
  {
    icon: "play",
    title: "Match",
    text: "Expert discussions and highlights.",
    image: "/images/services/banking-nbfc-and-financial-services-advisory.webp",
  },
  {
    icon: "message",
    title: "Listen",
    text: "Podcasts on regulatory updates and industry trends.",
    image: "/Part-16 .png",
  },
  {
    icon: "document",
    title: "Discover",
    text: "Articles, interviews and thought leadership.",
    image: "/Technology&Digital/Banner- Technology Insights & Knowledge Hub .png",
  },
] as const;

const approvedTestimonials = testimonials
  .filter(
    (item): item is typeof item & { quote: string } =>
      item.status === "approved" &&
      item.publicationConsent &&
      typeof item.quote === "string",
  )
  .slice(0, 3);

function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 id={`${id}-heading`}>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  );
}

export default function RbiSbrArticle() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">›</span>
              <Link href="/insights">Insights</Link><span aria-hidden="true">›</span>
              <Link href="/insights/articles-and-resources/all">All Articles &amp; Resources</Link>
              <span aria-hidden="true">›</span>
            </nav>
            <p className={styles.kicker}>INSIGHT 01 <span aria-hidden="true">|</span> REGULATORY &amp; COMPLIANCE</p>
            <h1>Understanding the Four-Layer Regulatory Framework</h1>
            <p className={styles.heroIntro}>A comprehensive analysis of RBI’s Scale-Based Regulation (SBR) for NBFCs, its four-layer structure, key regulatory requirements and what it means for board, management and compliance teams.</p>
            <div className={styles.metadata}>
              <span><Icon name="calendar" />10 May 2024</span>
              <span><Icon name="clock" />12 Min Read</span>
              <span><Icon name="scale" />Regulatory Advisory</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/Banking & Financial Services1 .png"
              alt="Financial district and columned institutional building"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div className={styles.heroImageShade} />
          </div>
        </div>
      </header>

      <div className={styles.articleLayout}>
        <TableOfContents />
        <div className={styles.articleBody}>
          <ShareControls />

          <section className={styles.articleSection} id="overview" aria-labelledby="overview-heading">
            <div className={styles.overviewPanel}>
              <div>
                <SectionHeading title="Overview" id="overview" />
                <p>The Reserve Bank of India (RBI) introduced Scale-Based Regulation (SBR) for Non-Banking Financial Companies (NBFCs) to create a more proportionate, risk-sensitive and forward-looking regulatory framework. The SBR classifies NBFCs into four layers — Base, Middle, Upper and Top — based on their size, activity and perceived riskiness, with progressively higher regulatory expectations at each layer.</p>
              </div>
              <aside className={styles.insightBox} aria-label="In this insight">
                <h3>In This Insight</h3>
                <ul>{insightLinks.map(([title, id]) => <li key={id}><a href={`#${id}`}><Icon name="arrow" />{title}</a></li>)}</ul>
              </aside>
            </div>
          </section>

          <section className={styles.articleSection} id="why-sbr" aria-labelledby="why-sbr-heading">
            <SectionHeading
              title="Why Scale-Based Regulation for NBFCs?"
              intro="The NBFC sector has grown significantly in size, diversity and interconnectedness. RBI’s SBR aims to:"
              id="why-sbr"
            />
            <div className={styles.featureGrid}>
              {whySbr.map(([icon, title]) => <article className={styles.featureCard} key={title}><span className={styles.iconBadge}><Icon name={icon} /></span><h3>{title}</h3></article>)}
            </div>
          </section>

          <section className={styles.articleSection} id="four-layer-framework" aria-labelledby="four-layer-framework-heading">
            <SectionHeading
              title="The Four-Layer Regulatory Framework"
              intro="NBFCs are classified into four layers based on their size, activity and perceived riskiness, with increasing regulatory intensity from the Base Layer to the Top Layer."
              id="four-layer-framework"
            />
            <figure className={styles.frameworkFigure} aria-labelledby="framework-caption">
              <figcaption id="framework-caption" className={styles.frameworkCaption}>Increasing regulatory intensity, supervisory focus and expectations</figcaption>
              <svg className={styles.risingArrow} viewBox="0 0 800 100" role="img" aria-label="Regulatory intensity rises from Base Layer to Top Layer">
                <defs><marker id="rbi-arrow-head" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 10 5 0 10Z" fill="currentColor" /></marker></defs>
                <path d="M25 82 C190 74 270 66 385 49 S610 20 770 8" fill="none" stroke="currentColor" strokeWidth="4" markerEnd="url(#rbi-arrow-head)" />
              </svg>
              <div className={styles.layerDiagram}>
                {layers.map((layer, index) => <a href={`#${layer.id}`} className={`${styles.layerBlock} ${styles[`layer${index + 1}`]}`} key={layer.code}>
                  <Icon name={index === 3 ? "award" : index === 0 ? "building" : "chart"} />
                  <strong>{layer.name}</strong><span>({layer.code})</span><p>{layer.summary}</p>
                </a>)}
              </div>
            </figure>
            <div className={styles.layerSummaries}>
              {layers.map((layer) => <article className={styles.layerSummary} id={layer.id} key={layer.code}>
                <h3>{layer.name} <span>({layer.code})</span></h3>
                <ul>{layer.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>)}
            </div>
            <aside className={styles.infoNote} id="progressive-regulation">
              <Icon name="help" />
              <p>Regulations applicable to lower layers generally flow upward to higher layers, unless stated otherwise. NBFC-ML and NBFC-UL are required to have an independent Compliance Function and a Chief Compliance Officer (CCO) framework.</p>
            </aside>
          </section>

          <section className={styles.articleSection} aria-labelledby="regulatory-areas-heading">
            <SectionHeading
              title="Key Regulatory Areas under SBR"
              intro="RBI’s SBR strengthens regulation across multiple dimensions. The key areas include:"
              id="regulatory-areas"
            />
            <div className={styles.regulatoryGrid}>
              {regulatoryAreas.map((area) => <article className={styles.regulatoryCard} id={area.id} key={area.id}>
                <span className={styles.iconBadge}><Icon name={area.icon} /></span><div><h3>{area.title}</h3><p>{area.text}</p></div>
              </article>)}
            </div>
          </section>

          <section className={styles.articleSection} id="practical-compliance" aria-labelledby="practical-compliance-heading">
            <SectionHeading
              title="Practical Compliance Checklist"
              intro="A high-level checklist for NBFCs to assess and strengthen their readiness under SBR."
              id="practical-compliance"
            />
            <ol className={styles.checklist}>{checklist.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
          </section>

          <section className={styles.perspective} id="astronis-perspective" aria-labelledby="astronis-perspective-heading">
            <div className={styles.perspectiveCopy}>
              <span className={styles.eyebrow}>ASTRONIS PERSPECTIVE</span>
              <h2 id="astronis-perspective-heading">Astronis Perspective</h2>
              <p>RBI’s Scale-Based Regulation marks a significant step towards a more resilient and well-governed NBFC sector. NBFCs should view SBR not just as a compliance requirement, but as an opportunity to strengthen their governance, risk management and business resilience for sustainable growth.</p>
            </div>
            <Image src="/images/our-story/mountain-journey.jpg" alt="" fill sizes="(max-width: 700px) 100vw, 35vw" />
          </section>

          <section className={styles.articleSection} id="key-takeaways" aria-labelledby="key-takeaways-heading">
            <SectionHeading title="Key Takeaways" id="key-takeaways" />
            <ol className={styles.takeaways}>{takeaways.map((item) => <li key={item}><p>{item}</p></li>)}</ol>
          </section>

          <section className={styles.articleSection} id="faqs" aria-labelledby="faqs-heading">
            <SectionHeading
              title="FAQs"
              intro="Some of the common questions we receive on RBI’s Scale-Based Regulation for NBFCs."
              id="faqs"
            />
            <div className={styles.faqList}>{faqs.map(([question, answer]) => <details className={styles.faqItem} key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p>
            </details>)}</div>
            <Link href="/faqs" className={styles.textLink}>View All FAQs <Icon name="arrow" /></Link>
          </section>

          <section className={styles.articleSection} id="related-services" aria-labelledby="related-services-heading">
            <SectionHeading
              title="Related Services"
              intro="How Astronis Global can help NBFCs navigate SBR and strengthen their regulatory readiness."
              id="related-services"
            />
            <div className={styles.serviceGrid}>{services.map((service) => <Link className={styles.serviceCard} href={service.href} key={service.title}>
              <span className={styles.iconBadge}><Icon name={service.icon} /></span><h3>{service.title}</h3><p>{service.text}</p><span className={styles.cardLink}>Explore service <Icon name="arrow" /></span>
            </Link>)}</div>
            <Link href="/services" className={styles.textLink}>Explore All Services <Icon name="arrow" /></Link>
          </section>

          <section className={styles.articleSection} id="knowledge-centre" aria-labelledby="knowledge-centre-heading">
            <SectionHeading
              title="Knowledge Centre"
              intro="Explore our curated resources on NBFC regulation, compliance and governance."
              id="knowledge-centre"
            />
            <div className={styles.resourceGrid}>{resources.map((resource) => <article className={styles.resourceCard} key={resource.title}>
              <span className={styles.iconBadge}><Icon name={resource.icon} /></span><h3>{resource.title}</h3><p>{resource.text}</p>
              <button type="button" className={styles.unavailableButton} disabled>Download {resource.format}</button>
              <small>Resource not yet available for download.</small>
            </article>)}</div>
            <Link href="/knowledge-centre" className={styles.textLink}>View All Resources <Icon name="arrow" /></Link>
          </section>

          <section className={styles.testimonialSection} id="client-testimonials" aria-labelledby="client-testimonials-heading">
            <SectionHeading
              title="Client Testimonials & Reviews"
              intro="Hear from our clients on their experience working with Astronis Global."
              id="client-testimonials"
            />
            <InsightsTestimonials items={approvedTestimonials} />
          </section>

          <section className={styles.articleSection} id="astronis-in-conversation" aria-labelledby="astronis-in-conversation-heading">
            <SectionHeading
              eyebrow="ASTRONIS IN CONVERSATION"
              title="Watch. Listen. Discover."
              intro="Expert discussions, industry perspectives and insights on regulatory and compliance developments."
              id="astronis-in-conversation"
            />
            <div className={styles.mediaGrid}>{mediaItems.map((item) => <Link className={styles.mediaCard} href="/media" key={item.title}>
              <span className={styles.mediaImage}><Image src={item.image} alt="" fill sizes="(max-width: 650px) 100vw, 33vw" /><span className={styles.mediaPlay}><Icon name={item.icon} /></span></span>
              <span className={styles.mediaCopy}><strong>{item.title}</strong><span>{item.text}</span></span>
            </Link>)}</div>
            <Link href="/media" className={styles.textLink}>Explore All Media <Icon name="arrow" /></Link>
          </section>

          <p className={styles.disclaimer}>This article is for general information only and is not current regulatory advice. Regulatory details should be reviewed against applicable RBI publications before publication or reliance.</p>
        </div>
      </div>
    </article>
  );
}
