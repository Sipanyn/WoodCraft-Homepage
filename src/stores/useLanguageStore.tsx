import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "@/utlities/i18n/index";
interface LanguageState {
  language: "en" | "fa"; // or string if more flexible
  setLanguage: (lang: "en" | "fa") => void;
  toggleLanguage: () => void;
}
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",

      setLanguage: (lang: "en" | "fa") => {
        i18n.changeLanguage(lang); // sync with i18next
        set({ language: lang });
      },

      toggleLanguage: () =>
        set((state: LanguageState) => {
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
