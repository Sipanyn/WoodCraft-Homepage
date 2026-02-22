import { create } from "zustand";
interface AiModalState {
  isAiOpen: boolean;
  setIsAiOpen: (open: boolean) => void;
}
export const useAiModal = create<AiModalState>((set) => ({
  isAiOpen: false,

  setIsAiOpen: (value) => set({ isAiOpen: value }),

  toggleAi: () =>
    set((state) => ({
      isAiOpen: !state.isAiOpen,
    })),
}));
