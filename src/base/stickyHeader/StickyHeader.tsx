import { useEffect, useState } from "react";
// import styles from "./steakyHeader.module.css";
import Logo from "../logo/Logo";
import { useThemeStore } from "@/stores/useThemeStore ";
import { useLanguageStore } from "@/stores/useLanguageStore";
import AiButton from "../aiButton/AiButton";
import { useAiModal } from "@/stores/useAiModal";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";

const StickyHeader = () => {
  // zustand store states
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { setIsAiOpen } = useAiModal();
  // dropdown menu for settings
  const [open, setOpen] = useState(false);
  const { toggleLanguage } = useLanguageStore();

  // hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  const { t } = useTranslation("sticky");
  const isFa = i18n.language === "fa";

  useEffect(() => {
    if (menuOpen) {
      // hide scrollbar
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [menuOpen]);
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-zinc-700 transition-all duration-500 mb-3.5">
        <div className="sm:container flex flex-row-reverse sm:flex-row justify-between items-center pt-3 pb-4 px-4 m-auto ">
          {/* Hamburger */}
          <div className="sm:hidden flex flex-1 justify-end">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl text-gray-600 dark:text-gray-200 cursor-pointer"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 justify-center cursor-pointer">
            <Logo />
          </div>
          {/* Actions */}
          <div className="flex flex-row flex-1 justify-start gap-2.5">
            {/* Ai creator */}
            <AiButton onClick={() => setIsAiOpen(true)} />
            {/* basket */}
            <button className="inline-flex items-center justify-center cursor-pointer text-black dark:text-white hover:bg-wood hover:dark:bg-wood/90 transition-all duration-300  w-10 h-10 rounded-full  hover:scale-105 bg-stone-200/50 dark:bg-neutral-700/50 shadow-lg">
              <i className="bi bi-cart text-lg flex items-center justify-center"></i>
            </button>
            {/* Settings Button */}
            <div className="hidden sm:flex setting_button relative  flex-row justify-start sm:justify-end items-center gap-2 sm:flex-1 transition-all duration-300">
              {/* Gear Button */}
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center cursor-pointer
          text-black dark:text-white hover:bg-wood hover:dark:bg-wood/90
          transition-all duration-300 w-10 h-10 rounded-full hover:scale-105
          bg-stone-200/50 dark:bg-neutral-700/50 backdrop-blur-xl shadow-lg"
              >
                <i className="bi bi-gear text-lg"></i>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute ${isFa ? "left-0" : "right-0"}  top-15 flex flex-col gap-2 bg-stone-100 dark:bg-neutral-700 shadow-lg py-5 px-2 rounded-xl w-fit
          transition-all duration-300 origin-top
          ${open ? "opacity-100 translate-y-0 scale-100 visible" : "opacity-0 -translate-y-3 scale-95 invisible"} `}
              >
                {/* User Panel */}
                <button
                  onClick={() => setOpen(false)}
                  className={`flex flex-row  items-center justify-start gap-2  cursor-pointer text-gray-500 dark:text-gray-200
            transition-all duration-300 px-3 py-1 border-b border-transparent hover:border-gray-300 dark:hover:border-neutral-500 hover:text-wood`}
                >
                  <i className="bi bi-person"></i>
                  <p>{t("account")}</p>
                </button>

                {/* Language */}
                <button
                  onClick={() => {
                    toggleLanguage();
                    setOpen(false);
                  }}
                  className={`inline-flex  items-center justify-start gap-2  cursor-pointer text-gray-500 dark:text-gray-200
            transition-all duration-300 px-3 py-1 border-b border-transparent hover:border-gray-300 dark:hover:border-neutral-500 hover:text-wood`}
                >
                  <i className="bi bi-translate size-6"></i>
                  <span>{t("language")}</span>
                </button>

                {/* Theme */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                  className={`inline-flex  items-center justify-start gap-2  cursor-pointer text-gray-500 dark:text-gray-200
            transition-all duration-300 px-3 py-1 border-b border-transparent hover:border-gray-300 dark:hover:border-neutral-500 hover:text-wood`}
                >
                  <i
                    className={`bi ${
                      theme === "dark" ? "bi-moon-stars" : "bi-brightness-high"
                    } size-6`}
                  ></i>
                  <span>{t("theme")}</span>
                </button>

                {/* Sign In */}
                <button
                  onClick={() => setOpen(false)}
                  className={`inline-flex  items-center justify-start gap-2  cursor-pointer text-gray-500 dark:text-gray-200
            transition-all duration-300 px-3 py-1 border-b border-transparent hover:border-gray-300 dark:hover:border-neutral-500 hover:text-wood`}
                >
                  <i className="bi bi-box-arrow-in-left"></i>
                  <p className="text-center text-nowrap">{t("signIn")}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 h-full"
          onClick={() => {
            setMenuOpen(false);
          }}
        />
      )}

      {/* Mobile Slide Menu */}
      <HamburgerMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        toggleLanguage={toggleLanguage}
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </>
  );
};

export default StickyHeader;
