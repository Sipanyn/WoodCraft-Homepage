import { useBookmarkStore } from "@/stores/useBookmarkStore";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface BookmarkedItemProps {
  item: {
    id: string;
    nameKey: string;
    price: number;
    image: string;
  };
}

const BookmarkedItem: React.FC<BookmarkedItemProps> = ({ item }) => {
  const removeItem = useBookmarkStore((state) => state.removeItem);
  const { t } = useTranslation("bookmarks");
  const isFa = i18n.language === "fa";

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
        relative flex flex-col rounded-xl overflow-hidden
        border border-wood-dark
        bg-white dark:bg-zinc-900
        shadow-sm hover:shadow-lg hover:border-wood-dark
        transition-all duration-300
        p-4 sm:p-5 cursor-pointer
      "
      >
        {/* Delete Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => removeItem(item.id)}
          className="
          absolute top-2 right-2 sm:top-3 sm:right-3
          text-gray-400 hover:text-wood-dark
          transition-colors duration-200 z-10  cursor-pointer
        "
          aria-label="Remove from bookmarks"
        >
          <i className="bi bi-x-lg text-base sm:text-lg p-1.5"></i>
        </motion.button>

        {/* Product Image */}
        <motion.div
          className="mb-4 sm:mb-5 flex justify-center items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.25 }}
        >
          <img
            src={item.image}
            alt={t(item.nameKey)}
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-md"
            loading="lazy"
          />
        </motion.div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 text-center sm:text-left">
          <p
            className={`text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-2 leading-tight ${
              isFa ? "text-right" : "text-left"
            }`}
          >
            {t(item.nameKey)}
          </p>

          <p className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-400 mb-3">
            {isFa
              ? englishToPersianNumber(item.price.toLocaleString())
              : item.price.toLocaleString()}
            <span className="ml-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              {t("bookmarks.unit")}
            </span>
          </p>

          <div className="mt-auto flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
              w-full border-2 border-wood-dark text-wood-dark
              font-medium rounded-md px-4 py-2.5
              hover:bg-wood-dark hover:text-white
              transition-all duration-200
              flex items-center justify-center gap-x-2 text-nowrap
            "
            >
              {t("bookmarks.add")}
              <i className="bi bi-cart text-xl"></i>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookmarkedItem;
