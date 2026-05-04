import { orders } from "@/constants/orders";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const statusConfig = {
  inProgress: {
    icon: "https://www.digikala.com/statics/img/svg/status-processing.svg",
    label: "inProgress",
  },
  delivered: {
    icon: "https://www.digikala.com/statics/img/svg/status-delivered.svg",
    label: "delivered",
  },
  returned: {
    icon: "https://www.digikala.com/statics/img/svg/status-returned.svg",
    label: "returned",
  },
};
type AllOrdersProps = {
  handleViewAllOrders: () => void;
  handleOrderView: (tabName: string) => void;
  sideMenuItemActive: string;
};
const AllOrders: React.FC<AllOrdersProps> = ({
  handleViewAllOrders,
  handleOrderView,
}) => {
  const { t } = useTranslation("orderStatus");
  const isFa = i18n.language === "fa";

  const orderCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative my-4 rounded-xl border border-gray-100 dark:border-none bg-white dark:bg-zinc-900 shadow-sm"
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-neutral-700">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {t("myOrders")}
        </h2>

        <motion.button
          onClick={handleViewAllOrders}
          whileHover={{ x: isFa ? -3 : 3 }}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-wood-dark transition-colors cursor-pointer"
        >
          {t("viewAll")}

          <i
            className={`${
              isFa ? "bi bi-arrow-left" : "bi bi-arrow-right"
            } text-sm`}
          />
        </motion.button>
      </div>

      {/* statuses */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 px-4 py-5"
      >
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orderCounts[status] ?? 0;

          return (
            <motion.div
              onClick={() => handleOrderView(config.label)}
              key={status}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex flex-col items-center text-center rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <motion.div
                className="mb-2 flex items-center justify-center"
                whileHover={{ rotate: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  className="object-contain w-10 h-10 sm:w-14 sm:h-14"
                  src={config.icon}
                  alt={status}
                />
              </motion.div>

              <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {isFa ? englishToPersianNumber(count) : count}
                <span className="ml-1 text-gray-500 text-xs sm:text-sm">
                  {t("order")}
                </span>
              </div>

              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t(config.label)}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default AllOrders;
