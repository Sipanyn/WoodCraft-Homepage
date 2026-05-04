import { create } from "zustand";

interface Product {
  id: string;
  nameKey: string;
  price: number;
  image: string;
}

interface BookmarkStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
}

const initialItems: Product[] = [
  {
    id: "1",
    nameKey: "products.chair.casale80",
    price: 7000000,
    image: "/images/chair1.png",
  },
  {
    id: "2",
    nameKey: "products.chair.casale70",
    price: 7000000,
    image: "/images/chair1.png",
  },
];

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  items: initialItems,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
}));
