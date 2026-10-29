
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Day 42 — Sign-In Form and Safe Redirect

function safeNextPath(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/orders";
  }

  try {
    const parsed = new URL(value, window.location.origin);

    if (parsed.origin !== window.location.origin) {
      return "/orders";
    }

    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return "/orders";
  }
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setPending(true);

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Unable to sign in.");
        return;
      }

      const nextPath = safeNextPath(searchParams.get("next"));
      router.replace(nextPath);
      router.refresh();
    } catch {
      setMessage("A network error occurred. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Sign in to Addis Eats</h1>

      <label className="block">
        <span className="mb-1 block">Email</span>
        <input type="email" autoComplete="username" required value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border p-3"/>
      </label>

      <label className="block">
        <span className="mb-1 block">Password</span>
        <input type="password" autoComplete="current-password" required value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border p-3"/>
      </label>

      {message && <p role="alert">{message}</p>}

      <button type="submit" disabled={pending}
        className="w-full rounded-lg px-4 py-3" >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
