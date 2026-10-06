'use client';
import React from 'react';
import { useCart } from './CartProvider';

export default function AddToCartButton({item}) {
    const {addToCart} = useCart();
  return (
    <button onClick={()=>addToCart(item)}
        className='mt-8 rounded-md px-6 py-3 font-semibold transition hover:bg-[#dfc38d]'>
        Add to Cart
    </button>
  );
}
