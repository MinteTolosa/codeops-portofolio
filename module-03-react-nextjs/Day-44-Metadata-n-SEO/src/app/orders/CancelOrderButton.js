
"use client";

// Day 39 — Server Actions and Form State

import { useState, useTransition } from "react";
import { cancelOrder } from "./actions";

export default function CancelOrderButton({ orderId }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await cancelOrder(orderId);
      setMessage(result.message);
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCancel}
        disabled={isPending}
        className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? "Cancelling..." : "Cancel Order"}
      </button>

      {message && (
        <p role="status" className="mt-3 text-sm text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
