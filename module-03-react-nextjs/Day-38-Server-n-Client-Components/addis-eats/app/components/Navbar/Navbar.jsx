import Link from "next/link";
import React from "react";
import CartLink from "../CartLink";

export default function Navbar() {
  return (
    <header className="border-b border-[#6f6252]/30 bg-[#17130f]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/"
          className="text-2xl font-bold tracking-wide text-[#c9a96e]" >
          Addis-Eats
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-[#f5efe6] transition hover:text-[#c9a96e]">
            Home
          </Link>
          <Link href="/menu" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Menu
          </Link>
          <CartLink />
          <Link href="/Checkout" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Checkout
          </Link>
        </div>
      </nav>
    </header>
  );
}