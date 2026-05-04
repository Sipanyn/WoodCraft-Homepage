import React from "react";
import { orders } from "@/constants/orders";
import OrderCard from "../orderCard/OrderCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
interface orderListProps {
  searchQuery: string;
  isSearchOpen: boolean;
  status: "inProgress" | "canceled" | "delivered" | "returned";
}

const OrderList: React.FC<orderListProps> = ({
  status,
  searchQuery,
  isSearchOpen,
}) => {
  const { t } = useTranslation("orderHistory");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredOrders = isSearchOpen
    ? orders.filter(
        (order) =>
          order.productNameEn.toLowerCase().includes(normalizedQuery) ||
          order.productNameFa.includes(normalizedQuery),
      )
    : orders.filter((order) => order.status === status);

  const statusConfig = {
    inProgress: {
      icon: "bi-arrow-repeat",
      titleKey: "inProgress",
      style:
        "text-[#8a6a47] bg-[#8a6a47]/10 dark:text-[#d6b893] dark:bg-[#8a6a47]/20",
    },
    canceled: {
      icon: "bi-x-circle",
      titleKey: "canceled",
      style:
        "text-[#b45353] bg-[#b45353]/10 dark:text-[#e08a8a] dark:bg-[#b45353]/20",
    },
    delivered: {
      icon: "bi-check-circle",
      titleKey: "delivered",
      style:
        "text-[#6b8f71] bg-[#6b8f71]/10 dark:text-[#9cc7a3] dark:bg-[#6b8f71]/20",
    },
    returned: {
      icon: "bi-arrow-return-left",
      titleKey: "returned",
      style:
        "text-[#a07a52] bg-[#a07a52]/10 dark:text-[#d4b08a] dark:bg-[#a07a52]/20",
    },
  };

  if (isSearchOpen && searchQuery.trim() === "") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500">
        <i className="bi bi-search text-4xl mb-3"></i>
        <p className="text-sm">{t("orders.startTyping")}</p>
      </div>
    );
  }
  if (isSearchOpen && filteredOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500">
        <i className="bi bi-box-seam text-4xl mb-3"></i>
        <p className="text-sm">{t("orders.couldntFind")}</p>
      </div>
    );
  }
  if (filteredOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500">
        <i className="bi bi-box-seam text-4xl mb-3"></i>
        <p className="text-sm">{t(`orders.empty.${status}`)}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5"
    >
      {filteredOrders.map((order) => {
        const config = statusConfig[order.status];

        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <OrderCard
              order={order}
              icon={config.icon}
              titleKey={config.titleKey}
              style={config.style}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default OrderList;
