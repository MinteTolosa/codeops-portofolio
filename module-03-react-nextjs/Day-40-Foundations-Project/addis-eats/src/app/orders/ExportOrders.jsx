"use client";

import { toCsv, downloadCsv } from "@/lib/csv";

export default function ExportOrders({ orders }) {
  function handleExport() {
    const rows = orders.map((order) => ({
      id: order.id,
      customer: order.customerName,
      phone: order.phone,
      neighborhood: order.neighborhood,
      status: order.status,
      createdAt: order.createdAt,
      totalItems: order.items?.length || 0,
    }));

    const csv = toCsv(rows);

    downloadCsv(csv, "addis-eats-orders.csv");
  }

  return (
    <button onClick={handleExport}
      className="rounded-lg bg-[#c9a96e] px-5 py-3 font-semibold text-[#17130f] hover:bg-[#dfc38d]" >
      Export Orders CSV
    </button>
  );
}