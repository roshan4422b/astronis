"use client";

import Globe, { type GlobeMethods } from "react-globe.gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PresenceLocation } from "./presence-globe";

type Props = {
  locations: PresenceLocation[];
  selectedId: string;
  onSelect: (id: string) => void;
};

type Arc = { startLat: number; startLng: number; endLat: number; endLng: number; color: string[] };

const decorativeArcs: Arc[] = [
  { startLat: 28.6167, startLng: 77.035, endLat: 51.5072, endLng: -0.1276, color: ["#4cc8ff", "#b4e9ff"] },
  { startLat: 28.6167, startLng: 77.035, endLat: 38.9072, endLng: -77.0369, color: ["#4cc8ff", "#b4e9ff"] },
  { startLat: 28.6167, startLng: 77.035, endLat: 1.3521, endLng: 103.8198, color: ["#4cc8ff", "#b4e9ff"] },
];

export default function PresenceGlobeCanvas({ locations, selectedId, onSelect }: Props) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 420 });
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const selected = locations.find((location) => location.id === selectedId) ?? locations[0];

  const checkWebGL = useCallback(() => {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    setWebglAvailable(checkWebGL());
  }, [checkWebGL]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const bounds = container.getBoundingClientRect();
      setSize({ width: Math.round(bounds.width), height: Math.round(bounds.height) });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (!controls) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.35;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.minDistance = 135;
    controls.maxDistance = 340;
  }, [webglAvailable]);

  useEffect(() => {
    if (selected && webglAvailable) {
      globeRef.current?.pointOfView({ lat: selected.latitude, lng: selected.longitude, altitude: 2.15 }, 900);
    }
  }, [selected, webglAvailable]);

  const points = useMemo(() => locations.map((location) => ({ ...location })), [locations]);

  if (webglAvailable === false) {
    return <div className="home-presence-fallback" role="status">The interactive globe is unavailable in this browser. Use the location list to view our head office and network coverage.</div>;
  }

  return (
    <div ref={containerRef} className="home-presence-globe-canvas" aria-hidden="true">
      {webglAvailable && size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="/images/earth-blue-marble.jpg"
          showAtmosphere
          atmosphereColor="#3b9cdf"
          atmosphereAltitude={0.16}
          showGraticules={false}
          enablePointerInteraction
          pointsData={points}
          pointLat="latitude"
          pointLng="longitude"
          pointColor={(point) => ((point as PresenceLocation).id === selectedId ? "#f1c879" : "#d6b168")}
          pointAltitude={(point) => ((point as PresenceLocation).id === "india" ? 0.025 : 0.018)}
          pointRadius={(point) => ((point as PresenceLocation).id === selectedId ? 0.42 : 0.3)}
          pointLabel={(point) => `${(point as PresenceLocation).name} · ${(point as PresenceLocation).kind}`}
          onPointClick={(point) => onSelect((point as PresenceLocation).id)}
          arcsData={decorativeArcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcAltitude={0.15}
          arcStroke={0.9}
          arcDashLength={0.35}
          arcDashGap={0.9}
          arcDashAnimateTime={4800}
        />
      )}
      {webglAvailable === null && <div className="home-presence-globe-loading" role="status">Loading interactive globe…</div>}
    </div>
  );
}
