"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useEffect } from "react";
import { AdminIcon, PageHeading, StatusBadge } from "./admin-ui";
import styles from "./admin-settings.module.css";

type Profile = { name: string; email: string };
type Preferences = {
  newEnquiry: boolean;
  testimonialReview: boolean;
  contentStatus: boolean;
  systemAnnouncements: boolean;
};

const initialProfile: Profile = { name: "", email: "" };
const initialPreferences: Preferences = {
  newEnquiry: true,
  testimonialReview: true,
  contentStatus: false,
  systemAnnouncements: true,
};

export default function AdminSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [profileErrors, setProfileErrors] = useState<Partial<Profile>>({});
  const [profileMessage, setProfileMessage] = useState("");
  const [profileMessageIsError, setProfileMessageIsError] = useState(false);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [savedPreferences, setSavedPreferences] = useState(initialPreferences);
  const [preferencesMessage, setPreferencesMessage] = useState("");
  const [preferencesMessageIsError, setPreferencesMessageIsError] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" }).then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load settings.");
      const nextProfile = { name: result.account?.name || "", email: result.account?.email || "" };
      const nextPreferences = { ...initialPreferences, ...(result.settings?.preferences || {}) };
      setProfile(nextProfile); setSavedProfile(nextProfile);
      setPreferences(nextPreferences); setSavedPreferences(nextPreferences);
    }).catch((error) => {
      setProfileMessage(error instanceof Error ? error.message : "Could not load settings.");
      setProfileMessageIsError(true);
    });
  }, []);

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingProfile) return;
    const errors: Partial<Profile> = {};
    if (!profile.name.trim()) errors.name = "Enter a display name.";
    else if (profile.name.trim().length > 80) errors.name = "Display name must be 80 characters or fewer.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) errors.email = "Enter a valid email address.";
    setProfileErrors(errors);
    if (Object.keys(errors).length) {
      setProfileMessage("");
      return;
    }
    setSavingProfile(true);
    try {
      const response = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "profile", value: { name: profile.name } }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save profile.");
      const nextProfile = { ...profile, name: result.setting.value.name };
      setProfile(nextProfile); setSavedProfile(nextProfile);
      setProfileMessage("Profile preferences saved.");
      setProfileMessageIsError(false);
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Could not save profile.");
      setProfileMessageIsError(true);
    }
    finally { setSavingProfile(false); }
  }

  function cancelProfile() {
    setProfile(savedProfile);
    setProfileErrors({});
    setProfileMessage("");
    setProfileMessageIsError(false);
  }

  async function savePreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingPreferences) return;
    setSavingPreferences(true);
    try {
      const response = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "preferences", value: preferences }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save preferences.");
      setSavedPreferences(result.setting.value);
      setPreferences(result.setting.value);
      setPreferencesMessage("Notification preferences saved.");
      setPreferencesMessageIsError(false);
    } catch (error) {
      setPreferencesMessage(error instanceof Error ? error.message : "Could not save preferences.");
      setPreferencesMessageIsError(true);
    }
    finally { setSavingPreferences(false); }
  }

  function cancelPreferences() {
    setPreferences(savedPreferences);
    setPreferencesMessage("");
    setPreferencesMessageIsError(false);
  }

  function updatePreference(key: keyof Preferences, value: boolean) {
    setPreferences((current) => ({ ...current, [key]: value }));
    setPreferencesMessage("");
    setPreferencesMessageIsError(false);
  }

  return <>
    <PageHeading title="Settings" description="Review admin workspace preferences and website configuration." />
    <div className={styles.settingsGrid}>
      <section className={`admin-panel ${styles.card}`} aria-labelledby="profile-heading">
        <div className="admin-panel-heading"><div><h2 id="profile-heading">Admin Profile</h2><p>Your authenticated administrator account.</p></div><span className={styles.sectionIcon}><AdminIcon name="people" /></span></div>
        <form className={styles.profileForm} onSubmit={submitProfile} noValidate>
          <div className={styles.profileIdentity}><div className={styles.avatar}><AdminIcon name="image" size={23} /></div><div><strong>Administrator profile</strong><small>Profile name is stored with CMS settings.</small></div></div>
          <label className="admin-field"><span>Display name</span><input value={profile.name} maxLength={80} aria-invalid={Boolean(profileErrors.name)} aria-describedby={profileErrors.name ? "profile-name-error" : undefined} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />{profileErrors.name ? <small id="profile-name-error" className={styles.error}>{profileErrors.name}</small> : null}</label>
          <label className="admin-field"><span>Email address</span><input type="email" value={profile.email} readOnly /></label>
          {profileMessage ? <p className={profileMessageIsError ? styles.error : styles.success} role={profileMessageIsError ? "alert" : "status"}>{profileMessage}</p> : null}
          <div className={styles.formActions}><button type="button" className="admin-button admin-button-secondary" onClick={cancelProfile}>Cancel</button><button type="submit" className="admin-button" disabled={savingProfile}>{savingProfile ? "Saving…" : "Save Profile"}</button></div>
        </form>
      </section>

      <section className={`admin-panel ${styles.card}`} aria-labelledby="branding-heading">
        <div className="admin-panel-heading"><div><h2 id="branding-heading">Website Branding</h2><p>Read-only preview of the public brand identity.</p></div><span className={styles.sectionIcon}><AdminIcon name="globe" /></span></div>
        <div className={styles.brandingContent}>
          <div className={styles.logoPreview}><Image src="/astronis_logo.jpeg" alt="Astronis Global logo preview" width={260} height={92} /></div>
          <div className={styles.brandName}>Astronis Global</div>
          <div className={styles.colourLine}><span className={styles.navySwatch} /><span className={styles.blueSwatch} /><span className={styles.lightSwatch} /><span>Navy and blue theme preview</span></div>
          <a className={styles.websiteUrl} href="https://www.astronisglobal.com/" target="_blank" rel="noreferrer">https://www.astronisglobal.com/ <AdminIcon name="arrow" size={14} /></a>
          <p className={styles.note}>Brand, logo, theme colour, and website URL are displayed for reference and cannot be changed here.</p>
        </div>
      </section>

      <section className={`admin-panel ${styles.card}`} aria-labelledby="notifications-heading">
        <div className="admin-panel-heading"><div><h2 id="notifications-heading">Notification Preferences</h2><p>Choose administrator notification preferences.</p></div><span className={styles.sectionIcon}><AdminIcon name="bell" /></span></div>
        <form className={styles.preferencesForm} onSubmit={savePreferences}>
          <fieldset className={styles.preferenceList}>
            <legend className="admin-visually-hidden">Notification preferences</legend>
            <PreferenceToggle label="New enquiry notifications" checked={preferences.newEnquiry} onChange={(value) => updatePreference("newEnquiry", value)} />
            <PreferenceToggle label="Testimonial review notifications" checked={preferences.testimonialReview} onChange={(value) => updatePreference("testimonialReview", value)} />
            <PreferenceToggle label="Content status notifications" checked={preferences.contentStatus} onChange={(value) => updatePreference("contentStatus", value)} />
            <PreferenceToggle label="System announcements" checked={preferences.systemAnnouncements} onChange={(value) => updatePreference("systemAnnouncements", value)} />
          </fieldset>
          <p className={styles.note}>These preferences are stored for the administrator account.</p>
          {preferencesMessage ? <p className={preferencesMessageIsError ? styles.error : styles.success} role={preferencesMessageIsError ? "alert" : "status"}>{preferencesMessage}</p> : null}
          <div className={styles.formActions}><button type="button" className="admin-button admin-button-secondary" onClick={cancelPreferences}>Cancel</button><button type="submit" className="admin-button" disabled={savingPreferences}>{savingPreferences ? "Saving…" : "Save Preferences"}</button></div>
        </form>
      </section>

      <section className={`admin-panel ${styles.card}`} aria-labelledby="security-heading">
        <div className="admin-panel-heading"><div><h2 id="security-heading">Security Settings</h2><p>Informational placeholders only.</p></div><span className={styles.sectionIcon}><AdminIcon name="lock" /></span></div>
        <div className={styles.securityList}>
          <SecurityRow title="Password management" description="Actual password controls are not implemented." />
          <SecurityRow title="Multi-factor authentication" description="Setup and activation are not available." />
          <SecurityRow title="Active sessions" description="Session review and revocation are not implemented." />
          <SecurityRow title="Security notifications" description="No real security alerts are configured." />
        </div>
        <p className={styles.note}>Actual authentication and security controls are not implemented in this frontend-only phase.</p>
      </section>

      <section className={`admin-panel ${styles.card} ${styles.systemCard}`} aria-labelledby="system-heading">
        <div className="admin-panel-heading"><div><h2 id="system-heading">System Information</h2><p>Non-sensitive workspace details.</p></div><span className={styles.sectionIcon}><AdminIcon name="file" /></span></div>
        <dl className={styles.systemInfo}>
          <InfoRow label="Project name" value="Astronis Global Admin" />
          <InfoRow label="Framework" value="Next.js" />
          <InfoRow label="Current interface status" value="Frontend preview" />
          <InfoRow label="Data mode" value="Demo data only" />
        </dl>
      </section>
    </div>
  </>;
}

function PreferenceToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={styles.toggleRow}><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>;
}

function SecurityRow({ title, description }: { title: string; description: string }) {
  return <div className={styles.securityRow}><span className={styles.securityIcon}><AdminIcon name="lock" size={15} /></span><span className={styles.securityCopy}><strong>{title}</strong><small>{description}</small></span><StatusBadge status="Not implemented" /></div>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}
