'use client';
import React from 'react';
import useCartStore from '../stores/cartStore'
import { useEffect } from 'react';

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart );
  const total = cartItems.reduce((total, item) => 
    total + item.priceETB * item.quantity, 0);
  useEffect(() => {
  useCartStore.persist.rehydrate();
  }, []);
  return (
    <main className="mx-auto max-w-4xl p-6">
    <h1 className="mb-6 text-3xl font-bold">
      Your Cart
    </h1>
    {cartItems.length === 0 ? (
    <p className="text-gray-500">
      Your cart is empty.
    </p> ) 
    : (
    <div>
    {cartItems.map((item) => (
     <div key={item.id} className="mb-4 rounded-xl border p-4" >
      <h2 className="text-xl font-semibold">
       {item.nameEn}
      </h2>
      <p>Price: {item.priceETB} ETB</p>
      <div className="mt-3 flex items-center gap-4">
        <button onClick={() => decreaseQuantity(item.id)}>
          −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}>
         +
        </button>
        <button onClick={() => removeFromCart(item.id)}
          className="ml-auto text-red-600">
          Remove
        </button>
        </div>
        </div>
      ))}
      <p className="mt-6 text-xl font-bold">
        Total: {total} ETB
      </p>
      </div>
    )}
  </main>
  );
}
