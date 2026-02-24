import { useCartStore } from "@/stores/useCartStore";
import styles from "./cart.module.css";
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";

export const Cart: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, increment, decrement, items } =
    useCartStore();

  const { t } = useTranslation("cart");
  const isFa = i18n.language === "fa";
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <>
      {isCartOpen && (
        <div>
          <div className="fixed inset-0 bg-black/50 z-290"></div>
          <div className="fixed top-0 right-0 w-full sm:w-96 h-screen bg-white dark:bg-neutral-900 shadow-lg flex flex-col z-300">
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 dark:text-white">
              <h2 className="font-DanaMedium text-lg">
                {t("title")} ({isFa ? englishToPersianNumber(items) : items})
              </h2>

              <i
                onClick={closeCart}
                className="bi bi-x-lg text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 cursor-pointer"
              ></i>
            </div>

            {/* CART ITEMS */}
            <div
              className={`flex-1 overflow-y-auto p-4 space-y-4 ${styles.custom_scrollBar}`}
            >
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.img}
                    alt={item.nameKey}
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="text-sm line-clamp-2 dark:text-white">
                      {t(item.nameKey)}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <button
                          className="px-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => decrement(item.id)}
                        >
                          -
                        </button>
                        <span className="px-2 text-sm dark:text-white">
                          {isFa
                            ? englishToPersianNumber(item.quantity)
                            : item.quantity}
                        </span>
                        <button
                          className="px-2 text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => increment(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-400 font-DanaMedium text-sm flex flex-row items-center gap-0.5">
                        {isFa
                          ? englishToPersianNumber(item.price.toLocaleString())
                          : item.price.toLocaleString()}
                        <span className="text-xs font-Dana">{t("unit")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("total")}:</p>
                <p className="text-lg text-wood-dark  font-DanaDemiBold">
                  {isFa
                    ? englishToPersianNumber(total.toLocaleString())
                    : total.toLocaleString()}
                  <span className="text-sm font-Dana">{t("unit")}</span>
                </p>
              </div>
              <button className="bg-wood hover:opacity-80 transition-all cursor-pointer px-4 py-2 rounded-lg text-white text-sm">
                {t("placeOrder")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
