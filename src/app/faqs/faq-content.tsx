"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AssetImage from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import styles from "./faq-content.module.css";

type FAQCategory =
  | "Insights & Resources"
  | "Regulatory Updates"
  | "Compliance Calendar"
  | "Knowledge Centre"
  | "Downloads & Templates"
  | "Research & Reports"
  | "Astronis in Conversation"
  | "Subscriptions & Alerts"
  | "Professional Guidance";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
};

const categories = [
  "All FAQs",
  "Insights & Resources",
  "Regulatory Updates",
  "Compliance Calendar",
  "Knowledge Centre",
  "Downloads & Templates",
  "Research & Reports",
  "Astronis in Conversation",
  "Subscriptions & Alerts",
  "Professional Guidance",
] as const;

const faqs: FAQItem[] = [
  {
    id: "faq-01",
    question: "What is the Astronis Global Insights & Resources Centre?",
    answer:
      "The Insights & Resources Centre is Astronis Global’s knowledge platform for legal, regulatory, corporate and business developments. It brings together regulatory updates, legal developments, government notifications, research, compliance resources, case studies, practical guides and other professional content relevant to businesses, institutions, professionals and entrepreneurs.",
    category: "Insights & Resources",
  },
  {
    id: "faq-02",
    question: "What type of content is available under Insights & Resources?",
    answer:
      "The section may include Regulatory Updates, Legal Updates, Business Updates, Government Notifications, RBI Circulars, SEBI Updates, MCA Updates, GST Updates, Start-up & MSME Updates, Compliance Calendars, White Papers, Research Reports, Case Studies, Success Stories, Guides, FAQs and downloadable resources.",
    category: "Insights & Resources",
  },
  {
    id: "faq-03",
    question: "How frequently are regulatory and legal updates published?",
    answer:
      "Updates may be published whenever there is a material legal, regulatory, judicial or policy development. Astronis Global may also publish periodic analyses, compliance updates and sector-specific summaries depending upon the significance of the development.",
    category: "Regulatory Updates",
  },
  {
    id: "faq-04",
    question: "Which regulators and authorities are covered?",
    answer:
      "Coverage may include developments from the MCA, RBI, SEBI, IFSCA, GST authorities, DPIIT, MSME authorities and other Central and State Government departments, ministries and sector-specific regulators, depending upon the subject matter.",
    category: "Regulatory Updates",
  },
  {
    id: "faq-05",
    question: "Can I find important Government notifications and circulars here?",
    answer:
      "Yes. The platform is intended to provide organised access to selected notifications, circulars, rules, amendments, directions, master directions, regulatory announcements and policy developments issued by relevant Central and State authorities.",
    category: "Regulatory Updates",
  },
  {
    id: "faq-06",
    question:
      "Does Astronis Global explain the practical impact of regulatory changes?",
    answer:
      "Yes. Wherever appropriate, an update should go beyond merely reporting a development and explain what has changed, who may be affected, the effective date, key compliance considerations, potential business impact and suggested action points.",
    category: "Regulatory Updates",
  },
  {
    id: "faq-07",
    question: "What is the Compliance Calendar?",
    answer:
      "The Compliance Calendar is intended to help businesses track important statutory and regulatory due dates. Separate calendars may be maintained for MCA/company law, GST and Income Tax, with additional regulatory calendars introduced for other practice areas where appropriate.",
    category: "Compliance Calendar",
  },
  {
    id: "faq-08",
    question:
      "Can I rely on the Compliance Calendar as the final statutory due date?",
    answer:
      "The calendar is provided as a general information and planning resource. Due dates can change through notifications, extensions, judicial orders or regulatory directions. Users should verify the applicable requirement and obtain professional advice where necessary before acting upon a deadline.",
    category: "Compliance Calendar",
  },
  {
    id: "faq-09",
    question: "What are Astronis Global White Papers and Research Reports?",
    answer:
      "White Papers and Research Reports are longer-form publications examining significant legal, regulatory, industry and business issues. They may analyse regulatory frameworks, emerging risks, market developments, sector trends and their practical implications.",
    category: "Research & Reports",
  },
  {
    id: "faq-10",
    question: "What is available in the Knowledge Centre?",
    answer:
      "The Knowledge Centre is the practical resource library within the Astronis ecosystem. It may contain guides and toolkits, compliance checklists, FAQs and explainers, research materials, regulatory resources, downloadable documents and other reference materials.",
    category: "Knowledge Centre",
  },
  {
    id: "faq-11",
    question: "Can I download documents and templates from the website?",
    answer:
      "Yes. The Downloads section may provide selected useful materials such as the Astronis Global profile, authority letter, Vakalatnama, General Power of Attorney, Special Power of Attorney, client information forms, KYC checklists, board-resolution formats, compliance checklists and other approved resources. Users should review whether a template is appropriate for their particular circumstances before using it.",
    category: "Downloads & Templates",
  },
  {
    id: "faq-12",
    question: "Are the legal forms and templates ready for direct execution?",
    answer:
      "Not necessarily. Templates are general reference materials and may require modification according to the transaction, jurisdiction, parties and applicable law. Documents involving substantial rights or obligations should ordinarily be professionally reviewed before signing or filing.",
    category: "Downloads & Templates",
  },
  {
    id: "faq-13",
    question: "What are Case Studies & Success Stories?",
    answer:
      "Case Studies & Success Stories illustrate selected challenges, advisory approaches and outcomes across Astronis Global's practice areas and industries. Any published material should be appropriately anonymised or used with necessary permission and should respect professional confidentiality obligations.",
    category: "Knowledge Centre",
  },
  {
    id: "faq-14",
    question: "Can I search Insights by service or industry?",
    answer:
      "Yes. The architecture should allow users to explore content by service, industry, regulator, topic, content type and publication date, making it easier to locate information relevant to a particular business or regulatory issue.",
    category: "Insights & Resources",
  },
  {
    id: "faq-15",
    question:
      "What is “Astronis in Conversation — Watch. Listen. Discover.”?",
    answer:
      "Astronis in Conversation is the multimedia knowledge platform proposed for interviews, discussions, explainers, webinars and conversations with professionals, industry participants, subject-matter specialists and thought leaders on important legal, regulatory and business developments.",
    category: "Astronis in Conversation",
  },
  {
    id: "faq-16",
    question: "Can I subscribe to regulatory updates and client alerts?",
    answer:
      "The website can provide an option to subscribe to selected legal updates, regulatory alerts, compliance reminders, industry insights and new publications according to the user's chosen areas of interest.",
    category: "Subscriptions & Alerts",
  },
  {
    id: "faq-17",
    question:
      "Can businesses request research on a particular regulatory issue?",
    answer:
      "Yes. Businesses may contact Astronis Global for tailored research, regulatory assessment, legal analysis or advisory assistance concerning a particular transaction, compliance issue, industry or regulatory development. Such work would constitute a separate professional assignment.",
    category: "Research & Reports",
  },
  {
    id: "faq-18",
    question:
      "Are Insights & Resources a substitute for professional advice?",
    answer:
      "No. Publications, calendars, FAQs, templates and other resources are intended for general information and knowledge purposes. They should not be treated as legal, tax, regulatory, financial or other professional advice for a specific matter.",
    category: "Professional Guidance",
  },
  {
    id: "faq-19",
    question: "How can I verify whether an article is still current?",
    answer:
      "Each publication should display its publication/update date and, where relevant, links or references to the underlying regulatory material. Since laws and regulatory positions may subsequently change, users should check the latest applicable position before relying on an older publication.",
    category: "Regulatory Updates",
  },
  {
    id: "faq-20",
    question:
      "How can I speak with Astronis Global about an Insight or regulatory development?",
    answer:
      "Each Insight page should contain a “Speak With Our Advisory Team” or “Discuss This Development” option connecting the reader with the relevant Astronis Global service or enquiry page.",
    category: "Professional Guidance",
  },
];

export default function FAQContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All FAQs");
  const [openId, setOpenId] = useState<string | null>(null);

  const visibleFAQs = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All FAQs" || faq.category === activeCategory;
      const matchesSearch =
        !term ||
        faq.question.toLocaleLowerCase().includes(term) ||
        faq.answer.toLocaleLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  function resetFilters() {
    setSearch("");
    setActiveCategory("All FAQs");
    setOpenId(null);
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <AssetImage
          src="/corporate-regulatory-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/insights-events">Insights &amp; Resources</Link>
            <span aria-hidden="true">/</span>
            <Link href="/knowledge-centre">Knowledge Centre</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">FAQs</span>
          </nav>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Insights &amp; Resources FAQs</span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Find answers to common questions about Astronis Global’s Insights
              &amp; Resources Centre, regulatory updates, compliance resources,
              Knowledge Centre, downloadable documents and professional
              insights.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/insights-events">
                Explore Insights &amp; Resources
                <Icon name="arrow" />
              </Link>
              <Link className={styles.secondaryButton} href="/contact">
                Contact Our Team
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <div className={`container ${styles.content}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>Knowledge Centre</span>
            <h2 id="faq-heading">How can we help?</h2>
            <p>Search our answers or browse FAQs by topic.</p>
          </div>

          <div className={styles.searchArea}>
            <label className={styles.searchBox}>
              <Icon name="search" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search frequently asked questions..."
                aria-label="Search frequently asked questions"
              />
            </label>
            {(search || activeCategory !== "All FAQs") && (
              <button
                className={styles.resetButton}
                type="button"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          <div
            className={styles.categoryList}
            role="group"
            aria-label="Filter FAQs by category"
          >
            {categories.map((category) => (
              <button
                className={`${styles.categoryChip}${activeCategory === category ? ` ${styles.categoryChipActive}` : ""}`}
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenId(null);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <p className={styles.resultCount} role="status" aria-live="polite">
            Showing {visibleFAQs.length} of {faqs.length} FAQs
          </p>

          {visibleFAQs.length > 0 ? (
            <div className={styles.faqList}>
              {visibleFAQs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <article className={styles.faqItem} key={faq.id}>
                    <h3 className={styles.questionHeading}>
                      <button
                        className={styles.questionButton}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${faq.id}-answer`}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                      >
                        <span className={styles.questionNumber}>
                          {faq.id.slice(-2)}
                        </span>
                        <span className={styles.questionText}>
                          {faq.question}
                        </span>
                        <span
                          className={`${styles.toggleIcon}${isOpen ? ` ${styles.toggleIconOpen}` : ""}`}
                          aria-hidden="true"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div
                      className={styles.answer}
                      id={`${faq.id}-answer`}
                      aria-hidden={!isOpen}
                      data-open={isOpen}
                    >
                      <div className={styles.answerInner}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.noResults}>
              <Icon name="search" />
              <p>No FAQs found matching your search.</p>
              <button
                type="button"
                className={styles.noResultsButton}
                onClick={resetFilters}
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`container ${styles.cta}`}>
          <div>
            <span className={styles.eyebrow}>Astronis Global</span>
            <h2>Need More Information?</h2>
            <p>
              If you have a specific regulatory, legal, compliance or business
              question, connect with the relevant Astronis Global team.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link className={styles.primaryButton} href="/contact">
              Speak With Our Advisory Team
              <Icon name="arrow" />
            </Link>
            <Link className={styles.secondaryButton} href="/contact">
              Contact Us
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
