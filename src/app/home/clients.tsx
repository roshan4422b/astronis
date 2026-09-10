import Icon from "../_components/icon";
import ClientLogoGrid from "../_components/client-logo-grid";
import { Button, Heading } from "../_components/ui";
export default function Clients() {
  return (
    <section className="section clients-section">
      <div className="container">
        <Heading
          title="Our Esteemed Clients"
          text="Trusted by Businesses & Professionals."
        />
        <ClientLogoGrid limit={8} />
        <div className="clients-preview-action">
          <Button href="/clients" secondary>
            View all clients
          </Button>
        </div>
      </div>
      <div className="clients-trust-section">
        <div className="container trust-grid">
          {[
            ["building", "Across Industries"],
            ["globe", "Pan India & Global Perspective"],
            ["people", "Long-Term Relationships"],
            ["shield", "Integrity & Excellence"],
          ].map(([icon, text]) => (
            <div key={text}>
              <Icon name={icon} />
              <h3>{text}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
