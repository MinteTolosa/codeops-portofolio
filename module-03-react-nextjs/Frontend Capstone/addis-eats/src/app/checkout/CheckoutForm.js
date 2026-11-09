"use client";

import React, { useRef, useState } from "react";
import { placeOrder } from "./actions";
import useCartStore from "@/app/stores/cartStore";

const ADDIS_ABABA_SUBCITIES = [
  "Addis Ketema",
  "Akaky Kaliti",
  "Arada",
  "Bole",
  "Gullele",
  "Kirkos",
  "Kolfe Keraniyo",
  "Lideta",
  "Lemi Kura",
  "Nifas Silk-Lafto",
  "Yeka",
];

export default function CheckoutForm({ cartItems }) {
  const clearCart = useCartStore((state) => state.clearCart);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Day 48 — Keep the same ID when retrying a checkout.
  const requestIdRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    if (!cartItems?.length) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      if (!requestIdRef.current) {
        requestIdRef.current = crypto.randomUUID();
      }

      formData.set("requestId", requestIdRef.current);
      formData.set("items", JSON.stringify(cartItems));

      const response = await placeOrder(null, formData);

      if (!response?.success) {
        setError(
          response?.message ||
          "Something went wrong. Please try again."
        );
        return;
      }

      clearCart();

      requestIdRef.current = null;

      window.location.href =
        `/orders?message=${encodeURIComponent(response.message)}`;

    } catch (error) {
      console.error("Checkout error:", error);

      setError(
        "Unable to place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-6 md:p-8 shadow-2xl space-y-6"
    >
      <div className="border-b border-[#6f6252]/40 pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
          Delivery Details
        </p>

        <h2 className="text-xl font-bold text-[#f5efe6]">
          Contact & Location
        </h2>
      </div>

      {error && (
        <div
          role="alert"
          className="p-4 rounded-md border border-red-500/40 bg-red-950/30 text-red-200 text-sm"
        >
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-[#b8afa3] mb-2"
        >
          Full Name
        </label>

        <input
          type="text"
          id="customerName"
          name="customerName"
          required
          placeholder="e.g. Abebe Bikila"
          className="w-full min-h-11 rounded-md border border-[#6f6252]/50 bg-[#17130f] px-4 py-3 text-sm text-[#f5efe6] placeholder-[#6f6252] focus:border-[#c9a96e] focus:outline-none focus:ring-1 focus:ring-[#c9a96e]"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#b8afa3] mb-2"
        >
          Phone Number (+251)
        </label>

        <div className="flex">
          <span className="inline-flex min-h-11 items-center px-4 rounded-l-md border border-r-0 border-[#6f6252]/50 bg-[#17130f] text-[#c9a96e] text-sm font-semibold">
            +251
          </span>

          <input
            type="tel"
            id="phone"
            name="phone"
            inputMode="numeric"
            required
            placeholder="911234567"
            className="w-full min-h-11 rounded-r-md border border-[#6f6252]/50 bg-[#17130f] px-4 py-3 text-sm text-[#f5efe6] placeholder-[#6f6252] focus:border-[#c9a96e] focus:outline-none focus:ring-1 focus:ring-[#c9a96e]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="neighborhood"
          className="block text-sm font-medium text-[#b8afa3] mb-2"
        >
          Subcity (Addis Ababa)
        </label>

        <select
          id="neighborhood"
          name="neighborhood"
          required
          defaultValue=""
          className="w-full min-h-11 rounded-md border border-[#6f6252]/50 bg-[#17130f] px-4 py-3 text-sm text-[#f5efe6] focus:border-[#c9a96e] focus:outline-none focus:ring-1 focus:ring-[#c9a96e]"
        >
          <option value="">
            -- Select Your Subcity --
          </option>

          {ADDIS_ABABA_SUBCITIES.map((subcity) => (
            <option key={subcity} value={subcity}>
              {subcity}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-11 rounded-md bg-[#c9a96e] px-7 py-3.5 font-semibold text-[#17130f] transition hover:bg-[#dfc38d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a96e] shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </form>
  );
}
