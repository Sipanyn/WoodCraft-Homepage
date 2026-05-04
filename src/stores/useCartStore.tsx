import { create } from "zustand";

export interface CartItem {
  id: number;
  nameKey: string;
  price: number;
  discount: number;
  quantity: number;
  img: string;
  colorKey: string;
}

interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
  total: number;
  items: number; // total quantity
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const calcItems = (cart: CartItem[]) =>
  cart.reduce((sum, p) => sum + p.quantity, 0);

export const useCartStore = create<CartState>((set) => ({
  cartItems: [
    {
      id: 1,
      nameKey: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
      price: 7000000,
      discount: 10,
      quantity: 1,
      img: "/images/chair1.png",
      colorKey: "brown",
    },
    {
      id: 2,
      nameKey: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 70cm",
      price: 7000000,
      discount: 50,
      quantity: 1,
      img: "/images/chair1.png",
      colorKey: "brown",
    },
  ],
  total: 0,
  isCartOpen: false,
  items: 2,

  addItem: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      let updated;

      if (existing) {
        updated = state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      } else {
        updated = [...state.cartItems, item];
      }

      return {
        cartItems: updated,
        items: calcItems(updated),
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const updated = state.cartItems.filter((item) => item.id !== id);
      return {
        cartItems: updated,
        items: calcItems(updated),
      };
    }),

  increment: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      return {
        cartItems: updated,
        items: calcItems(updated),
      };
    }),

  decrement: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      return {
        cartItems: updated,
        items: calcItems(updated),
      };
    }),

  clearCart: () =>
    set({
      cartItems: [],
      items: 0,
    }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
