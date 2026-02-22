import i18n from "@/utlities/i18n";
import { useTranslation } from "react-i18next";

const NavBar: React.FC = () => {
  const { t } = useTranslation("navBar");
  const isFa = i18n.language === "fa";
  return (
    <nav
      className={`w-fit  sm:size-full bg-wood-dark dark:bg-neutral-700 rounded-xl px-2 py-1 sm:rounded-3xl  sm:px-4 sm:py-3`}
    >
      <div className="flex items-center justify-start">
        {/* Desktop menu */}
        <ul className="hidden sm:flex flex-row gap-10 text-white transition-all duration-500 px-4">
          <li className="relative group">
            <a href="#" className="relative">
              {t("home")}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[1.5px] w-0 bg-stone-100/50 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>

          <li className="relative group transition-all duration-500">
            <a className="flex items-end gap-1 relative" href="#">
              {t("categories")}
              <i className="bi bi-chevron-down flex justify-center items-center group-hover:rotate-180 transition-all duration-300"></i>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[1.5px] w-0 bg-stone-100/50 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <ul
              className={`absolute top-10 ${isFa ? "right-0" : "left-0"} bg-wood-dark dark:bg-neutral-700 rounded-lg py-2 min-w-37 z-10 opacity-0 invisible translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
            >
              <li>
                <a
                  href="/cat/1"
                  className="block px-4 py-2 text-white hover:scale-x-105 transition-all"
                >
                  {t("category_1")}
                </a>
              </li>
              <li>
                <a
                  href="/cat/2"
                  className="block px-4 py-2 text-white hover:scale-x-105 transition-all"
                >
                  {t("category_2")}
                </a>
              </li>
              <li>
                <a
                  href="/cat/3"
                  className="block px-4 py-2 text-white hover:scale-x-105 transition-all"
                >
                  {t("category_3")}
                </a>
              </li>
            </ul>
          </li>

          <li className="relative group">
            <a href="#" className="relative">
              {t("shop")}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[1.5px] w-0 bg-stone-100/50 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>

          <li className="relative group">
            <a href="#" className="relative">
              {t("blog")}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[1.5px] w-0 bg-stone-100/50 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
