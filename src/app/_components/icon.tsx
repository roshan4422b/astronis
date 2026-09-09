export default function Icon({
  name = "globe",
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    building: (
      <path d="M3 21h18M6 21V9h5V3h7v18M9 12v1m0 3v1m5-11v1m0 3v1m0 3v1m0 3v1m4-9h3v11" />
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    scale: (
      <path d="M12 3v18M7 21h10M4 7h16M5 7l-3 7h6L5 7Zm14 0-3 7h6l-3-7Z" />
    ),
    chart: (
      <path d="M3 21h18M5 18v-5h3v5m3 0V9h3v9m3 0V5h3v13M3 9l6-5 4 2 7-4" />
    ),
    file: <path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8M8 16h5" />,
    document: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h2m4 0h2" />
      </>
    ),
    bulb: (
      <path d="M9 18h6m-6 3h6M8 14a7 7 0 1 1 8 0l-1 2H9l-1-2ZM12 2V0M3 5 1 3m20 2 2-2M2 12H0m22 0h2" />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 6h14M5 18h14" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v4" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3-1 4C9 22 2 15 3 4l4-1Z" />
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 2v6m10-6v6M3 11h18M7 15h2m6 0h2m-10 3h2m6 0h2" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 6 6" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    play: <path d="m8 4 12 8-12 8V4Z" />,
  };
  return (
    <svg
      className={`icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.globe}
    </svg>
  );
}
