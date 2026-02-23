import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",

      // ✅ on hydration, apply theme immediately to DOM
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          const html = document.documentElement;
          html.classList.toggle("dark", state.theme === "dark");
        }
      },
    },
  ),
);
