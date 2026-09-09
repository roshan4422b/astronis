import { Button } from "./_components/ui";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow empty-state">
        <span className="eyebrow">404 · PAGE NOT FOUND</span>
        <h1 style={{ fontSize: 42, marginBlock: 20 }}>
          Let’s get you back on track.
        </h1>
        <p>The page you’re looking for could not be found.</p>
        <Button href="/">Return Home</Button>
      </div>
    </section>
  );
}
