import React from "react";
import { motion } from "framer-motion";
import type { OrderItem } from "@/constants/orders";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import { formatDateFa } from "@/utlities/formatDateFa ";
import OrderProgressBar from "../orderProgressBar/OrderProgressBar";

interface Props {
  order: OrderItem;
  icon: string;
  titleKey: string;
  style: string;
}

const OrderCard: React.FC<Props> = ({ order, icon, titleKey, style }) => {
  const { t } = useTranslation("orderHistory");
  const isFa = i18n.language === "fa";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col border border-wood-dark rounded-lg bg-white dark:bg-zinc-900"
    >
      <div className="p-4 sm:p-5 flex flex-col gap-y-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl ${style} transition-colors`}
            >
              <i className={`bi ${icon} text-xl`}></i>
            </div>

            <p className="text-black dark:text-white">
              {t(`orders.status.${titleKey}`)}
            </p>
          </div>

          <motion.i
            whileHover={{ x: isFa ? -4 : 4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bi ${
              isFa ? "bi-arrow-left" : "bi-arrow-right"
            } cursor-pointer text-gray-400`}
          />
        </div>

        {/* info */}
        <div className="flex flex-wrap items-center gap-3 text-sm border-b border-gray-200 dark:border-wood-dark/40 pb-3">
          <p className="text-gray-400">
            {isFa ? formatDateFa(order.date) : order.date}
          </p>

          <div className="flex gap-1">
            <p className="text-gray-400">{t("orders.labels.orderCode")}</p>
            <p className="font-medium text-black dark:text-white">
              {isFa ? englishToPersianNumber(order.orderCode) : order.orderCode}
            </p>
          </div>

          <div className="flex gap-1">
            <p className="text-gray-400">{t("orders.labels.price")}</p>
            <p className="font-medium text-black dark:text-white">
              {isFa
                ? englishToPersianNumber(order.price.toLocaleString())
                : order.price.toLocaleString()}
              {isFa ? " تومان" : " US $"}
            </p>
          </div>
        </div>

        {/* images */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {order.images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="min-w-17.5 h-17.5 sm:min-w-20 sm:h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-500"
            >
              <img
                src={img}
                alt="item"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* progress bar */}
        {order.status === "inProgress" && order.progressStep !== undefined && (
          <div className="mt-2 space-y-2">
            {order.factoryName && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-50">
                  {t("orders.orderProgress")}
                </span>

                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-wood-dark/10 text-wood-dark font-medium">
                  <i className="bi bi-building"></i>

                  {t(`orders.factories.${order.factoryName}`)}
                </span>
              </div>
            )}

            <OrderProgressBar
              currentStep={order.progressStep}
              orderStatus={order.status}
              className="mt-1"
            />
          </div>
        )}

        {/* action */}
        <div className="flex justify-end gap-2 text-sm text-wood-dark cursor-pointer font-medium">
          <motion.div whileHover={{ x: 3 }} className="w-fit flex gap-2">
            <i className="bi bi-receipt"></i>
            <p>{t("orders.labels.viewInvoice")}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
