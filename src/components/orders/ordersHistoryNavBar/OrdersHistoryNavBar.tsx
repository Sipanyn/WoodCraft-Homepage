import { orders } from "@/constants/orders";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";
import { useTranslation } from "react-i18next";

type OrdersHistoryNavBarProps = {
  activeOrderTab: string;
  handleOrderTabChange: (tabName: string) => void;
};

const OrdersHistoryNavBar: React.FC<OrdersHistoryNavBarProps> = ({
  activeOrderTab,
  handleOrderTabChange,
}) => {
  const { t } = useTranslation("orderHistory");
  const isFa = i18n.language === "fa";
  const statusTitles: Record<string, string> = {
    inProgress: t("orders.tabs.inProgress"),
    delivered: t("orders.tabs.delivered"),
    returned: t("orders.tabs.returned"),
    canceled: t("orders.tabs.canceled"),
  };

  const tabs = Object.keys(statusTitles).map((status) => {
    const count = orders.filter((o) => o.status === status).length;

    return {
      id: status,
      title: statusTitles[status],
      count,
    };
  });

  return (
    <ul className="flex px-2 border-b border-gray-200 dark:border-neutral-700">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className="flex-1 cursor-pointer text-center"
          onClick={() => handleOrderTabChange(tab.id)}
        >
          <div
            className={`flex flex-col-reverse sm:flex-row items-center justify-center gap-1 sm:gap-2 pb-2
            ${
              activeOrderTab === tab.id
                ? "border-b-2 border-wood-dark text-wood-dark font-semibold"
                : "text-gray-600 dark:text-neutral-300"
            }`}
          >
            <p className="text-xs sm:text-base">{tab.title}</p>

            <div
              className={`px-2 py-0.5 text-xs font-bold flex items-center justify-center text-white rounded-full min-w-5 h-5
              ${
                activeOrderTab === tab.id
                  ? "bg-wood-dark"
                  : "bg-gray-300 dark:bg-neutral-600"
              }`}
            >
              {isFa ? englishToPersianNumber(tab.count) : tab.count}
              {}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrdersHistoryNavBar;
