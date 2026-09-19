export default function Icon({
  name = "globe",
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    laptop: <><rect x="3" y="3" width="18" height="14" rx="1" /><path d="m3 17-2 4h22l-2-4M9 19h6" /></>,
    compass: <><circle cx="12" cy="12" r="10" /><path d="m16.5 7.5-3 6-6 3 3-6 6-3Z" /></>,
    building: (
      <path d="M3 21h18M6 21V9h5V3h7v18M9 12v1m0 3v1m5-11v1m0 3v1m0 3v1m0 3v1m4-9h3v11" />
    ),
    target: <><circle cx="11" cy="13" r="8" /><circle cx="11" cy="13" r="4" /><path d="m11 13 9-9m-3 0h3v3" /></>,
    gem: <><path d="M3 8 7 3h10l4 5-9 13L3 8Z" /><path d="M3 8h18M7 3l3 5 2 13 2-13 3-5" /></>,
    network: <><circle cx="12" cy="4" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="m11 6-5 11m7-11 5 11M7 19h10" /></>,
    gear: <><path d="M10 2h4l.6 2.5 2 .8 2.2-1.3 2.8 2.8-1.3 2.2.8 2L23 12v4l-2.5.6-.8 2 1.3 2.2-2.8 2.8-2.2-1.3-2 .8L14 25h-4l-.6-2.5-2-.8-2.2 1.3-2.8-2.8 1.3-2.2-.8-2L.5 16v-4L3 11.4l.8-2-1.3-2.2 2.8-2.8 2.2 1.3 2-.8L10 2Z" transform="translate(2 1) scale(.78)" /><circle cx="12" cy="12" r="3" /></>,
    person: <><circle cx="12" cy="7" r="3" /><path d="M4 21v-3a8 8 0 0 1 16 0v3H4Zm8-4 2 2-2 2-2-2 2-2Z" /></>,
    india: <path d="m8 2 3 2 3-1 1 3 4 1-2 3 3 2-2 2-1 4-3 1-2 4-3-6-2-1-1-4-3-2 3-2-1-3 3-3Z" />,
    award: <><circle cx="12" cy="9" r="6" /><path d="m8 14-2 8 6-3 6 3-2-8M10 9l1.5 1.5L14 8" /></>,
    trophy: <><path d="M7 3h10v9a5 5 0 0 1-10 0V3ZM7 5H3v4a4 4 0 0 0 4 4m10-8h4v4a4 4 0 0 1-4 4M12 17v4m-4 0h8" /></>,
    message: <><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="M7 10h10m-10 4h6" /></>,
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
    pencil: <><path d="m4 20 4.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20Z" /><path d="m14.5 7.5 3 3" /></>,
    folder: <path d="M2 6h8l2 2h10v12H2V6Zm0 0V4h8l2 2" />,
    percent: <><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /><path d="M19 5 5 19" /></>,
    rocket: <><path d="M9 15c-2-5 1-10 11-12 1 9-3 13-8 13l-3-1Z" /><path d="m9 15-3 3m8-10 2 2M7 10 3 11l-1 5 5-2m7 3-2 5-5 1 1-5" /></>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4" /></>,
    help: <><circle cx="12" cy="12" r="10" /><path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.7c-1.2 1.1-1.8 1.5-1.8 3.3m0 3h.01" /></>,
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
    plane: <path d="M21 3 9 11 3 10l-1 2 6 3 3 7 2-1-1-7 9-11Z" />,
    handshake: <path d="m2 8 4-4 5 2 2-1 5 1 4 4-4 5-2-2-3 3-2-2-3 2-6-6Zm4-4 5 2-3 4m10-4-5-1-4 4 2 2 3-2 4 4m-8 5 2 2 3-2" />,
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
