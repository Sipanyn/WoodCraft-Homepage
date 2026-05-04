// src/components/MessageCard.tsx
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { formatDateFa } from "@/utlities/formatDateFa ";

interface MessageCardProps {
  messageData: {
    id: string;
    type: "inProgress" | "delivered" | "returned" | "canceled";
    headerIconClass: string;
    headerTitle: string;
    headerSubtitle: string;
    productImageSrc: string;
    productName: string;
    productQuantity: number;
    codeTitle: string;
    deliveryCode?: string;
    estimatedDate?: string;
    footerText?: string;
    footerIconClass?: string;
  };
}

const MessageCard: React.FC<MessageCardProps> = ({ messageData }) => {
  const {
    id,
    type,
    headerIconClass, // Directly use the string class name
    headerTitle,
    headerSubtitle,
    productImageSrc,
    productName,
    productQuantity,
    codeTitle,
    deliveryCode,
    date,
    footerText,
    footerIconClass, // Directly use the string class name
  } = messageData;

  // Helper function to render Bootstrap icons using <i> tags and class names
  const renderIcon = (iconClassName: string | undefined) => {
    if (!iconClassName) return null;
    // We return an <i> tag with the provided Bootstrap icon class.
    // The size and color are handled by Tailwind classes passed in the parent divs.
    return <i className={iconClassName}></i>;
  };

  const { t } = useTranslation("messageData");
  const isFa = i18n.language === "fa";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="
    group rounded-xl border border-wood-dark 
    bg-white dark:bg-zinc-900
    p-4 sm:p-5
    transition-all duration-300
    hover:shadow-md
  "
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200"
        >
          {renderIcon(headerIconClass)}
        </motion.div>

        <div className="flex flex-col">
          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {t(`${id}.headerTitle`)}
          </p>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {t(`${id}.headerSubtitle`)}
          </p>
        </div>
      </div>

      {/* Product Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.2 }}
            className="
          w-14 h-14 sm:w-16 sm:h-16
          rounded-lg object-cover
          border border-gray-200 dark:border-neutral-700
        "
            src={productImageSrc}
            alt={`${productName} Image`}
          />

          <div className="flex flex-col">
            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
              {t(`${id}.productName`)}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t(`messages.quantity`)}
              {isFa ? englishToPersianNumber(productQuantity) : productQuantity}
            </p>
          </div>
        </div>

        {/* Delivery Code */}
        {deliveryCode && (
          <motion.div
            initial={{ opacity: 0, x: isFa ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${isFa ? "items-start" : "items-end"} flex flex-col`}
          >
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
              {t(`messages.deliveryCode`)}
            </p>

            <div
              className="
            px-3 py-1
            rounded-md
            text-sm font-semibold
            bg-wood-dark text-white
            tracking-widest
          "
            >
              {isFa ? englishToPersianNumber(deliveryCode) : deliveryCode}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="
    flex items-center justify-between
    mt-4 pt-3
    border-t border-gray-100 dark:border-neutral-700
    text-xs text-gray-500 dark:text-gray-400
  "
      >
        {date && (
          <span className="flex items-center gap-1.5">
            <i className="bi bi-calendar-event text-sm"></i>
            {type === "inProgress" && t("messages.estimatedDelivery")}
            {type === "canceled" && t("messages.canceledOn")}
            {type === "delivered" && t("messages.deliveredOn")}
            {isFa ? formatDateFa(date) : date}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MessageCard;
