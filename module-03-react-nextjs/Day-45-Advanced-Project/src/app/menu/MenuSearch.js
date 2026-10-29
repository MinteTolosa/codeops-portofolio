
"use client";

// Day 41 — SWR Search and Conditional Fetching

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function MenuSearch() {
  const [query, setQuery] = useState("");

  const key = query.trim()
    ? `/api/dishes?q=${encodeURIComponent(query.trim())}`
    : null;

  const { data, error, isLoading } = useSWR(key, fetcher);

  const dishes = Array.isArray(data)
    ? data
    : Array.isArray(data?.dishes)
      ? data.dishes
      : [];

  return (
    <section className="space-y-4">
      <label htmlFor="menu-search" className="block font-medium">
        Search dishes
      </label>

      <input id="menu-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Doro Wat, Kitfo..."
        className="w-full rounded-xl border border-gray-300 px-4 py-3"/>

      {!query.trim() && (
        <p className="text-sm text-gray-500">
          Enter a dish name to search.
        </p>
      )}

      {isLoading && <p>Searching...</p>}

      {error && (
        <p role="alert">Unable to search dishes. Please try again.</p>
      )}

      {key && !isLoading && !error && dishes.length === 0 && (
        <p>No matching dishes found.</p>
      )}

      <ul className="space-y-3">
        {dishes.map((dish) => (
          <li key={dish.id} className="rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold">{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{dish.price} ETB</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
