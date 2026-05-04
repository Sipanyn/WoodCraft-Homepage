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
import { useCartStore } from "@/stores/useCartStore";
import { Cart } from "../cart/Cart";
import Modal from "../modal/Modal";
import AiProductCreator from "@/components/aiCreaterModal/AiProductCreator";
import SupprortButton from "@/base/supprortButton/supprortButton";
import { Link, useNavigate } from "react-router-dom";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";

const StickyHeader = () => {
  const navigate = useNavigate();

  // zustand store states
  const { isAiOpen, setIsAiOpen } = useAiModal();

  const theme = useThemeStore((s) => s.theme);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const { openCart, isCartOpen } = useCartStore();
  const totalItems = useCartStore((state) => state.items);

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

  /////

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => {
    if (isCartOpen) {
      // hide scrollbar
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isCartOpen]);

  ///
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* Header */}
      <header
        className={`bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-zinc-700 transition-all mb-3.5 pt-2 z-50    ${scrolled ? "shadow-md border-b " : ""}`}
      >
        <div className="sm:container flex justify-between items-center pt-3 pb-4 px-4 m-auto">
          {/* LEFT (Hamburger mobile / Logo desktop) */}
          <div className="flex items-center">
            {/* Hamburger */}
            <div className="sm:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-2xl text-gray-600 dark:text-gray-200 cursor-pointer"
              >
                <i className="bi bi-list"></i>
              </button>
            </div>

            {/* Logo desktop */}
            <div className="hidden sm:flex cursor-pointer">
              <Logo />
            </div>
          </div>

          {/* CENTER (Logo only mobile) */}
          <div className="flex sm:hidden justify-center cursor-pointer">
            <Logo />
          </div>

          {/* RIGHT */}
          <div className="flex flex-row gap-1 sm:gap-2.5 items-center">
            {/* Ai creator */}
            <div>
              <AiButton onClick={() => setIsAiOpen(true)} />
            </div>
            {/* basket */}
            <button
              onClick={() => {
                if (totalItems > 0) {
                  openCart();
                } else {
                  navigate("/cart");
                }
              }}
              className="relative cursor-pointer text-black dark:text-white  transition-all duration-300 w-10 h-10 rounded-full hover:scale-105 bg-stone-200/50 dark:bg-neutral-700/50 shadow-lg"
            >
              <i className="bi bi-cart text-lg flex items-center justify-center"></i>

              {totalItems > 0 && (
                <div className="absolute -top-1.5 -right-2 ">
                  <span className="animate-ping absolute -top-1 right-1 p-2 inline-flex size-4 rounded-full bg-wood-dark"></span>
                  <span className="flex justify-center items-center p-3 text-xs bg-linear-to-r from-wood to-wood-dark text-white size-4 rounded-full absolute -top-2 right-0">
                    {isFa ? englishToPersianNumber(totalItems) : totalItems}
                  </span>
                </div>
              )}
            </button>

            {/* Settings Button (desktop only) */}
            <div className="hidden sm:block setting_button relative transition-all duration-300">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center cursor-pointer
            text-black dark:text-white 
            transition-all duration-300 w-10 h-10 rounded-full hover:scale-105
            bg-stone-200/50 dark:bg-neutral-700/50 backdrop-blur-xl shadow-lg "
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
                <Link to="/profile">
                  <button
                    onClick={() => setOpen(false)}
                    className={`flex flex-row items-center justify-start gap-2 cursor-pointer text-gray-500 dark:text-gray-200
            transition-all duration-300 px-3 py-1 border-b border-transparent hover:border-gray-300 dark:hover:border-neutral-500 hover:text-wood`}
                  >
                    <i className="bi bi-person"></i>
                    <p>{t("account")}</p>
                  </button>
                </Link>

                {/* Language */}
                <button
                  onClick={() => {
                    toggleLanguage();
                    setOpen(false);
                  }}
                  className={`inline-flex items-center justify-start gap-2 cursor-pointer text-gray-500 dark:text-gray-200
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
                  className={`inline-flex items-center justify-start gap-2 cursor-pointer text-gray-500 dark:text-gray-200
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
                  className={`inline-flex items-center justify-start gap-2 cursor-pointer text-gray-500 dark:text-gray-200
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
      <Cart />
      <SupprortButton />

      <Modal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)}>
        <AiProductCreator onClose={() => setIsAiOpen(false)} />
      </Modal>
    </>
  );
};

export default StickyHeader;
