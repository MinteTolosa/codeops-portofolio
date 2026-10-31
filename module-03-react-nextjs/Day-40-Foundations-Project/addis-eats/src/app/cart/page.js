'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import useCartStore from '../stores/cartStore';

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.priceETB * item.quantity, 0);

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6 text-[#c9a96e]">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#c9a96e]">Addis-Eats Cart</h1>
          <p className="text-sm text-gray-500">Review your food order before checkout</p>
        </div>
        <Link href="/menu" className="text-sm font-semibold text-[#c9a96e] hover:underline">
          + Add More Food
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center space-y-4 shadow-sm">
          <p className="text-gray-500 text-lg">Your food cart is currently empty.</p>
          <Link
            href="/menu"
            className="inline-block bg-[#c9a96e] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#dfc38d] transition shadow-md"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">{item.nameEn}</h2>
                  <p className="text-sm text-[#c9a96e]font-semibold mt-1">
                    {item.priceETB} ETB <span className="text-xs text-gray-400 font-normal">/ item</span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-slate-50 border rounded-lg p-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md border font-bold text-gray-700 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md border font-bold text-gray-700 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                {/* Total per Item & Remove */}
                <div className="text-right min-w-[90px]">
                  <p className="font-bold text-gray-900">
                    {(item.priceETB * item.quantity).toLocaleString()} ETB
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="h-fit">
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold border-b pb-3 text-slate-800">Order Summary</h2>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold text-[#c9a96e]">{totalQuantity}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#c9a96e]">{subtotal.toLocaleString()} ETB</span>
                </div>
              </div>
              <Link href="/checkout"
                className="block text-center w-full bg-[#c9a96e] hover:bg-[#dfc38d] text-white font-bold py-3 rounded-xl transition shadow-md"
              >
                Proceed to Delivery Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}