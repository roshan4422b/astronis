const socialLinks = [
  { name: "YouTube", href: "https://www.youtube.com" },
  { name: "Instagram", href: "https://www.instagram.com" },
  { name: "Facebook", href: "https://www.facebook.com" },
  { name: "LinkedIn", href: "https://www.linkedin.com" },
  { name: "X", href: "https://x.com" },
] as const;

function SocialMark({ name }: { name: string }) {
  if (name === "YouTube") {
    return <path d="M21 8.2a2.7 2.7 0 0 0-1.9-1.9C17.4 5.8 12 5.8 12 5.8s-5.4 0-7.1.5A2.7 2.7 0 0 0 3 8.2a28 28 0 0 0-.5 3.8A28 28 0 0 0 3 15.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .5-3.8 28 28 0 0 0-.5-3.8Z M10 9.5l5 2.5-5 2.5v-5Z" />;
  }
  if (name === "Instagram") {
    return <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>;
  }
  if (name === "Facebook") {
    return <path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8.4v3h2.7v8H14Z" />;
  }
  if (name === "LinkedIn") {
    return <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M8 10v6M8 7.5v.1M12 16v-3.2a2.2 2.2 0 0 1 4.4 0V16M12 10v6" /></>;
  }
  return <path d="M18.2 3H21l-6.1 7 7.2 11h-5.6l-4.4-6.7L6.3 21H3.5l6.5-7.5L3.1 3h5.7l4 6.1L18.2 3Zm-1 16h1.6L7 4.8H5.3L17.2 19Z" />;
}

export default function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "social-links social-links-compact" : "social-links"} aria-label="Social media links">
      {socialLinks.map((social) => (
        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <SocialMark name={social.name} />
          </svg>
          {!compact && <span>{social.name}</span>}
        </a>
      ))}
    </div>
  );
}
