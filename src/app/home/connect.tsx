import Icon from "../_components/icon";
export default function Connect() {
  return (
    <section
      className="connect-strip container"
      aria-label="Connect with Astronis Global"
    >
      {[
        ["phone", "Call Us", "+91 9311664455", "tel:+919311664455"],
        ["phone", "Landline", "01146574455", "tel:01146574455"],
        [
          "mail",
          "Email Us",
          "advisory@astronisglobal.com",
          "mailto:advisory@astronisglobal.com",
        ],
        ["calendar", "Schedule a Meeting", "Book a consultation", "/contact"],
      ].map(([icon, title, text, href]) => (
        <a key={title} href={href}>
          <span className="round-icon">
            <Icon name={icon} />
          </span>
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </a>
      ))}
    </section>
  );
}
