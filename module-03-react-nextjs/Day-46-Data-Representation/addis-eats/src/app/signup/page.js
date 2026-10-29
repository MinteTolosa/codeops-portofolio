
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value, });}

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) { setError(data.error || "Registration failed.");
        return;
      }
      router.replace("/orders");
      router.refresh();
    } catch { setError("Unable to connect. Please try again.");
    } finally { setLoading(false);
    }}

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-gray-600">
          Join Addis Eats to order your favorite dishes.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Full name
            </label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required
              minLength={4}
              maxLength={80}
              autoComplete="name"
              className="w-full rounded-lg border p-3" />
          </div>
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
           Email address
          </label>
          <input id="email" name="email" type="email" value={form.email}
            onChange={handleChange} required
            maxLength={254}
            autoComplete="email"
            className="w-full rounded-lg border p-3" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input id="password" name="password" type="password" value={form.password}
            onChange={handleChange} required
            minLength={8}
            maxLength={128}
            autoComplete="new-password"
            className="w-full rounded-lg border p-3" />
         <p className="mt-1 text-sm text-gray-500">
            Use at least 8 characters.
         </p>
        </div> {error && (
          <p role="alert" className="text-sm text-red-600">
           {error}
          </p>
          )}

        <button type="submit" disabled={loading}
         className="w-full rounded-lg bg-[#c9a96e] p-3 font-semibold text-[#17130f] hover:bg-[#dfc38d] disabled:opacity-60" >
          {loading ? "Creating account..." : "Create Account"}
        </button>
        </form>
        
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-[#dfc38d] hover:underline" >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
