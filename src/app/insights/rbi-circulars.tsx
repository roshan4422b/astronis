'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import AssetImage from '@/app/_components/asset-image';
import Icon from '@/app/_components/icon';
import EmailOtpVerification from '@/app/_components/email-otp-verification';
import InsightsTestimonials from '@/app/_components/insights-testimonials';
import styles from './gst-updates.module.css';

const categoryCards = [
  {
    title: 'Banking Regulation',
    description: 'Scheduled & Co-operative Banks, Payments, Digital Banking',
    image: '/Banking & Financial Services1 .png',
    icon: 'building',
  },
  {
    title: 'NBFCs and HFCs',
    description: 'Scale Based Regulation, Compliance, Prudential Norms',
    image: '/Banking & Financial Services1 .png',
    icon: 'building',
  },
  {
    title: 'FinTech and Digital Payments',
    description: 'Payment Systems, Digital Lending, UPI, Innovation',
    image: '/FinTech & Digital Finance .png',
    icon: 'chart',
  },
  {
    title: 'Foreign Exchange (FEMA)',
    description: 'Current Account, Capital Account, Liberalisation Measures',
    image: '/Part-14 .png',
    icon: 'globe',
  },
  {
    title: 'Prudential Norms and Supervision',
    description: 'Asset Classification, Provisioning, Risk Management',
    image: '/Part-6 .png',
    icon: 'scale',
  },
  {
    title: 'KYC, AML and Compliance',
    description: 'Customer Due Diligence, Prevention of Financial Frauds',
    image: '/Part-5 .png',
    icon: 'lock',
  },
  {
    title: 'Consumer Protection and Ombudsman',
    description: 'Customer Service, Grievance Redressal, Fair Practices',
    image: '/Part-7 .png',
    icon: 'shield',
  },
  {
    title: 'Other Directions and Guidelines',
    description: 'Miscellaneous circulars, advisories and clarifications',
    image: '/Part-8 .png',
    icon: 'file',
  },
] as const;

const latestCirculars = [
  {
    date: '06 Oct 2025',
    category: 'DIGITAL LENDING',
    title: 'RBI/2025-26/123 – Digital Lending Guidelines for NBFCs',
  },
  {
    date: '04 Oct 2025',
    category: 'NBFC',
    title: 'Revised Prudential Norms for NBFCs – Scale Based Regulation',
  },
  {
    date: '28 Sep 2025',
    category: 'PAYMENT SYSTEMS',
    title: 'Master Direction on Payment Aggregators – Updated Guidelines',
  },
  {
    date: '20 Sep 2025',
    category: 'KYC / AML',
    title: 'Customer Due Diligence – Revised Instructions',
  },
  {
    date: '12 Sep 2025',
    category: 'FEMA',
    title: 'Liberalised Remittance Scheme – Enhanced Limits and Reporting',
  },
] as const;

const insights = [
  {
    badge: 'ANALYSIS',
    title: 'RBI\'s Scale-Based Regulation for NBFCs: Understanding the Four-Layer Framework',
    date: '28 Sep 2025',
    readTime: '6 min read',
    image: '/Part-12 .png',
  },
  {
    badge: 'EXPERT VIEW',
    title: 'Digital Payments Ecosystem in India: Key Regulatory Developments',
    date: '22 Sep 2025',
    readTime: '7 min read',
    image: '/Part-11 .png',
  },
  {
    badge: 'SECTOR FOCUS',
    title: 'RBI\'s Cyber Security Framework for Regulated Entities',
    date: '15 Sep 2025',
    readTime: '5 min read',
    image: '/Part-10 .png',
  },
] as const;

const themes = [
  'Digital Lending and FinTech',
  'NBFC & HFC Regulation',
  'Payment Systems and UPI',
  'Foreign Exchange (FEMA)',
  'KYC, AML & Fraud Prevention',
  'Consumer Protection & Ombudsman',
  'Climate & Sustainable Finance',
  'Regulatory Sandbox',
] as const;

const themeIcons = ['chart', 'building', 'chart', 'globe', 'shield', 'person', 'globe', 'bulb'] as const;

const knowledgeResources = [
  {
    title: 'Guides & Toolkits',
    description: 'Practical guides, checklists and implementation resources.',
    cta: 'Explore Guides →',
    icon: 'file',
    image: '/Part-14 .png',
  },
  {
    title: 'Compliance Calendar',
    description: 'Important due dates and regulatory timelines.',
    cta: 'View Calendar →',
    icon: 'calendar',
    image: '/Part-6 .png',
  },
  {
    title: 'Research & Reports',
    description: 'In-depth research and RBI regulatory publications.',
    cta: 'View Reports →',
    icon: 'document',
    image: '/Part-16 .png',
  },
  {
    title: 'FAQs & Explainers',
    description: 'Plain-language answers to key RBI regulatory questions.',
    cta: 'Browse FAQs →',
    icon: 'help',
    image: '/Part-18 .png',
  },
] as const;

const conversations = [
  {
    title: "RBI's Evolving Regulatory Approach for NBFCs",
    date: '12 Sep 2025',
    duration: '28:15',
    image: '/Part-9 .png',
  },
  {
    title: 'Digital Lending: Opportunities and Regulatory Safeguards',
    date: '05 Sep 2025',
    duration: '32:40',
    image: '/Part-8 .png',
  },
  {
    title: "India's Payment Ecosystem: Trends and Outlook",
    date: '28 Aug 2025',
    duration: '26:18',
    image: '/Part-10 .png',
  },
  {
    title: 'FEMA Developments and Cross-Border Investments',
    date: '20 Aug 2025',
    duration: '24:10',
    image: '/Part-11 .png',
  },
] as const;

const testimonials = [
  {
    quote:
      "Astronis Global's RBI regulatory insights help us anticipate compliance requirements and make informed strategic decisions.",
    company: 'FinTech Company (India)',
  },
  {
    quote:
      'The analysis on RBI circulars is clear, practical and extremely useful for our compliance and business teams.',
    company: 'NBFC (India)',
  },
  {
    quote:
      'Timely updates and sector-wise analysis have been invaluable for our regulatory planning and growth strategy.',
    company: 'Banking Institution (India)',
  },
] as const;

const popularTopics = ['NBFC', 'Banking', 'Digital Lending', 'Payments', 'KYC', 'FEMA', 'Regulatory Framework'];

const heroImage = '/Banking & Financial Services1 .png';

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
      <Link href={href}>
        {action} <Icon name="arrow" />
      </Link>
    </div>
  );
}

export default function RbiCircularsPage() {
  const [query, setQuery] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredCategories = useMemo(
    () =>
      categoryCards.filter(
        (card) =>
          !query ||
          [card.title, card.description].some((value) => value.toLowerCase().includes(query.toLowerCase())),
      ),
    [query],
  );

  const filteredCirculars = useMemo(
    () =>
      latestCirculars.filter(
        (item) =>
          !query ||
          [item.category, item.title, item.date].some((value) => value.toLowerCase().includes(query.toLowerCase())),
      ),
    [query],
  );

  const filteredInsights = useMemo(
    () =>
      insights.filter(
        (item) =>
          !query ||
          [item.badge, item.title, item.date].some((value) =>
            value.toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    [query],
  );

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubscribeStatus('');

    try {
      const response = await fetch('/api/insights-subscribe', {
        method: 'POST',
        body: new FormData(form),
      });
      const result: { message?: string } = await response.json();
      setSubscribeStatus(result.message || 'We could not process your subscription request.');
      if (response.ok) form.reset();
    } catch {
      setSubscribeStatus('We could not send your request. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <AssetImage
          src={heroImage}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/insights-events">Insights &amp; Resources</Link>
            <span>›</span>
            <span>RBI Circulars</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Insights &amp; Resources</span>
            <h1>RBI Circulars</h1>
            <h2>Reserve Bank of India Updates.</h2>
            <p>
              Stay informed with the latest RBI circulars, notifications, directions and regulatory
              developments that impact banks, NBFCs, FinTechs and businesses across India.
            </p>
            <div className={styles.heroActions}>
              <Link href="#latest-rbi">
                Explore Latest RBI Updates <Icon name="arrow" />
              </Link>
              <Link href="/insights">
                Explore Knowledge Centre <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.searchPanel}>
          <label className={styles.searchBox}>
            <span className={styles.srOnly}>Search RBI circulars</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search RBI circulars, notifications, master directions or topics..."
            />
            <Icon name="search" />
          </label>
          <div className={styles.popularTopics}>
            <strong>Popular Topics:</strong>
            <div>
              {popularTopics.map((topic) => (
                <button key={topic} type="button" onClick={() => setQuery(topic)}>
                  {topic}
                </button>
              ))}
              <button type="button" onClick={() => setQuery('')}>
                More <Icon name="chevron" />
              </button>
            </div>
          </div>
        </div>

      <section className={styles.section} id="categories">
        <SectionHeading title="Explore RBI Updates by Category" href="#categories" action="View All Categories" />
          <div className={styles.categoryGrid}>
            {filteredCategories.map((card) => (
              <Link href="#latest-rbi" key={card.title} className={styles.categoryCard}>
                <span className={styles.categoryImage}>
                  <AssetImage
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 45vw, 25vw"
                  />
                </span>
                <span className={styles.categoryIcon}><Icon name={card.icon} /></span>
                <strong>{card.title}</strong>
                <span>{card.description}</span>
              </Link>
            ))}
          </div>
      </section>

      <section className={`${styles.section} ${styles.shaded} ${styles.featuredLatest}`} id="latest-rbi">
            <div>
              <SectionHeading title="Featured RBI Update" href="/insights" action="Read Full Analysis" />
              <article className={styles.featuredArticle}>
                <div className={styles.featuredImage}>
                  <AssetImage
                    src="/Part-13 .png"
                    alt="Featured RBI update"
                    fill
                    sizes="(max-width: 700px) 100vw, 45vw"
                  />
                </div>
                <div className={styles.featuredBody}>
                  <span className={styles.badge}>FEATURED CIRCULAR</span>
                  <h3>RBI issues revised guidelines on Digital Lending for NBFCs</h3>
                  <p>Key changes in customer consent, data handling and risk management framework.</p>
                  <div className={styles.meta}>
                    <span><Icon name="calendar" />06 Oct 2025</span>
                    <span><Icon name="clock" />8 min read</span>
                    <span><Icon name="person" />Astronis Global Editorial Team</span>
                  </div>
                  <Link href="/insights" className={styles.readLink}>
                    Read Full Analysis <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            </div>

            <div className={styles.latestColumn}>
              <SectionHeading title="Latest RBI Circulars" href="/insights" action="View All Updates" />
              <div className={styles.updateList}>
                {filteredCirculars.map((item) => (
                    <Link href="/insights" key={`${item.date}-${item.title}`} className={styles.updateItem}>
                      <span className={styles.updateDate}>
                        <strong>{item.date.split(' ')[0]}</strong>
                        <small>{item.date.split(' ').slice(1).join(' ')}</small>
                      </span>
                      <span className={styles.updateText}>
                        <small>{item.category}</small>
                        <strong>{item.title}</strong>
                      </span>
                      <Icon name="arrow" />
                    </Link>
                ))}
                {filteredCirculars.length === 0 && (
                  <p className={styles.emptyState}>No matching RBI circulars found. Try another search.</p>
                )}
              </div>
            </div>
      </section>

      <section className={`${styles.section} ${styles.analysisThemes}`} id="insights-analysis">
            <div>
              <SectionHeading title="RBI Insights &amp; Analysis" href="/insights" action="View All Insights" />
              <div className={styles.analysisGrid}>
                {filteredInsights.map((article) => (
                  <article key={article.title} className={styles.analysisCard}>
                    <AssetImage src={article.image} alt="" fill sizes="(max-width: 700px) 90vw, 30vw" />
                    <div className={styles.analysisOverlay} />
                    <div className={styles.analysisBody}>
                      <span className={styles.badge}>{article.badge}</span>
                      <h3>{article.title}</h3>
                      <div className={styles.meta}>
                        <span><Icon name="calendar" />{article.date}</span>
                        <span><Icon name="clock" />{article.readTime}</span>
                      </div>
                      <Link href="/insights" className={styles.readLink}>
                        Read Analysis <Icon name="arrow" />
                      </Link>
                    </div>
                  </article>
                ))}
                {filteredInsights.length === 0 && (
                  <p className={styles.emptyState}>No analysis matches your search. Try another keyword.</p>
                )}
              </div>
            </div>

            <div className={styles.themes}>
              <SectionHeading title="Key RBI Themes" href="#categories" action="View All Themes" />
              <div className={styles.themeGrid}>
                {themes.map((theme, index) => (
                  <Link href="/insights" key={theme} className={styles.themeCard}>
                    <Icon name={themeIcons[index]} />
                    <span>{theme}</span>
                  </Link>
                ))}
              </div>
            </div>
      </section>

      <section className={`${styles.section} ${styles.shaded}`} id="knowledge-centre">
          <SectionHeading title="Knowledge Centre" href="/resources" action="View All Resources" />
          <div className={styles.resourceGrid}>
            {knowledgeResources.map((resource) => (
              <Link href="/resources" key={resource.title} className={styles.resourceCard}>
                <span className={styles.resourceImage}>
                  <AssetImage src={resource.image} alt="" fill sizes="(max-width: 700px) 45vw, 25vw" />
                </span>
                <span className={styles.resourceIcon}><Icon name={resource.icon} /></span>
                <span className={styles.resourceBody}>
                  <strong>{resource.title}</strong>
                  <span>{resource.description}</span>
                  <em>{resource.cta} <Icon name="arrow" /></em>
                </span>
              </Link>
            ))}
          </div>
      </section>

      <section className={styles.section} id="conversation">
        <SectionHeading
          title="ASTRONIS IN CONVERSATION"
          href="/media"
          action="View All Episodes"
          subtitle="Watch. Listen. Discover."
        />
          <div className={styles.conversationGrid}>
            {conversations.map((video) => (
              <article key={video.title} className={styles.episodeCard}>
                <Link href="/media" className={styles.episodeImage} aria-label={`Play ${video.title}`}>
                  <AssetImage
                    src={video.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 45vw, 20vw"
                  />
                  <span className={styles.playButton}><Icon name="play" /></span>
                  <small>{video.duration}</small>
                </Link>
                <div className={styles.episodeBody}>
                  <strong>{video.title}</strong>
                  <span><Icon name="calendar" />{video.date}<i /><Icon name="play" />{video.duration}</span>
                </div>
              </article>
            ))}

            <aside className={styles.promoPanel}>
              <span>Conversations with</span>
              <strong>Industry Experts,<br />Regulators and<br />Thought Leaders.</strong>
              <Link href="/media">
                Explore All Episodes <Icon name="arrow" />
              </Link>
            </aside>
          </div>
      </section>

      <section className={`${styles.section} ${styles.shaded}`} id="client-testimonials">
        <SectionHeading title="Client Testimonials" href="/testimonials" action="View All Testimonials" />
          <InsightsTestimonials items={testimonials} />
      </section>
      </div>

      <section className={styles.cta}>
        <AssetImage src="/corporate-regulatory-hero.png" alt="" fill sizes="100vw" />
        <div className={styles.ctaShade} />
        <div className={styles.ctaInner}>
          <div>
            <h2>Stay Ahead of Regulatory Change.</h2>
            <p>Get the latest RBI updates, regulatory insights and expert analysis from Astronis Global.</p>
          </div>
          <form onSubmit={subscribe}>
            <div>
              <label className={styles.srOnly} htmlFor="rbi-subscribe-email">Email address</label>
              <input
                id="rbi-subscribe-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                maxLength={180}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Subscribe'} <Icon name="arrow" />
              </button>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" name="consent" value="yes" required />
              I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link>
            </label>
            <EmailOtpVerification />
            {subscribeStatus && <p role="status">{subscribeStatus}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
