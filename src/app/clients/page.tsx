import { Banner, Button, Heading } from "../_components/ui";
import ClientLogoGrid from "../_components/client-logo-grid";

export const metadata = {
  title: "Our Trusted Clients",
  description: "Discover the organisations and businesses that trust Astronis Global.",
};

export default function ClientsPage() {
  return (
    <>
      <Banner
        eyebrow="Our Clients"
        title="Our Esteemed Clients"
        text="Trusted by leaders across industries. Driven by results that create lasting value."
        image="/Part-17 .png"
      />
      <section className="section clients-directory">
        <div className="container">
          <Heading
            title="A glimpse of our valued clients"
            text="We are privileged to partner with organisations across industries and geographies."
          />
          <ClientLogoGrid />
          <div className="clients-note">
            <p>Every engagement is built on trust, responsiveness and a commitment to practical outcomes.</p>
            <Button href="/contact">Start a conversation</Button>
          </div>
        </div>
      </section>
    </>
  );
}
