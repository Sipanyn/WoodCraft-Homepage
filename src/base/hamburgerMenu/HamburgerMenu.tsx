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
      className={`fixed top-0 ${isFa ? "left-0" : "right-0"} h-full w-72 
  text-white bg-stone-100 dark:bg-neutral-900 z-70 
  transform transition-transform duration-300 ease-in-out 
  overflow-scroll pb-10
  ${
    menuOpen ? "translate-x-0" : isFa ? "-translate-x-full" : "translate-x-full"
  } ${styles.custom_scrollBar}`}
    >
      {/* Menu Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b text-gray-700  dark:text-white dark:border-neutral-700">
        <h2 className="text-lg font-semibold ">{t("menu")}</h2>
        <button onClick={() => setMenuOpen(false)}>
          <i className="bi bi-x text-2xl cursor-pointer hover:bg-gray-200/50 rounded-sm px-0.5"></i>
        </button>
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col gap-3 px-6 py-6 font-medium text-gray-700 dark:text-gray-200">
        {/* Home */}
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left cursor-pointer hover:text-wood dark:hover:text-white transition px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800"
        >
          <i className="bi bi-house text-lg"></i>
          <p>{t("home")}</p>
        </div>

        {/* Shop */}
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left cursor-pointer hover:text-wood dark:hover:text-white transition px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800"
        >
          <i className="bi bi-shop text-lg"></i>
          <p>{t("shop")}</p>
        </div>

        {/* Blog */}
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left cursor-pointer hover:text-wood dark:hover:text-white transition px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800"
        >
          <i className="bi bi-substack text-lg"></i>
          <p>{t("blog")}</p>
        </div>

        {/* Account */}
        <button
          onClick={() => {
            setMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left  dark:text-gray-200 hover:text-wood dark:hover:text-white transition px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800 cursor-pointer"
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
          className="flex items-center gap-3 w-full text-left  dark:text-gray-200 hover:text-wood dark:hover:text-white transition px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800 cursor-pointer"
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
          className="flex items-center gap-3 w-full text-left  dark:text-gray-200 hover:text-wood dark:hover:text-white  px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <i
            className={`bi ${theme === "dark" ? "bi-moon-stars" : "bi-brightness-high"} text-lg`}
          ></i>
          <p>{t("theme")}</p>
        </button>

        {/* Categories */}
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="flex items-center justify-between w-full text-left cursor-pointer hover:text-wood dark:hover:text-white transition px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-neutral-800"
        >
          <div className="flex items-center gap-3">
            <i className="bi bi-tags text-lg"></i>
            <p>{t("categories")}</p>
          </div>
          <i className={`bi bi-chevron-${catOpen ? "up" : "down"}`}></i>
        </button>

        {/* Categories Submenu */}
        {catOpen && (
          <ul className="ml-3 mt-2  dark:bg-neutral-800  p-2 flex flex-col gap-1 transition-all duration-200">
            <li className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-neutral-700 hover:text-wood dark:hover:text-white transition">
              <a href="/cat/1">{t("category_1")}</a>
            </li>
            <li className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-neutral-700 hover:text-wood dark:hover:text-white transition">
              <a href="/cat/2">{t("category_2")}</a>
            </li>
            <li className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-neutral-700 hover:text-wood dark:hover:text-white transition">
              <a href="/cat/3">{t("category_3")}</a>
            </li>
          </ul>
        )}
      </nav>
      {/* Divider */}
      <div className="border-t border-gray-700 dark:border-neutral-700 my-4" />

      {/* Mobile Sign In */}
      <div className="px-6">
        <a
          href="/signin"
          className="block w-full text-center bg-wood hover:opacity-80 dark:hover:opacity-90  dark:bg-white dark:text-black  py-2 rounded-md transition  text-white "
        >
          {t("loginRegister")}
        </a>
      </div>
    </aside>
  );
};

export default HamburgerMenu;
