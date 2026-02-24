import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./HamburgerMenu.module.css";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
type HamburgerMenuProps = {
  menuOpen: boolean;
  toggleLanguage: () => void;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  toggleTheme: () => void;
  theme: string;
};
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  menuOpen,
  setMenuOpen,
  toggleLanguage,
  toggleTheme,
  theme,
}) => {
  const [catOpen, setCatOpen] = useState(false);
  const { t } = useTranslation("hamburgerMenu");
  const isFa = i18n.language === "fa";
  return (
    <aside
      className={`fixed top-0 ${isFa ? "right-0" : "left-0"} h-full w-72
  bg-stone-100/95 dark:bg-neutral-900/95 backdrop-blur-xl
  border-r border-gray-200 dark:border-neutral-700
  text-gray-700 dark:text-gray-200 z-70
  transform transition-all duration-300 ease-out
  overflow-y-auto pb-10
  shadow-2xl
  ${
    menuOpen
      ? "translate-x-0 opacity-100"
      : isFa
        ? "translate-x-full opacity-0"
        : "-translate-x-full opacity-0"
  }
  ${styles.custom_scrollBar}`}
    >
      {/* Menu Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold tracking-wide">{t("menu")}</h2>

        <button
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center w-9 h-9 rounded-lg
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      transition cursor-pointer"
        >
          <i className="bi bi-x text-2xl"></i>
        </button>
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col gap-2 px-5 py-6 font-medium">
        {/* Home */}
        <div
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 cursor-pointer
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200"
        >
          <i className="bi bi-house text-lg"></i>
          <p>{t("home")}</p>
        </div>

        {/* Shop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 cursor-pointer
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200"
        >
          <i className="bi bi-shop text-lg"></i>
          <p>{t("shop")}</p>
        </div>

        {/* Blog */}
        <div
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 cursor-pointer
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200"
        >
          <i className="bi bi-substack text-lg"></i>
          <p>{t("blog")}</p>
        </div>

        {/* Account */}
        <button
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200 cursor-pointer"
        >
          <i className="bi bi-person text-lg"></i>
          <p>{t("account")}</p>
        </button>

        {/* Language */}
        <button
          onClick={() => {
            toggleLanguage();
            setMenuOpen(false);
          }}
          className="flex items-center gap-3
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200 cursor-pointer"
        >
          <i className="bi bi-translate text-lg"></i>
          <p>{t("language")}</p>
        </button>

        {/* Theme */}
        <button
          onClick={() => {
            toggleTheme();
            setMenuOpen(false);
          }}
          className="flex items-center gap-3
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200 cursor-pointer"
        >
          <i
            className={`bi ${
              theme === "dark" ? "bi-moon-stars" : "bi-brightness-high"
            } text-lg`}
          ></i>
          <p>{t("theme")}</p>
        </button>

        {/* Categories */}
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="flex items-center justify-between
      px-4 py-2.5 rounded-xl
      hover:bg-gray-200/60 dark:hover:bg-neutral-800
      hover:text-wood dark:hover:text-white
      transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <i className="bi bi-tags text-lg"></i>
            <p>{t("categories")}</p>
          </div>

          <i className={`bi bi-chevron-${catOpen ? "up" : "down"} text-sm`}></i>
        </button>

        {/* Categories Submenu */}
        {catOpen && (
          <ul
            className="ml-6 mt-2 flex flex-col gap-1
        bg-gray-200/40 dark:bg-neutral-800
        rounded-lg p-2 text-sm"
          >
            <li className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300/50 dark:hover:bg-neutral-700 transition">
              <a href="/cat/1">{t("category_1")}</a>
            </li>

            <li className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300/50 dark:hover:bg-neutral-700 transition">
              <a href="/cat/2">{t("category_2")}</a>
            </li>

            <li className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300/50 dark:hover:bg-neutral-700 transition">
              <a href="/cat/3">{t("category_3")}</a>
            </li>
          </ul>
        )}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-neutral-700 my-4 mx-5" />

      {/* Mobile Sign In */}
      <div className="px-6">
        <a
          href="/signin"
          className="block w-full text-center
      bg-wood hover:opacity-90
      dark:bg-white dark:text-black
      py-2.5 rounded-lg
      font-medium
      transition text-white"
        >
          {t("loginRegister")}
        </a>
      </div>
    </aside>
  );
};

export default HamburgerMenu;
