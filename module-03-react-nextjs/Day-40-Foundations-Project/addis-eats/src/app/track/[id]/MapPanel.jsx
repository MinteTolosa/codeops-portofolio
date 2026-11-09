"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(
  () => import("./DeliveryMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 rounded-xl bg-[#211b15] animate-pulse" />
    ),
  }
);

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}