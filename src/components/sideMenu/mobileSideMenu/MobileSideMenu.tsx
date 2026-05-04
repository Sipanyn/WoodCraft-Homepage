import { sideMenuItems } from "@/constants/sideMenuItems ";
import { clx } from "@/utlities/clx";
import i18n from "@/utlities/i18n";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
type mobileSideMenuProps = {
  sideMenuItemActive: string;
  setSideMenuItemActive: Dispatch<SetStateAction<string>>;
};

const MobileSideMenu: React.FC<mobileSideMenuProps> = ({
  sideMenuItemActive,
  setSideMenuItemActive,
}) => {
  const { t } = useTranslation("sideMenu");
  const isFa = i18n.language === "fa";
  return (
    <ul className="w-full relative space-y-2 child:duration-300 child:transition-all child:py-3  child:px-2 child:flex child:gap-x-2 text-lg child:cursor-pointer child:rounded-lg block lg:hidden">
      {sideMenuItems.map((item) => (
        <li
          onClick={() => setSideMenuItemActive(item.labelKey)}
          key={item.id}
          className={clx(
            "py-2.5 p-4 flex items-center gap-3 group w-full justify-between",

            !item.isLogout && "hover:text-wood",
            !item.isLogout &&
              sideMenuItemActive === item.labelKey &&
              `${isFa ? "border-r-3" : "border-l-3"} border-wood text-wood dark:text-wood`,

            item.isLogout && "text-red-400 hover:text-red-500",

            "text-black dark:text-white",
          )}
        >
          <div className={`flex flex-row gap-3 ${item.isLogout ? "" : ""}`}>
            <i className={item.icon}></i>
            <a
              className="group-hover:translate-x-1.5 transition-all duration-200"
              href={item.isLogout ? "main.html" : "#"}
              onClick={
                item.isLogout
                  ? (e) => {
                      e.preventDefault(); /* handle logout logic */
                    }
                  : undefined
              }
            >
              <span>{t(item.labelKey)}</span>
            </a>
          </div>
          {!item.isLogout && (
            <i
              className={`${isFa ? "bi bi-arrow-left" : "bi bi-arrow-right"}`}
            ></i>
          )}
        </li>
      ))}
    </ul>
  );
};
export default MobileSideMenu;
