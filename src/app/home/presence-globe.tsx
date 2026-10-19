"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";

const GlobeCanvas = dynamic(() => import("./presence-globe-canvas"), {
  ssr: false,
  loading: () => <div className="home-presence-globe-loading" role="status">Preparing the interactive globe…</div>,
});

const locations = [
  { id: "india", name: "India", city: "New Delhi", country: "India", latitude: 28.6167, longitude: 77.035, kind: "Head office", description: "C-10/1, First Floor, Bhagwati Garden Extension, Dwarka Mor, New Delhi 110059, India", href: "/contact#enquiry-form" },
  { id: "usa", name: "United States", city: "Washington, D.C.", country: "United States", latitude: 38.9072, longitude: -77.0369, kind: "Network coverage", description: "Regional network coverage in the United States. This is not a local office.", href: "/global-presence/usa" },
  { id: "uk", name: "United Kingdom", city: "London", country: "United Kingdom", latitude: 51.5072, longitude: -0.1276, kind: "Network coverage", description: "Regional network coverage in the United Kingdom. This is not a local office.", href: "/global-presence/uk" },
  { id: "europe", name: "European Union", city: "Brussels", country: "Belgium", latitude: 50.8503, longitude: 4.3517, kind: "Network coverage", description: "Regional network coverage in the European Union. This is not a local office.", href: "/global-presence/european-union" },
  { id: "middle-east", name: "Middle East", city: "Riyadh", country: "Saudi Arabia", latitude: 24.7136, longitude: 46.6753, kind: "Network coverage", description: "Regional network coverage in the Middle East. This is not a local office.", href: "/global-presence/middle-east" },
  { id: "uae", name: "UAE", city: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, kind: "Network coverage", description: "Regional network coverage in the UAE. This is not a local office.", href: "/global-presence/uae" },
  { id: "singapore", name: "Singapore", city: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, kind: "Network coverage", description: "Regional network coverage in Singapore. This is not a local office.", href: "/global-presence/singapore" },
];

export type PresenceLocation = (typeof locations)[number];

export default function HomePresenceGlobe() {
  const [selectedId, setSelectedId] = useState("india");
  const selected = locations.find((location) => location.id === selectedId) ?? locations[0];

  return (
    <section className="home-presence" aria-labelledby="home-presence-title">
      <div className="home-presence-copy">
        <span className="home-presence-eyebrow">ASTRONIS GLOBAL</span>
        <h2 id="home-presence-title">Our Global Presence</h2>
        <p>One New Delhi head office, supported by an international professional network.</p>

        <div className="home-presence-detail" aria-live="polite" aria-atomic="true">
          <span>{selected.kind}</span>
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
          <Link href={selected.href}>{selected.id === "india" ? "Contact our head office" : `Explore ${selected.name}`}</Link>
        </div>

        <ul className="home-presence-list" aria-label="Select a location">
          {locations.map((location) => (
            <li key={location.id}>
              <button
                type="button"
                onClick={() => setSelectedId(location.id)}
                aria-pressed={selected.id === location.id}
                className={selected.id === location.id ? "is-selected" : ""}
              >
                <span aria-hidden="true" />
                <span>{location.name}</span>
                <small>{location.id === "india" ? "Head office" : "Network"}</small>
              </button>
            </li>
          ))}
        </ul>
        <small className="home-presence-credit">Earth imagery: NASA Goddard Space Flight Center · Image by Reto Stöckli.</small>
      </div>

      <div className="home-presence-stage" aria-label="Interactive 3D globe with business presence markers">
        <GlobeCanvas locations={locations} selectedId={selected.id} onSelect={setSelectedId} />
        <p className="home-presence-hint">Drag to rotate · Scroll or pinch to zoom · Select a marker for details · Arcs are illustrative</p>
      </div>
    </section>
  );
}
