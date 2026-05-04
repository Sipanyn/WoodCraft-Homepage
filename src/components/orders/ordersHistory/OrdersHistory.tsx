import OrderList from "@/components/orders/orderList.tsx/OrderList";
import OrdersHistoryNavBar from "@/components/orders/ordersHistoryNavBar/OrdersHistoryNavBar";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type OrdersHistoryProps = {
  handleOrderTabChange: (tabName: string) => void;
  activeOrderTab: string;
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

const OrdersHistory: React.FC<OrdersHistoryProps> = ({
  handleOrderTabChange,
  activeOrderTab,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation("orderHistory");

  return (
    <div className="rounded-xl shadow-md mb-6 bg-white dark:bg-zinc-900 p-5 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          {t("orders.historyTitle")}
        </h1>

        {/* Search Button */}
        {!isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-600 dark:text-gray-300 hover:text-wood transition cursor-pointer"
          >
            <i className="bi bi-search text-lg "></i>
          </button>
        )}
      </div>

      {/* Search Input */}
      {isSearchOpen && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("orders.searchPlaceholder")}
            className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-wood"
          />

          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-gray-400 hover:text-wood-dark
          transition-colors duration-200 z-10 p-1.5
          rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <i className="bi bi-x-lg  p-1.5"></i>
          </button>
        </div>
      )}

      {!isSearchOpen && (
        <OrdersHistoryNavBar
          activeOrderTab={activeOrderTab}
          handleOrderTabChange={handleOrderTabChange}
        />
      )}

      {/* Dynamic List */}
      <div className="flex flex-col gap-y-4">
        <OrderList
          isSearchOpen={isSearchOpen}
          searchQuery={searchQuery}
          status={
            activeOrderTab as
              | "inProgress"
              | "canceled"
              | "delivered"
              | "returned"
          }
        />
      </div>
    </div>
  );
};

export default OrdersHistory;
