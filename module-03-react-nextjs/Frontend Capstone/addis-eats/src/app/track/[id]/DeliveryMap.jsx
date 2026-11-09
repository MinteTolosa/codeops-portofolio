"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const yekaPosition = [9.0300, 38.8000];
const courierPosition = [9.0250, 38.7950];

export default function DeliveryMap({
  deliveryAddress = "Yeka",
}) {
  return (
    <MapContainer
      center={yekaPosition}
      zoom={14}
      style={{ height: "320px", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <Marker position={courierPosition}>
        <Popup>Courier location (demo)</Popup>
      </Marker>

      <Marker position={yekaPosition}>
        <Popup>
          Delivery location — {deliveryAddress}
        </Popup>
      </Marker>
    </MapContainer>
  );
}