'use client';
import React from 'react';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);
export default function CartProvider( {children}) {
    const [cart, setCart] = useState([]);

    function addToCart(item) { setCart((currentCart) => {
        const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map((cartItem)=>cartItem.id ===item.id
      ?{ ...cartItem, quantity: cartItem.quantity + 1,}
      : cartItem ); 
      }

      return [...currentCart, {...item, quantity:1,},];

      });
    }

    function removeFromCart(id) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== id));
    }

    function increaseQuantity(id){
      setCart((currentCart)=>currentCart.map((item)=>item.id === id
        ? {...item, quantity: item.quantity + 1}
        : item));
    }

    function decreaseQuantity(id) {
      setCart((currentCart) => currentCart.map((item) => item.id === id
        ?{...item, quantity: item.quantity-1}
        : item) 
        .filter((item) => item.quantity > 0)); 
      }

    const totalItems = cart.reduce((total, item)=> total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item)=> total + item.priceETB * item.quantity, 0);


  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,totalItems,totalPrice,}}>

      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}