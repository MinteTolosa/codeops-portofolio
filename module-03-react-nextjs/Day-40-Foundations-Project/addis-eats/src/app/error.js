
"use client";

// Day 42 — Error Boundary Recovery

export default function Error({ error, reset }) {
  return (
    <main className="mx-auto max-w-xl space-y-4 px-6 py-16">
      <h2 className="text-2xl font-semibold">
        Something went wrong.
      </h2>

      <p>Please try again.</p>

      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg border px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}
