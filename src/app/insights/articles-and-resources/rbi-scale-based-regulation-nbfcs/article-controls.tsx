"use client";

import { useEffect, useState } from "react";
import Icon from "@/app/_components/icon";
import styles from "./rbi-sbr-article.module.css";

const contents = [
  ["overview", "Overview", "document"],
  ["why-sbr", "Why SBR", "target"],
  ["four-layer-framework", "Four-Layer Framework", "chart"],
  ["base-layer", "Base Layer", "building"],
  ["middle-layer", "Middle Layer", "building"],
  ["upper-layer", "Upper Layer", "building"],
  ["top-layer", "Top Layer", "award"],
  ["progressive-regulation", "Progressive Regulation", "arrow"],
  ["capital-prudential-norms", "Capital & Prudential Norms", "bank"],
  ["governance-cco", "Governance & CCO", "people"],
  ["risk-compliance", "Risk & Compliance", "shield"],
  ["customer-protection", "Customer Protection", "handshake"],
  ["digital-lending", "Digital Lending", "laptop"],
  ["practical-compliance", "Practical Compliance", "checklist"],
  ["astronis-perspective", "Astronis Perspective", "compass"],
  ["key-takeaways", "Key Takeaways", "file"],
  ["faqs", "FAQs", "help"],
  ["related-services", "Related Services", "folder"],
  ["knowledge-centre", "Knowledge Centre", "download"],
  ["client-testimonials", "Client Testimonials", "message"],
  ["astronis-in-conversation", "Astronis in Conversation", "play"],
] as const;

export function ShareControls() {
  const [shareMessage, setShareMessage] = useState("");
  const encodedTitle = encodeURIComponent(
    "RBI’s Scale-Based Regulation for NBFCs: Understanding the Four-Layer Regulatory Framework",
  );
  const shareLinks = [
    {
      name: "LinkedIn",
      className: styles.linkedin,
      href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: <><circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" /><path d="M4 8v8m4-8v8m0-4a4 4 0 0 1 8 0v4" /></>,
    },
    {
      name: "X",
      className: styles.xShare,
      href: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodedTitle}`,
      icon: <path d="m4 4 16 16M20 4 4 20M4 4h5l11 16h-5L4 4Z" />,
    },
    {
      name: "Facebook",
      className: styles.facebook,
      href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />,
    },
    {
      name: "WhatsApp",
      className: styles.whatsapp,
      href: (url: string) => `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodeURIComponent(url)}`,
      icon: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.5 2 2 3.5 4.5 4.5l1-1 2 1c-.2 1.5-1.2 2.2-2.5 2-3.5-.7-6.4-3.5-7-7-.2-1.2.5-2.2 2-2.5l1 2-1 1Z" /></>,
    },
  ] as const;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Article link copied.");
    } catch {
      setShareMessage("Could not copy the link. Please copy the page address from your browser.");
    }
  }

  return (
    <div className={styles.shareRow}>
      <span>Share this article</span>
      <div className={styles.shareButtons}>
        {shareLinks.map((item) => (
          <button
            key={item.name}
            className={`${styles.shareButton} ${item.className}`}
            type="button"
            onClick={() => window.open(item.href(window.location.href), "_blank", "noopener,noreferrer")}
            aria-label={`Share on ${item.name}`}
            title={`Share on ${item.name}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>
          </button>
        ))}
        <button
          type="button"
          className={`${styles.shareButton} ${styles.copyShare}`}
          onClick={copyLink}
          aria-label="Copy article link"
          title="Copy article link"
        >
          <Icon name="file" />
        </button>
      </div>
      <span className={styles.shareStatus} aria-live="polite">{shareMessage}</span>
    </div>
  );
}

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const sections = contents
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -68% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function navigateTo(id: string) {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className={styles.toc} aria-label="Article contents">
      <h2>On this page</h2>
      <label className={styles.tocSelectLabel} htmlFor="article-toc-select">Jump to section</label>
      <select
        id="article-toc-select"
        className={styles.tocSelect}
        value={activeId}
        onChange={(event) => navigateTo(event.target.value)}
      >
        {contents.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
      </select>
      <ol>
        {contents.map(([id, title, icon]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeId === id ? styles.activeTocLink : undefined}
              aria-current={activeId === id ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(id);
                window.history.replaceState(null, "", `#${id}`);
              }}
            >
              <Icon name={icon} />
              <span>{title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
