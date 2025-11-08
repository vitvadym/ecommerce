import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const isItemInCart = get().cartItems.find(
          (cartItem) => cartItem.id === item.id,
        );
        if (!isItemInCart) {
          set({ cartItems: [...get().cartItems, item] });
        } else {
          set({
            cartItems: get().cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: (cartItem.quantity += 1) }
                : cartItem,
            ),
          });
        }
      },
      addQnty: (itemId) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: (item.quantity += 1) }
              : item,
          ),
        });
      },
      reduceQnty: (itemId) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === itemId && item.quantity > 1
              ? { ...item, quantity: (item.quantity -= 1) }
              : item,
          ),
        });
      },
      removeFromCart: (itemId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== itemId),
        });
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
      getTotalAmount: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: 'user-cart',
    },
  ),
);

export default useCartStore;
