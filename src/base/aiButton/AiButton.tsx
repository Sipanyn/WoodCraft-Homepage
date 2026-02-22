import i18n from "@/utlities/i18n";
import type React from "react";
import { useTranslation } from "react-i18next";
type AiButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const AiButton = (props: AiButtonProps) => {
  const { t } = useTranslation("sticky");
  const isFa = i18n.language === "fa";
  return (
    <button
      {...props}
      className="

        animate-bounce
    flex items-center gap-2
    bg-stone-200/50 dark:bg-neutral-700/50
    backdrop-blur-xl
    text-black dark:text-white
    p-2 sm:px-3 sm:py-2
    rounded-full
    shadow-lg
    hover:bg-wood hover:dark:bg-wood/90
    transition-all duration-300
    hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-wood/60
    cursor-pointer"
    >
      <i className="bi bi-robot text-2xl flex justify-center items-center"></i>
      <p className="hidden sm:block">{t("orderNow")}</p>
    </button>
  );
};

export default AiButton;
