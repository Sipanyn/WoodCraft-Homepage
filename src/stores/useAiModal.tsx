import { create } from "zustand";

export const useAiModal = create((set) => ({
  isAiOpen: false,

  setIsAiOpen: (value) => set({ isAiOpen: value }),

  toggleAi: () =>
    set((state) => ({
      isAiOpen: !state.isAiOpen,
    })),
}));
