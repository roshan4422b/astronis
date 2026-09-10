import Icon from "../_components/icon";

const values = [
  ["shield", "Trusted Advisors", "Reliable guidance backed by deep expertise."],
  ["people", "Client Focused", "Your goals are our priority. We deliver results."],
  ["shield", "Confidential", "Your information is secure with us."],
  ["globe", "Pan India, Global Reach", "Local insight with a global perspective."],
  ["people", "Long Term Partnership", "Building lasting relationships for mutual success."],
];

export default function ContactValues() {
  return (
    <section className="contact-values" aria-label="Astronis Global commitments">
      {values.map(([icon, title, text]) => (
        <div key={title}>
          <Icon name={icon} />
          <span><strong>{title}</strong><small>{text}</small></span>
        </div>
      ))}
    </section>
  );
}
