"use client";

import { useState } from "react";

export default function UpdateOrderStatus({ orderId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `API returned HTML or invalid JSON. Status: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Update failed");
      }

      setMessage("Status updated successfully");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="rounded-lg border p-2 text-black" >
        <option value="PENDING">Pending</option>
        <option value="PREPARING">Preparing</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <button onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="rounded-lg bg-[#c9a96e] px-4 py-2 font-semibold text-black disabled:opacity-50" >
        {loading ? "Updating..." : "Update"}
      </button>

      {message && <p className="w-full text-sm">{message}</p>}
    </div>
  );
}