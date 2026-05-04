import { type Dispatch, type SetStateAction } from "react";
import SideMenuUserInfo from "../sideMenuUserInfo/SideMenuUserInfo";
import { useTranslation } from "react-i18next";
import { sideMenuItems } from "@/constants/sideMenuItems ";
import { clx } from "@/utlities/clx";
import i18n from "@/utlities/i18n";

type SideMenuProps = {
  sideMenuItemActive: string;
  setSideMenuItemActive: Dispatch<SetStateAction<string>>;
};

const SideMenu: React.FC<SideMenuProps> = ({
  sideMenuItemActive,
  setSideMenuItemActive,
}) => {
  const { t } = useTranslation("sideMenu");
  const isFa = i18n.language === "fa";
  return (
    <div className="lg:sticky mb-8 top-20 h-fit lg:w-1/3 hidden lg:flex flex-col gap-y-4 items-center shadow rounded-lg  dark:bg-zinc-900 bg-white ">
      {/* NAME AND AVATAR  */}
      <SideMenuUserInfo />
      {/* sideMenu Items */}
      <ul className="w-full relative space-y-2 child:duration-300 child:transition-all child:py-3  child:px-2 child:flex child:gap-x-2 text-lg child:cursor-pointer child:rounded-lg">
        {sideMenuItems.map((item) => (
          <li
            onClick={() => setSideMenuItemActive(item.labelKey)}
            key={item.id}
            className={clx(
              "py-2.5 p-4 flex items-center gap-3 group",

              !item.isLogout && "hover:text-wood",
              !item.isLogout &&
                sideMenuItemActive === item.labelKey &&
                `${isFa ? "border-r-3" : "border-l-3"} border-wood text-wood dark:text-wood`,

              item.isLogout && "text-red-400 hover:text-red-500",

              "text-black dark:text-white",
            )}
          >
            <i className={item.icon}></i>
            <a
              className="group-hover:translate-x-1.5 transition-all duration-200 "
              href="#"
            >
              <span>{t(item.labelKey)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
