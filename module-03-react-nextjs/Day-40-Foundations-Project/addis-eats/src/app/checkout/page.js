'use client';

import Link from 'next/link';
import useCartStore from '../stores/cartStore';
import CheckoutForm from './CheckoutForm';

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const total = cartItems.reduce(
    (total, item) => total + item.priceETB * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#17130f] text-[#f5efe6] p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <div className="border-b border-[#6f6252]/40 pb-6 mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Addis-Eats
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">Order Checkout</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-12 text-center shadow-2xl space-y-4">
            <p className="text-lg text-[#b8afa3]">Your cart is empty.</p>
            <Link
              href="/menu"
              className="inline-block text-[#c9a96e] font-semibold hover:underline"
            >
              Browse Our Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Order Items Preview */}
            <div className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-6 shadow-2xl space-y-4">
              <h2 className="font-bold text-lg text-[#f5efe6] border-b border-[#6f6252]/40 pb-3">
                Order Summary
              </h2>
              <div className="divide-y divide-[#6f6252]/30 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <h3 className="font-semibold text-[#f5efe6]">{item.nameEn}</h3>
                      <p className="text-[#9e9589] text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#c9a96e]">
                      {item.priceETB * item.quantity} ETB
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#6f6252]/40 pt-4 flex justify-between text-lg font-bold text-[#f5efe6]">
                <span>Total Amount</span>
                <span className="text-[#c9a96e]">{total} ETB</span>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <CheckoutForm cartItems={cartItems} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}