"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AdminIcon } from "./admin-ui";
import { useAdminState } from "./admin-state";
import styles from "./admin.module.css";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: "grid", group: "Overview" },
  { label: "Services", href: "/admin/services", icon: "services", group: "Website management" },
  { label: "Industries", href: "/admin/industries", icon: "globe", group: "Website management" },
  { label: "Professionals", href: "/admin/professionals", icon: "people", group: "Website management" },
  { label: "Insights & Resources", href: "/admin/insights", icon: "insights", group: "Content" },
  { label: "Global Presence", href: "/admin/global-presence", icon: "globe", group: "Content" },
  { label: "Technology & Digital", href: "/admin/technology", icon: "tech", group: "Content" },
  { label: "Contact Enquiries", href: "/admin/enquiries", icon: "inbox", group: "Engagement" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "quote", group: "Engagement" },
  { label: "SEO Management", href: "/admin/seo", icon: "search", group: "Configuration" },
  { label: "Settings", href: "/admin/settings", icon: "settings", group: "Configuration" },
];

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/services": "Services",
  "/admin/industries": "Industries",
  "/admin/professionals": "Professionals",
  "/admin/insights": "Insights & Resources",
  "/admin/insights/new": "New Insight",
  "/admin/enquiries/new": "Add New Enquiry",
  "/admin/testimonials/new": "Add New Testimonial",
  "/admin/global-presence": "Global Presence",
  "/admin/technology": "Technology & Digital",
  "/admin/enquiries": "Contact Enquiries",
  "/admin/testimonials": "Testimonials",
  "/admin/seo": "SEO Management",
  "/admin/settings": "Settings",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed } = useAdminState();
  const [menuOpen, setMenuOpen] = useState<"profile" | "notifications" | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLogin = pathname === "/admin/login";
  const title = pageTitles[pathname] || (pathname.startsWith("/admin/insights/")
    ? pathname.endsWith("/edit") ? "Edit Insight" : "Insight Preview"
    : pathname.startsWith("/admin/seo/") ? "Edit SEO"
    : "Insights & Resources");

  useEffect(() => {
    if (!sidebarOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [sidebarOpen]);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchInputRef.current) {
        setGlobalSearch("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  if (isLogin) {
    return <div className={`${styles.root} admin-root ${styles.loginRoot}`}><div className={styles.loginFrame}>{children}</div></div>;
  }
  async function logout() {
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/auth", { method: "DELETE" });
      if (!response.ok) {
        setLogoutError("Could not sign out. Please try again.");
        return;
      }
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setLogoutError("Could not sign out. Please try again.");
    }
  }

  const searchResults = navigation.filter((item) => item.label.toLowerCase().includes(globalSearch.toLowerCase()));

  return (
    <div className={`${styles.root} admin-root`}>
      {sidebarOpen ? <button className={styles.mobileBackdrop} aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><span><AdminIcon name="close" size={19} /></span></button> : null}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`} aria-label="Admin navigation">
        <Link href="/admin" className={styles.brand} onClick={() => setSidebarOpen(false)}>
          <video
            src="/header%20logo%20video.mp4"
            className={styles.brandVideo}
            aria-label="Astronis Global"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <span className={styles.brandCaption}>ADMIN WORKSPACE</span>
        </Link>
        {["Overview", "Website management", "Content", "Engagement", "Configuration"].map((group) => (
          <div className={styles.navGroup} key={group}>
            <div className={styles.navGroupLabel}>{group}</div>
            {navigation.filter((item) => item.group === group).map((item) => {
              const active = item.href === "/admin" ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} className={`${styles.navLink} ${active ? styles.navActive : ""}`} aria-current={active ? "page" : undefined} onClick={() => setSidebarOpen(false)}><AdminIcon name={item.icon} size={17} /><span>{item.label}</span></Link>;
            })}
          </div>
        ))}
        <div className={styles.sidebarBottom}>
          <div className={styles.previewLabel}><span /> CMS workspace</div>
          <button className={styles.logoutLink} type="button" onClick={() => void logout()}><AdminIcon name="logout" size={17} /><span>Sign out</span></button>
          {logoutError ? <p className={styles.logoutError} role="alert">{logoutError}</p> : null}
          <div className={styles.sidebarFootnote}>Astronis Global<br />Content workspace</div>
        </div>
      </aside>
      <section className={styles.mainColumn}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button type="button" className={styles.mobileToggle} aria-label={sidebarOpen ? "Close navigation" : "Open navigation"} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}><AdminIcon name={sidebarOpen ? "close" : "menu"} size={21} /></button>
            <button type="button" className={styles.collapseToggle} aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} aria-pressed={sidebarCollapsed} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}><AdminIcon name={sidebarCollapsed ? "expand" : "collapse"} size={20} /></button>
            <div className={styles.breadcrumb}><span>Admin</span><span>/</span><strong>{title}</strong></div>
          </div>
          <div className={styles.topbarActions}>
            <div className={styles.topSearchWrap}>
              <label className={styles.topSearch}><AdminIcon name="search" size={22} /><span className="admin-visually-hidden">Search admin navigation</span><input ref={searchInputRef} value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Search" /><kbd>Ctrl K</kbd></label>
              {globalSearch ? <div className={styles.searchResults}>{searchResults.length ? searchResults.map((item) => <Link href={item.href} key={item.href} onClick={() => setGlobalSearch("")}><AdminIcon name={item.icon} size={16} />{item.label}</Link>) : <span>No matching sections</span>}</div> : null}
            </div>
            <div className={styles.actionMenuWrap}>
              <button type="button" className={styles.iconButton} aria-label="Notifications, demo only" aria-expanded={menuOpen === "notifications"} onClick={() => setMenuOpen(menuOpen === "notifications" ? null : "notifications")}><AdminIcon name="bell" size={24} /><i /></button>
              {menuOpen === "notifications" ? <div className={styles.actionPopover}><strong>Notifications</strong><p>You’re viewing a UI preview. No live alerts are connected.</p></div> : null}
            </div>
            <div className={styles.actionMenuWrap}>
              <button type="button" className={styles.profileButton} aria-expanded={menuOpen === "profile"} onClick={() => setMenuOpen(menuOpen === "profile" ? null : "profile")}><span className={styles.profileAvatar}><AdminIcon name="people" size={22} /></span><span className={styles.profileCopy}><strong>Admin account</strong><small>Signed in</small></span><span className={styles.chevron}>⌄</span></button>
              {menuOpen === "profile" ? <div className={styles.actionPopover}><strong>Admin account</strong><p>Sign out to end this administrator session.</p><button type="button" onClick={() => void logout()}>Sign out</button></div> : null}
            </div>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}
