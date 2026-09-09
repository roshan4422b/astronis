import Icon from "../_components/icon";

export default function OfficeCard() {
  return (
    <article className="contact-office-card">
      <h2>Our Office</h2>
      <span className="heading-line" />
      <h3>Astronis Global Pvt Ltd</h3>
      <p className="office-address">
        <Icon name="pin" />
        C-10/1, FF, Dwarka Mor,
        <br />
        New Delhi-110059.
      </p>
      <div className="office-map" aria-label="Map showing Astronis Global office">
        <span className="map-road map-road-one" />
        <span className="map-road map-road-two" />
        <span className="map-road map-road-three" />
        <span className="map-block map-block-one" />
        <span className="map-block map-block-two" />
        <span className="map-block map-block-three" />
        <span className="map-marker"><Icon name="pin" /></span>
        <span className="map-label">Astronis Global Pvt Ltd</span>
      </div>
      <a className="button office-directions" href="https://www.google.com/maps/search/?api=1&query=C-10%2F1%2C%20Dwarka%20Mor%2C%20New%20Delhi" target="_blank" rel="noreferrer">
        Get Directions <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
