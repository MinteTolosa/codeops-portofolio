
"use client";

// Day 41 — SWR Polling and Automatic Revalidation

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ orderId, initialOrder }) {
  const { data, error, isLoading } = useSWR(
    orderId ? `/api/orders/${encodeURIComponent(orderId)}` : null,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  const order = data?.order ?? data;

  if (isLoading && !order) return <p>Loading order status...</p>;
  if (error && !order) return <p>Could not load order status.</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div aria-live="polite">
      <p>
   a     Order: <strong>{order.id}</strong>
      </p>
      <p>
        Status: <strong>{order.status}</strong>
      </p>
      {error && (
        <p className="text-sm text-amber-700">
          Refresh failed. Showing the last available status.
        </p>
      )}
    </div>
  );
}
