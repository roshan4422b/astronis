import Icon from "../_components/icon";
export default function ContactDetails({ showMap = false }: { showMap?: boolean }) {
  return (
    <aside className="contact-details">
      <h3>Get in Touch</h3>
      <p className="contact-details-intro">We are just a call or message away. Reach out to us through any of the channels below.</p>
      <div>
        <Icon name="pin" />
        <section>
          <h4>Phone</h4>
          <a href="tel:01146574455">01146574455 / 9311664455</a>
        </section>
      </div>
      <div>
        <Icon name="building" />
        <section>
          <h4>Email</h4>
          <a href="mailto:advisory@astronisglobal.com">advisory@astronisglobal.com</a>
        </section>
      </div>
      <div>
        <Icon name="phone" />
        <section>
          <h4>Head Office</h4>
          <p>C-10/1, First Floor, Bhagwati Garden Extension,<br />Dwarka Mor, New Delhi – 110059, India</p>
        </section>
      </div>
      <div>
        <Icon name="mail" />
        <section>
          <h4>Website</h4>
          <a href="https://www.astronisglobal.com">www.astronisglobal.com</a>
        </section>
      </div>
      <div>
        <Icon name="calendar" />
        <section>
          <h4>Business Hours</h4>
          <p>
            Monday – Friday
            <br />
            9:30 AM – 6:30 PM (IST)
          </p>
        </section>
      </div>
      {showMap && (
        <div className="contact-details-map">
          <iframe
            title="Astronis Global office location"
            src="https://www.google.com/maps?q=C-10%2F1%2C%20First%20Floor%2C%20Bhagwati%20Garden%20Extension%2C%20Dwarka%20Mor%2C%20New%20Delhi%20%E2%80%93%20110059%2C%20India&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </aside>
  );
}
