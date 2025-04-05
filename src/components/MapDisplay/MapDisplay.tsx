import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon issue with bundlers like Vite/Webpack
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// This part is crucial to make default icons work with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});
// End of fix

interface MapDisplayProps {
  position: LatLngExpression;
  zoom?: number;
  popupText?: string;
  style?: React.CSSProperties;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  position,
  zoom = 13,
  popupText = "Klub APBT",
  style = { height: "250px", width: "100%", borderRadius: "8px" },
}) => {
  // Ensure component only renders on the client-side if using SSR frameworks
  if (typeof window === "undefined") {
    return null; // Or a placeholder
  }

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true} // Enable scroll wheel zoom
      style={style}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;
