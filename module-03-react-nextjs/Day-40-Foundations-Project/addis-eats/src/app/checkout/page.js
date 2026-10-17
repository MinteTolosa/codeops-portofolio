"use client";
import Link from "next/link";
import useCartStore from "../stores/cartStore";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const total = cartItems.reduce( (total, item) => 
    total + item.priceETB * item.quantity, 0 );

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Checkout
      </h1>
      <CheckoutForm />
      {cartItems.length === 0 ? (
      <div>
        <p className="mb-4 text-gray-500">
         Your cart is empty.
        </p>
        <Link href="/menu" className="text-blue-600 hover:underline">
          Browse Menu
        </Link>
      </div>
      ) : (
      <div>
        <div className="space-y-4">

        {cartItems.map((item) => (
        <div key={item.id}
          className="flex justify-between border-b pb-3">
          <div>
           <h2 className="font-semibold"> {item.nameEn} </h2>
           <p className="text-sm text-gray-500">
            Quantity: {item.quantity}
           </p>
          </div>
          <p className="font-medium">
            {item.priceETB * item.quantity} ETB
          </p>
        </div>
          ))}
        </div>
          <div className="mt-6 flex justify-between text-xl font-bold">
          <span>Order Total</span>
          <span>{total} ETB</span>
          </div>
          <button className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800" >
            Place Order
          </button>
        </div>
      )}
    </main>
  );
}