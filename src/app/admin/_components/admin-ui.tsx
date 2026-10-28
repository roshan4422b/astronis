import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  pages: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h5M10 13h6M10 17h6M4 7v14" /></>,
  insights: <><path d="M4 19.5V4.8A1.8 1.8 0 0 1 5.8 3H20v16H5.8A1.8 1.8 0 0 0 4 20.8" /><path d="M8 7h8M8 11h8M8 15h5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  tech: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></>,
  inbox: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 13h5l2 3h4l2-3h5" /></>,
  quote: <><path d="M10 11H5.5A2.5 2.5 0 0 1 3 8.5v-2A2.5 2.5 0 0 1 5.5 4H10v7Zm11 0h-4.5A2.5 2.5 0 0 1 14 8.5v-2A2.5 2.5 0 0 1 16.5 4H21v7ZM3 11v2a5 5 0 0 0 5 5h2M14 11v2a5 5 0 0 0 5 5h2" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.2.9-1.2 2.1-1.4-.5a8 8 0 0 1-1.4.8l-.2 1.5h-2.4l-.3-1.5a8 8 0 0 1-1.5-.8l-1.4.5-1.2-2.1 1.2-.9a7 7 0 0 1 0-1.7l-1.2-.9 1.2-2.1 1.4.5a8 8 0 0 1 1.5-.8l.3-1.5h2.4l.2 1.5a8 8 0 0 1 1.4.8l1.4-.5 1.2 2.1-1.2.9a7 7 0 0 1 0 1.7Z" transform="translate(-2 -2) scale(1.16)" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  collapse: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M14 9l-3 3 3 3" /></>,
  expand: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16m3-7 3-3-3-3" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  file: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v5h5M10 13h6M10 17h6" /></>,
  services: <><path d="M3 21V8l9-5 9 5v13M3 10h18M8 21v-6h8v6M8 10v2M12 10v2M16 10v2" /></>,
  drafts: <><path d="M4 5h16M4 12h11M4 19h8" /><circle cx="19" cy="17" r="3" /></>,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L19.5 7.7a2.1 2.1 0 0 0-3-3L5 16.2 4 20Z" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  filter: <><path d="M4 5h16M7 12h10m-7 7h4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
};

export function AdminIcon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] || icons.file}
    </svg>
  );
}

export function PageHeading({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="admin-page-heading">
      <div><div className="admin-eyebrow">ASTRONIS GLOBAL / ADMIN</div><h1>{title}</h1><p>{description}</p></div>
      {action ? <div className="admin-heading-actions">{action}</div> : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone = /published|approved|responded|active|granted|\bcompleted?\b/i.test(status) ? "success" : /rejected|withdrawn/i.test(status) ? "danger" : /draft|new|pending|review|attention|incomplete/i.test(status) ? "warning" : /archived|consent|required|inactive|not recorded/i.test(status) ? "neutral" : "info";
  return <span className={`admin-status admin-status-${tone}`}><span />{status}</span>;
}

export function StatCard({ label, value, change, icon }: { label: string; value: string; change: string; icon: string }) {
  return <article className="admin-stat-card"><div className="admin-stat-top"><span>{label}</span><span className="admin-stat-icon"><AdminIcon name={icon} size={19} /></span></div><strong>{value}</strong><small>{change}</small></article>;
}

export function SearchInput({ value, onChange, placeholder = "Search records..." }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="admin-search"><AdminIcon name="search" size={17} /><span className="admin-visually-hidden">{placeholder}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

export function FilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="admin-filter"><AdminIcon name="filter" size={16} /><span className="admin-visually-hidden">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (page: number) => void }) {
  if (pageCount < 2) return null;
  return <div className="admin-pagination"><span>Page {page} of {pageCount}</span><div><button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</button><button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>Next</button></div></div>;
}

export function DataTable({ columns, rows, emptyMessage = "No matching records found." }: { columns: string[]; rows: ReactNode[][]; emptyMessage?: string }) {
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td colSpan={columns.length}><div className="admin-empty-inline"><span className="admin-empty-icon"><AdminIcon name="search" size={21} /></span><strong>{emptyMessage}</strong><span>Try adjusting your search or filters.</span></div></td></tr>}</tbody></table></div>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="admin-empty-state"><span className="admin-empty-icon"><AdminIcon name="file" size={23} /></span><h2>{title}</h2><p>{description}</p>{action}</div>;
}

export function DemoNotice({ children = "Demo UI only — changes are not saved." }: { children?: string }) {
  return <div role="status" className="admin-demo-notice">{children}</div>;
}

export function ConfirmationDialog({ title, description, onCancel, onConfirm }: { title: string; description: string; onCancel: () => void; onConfirm: () => void }) {
  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title"><h2 id="admin-modal-title">{title}</h2><p>{description}</p><div className="admin-modal-actions"><button className="admin-button admin-button-secondary" type="button" onClick={onCancel}>Cancel</button><button className="admin-button" type="button" onClick={onConfirm}>Continue</button></div></section></div>;
}
