import { Button, TextLink } from "../_components/ui";
export default function Access() {
  return (
    <section className="section">
      <div className="container narrow empty-state">
        <h2>Contact your engagement team</h2>
        <p>
          Online account access is not available on this website yet. For
          assignment updates, invoices, renewals or secure document sharing,
          please contact your Astronis Global engagement team.
        </p>
        <Button href="mailto:advisory@astronisglobal.com?subject=Client%20support">
          Request Assistance
        </Button>
        <div className="center">
          <TextLink href="/professionals/partner-with-us">
            Employee & Partner Enquiries
          </TextLink>
        </div>
      </div>
    </section>
  );
}
