import { Button } from "./_components/ui";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow empty-state">
        <span className="eyebrow">UNDER DEVELOPMENT</span>
        <h1 style={{ fontSize: 42, marginBlock: 20 }}>
          This page is being prepared.
        </h1>
        <p>Contact our team to discuss your requirements and the next steps.</p>
        <Button href="/contact">Contact Our Team</Button>
      </div>
    </section>
  );
}
