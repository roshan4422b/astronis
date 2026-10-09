"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "../../_components/icon";
import styles from "./service-template.module.css";

type NavChild = { title: string; url: string };
type Item = { id: string; title: string; icon?: string; href?: string; description?: string; children?: NavChild[] };

export default function SectionNavigation({ items, title, variant = "sidebar", showItemNumbers = true, theme }: { items: Item[]; title: string; variant?: "sidebar" | "bar"; showItemNumbers?: boolean; theme?: "licensing" | "fema" | "taxation" | "banking" | "insolvency" }) {
  const [active, setActive] = useState(items[0]?.id || "");
  const [openId, setOpenId] = useState<string | null>(null);
  const navigationRef = useRef<HTMLElement>(null);

  function navigate(id: string, updateHistory = true) {
    const target = document.getElementById(id);
    if (!target) return;
    const navigationHeight = variant === "bar" || window.matchMedia("(max-width: 767px)").matches ? (navigationRef.current?.getBoundingClientRect().height || 80) : 0;
    const offset = (document.querySelector(".site-header")?.getBoundingClientRect().height || 120) + navigationHeight + 24;
    if (updateHistory) window.history.pushState(null, "", `#${id}`);
    setActive(id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset, behavior: reducedMotion || !updateHistory ? "instant" : "smooth" });
    if (updateHistory) target.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const nodes = items.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    const template = nodes[0]?.closest<HTMLElement>("[data-service-template]");
    const header = document.querySelector(".site-header");
    let frame = 0;
    let initialFrame = 0;
    const offset = () => (header?.getBoundingClientRect().height || 120) + (variant === "bar" || window.matchMedia("(max-width: 767px)").matches ? (navigationRef.current?.getBoundingClientRect().height || 80) : 0) + 24;
    const update = () => {
      frame = 0;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= offset() + 50) current = node;
        else break;
      }
      if (current) setActive(current.id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(schedule, { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.1] });
    nodes.forEach(node => observer.observe(node));
    const resize = new ResizeObserver(() => {
      template?.style.setProperty("--service-header-offset", `${(header?.getBoundingClientRect().height || 120) + 20}px`);
      schedule();
    });
    if (header) resize.observe(header);
    const restoreHash = () => {
      let hash: string;
      try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = nodes.find(node => node.id === hash);
      if (target) {
        window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset(), behavior: "instant" });
        setActive(target.id);
      }
    };
    initialFrame = requestAnimationFrame(() => { initialFrame = requestAnimationFrame(restoreHash); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("hashchange", restoreHash);
    window.addEventListener("popstate", restoreHash);
    schedule();
    return () => {
      observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", schedule); window.removeEventListener("hashchange", restoreHash); window.removeEventListener("popstate", restoreHash);
    };
  }, [items, variant]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!navigationRef.current) return;
      if (!navigationRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isBarNavigation = variant === "bar";

  return (
    <nav ref={navigationRef} className={isBarNavigation ? styles.sectionNav : styles.sidebarNav} aria-label={title} data-theme={theme}>
      <div className={styles.navDesktop}>
        <p className={styles.navTitle}>{title}</p>
        <ol className={styles.navList}>
          {items.map((item, index) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;

            return (
              <li key={item.id} className={styles.navItem}>
                <div className={styles.navItemWrap}>
                  <button
                    type="button"
                    className={`${styles.navItemLink} ${isOpen ? styles.navItemLinkActive : ""}`}
                    aria-current={!isBarNavigation && active === item.id ? "location" : undefined}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    aria-controls={hasChildren && isOpen ? panelId : undefined}
                    onClick={() => {
                      if (hasChildren) {
                        setOpenId(current => (current === item.id ? null : item.id));
                        return;
                      }
                      navigate(item.id);
                    }}
                    onMouseEnter={() => { if (hasChildren) setOpenId(item.id); }}
                    onFocus={() => { if (hasChildren) setOpenId(item.id); }}
                  >
                    {isBarNavigation ? (
                      <>
                        <span className={styles.navIcon}><Icon name={item.icon || "file"} /></span>
                        <span className={styles.navItemText}>
                          {showItemNumbers && <small>{`0${index + 1} / EXPLORE`}</small>}
                          <strong>{item.title}</strong>
                        </span>
                        {hasChildren && (
                          <span aria-hidden="true" className={`${styles.navChevronWrap} ${isOpen ? styles.navChevronOpen : ""}`}>
                            <Icon name="chevron" className={styles.navChevron} />
                          </span>
                        )}
                        {!hasChildren && <span className={styles.navArrow} aria-hidden="true">&#8599;</span>}
                      </>
                    ) : (
                      <>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item.title}
                        <span aria-hidden="true">&#8599;</span>
                      </>
                    )}
                  </button>

                </div>
              </li>
            );
          })}
        </ol>
        {(() => {
          const selected = items.find(item => item.id === openId);
          if (!isBarNavigation || !selected?.children?.length) return null;
          const columns = Math.min(3, Math.ceil(selected.children.length / 4));
          const perColumn = Math.ceil(selected.children.length / columns);
          return <div id={`${selected.id}-panel`} className={styles.dropdownPanel} role="region" aria-label={`${selected.title} services`} onMouseEnter={() => setOpenId(selected.id)}>
            <div className={styles.dropdownInner}>
              <div className={styles.dropdownHeading}><span>{selected.title}</span>{selected.description && <p>{selected.description}</p>}</div>
              <div className={styles.dropdownColumns} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {Array.from({ length: columns }, (_, column) => <ul className={styles.dropdownList} key={`${selected.id}-column-${column}`}>
                  {selected.children!.slice(column * perColumn, (column + 1) * perColumn).map(child => <li key={`${selected.id}-${child.url || child.title}`}>
                    <Link href={child.url} className={styles.dropdownItem}><Icon name="arrow" aria-hidden="true" /><span>{child.title}</span></Link>
                  </li>)}
                </ul>)}
              </div>
            </div>
          </div>;
        })()}
      </div>

      <div className={styles.navMobile}>
        {items.some(item => item.children?.length) ? <div className={styles.mobileCategoryList}>
          {items.map((item, index) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openId === item.id;
            const panelId = `${item.id}-mobile-panel`;
            return <div className={styles.mobileCategory} key={item.id}>
              <button type="button" className={styles.mobileCategoryButton} aria-expanded={hasChildren ? isOpen : undefined} aria-controls={hasChildren && isOpen ? panelId : undefined} onClick={() => hasChildren ? setOpenId(current => current === item.id ? null : item.id) : navigate(item.id)}>
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong>
                {hasChildren && <span aria-hidden="true" className={`${styles.navChevronWrap} ${isOpen ? styles.navChevronOpen : ""}`}><Icon name="chevron" className={styles.navChevron} /></span>}
              </button>
              {hasChildren && isOpen && <ul id={panelId} className={styles.mobileChildList} aria-label={`${item.title} services`}>
                {item.children!.map(child => <li key={`${item.id}-${child.url || child.title}`}><Link href={child.url} onClick={() => setOpenId(null)}>{child.title}<span aria-hidden="true">↗</span></Link></li>)}
              </ul>}
            </div>;
          })}
        </div> : <select aria-label={title} value={active} onChange={event => navigate(event.target.value)}>
          {items.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>}
      </div>
    </nav>
  );
}
