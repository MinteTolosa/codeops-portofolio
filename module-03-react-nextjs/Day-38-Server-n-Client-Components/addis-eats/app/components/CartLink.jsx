"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
export default function CartLink() {
  const { totalItems } = useCart();
  return (
    <Link href="/cart">
      Cart ({totalItems})
    </Link>
  );
}