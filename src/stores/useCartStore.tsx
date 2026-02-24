import { create } from "zustand";

export interface CartItem {
  id: number;
  nameKey: string;
  price: number;
  quantity: number;
  img: string;
}

interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
  total: number;
  items: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [
    {
      id: 1,
      nameKey: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
      price: 7000000,
      quantity: 2,
      img: "/images/chair1.png",
    },
    {
      id: 2,
      nameKey: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 70cm",
      price: 7000000,
      quantity: 2,
      img: "/images/chair1.png",
    },
  ],
  total: 0, // calculated below
  isCartOpen: false,
  items: 2, //selected products

  addItem: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      let updatedItems;
      if (existing) {
        updatedItems = state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      } else {
        updatedItems = [...state.cartItems, item];
      }
      return { cartItems: updatedItems };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  increment: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),

  decrement: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    })),
  openCart: () => set(() => ({ isCartOpen: true })),
  closeCart: () => set(() => ({ isCartOpen: false })),

  clearCart: () => set({ cartItems: [] }),
}));
