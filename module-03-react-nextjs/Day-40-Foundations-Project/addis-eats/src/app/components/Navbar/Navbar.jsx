import Link from "next/link";
import { getSession } from "@/lib/session";
import NavbarAuth from "../NavbarAuth/NavbarAuth";


export default async function Navbar() {
  const user = await getSession();

  return (
    <header className="border-b border-[#6f6252]/30 bg-[#17130f]">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/"
          className="text-2xl font-bold tracking-wide text-[#c9a96e]" >
          Addis-Eats
        </Link>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Home
          </Link>
          <Link href="/menu" className="text-[#f5efe6] transition hover:text-[#c9a96e]">
            Menu
          </Link>
          <Link href="/cart" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Cart
          </Link>
          <Link href="/checkout" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Checkout
          </Link>
          <Link href="/orders" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Orders
          </Link> 
          {(user?.role === "admin" || user?.role === "staff") && (
          <Link href="/kitchen"
            className="text-[#c9a96e] hover:text-[#dfc38d] transition" >
            Kitchen
          </Link>
          )}
          {user?.role === "admin" && (
            <Link href="/dashboard" className="text-[#c9a96e] transition hover:text-[#dfc38d]" >
              Dashboard
            </Link>
          )}
          <NavbarAuth user={user} />
        </div>
      </nav>
    </header>
  );
}
