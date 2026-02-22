import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "@/utlities/i18n/index";

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: "en",

      setLanguage: (lang: string) => {
        i18n.changeLanguage(lang); // sync with i18next
        set({ language: lang });
      },

      toggleLanguage: () =>
        set((state: string) => {
          const newLang = state.language === "en" ? "fa" : "en";
          i18n.changeLanguage(newLang);
          return { language: newLang };
        }),
    }),
    {
      name: "app-language",
    },
  ),
);
