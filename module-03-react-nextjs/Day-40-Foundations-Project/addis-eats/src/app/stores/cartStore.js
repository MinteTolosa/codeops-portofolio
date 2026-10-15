import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
}));

addToCart: (menu) => set((state) => {
    const existingItem = state.cartItems.find(
      (item) => item.id === menu.id
    );
    if (existingItem) {
      const updatedItems = state.cartItems.map((item) => {
        if (item.id === menu.id) {
          return { ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        cartItems: updatedItems,
      };
    }

    return {
      cartItems: [ ...state.cartItems,
    { ...menu, quantity: 1, },
      ],
    };
  }),


export default useCartStore;