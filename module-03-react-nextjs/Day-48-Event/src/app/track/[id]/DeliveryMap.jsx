"use client";

import { MapContainer, TileLayer, Marker, Popup,} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const courier = [8.9950, 38.7896];
const delivery = [8.9980, 38.7920];

export default function DeliveryMap() {
  const bounds = [courier, delivery];

  return (
    <MapContainer bounds={bounds} boundsOptions={{ padding: [40, 40] }}
      style={{ height: "320px", width: "100%" }}
      className="rounded-xl" >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors" />

      <Marker position={courier}>
        <Popup>Courier location</Popup>
      </Marker>

      <Marker position={delivery}>
        <Popup>Delivery location — Bole</Popup>
      </Marker>
    </MapContainer>
  );
}