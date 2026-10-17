import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(persist((set) => ({
  cartItems: [],

  addToCart: (menu) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === menu.id);
      if (existingItem) {
        const updatedItems = state.cartItems.map((item) => {
          if (item.id === menu.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return { cartItems: updatedItems };
      }
      return {
        cartItems: [...state.cartItems, { ...menu, quantity: 1 }],
      };
    }),
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== id),
  })),
  increaseQuantity: (id) => set((state) => ({
    cartItems: state.cartItems.map((item) => item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
    ),
  })),
  decreaseQuantity: (id) => set((state) => ({
    cartItems: state.cartItems.map((item) => item.id === id
      ? { ...item, quantity: item.quantity - 1 }
      : item
    )
      .filter((item) => item.quantity > 0),
  })),
  }),
  {
    name: "addis-eats-cart",
    skipHydration: true,
    },
  )
);

export default useCartStore;