"use client";

import useCartStore from "@/stores/cartStore";
export default function AddToCartButton({ menu }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button onClick={() => addToCart(menu)}
      className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800" >
      Add to Cart
    </button>
  );
}