import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type FilterBoxProps = {
  icon: string;
  title: string; // use translation key instead of direct string
  content: string;
  value: number;
};

const FilterBox: React.FC<FilterBoxProps> = ({
  icon,
  title,
  content,
  value,
}) => {
  const { t, i18n } = useTranslation("filterBox");
  const isFa = i18n.language === "fa";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
      flex items-center gap-3 sm:gap-4
      bg-white dark:bg-zinc-900
      rounded-xl shadow-sm hover:shadow-md
      border border-gray-100 dark:border-none
      transition-all duration-300
      px-4 sm:px-6 py-3
      min-w-50 sm:min-w-45 lg:min-w-50
      flex-1 cursor-pointer
    "
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 6, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="
     flex
    items-center justify-center
    text-wood dark:text-wood-light
    bg-wood/10 dark:bg-zinc-800
    rounded-lg p-2
  "
      >
        <i className={`${icon} text-lg sm:text-2xl`}></i>
      </motion.div>

      {/* Text content */}
      <div className="flex flex-col gap-0.5 min-w-0">
        {/* Title */}
        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white truncate">
          {t(title)}
        </h2>

        {/* Value line */}
        <div
          className={`flex items-baseline ${
            title === "wallet" ? "flex-row" : "flex-row-reverse"
          } gap-1 text-gray-600 dark:text-gray-300`}
        >
          {title !== "wallet" && (
            <span className="text-xs sm:text-sm truncate">{t(content)}</span>
          )}

          <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
            {isFa ? englishToPersianNumber(value) : value}

            {title === "wallet" && (
              <span className="ml-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                {t("unit")} {t("balance")}
              </span>
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBox;
