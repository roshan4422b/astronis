import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import InsightsTestimonials from "@/app/_components/insights-testimonials";
import Link from "next/link";
import SubscribeForm from "./subscribe-form";
import styles from "../gst-updates.module.css";

const categories = [
  ["building", "Central Government Notifications", "Ministries, Departments and Regulators", "/Banner-Government, Public Sector  Institutions .png"],
  ["building", "State Government Notifications", "All State Departments and Authorities", "/images/india-presence/india-gate.jpg"],
  ["scale", "Regulatory Circulars & Orders", "RBI, SEBI, FEMA, GST, IRDAI, etc.", "/corporate-regulatory-hero.png"],
  ["document", "Policy Announcements", "New policies, schemes and frameworks", "/Part-14 .png"],
  ["file", "Amendments & Rules", "Changes in rules, regulations and compliance requirements", "/governance-secretarial-hero.png"],
  ["chart", "Sector-specific Notifications", "Industry-wise updates and advisories", "/Manufacturing & Industrial .png"],
  ["building", "Schemes, Incentives & Benefits", "Government schemes and financial incentives", "/Banking & Financial Services .png"],
  ["document", "Gazette Publications", "Acts, ordinances and official publications", "/Banner-Government, Public Sector  Institutions .png"],
] as const;

const updates = [
  { day: "06", month: "Oct 2025", label: "CENTRAL GOVERNMENT", title: "Ministry of Corporate Affairs notifies revised forms and filing timelines", topic: "Company Law" },
  { day: "04", month: "Oct 2025", label: "RBI", title: "RBI issues new guidelines on digital lending for NBFCs", topic: "Banking & Finance" },
  { day: "02", month: "Oct 2025", label: "GST", title: "CBIC notifies changes in GST rates for selected goods", topic: "Indirect Tax" },
  { day: "30", month: "Sep 2025", label: "DELHI GOVERNMENT", title: "Delhi Government notifies amendments in building bye-laws", topic: "Real Estate" },
  { day: "28", month: "Sep 2025", label: "MINISTRY OF FINANCE", title: "CBDT issues clarification on TDS provisions", topic: "Direct Tax" },
] as const;

const ministries = [
  ["building", "Ministry of Corporate Affairs (MCA)"],
  ["bank", "Ministry of Finance (CBDT / CBIC)"],
  ["globe", "Ministry of Commerce & Industry"],
  ["people", "Ministry of Labour & Employment"],
  ["leaf", "Ministry of Environment, Forest & Climate Change"],
  ["cpu", "Ministry of Electronics & IT (MeitY)"],
  ["bulb", "Ministry of Power"],
  ["more", "More Ministries"],
] as const;

const states = [
  ["building", "Delhi"],
  ["building", "Maharashtra"],
  ["building", "Uttar Pradesh"],
  ["building", "Gujarat"],
  ["building", "Karnataka"],
  ["building", "Tamil Nadu"],
  ["building", "Rajasthan"],
  ["more", "More States"],
] as const;

const analysis = [
  ["CENTRAL GOVERNMENT", "Ministry of Corporate Affairs updates company filing requirements", "/Banner-Government, Public Sector  Institutions .png"],
  ["REGULATORY UPDATE", "RBI issues new guidelines for digital lending by NBFCs", "/corporate-regulatory-hero.png"],
  ["STATE NOTIFICATION", "Delhi updates building bye-laws and construction approvals", "/images/india-presence/india-gate.jpg"],
] as const;

const resources = [
  ["document", "Guides & Toolkits", "Practical guides, checklists and step-by-step resources.", "Explore Guides", "/Part-14 .png", "/insights/download-useful-documents"],
  ["calendar", "Compliance Calendar", "Important due dates and regulatory timelines.", "View Calendar", "/Part-6 .png", "/insights/compliance-calendar"],
  ["chart", "Research & Reports", "In-depth research and analytical reports.", "View Reports", "/Part-16 .png", "/insights"],
  ["bulb", "FAQs & Explainers", "Plain-language answers to key questions.", "Browse FAQs", "/Part-18 .png", "/faqs"],
] as const;

const episodes = [
  ["Understanding Key Government Policy Changes in 2025", "12 Sep 2025", "1.2K views", "28:15", "/Banner-Government, Public Sector  Institutions .png"],
  ["Regulatory Compliance Trends for Businesses", "06 Sep 2025", "980 views", "32:40", "/corporate-regulatory-hero.png"],
  ["State Policy Reforms and Business Opportunities", "28 Aug 2025", "760 views", "26:18", "/governance-secretarial-hero.png"],
  ["Government Incentives and Sectoral Growth", "20 Aug 2025", "690 views", "24:10", "/Manufacturing & Industrial .png"],
] as const;

const testimonials = [
  ["Astronis Global keeps us updated with all critical government notifications that impact our industry. Their analysis is practical and business-focused.", "Manufacturing Company (India)"],
  ["Clear, timely and accurate updates on regulatory changes. The insights help us take prompt compliance action.", "FinTech Company (India)"],
  ["Their summaries of complex policy notifications make it easy for our team to understand the real impact on our business.", "Renewable Energy Developer"],
] as const;

function SectionHeading({
  title,
  href,
  action,
  subtitle,
}: {
  title: string;
  href: string;
  action: string;
  subtitle?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <Link href={href}>{action}<Icon name="arrow" /></Link>
    </div>
  );
}

export default function GovernmentNotificationsPage() {
  return (
    <>
      <div className={styles.page}>
        <section className={styles.hero}>
          <AssetImage
            src="/Banner-Government, Public Sector  Institutions .png"
            alt=""
            fill
            loading="eager"
            sizes="100vw"
          />
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>›</span>
              <Link href="/insights-events">Insights &amp; Resources</Link><span>›</span>
              <span>Government Notifications</span>
            </nav>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Insights &amp; Resources</span>
              <h1>Government Notifications</h1>
              <h2>Central and States</h2>
              <p>
                Stay updated with the latest government notifications, circulars, orders and policy announcements from Central and State Governments that impact your business, industry and compliance obligations.
              </p>
              <div className={styles.heroActions}>
                <Link href="#latest-notifications">View Latest Notifications <Icon name="arrow" /></Link>
                <Link href="#knowledge-centre">Explore Knowledge Centre <Icon name="arrow" /></Link>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.content}>
          <div className={styles.searchPanel}>
            <form action="/insights/government-notifications" className={styles.searchBox}>
              <label className={styles.srOnly} htmlFor="government-notification-search">
                Search government notifications
              </label>
              <input
                id="government-notification-search"
                type="search"
                name="q"
                placeholder="Search notifications, circulars, orders, schemes or keywords..."
              />
              <Icon name="search" />
            </form>
            <div className={styles.popularTopics}>
              <strong>Popular Searches:</strong>
              <div>
                {["MCA", "RBI", "SEBI", "IFSCA", "FEMA", "GST", "Income Tax", "Labour", "Environment", "More"].map((topic) => (
                  <Link href={`/insights?q=${encodeURIComponent(topic)}`} key={topic}>{topic}</Link>
                ))}
              </div>
            </div>
          </div>

          <section className={styles.section} id="categories">
            <SectionHeading title="Explore Notifications by Category" href="#categories" action="View All Categories" />
            <div className={styles.categoryGrid}>
              {categories.map(([icon, title, description, image]) => (
                <Link href="#latest-notifications" className={styles.categoryCard} key={title}>
                  <span className={styles.categoryImage}>
                    <AssetImage src={image} alt="" fill sizes="(max-width: 600px) 45vw, 25vw" />
                  </span>
                  <span className={styles.categoryIcon}><Icon name={icon} /></span>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.shaded} ${styles.featuredLatest}`} id="latest-notifications">
            <div>
              <SectionHeading title="Featured Government Notification" href="#government-updates" action="View All Notifications" />
              <article className={styles.featuredArticle}>
                <div className={styles.featuredImage}>
                  <AssetImage src="/Banner-Government, Public Sector  Institutions .png" alt="Government buildings in New Delhi" fill sizes="(max-width: 760px) 100vw, 45vw" />
                </div>
                <div className={styles.featuredBody}>
                  <span className={styles.badge}>CENTRAL GOVERNMENT</span>
                  <h3>Ministry of Corporate Affairs notifies revised forms and filing timelines</h3>
                  <p>Key changes in company filings and compliance requirements.</p>
                  <div className={styles.meta}>
                    <span><Icon name="calendar" />06 Oct 2025</span>
                    <span><Icon name="clock" />Government Notification</span>
                  </div>
                  <Link href="/insights" className={styles.readLink}>Read Notification <Icon name="arrow" /></Link>
                </div>
              </article>
            </div>
            <div className={styles.latestColumn} id="government-updates">
              <SectionHeading title="Latest Government Notifications" href="/insights" action="View All Updates" />
              <div className={styles.updateList}>
                {updates.slice(1).map((item) => (
                  <Link href="/insights" className={styles.updateItem} key={item.title}>
                    <span className={styles.updateDate}><strong>{item.day}</strong><small>{item.month}</small></span>
                    <span className={styles.updateText}><small>{item.label}</small><strong>{item.title}</strong></span>
                    <Icon name="arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.analysisThemes} ${styles.governmentCategories}`} id="government-categories">
            <div>
              <SectionHeading title="Browse Notifications by Government" href="/insights" action="View All Notifications" />
              <div className={styles.analysisGrid}>
                {analysis.map(([label, title, image]) => (
                  <article className={styles.analysisCard} key={title}>
                    <AssetImage src={image} alt="" fill sizes="(max-width: 600px) 90vw, 30vw" />
                    <div className={styles.analysisOverlay} />
                    <div className={styles.analysisBody}>
                      <span className={styles.badge}>{label}</span>
                      <h3>{title}</h3>
                      <Link href="/insights" className={styles.readLink}>Read Notification <Icon name="arrow" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className={styles.themes}>
              <SectionHeading title="Quick Links" href="/insights" action="View All Links" />
              <div className={styles.themeGrid}>
                {[
                  ["download", "Download Gazette Notifications", "/insights/download-useful-documents"],
                  ["calendar", "Regulatory Compliance Calendar", "/insights/compliance-calendar"],
                  ["globe", "Important Government Portals", "/insights"],
                  ["building", "Sector-wise Notification Matrix", "/insights"],
                ].map(([icon, title, href]) => (
                  <Link href={href} className={styles.themeCard} key={title}>
                    <Icon name={icon} /><span>{title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.shaded} ${styles.governmentMinistries}`} id="government-ministries">
            <SectionHeading title="Central Government Ministries" href="/insights" action="View All Ministries" />
            <div className={styles.themeGrid}>
              {ministries.map(([icon, ministry]) => (
                <Link
                  href={`/insights?q=${encodeURIComponent(ministry)}`}
                  className={styles.themeCard}
                  key={ministry}
                >
                  <Icon name={icon} /><span>{ministry}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.shaded} ${styles.governmentStates}`} id="state-notifications">
            <SectionHeading title="State Government Notifications" href="/insights" action="View All States" />
            <div className={styles.themeGrid}>
              {states.map(([icon, state]) => (
                <Link href="/insights" className={styles.themeCard} key={state}>
                  <Icon name={icon} /><span>{state}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.shaded} ${styles.governmentKnowledge}`} id="knowledge-centre">
            <SectionHeading title="Knowledge Centre" href="/insights" action="View All Resources" />
            <div className={styles.resourceGrid}>
              {resources.map(([icon, title, description, action, image, href]) => (
                <Link href={href} className={styles.resourceCard} key={title}>
                  <span className={styles.resourceImage}><AssetImage src={image} alt="" fill sizes="(max-width: 600px) 90vw, 25vw" /></span>
                  <span className={styles.resourceIcon}><Icon name={icon} /></span>
                  <span className={styles.resourceBody}><strong>{title}</strong><span>{description}</span><em>{action} <Icon name="arrow" /></em></span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.section} id="conversation">
            <SectionHeading title="ASTRONIS IN CONVERSATION" href="/media" action="View All Episodes" subtitle="Watch. Listen. Discover." />
            <div className={styles.conversationGrid}>
              {episodes.map(([title, date, views, duration, image]) => (
                <article className={styles.episodeCard} key={title}>
                  <Link href="/media" className={styles.episodeImage} aria-label={`Play ${title}`}>
                    <AssetImage src={image} alt="" fill sizes="(max-width: 600px) 90vw, 20vw" />
                    <span className={styles.playButton}><Icon name="play" /></span>
                    <small>{duration}</small>
                  </Link>
                  <div className={styles.episodeBody}>
                    <strong>{title}</strong>
                    <span><Icon name="calendar" />{date}<i /><Icon name="play" />{views}</span>
                  </div>
                </article>
              ))}
              <aside className={styles.promoPanel}>
                <span>Conversations with</span>
                <strong>Industry Experts,<br />Regulators<br />and Thought Leaders.</strong>
                <Link href="/media">Explore All Episodes <Icon name="arrow" /></Link>
              </aside>
            </div>
          </section>

          <section className={`${styles.section} ${styles.shaded} ${styles.testimonials}`} id="client-testimonials">
            <SectionHeading title="Client Testimonials" href="/clients" action="View All Testimonials" />
            <InsightsTestimonials items={testimonials.map(([quote, company]) => ({ quote, company }))} />
          </section>
        </div>

        <section className={styles.cta}>
          <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
          <div className={styles.ctaShade} />
          <div className={styles.ctaInner}>
            <div>
              <h2>Stay Informed. Stay Compliant.</h2>
              <p>Get the latest government notifications, regulatory updates and expert analysis directly to your inbox.</p>
            </div>
            <SubscribeForm />
          </div>
        </section>
      </div>
    </>
  );
}
