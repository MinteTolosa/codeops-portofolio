"use client";
import Link from "next/link";
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const {cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold">
          Your Cart
        </h1>
      <p className="mt-4 text-[#b8afa3]">
        Your cart is empty.
      </p>
      <Link href="/menu"
        className="mt-6 inline-block rounded-md bg-[#c9a96e] px-6 py-3 font-semibold text-[#17130f]">
          check Menu
      </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
      <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold"> Your Cart </h1>
        <div className="mt-8 space-y-4">{cart.map((item) => (
          <div key={item.id}
           className="rounded-xl border border-[#6f6252]/30 bg-[#211b15] p-5" >
          <div className="flex items-center justify-between gap-4">
          <div>
          <h2 className="text-xl font-semibold"> {item.nameEn} </h2>
          <p className="mt-1 text-[#c9a96e]">{item.priceETB} ETB</p>
          </div>
        <button onClick={() => removeFromCart(item.id)}
          className="text-sm text-[#d98b6b] hover:underline">
           Remove
        </button>
        </div>
      <div className="mt-5 flex items-center gap-4">
        <button onClick={() => decreaseQuantity(item.id)}
          className="rounded border border-[#6f6252] px-3 py-1" >
            −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}
          className="rounded border border-[#6f6252] px-3 py-1" >
           +
        </button>
    </div>
  </div>
  ))}
  </div>
    <div className="mt-8 flex items-center justify-between border-t border-[#6f6252]/30 pt-6">
    <h2 className="text-2xl font-bold">
      Total
    </h2>
    <p className="text-2xl font-bold text-[#c9a96e]">
      {totalPrice} ETB
    </p>
     </div>
    <Link href="/checkout"
      className="mt-6 block rounded-md bg-[#c9a96e] px-6 py-3 text-center font-semibold text-[#17130f]">
      Checkout
    </Link>
    </div>
  </main>
  );
}