import { useCartStore } from "@/stores/useCartStore";

import React, { useState } from "react";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
import { Link } from "react-router-dom";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import { motion } from "framer-motion";

const MainCart: React.FC = () => {
  const { t } = useTranslation("mainCart");
  const isFa = i18n.language === "fa";
  const { cartItems, increment, decrement, items, removeItem, clearCart } =
    useCartStore();
  const totalItems = useCartStore((state) => state.items);
  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.price - item.price * (item.discount / 100)) * item.quantity,
    0,
  );

  const totalBeforeDiscount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const profit = totalBeforeDiscount - total;
  const profitPercent = totalBeforeDiscount
    ? Math.round((profit / totalBeforeDiscount) * 100)
    : 0;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  return (
    <>
      {totalItems > 0 ? (
        <section
          dir="ltr"
          className="flex flex-col lg:flex-row justify-center items-start gap-4 child:rounded-lg child:bg-white child:dark:bg-gray-800 child:shadow child:p-4 mt-5"
        >
          {/* PRICE BOX  */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full lg:w-fit lg:sticky top-5 flex flex-col gap-y-3 sm:gap-y-5 shadow-xl dark:shadow-zinc-800/40 p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-neutral-700/40 backdrop-blur-sm"
          >
            {/* --- PRICE LIST --- */}
            <ul className="flex flex-col space-y-3 sm:space-y-5 text-xs sm:text-sm">
              {/* --- Products Price --- */}
              <motion.li
                className={`flex justify-between text-gray-500 dark:text-gray-400 border-b border-gray-200/50 dark:border-neutral-700 pb-3 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
              >
                <p className="whitespace-nowrap font-medium">
                  {t("productsPrice")} (
                  {isFa ? englishToPersianNumber(items) : items})
                </p>
                <p
                  className={` font-semibold text-gray-500 whitspace ${isFa ? "text-left" : "text-right"} w-40`}
                  dir={isFa ? "rtl" : "ltr"}
                >
                  {isFa
                    ? englishToPersianNumber(
                        totalBeforeDiscount.toLocaleString(),
                      )
                    : totalBeforeDiscount.toLocaleString()}{" "}
                  {t("unit")}
                </p>
              </motion.li>

              {/* --- Cart Total --- */}
              <motion.li
                className={`flex justify-between text-black dark:text-white font-semibold border-b border-gray-200/50 dark:border-neutral-700 pb-3 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
              >
                <p className="whitespace-nowrap">{t("cartTotal")}</p>
                <p
                  className={`whitespace-nowrap w-40  tabular-nums ${isFa ? "text-left" : "text-right"}`}
                  dir={isFa ? "rtl" : "ltr"}
                >
                  {isFa
                    ? englishToPersianNumber(total.toLocaleString())
                    : total.toLocaleString()}{" "}
                  {t("unit")}
                </p>
              </motion.li>

              {/* --- Your Savings --- */}
              <motion.li
                className={`flex justify-between text-green-600 font-medium gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
              >
                <p className={`whitespace-nowrap`}>{t("yourSavings")}</p>
                <p
                  className={`flex  gap-x-1 whitespace-nowrap w-40  ${isFa ? "flex-row-reverse justify-start" : "flex-row justify-end"}`}
                  dir={isFa ? "rtl" : "ltr"}
                >
                  {isFa
                    ? englishToPersianNumber(profit.toLocaleString())
                    : profit.toLocaleString()}{" "}
                  {t("unit")}
                  <span>
                    (
                    {isFa
                      ? englishToPersianNumber(profitPercent)
                      : profitPercent}
                    %)
                  </span>
                </p>
              </motion.li>
            </ul>

            {/* --- CONFIRM BUTTON --- */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/cart/shipping"
                className="w-full inline-block mt-4 sm:mt-5 text-center bg-linear-to-l from-wood to-wood-dark  hover:brightness-110 text-white rounded-xl shadow-lg py-2.5 font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95"
              >
                {t("confirm")}
              </Link>
            </motion.div>
          </motion.div>
          <div
            className={`w-full flex flex-col flex-1 gap-y-8 shadow-lg p-5 rounded-2xl dark:bg-zinc-900 `}
          >
            {/* shopping cart header */}
            <div
              className={`flex items-center justify-between ${isFa ? "flex-row-reverse" : "flex-row"}`}
            >
              <span
                className={`flex items-center gap-x-2 ${isFa ? "flex-row-reverse" : "flex-row"}`}
              >
                <h2 className="text-black dark:text-white text-xl">
                  {t("yourCart")}
                </h2>
                <p className="text-gray-400">
                  ({isFa ? englishToPersianNumber(totalItems) : totalItems}
                  {items > 1 && t("products")} {items == 1 && t("product")})
                </p>
              </span>

              <span
                onClick={() => setOpenConfirm(true)}
                className="flex items-baseline gap-x-1 text-wood-dark dark:text-white cursor-pointer 
                 border hover:bg-wood-dark hover:border-wood-dark hover:text-white 
                 p-1.5 rounded-md transition-all duration-300"
              >
                <button className="font-medium cursor-pointer">
                  {t("removeAll")}
                </button>
                <i className="bi bi-trash"></i>
              </span>

              <ConfirmDialog
                open={openConfirm}
                onOpenChange={setOpenConfirm}
                description={t("removeAllConfirmMsg")}
                confirmText={t("yesDelete")}
                cancelText={t("cancel")}
                onConfirm={clearCart}
                variant="trash"
              />
            </div>

            <div className="flex flex-col gap-3 divide-y divide-gray-300/50">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="w-full flex justify-between relative dark:border-white/20"
                  dir={isFa ? "rtl" : "ltr"}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    {/* IMG AND COUNT BTN */}
                    <div className="flex w-fit flex-col">
                      <motion.img
                        src={item.img}
                        className="w-36 rounded-lg"
                        alt=""
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />

                      <div
                        className={`flex ${
                          isFa ? "flex-row-reverse" : "flex-row"
                        } items-center justify-between  
              border border-gray-200 dark:border-gray-600 
              rounded-lg overflow-hidden mt-2`}
                      >
                        <button
                          className="px-2 py-1 text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer"
                          onClick={() => decrement(item.id)}
                        >
                          {item.quantity == 1 ? (
                            <i
                              onClick={() => setDeleteId(item.id)}
                              className="bi bi-trash"
                            ></i>
                          ) : (
                            "-"
                          )}
                        </button>

                        <span className="px-2 text-sm dark:text-white">
                          {isFa
                            ? englishToPersianNumber(item.quantity)
                            : item.quantity}
                        </span>

                        <button
                          className="px-2 py-1 text-green-500 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer"
                          onClick={() => increment(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* information and name product */}
                    <div className="flex flex-col gap-y-4 grow">
                      <h2 className="line-clamp-2 text-black dark:text-white text-base font-medium">
                        {t(item.nameKey)}
                      </h2>

                      <ul className="space-y-3 child:text-sm text-gray-400 child:flex child:items-center child:gap-x-1.5">
                        <li className="flex flex-row items-center gap-1">
                          <i className="bi bi-droplet-half"></i>
                          <p>{t(item.colorKey)}</p>
                        </li>
                        <li className="flex flex-row items-center gap-1">
                          <i className="bi bi-shield"></i>
                          <p className="mt-1">{t("guarantee")}</p>
                        </li>
                        <li className="flex flex-row items-center gap-1">
                          <i className="bi bi-truck"></i>
                          <p className="mt-1">{t("send")}</p>
                        </li>
                      </ul>

                      <span className="flex flex-col items-end gap-y-1 text-gray-700 dark:text-gray-300 mb-3">
                        {item.discount > 0 ? (
                          <>
                            <p className="text-sm line-through text-gray-400 dark:text-gray-500">
                              {isFa
                                ? englishToPersianNumber(
                                    item.price.toLocaleString(),
                                  )
                                : item.price.toLocaleString()}{" "}
                              {t("unit")}
                            </p>

                            <p className="text-xl text-black dark:text-white">
                              {isFa
                                ? englishToPersianNumber(
                                    (
                                      item.price -
                                      (item.price * item.discount) / 100
                                    ).toLocaleString(),
                                  )
                                : (
                                    item.price -
                                    (item.price * item.discount) / 100
                                  ).toLocaleString()}{" "}
                              {t("unit")}
                            </p>
                          </>
                        ) : (
                          <p className="text-xl text-black dark:text-white">
                            {isFa
                              ? englishToPersianNumber(
                                  item.price.toLocaleString(),
                                )
                              : item.price.toLocaleString()}{" "}
                            {t("unit")}
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* item remove confirm dialog */}
              <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={(open) => !open && setDeleteId(null)}
                description={t("removeItemConfirmMsg")}
                confirmText={t("yesDelete")}
                cancelText={t("cancel")}
                onConfirm={() => {
                  if (deleteId) removeItem(deleteId);
                }}
                variant="trash"
              />
            </div>
          </div>
        </section>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-300 mt-5 ">
          <img
            title="emptyCart"
            src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
          />
          <p className="text-xl">{t("emptyMessage")}</p>
        </div>
      )}
    </>
  );
};
export default MainCart;
