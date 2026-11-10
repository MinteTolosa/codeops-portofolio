
"use client";
import  useCartStore  from "../../stores/cartStore";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarAuth({ user }) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignOut() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Sign out failed.");
      }

      clearCart();

      router.replace("/signin");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to sign out.");
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/signin"
          className="rounded-md bg-[#c9a96e] px-5 py-3 font-semibold text-[#17130f] transition hover:bg-[#dfc38d]" >
          Sign-in
        </Link>

        <Link href="/signup"
          className="rounded-md border border-[#6f6252] px-5 py-3 font-semibold text-[#f5efe6] transition hover:border-[#c9a96e] hover:text-[#c9a96e]" >
          Sign-up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="text-right">
        <p className="font-semibold text-[#c9a96e]">
          {user.name}
        </p>
        <p className="text-xs capitalize text-[#b8aa98]">
          {user.role}
        </p>
      </div>

      <button type="button"  onClick={handleSignOut} disabled={loading}
        className="rounded-md border border-[#6f6252] px-5 py-3 font-semibold text-[#f5efe6] transition hover:border-[#c9a96e] hover:text-[#c9a96e] disabled:cursor-not-allowed disabled:opacity-50" >
        {loading ? "Signing out..." : "Sign out"}
      </button>

      {error && (
        <p role="alert" className="w-full text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
