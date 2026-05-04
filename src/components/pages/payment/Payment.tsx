import Footer from "@/base/footer/Footer";
import Logo from "@/base/logo/Logo";
import { useCartStore } from "@/stores/useCartStore";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import ScrollToTop from "@/utlities/ScrollToTop";
const Payment: React.FC = () => {
  const [showInstallments, setShowInstallments] = useState(false);
  const [installment, setInstallment] = useState(1);
  const [isSumOpen, setIsSumOpen] = useState(false);
  const [selected, setSelected] = useState("online");

  const { cartItems, items } = useCartStore();

  const totalBeforeDiscount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const subtotal = totalBeforeDiscount;

  const shippingCost = subtotal > 20000000 ? 0 : 150000;
  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.price - item.price * (item.discount / 100)) * item.quantity,
    0,
  );
  const payable = total + shippingCost;

  const totalDiscountAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.discount / 100) * item.quantity,
    0,
  );

  // ✅ profit با در نظر گرفتن ارسال رایگان
  const profit =
    totalBeforeDiscount - total + (shippingCost === 0 ? 150000 : 0);

  const profitPercent = totalBeforeDiscount
    ? Math.round((profit / totalBeforeDiscount) * 100)
    : 0;

  const { t } = useTranslation("payment");

  const isFa = i18n.language === "fa";
  return (
    <div className="container my-5 flex flex-col gap-6">
      <ScrollToTop />
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-zinc-700 py-3.5 px-3 flex items-center justify-between">
        <Link to="/cart/shipping">
          <button className="flex items-center gap-2 min-w-35 cursor-pointer text-black dark:text-white">
            <i className={`bi bi-arrow-${isFa ? "right" : "left"} text-xl`}></i>
            <p className="font-medium ">{t("header.payment")}</p>
          </button>
        </Link>

        <div className="flex justify-center flex-1">
          <Logo />
        </div>

        <div className="min-w-35"></div>
      </header>

      {/* TWO COLUMN LAYOUT */}
      <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RIGHT COLUMN - PRICE BOX */}
        <motion.ul
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-fit h-fit bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-5 flex flex-col gap-3 text-sm lg:sticky top-5"
        >
          {/* --- PRODUCTS PRICE --- */}
          <motion.li
            className={`flex justify-between text-gray-500 dark:text-gray-400 border-b 
      border-gray-200/60 dark:border-zinc-700 pb-3 text-sm pt-2 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
          >
            <p>
              {t("priceBox.productsPrice")} (
              {isFa ? englishToPersianNumber(items) : items})
            </p>
            <p
              className={`font-medium  ${isFa ? "text-left" : "text-right"} w-40 gap-5`}
              dir={isFa ? "rtl" : "ltr"}
            >
              {isFa
                ? englishToPersianNumber(totalBeforeDiscount.toLocaleString())
                : totalBeforeDiscount.toLocaleString()}{" "}
              {t("priceBox.unit")}
            </p>
          </motion.li>

          {/* --- SHIPPING COST --- */}
          <motion.li
            className={`flex justify-between text-gray-500 dark:text-gray-400 border-b border-gray-200/60 dark:border-zinc-700 pb-3 text-sm pt-2 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
          >
            <span>{t("priceBox.shippingCost")}</span>
            <span
              dir={isFa ? "rtl" : "ltr"}
              className={`font-medium  ${isFa ? "text-left" : "text-right"} gap-5`}
            >
              {shippingCost === 0
                ? isFa
                  ? "رایگان"
                  : "Free"
                : isFa
                  ? englishToPersianNumber(shippingCost.toLocaleString())
                  : shippingCost.toLocaleString()}{" "}
              {shippingCost !== 0 && t("priceBox.unit")}
            </span>
          </motion.li>
          {/* total Discount amount */}
          {shippingCost === 0 && (
            <motion.li
              className={`flex justify-between text-gray-500 dark:text-gray-400 border-b border-gray-200/60 dark:border-zinc-700 pb-3 text-sm pt-2 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
            >
              <p>{t("priceBox.totalDiscount")}</p>
              <p
                dir={isFa ? "rtl" : "ltr"}
                className={`flex ${isFa ? "flex-row-reverse justify-start" : "flex-row justify-end"} gap-x-1 gap-5 w-40`}
              >
                {isFa
                  ? englishToPersianNumber(totalDiscountAmount.toLocaleString())
                  : totalDiscountAmount.toLocaleString()}{" "}
                {t("priceBox.unit")}
                <span></span>
              </p>
            </motion.li>
          )}
          {/* --- YOUR SAVINGS --- */}
          <motion.li
            className={`flex justify-between text-green-600 font-semibold text-sm pt-2 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
          >
            <p>{t("priceBox.yourSavings")}</p>
            <p
              dir={isFa ? "rtl" : "ltr"}
              className={`flex ${isFa ? "flex-row-reverse justify-start" : "flex-row justify-end"} gap-x-1 gap-5 w-40`}
            >
              {isFa
                ? englishToPersianNumber(profit.toLocaleString())
                : profit.toLocaleString()}{" "}
              {t("priceBox.unit")}
              <span>
                ({isFa ? englishToPersianNumber(profitPercent) : profitPercent}
                %)
              </span>
            </p>
          </motion.li>

          {/* --- TOTAL --- */}
          <motion.li
            className={`flex justify-between font-semibold text-sm pt-3 text-zinc-900 dark:text-zinc-50 gap-5 ${isFa ? "flex-row-reverse " : "flex-row"}`}
          >
            <span>{t("priceBox.total")}</span>
            <span
              dir={isFa ? "rtl" : "ltr"}
              className={`${isFa ? "text-left" : "text-right"} w-40 gap-5`}
            >
              {isFa
                ? englishToPersianNumber(payable.toLocaleString())
                : payable.toLocaleString()}{" "}
              {t("priceBox.unit")}
            </span>
          </motion.li>

          {/* --- BUTTON --- */}
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/cart/payment">
              <motion.button className="w-full inline-block mt-4 sm:mt-5 text-center bg-linear-to-l from-wood to-wood-dark  hover:brightness-110 text-white rounded-xl shadow-lg py-2.5 font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95 cursor-pointer">
                {t("priceBox.placeOrder")}
              </motion.button>
            </Link>
          </motion.li>
        </motion.ul>
        {/* LEFT COLUMN - PAYMENT METHOD + Extras */}
        <div className="lg:col-span-2 flex flex-col gap-6 ">
          {/* Payment Method Box */}
          <div className="flex flex-col gap-4 text-sm shadow-lg p-5 rounded-xl bg-white dark:bg-zinc-900">
            {/* Internet Payment */}
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700 ${isFa ? "flex-row-reverse" : "flex-row"}`}
            >
              <input
                type="radio"
                name="payment"
                checked={selected === "online"}
                onChange={() => {
                  setSelected("online");
                  setShowInstallments(false);
                }}
                className="w-4 h-4 accent-wood-dark cursor-pointer"
              />

              {/* Bootstrap Icon with active color */}
              <i
                className={`bi bi-credit-card text-lg transition-colors ${
                  selected === "online"
                    ? "text-wood-dark" // active color
                    : "text-gray-600 dark:text-white" // default color
                }`}
              ></i>

              <div className="flex flex-col">
                <span
                  className={`font-medium text-black dark:text-white ${isFa ? "text-right" : "text-left"}`}
                >
                  {t("methods.online")}
                </span>
                <span
                  className={`text-xs text-gray-500 dark:text-gray-100/50 ${isFa ? "text-right" : "text-left"}`}
                >
                  {t("methods.anyBank")}
                </span>
              </div>
            </motion.label>

            {/* Wallet */}
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700 ${isFa ? "flex-row-reverse" : "flex-row"}`}
            >
              <input
                type="radio"
                name="payment"
                onChange={() => {
                  setSelected("wallet");
                  setShowInstallments(false);
                }}
                className="w-4 h-4 accent-wood-dark cursor-pointer"
              />

              <i
                className={`bi bi-wallet2 text-lg transition-colors ${
                  selected === "wallet"
                    ? "text-wood-dark" // active color
                    : "text-gray-600 dark:text-white" // default color
                }`}
              ></i>

              <div className="flex flex-col">
                <span
                  className={`font-medium text-black dark:text-white ${isFa ? "text-right" : "text-left"}`}
                >
                  {t("methods.wallet")}
                </span>
                <span
                  className={`text-xs text-gray-500 dark:text-gray-100/50 ${isFa ? "text-right" : "text-left"}`}
                >
                  {t("methods.balance")}: {isFa ? englishToPersianNumber(0) : 0}
                </span>
              </div>
            </motion.label>

            {/* Buy Now Pay Later */}
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700 ${isFa ? "flex-row-reverse" : "flex-row"}`}
            >
              <input
                type="radio"
                name="payment"
                onChange={() => {
                  setSelected("payLater");
                  setShowInstallments(true);
                }}
                className="w-4 h-4 accent-wood-dark cursor-pointer"
              />
              <i
                className={`bi bi-clock-history text-lg transition-colors ${
                  selected === "payLater"
                    ? "text-wood-dark" // active color
                    : "text-gray-600 dark:text-white" // default color
                }`}
              ></i>
              <div className="flex flex-col">
                <span
                  className={`font-medium text-black dark:text-white ${isFa ? "text-right" : "text-left"}`}
                >
                  {t("methods.installment")}
                </span>
                <span
                  className={`text-xs text-gray-500 dark:text-gray-100/50 ${isFa ? "text-right" : "text-left"}`}
                >
                  {t("methods.payInIns")}
                </span>
              </div>
            </motion.label>

            {/* Installment Options */}
            <AnimatePresence>
              {showInstallments && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 mt-2  ${isFa ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* 1 Installment */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setInstallment(1)}
                    className={`min-w-25 flex items-center justify-center cursor-pointer
        px-2 py-1.5 rounded-md text-center transition-all
        ${
          installment === 1
            ? "border-2 border-wood-dark"
            : "border border-gray-200 dark:border-neutral-600 "
        }`}
                  >
                    <div>
                      <span className="text-xs font-medium text-black dark:text-white">
                        {t("methods.installment1")}
                      </span>
                      <span className="block text-[10px] text-gray-500 dark:text-gray-300">
                        {t("methods.installmentOneTime")}
                      </span>
                    </div>
                  </motion.label>

                  {/* 6 Installments */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setInstallment(6)}
                    className={`min-w-25 flex items-center justify-center cursor-pointer
        px-2 py-1.5 rounded-md text-center transition-all
        ${
          installment === 6
            ? "border-2 border-wood-dark  "
            : "border border-gray-200 dark:border-neutral-600  "
        }`}
                  >
                    <div>
                      <span className="text-xs font-medium text-black dark:text-white">
                        {t("methods.installment6")}
                      </span>
                      <span className="block text-[10px] text-gray-500 dark:text-gray-300">
                        {t("methods.installment6Times")}
                      </span>
                    </div>
                  </motion.label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Discount Code */}
          <div
            className="shadow-lg rounded-xl p-4 bg-white dark:bg-zinc-900"
            dir={isFa ? "rtl" : "ltr"}
          >
            <h3 className="font-semibold text-black dark:text-white mb-2">
              {t("discount.discountCode")}
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-md px-3 py-2 text-sm border-gray-300 focus:ring-2 ring-wood outline-0
                dark:placeholder:text-gray-300/80"
                placeholder={t("discount.placeHolder")}
              />
              <button className="bg-linear-to-l from-wood to-wood-dark  hover:brightness-110 text-white font-semibold cursor-pointer px-5 rounded-xl text-sm transition-all duration-200">
                {t("discount.apply")}
              </button>
            </div>
          </div>

          {/* Gift Card */}
          <div
            dir={isFa ? "rtl" : "ltr"}
            className="shadow-lg rounded-xl p-4 bg-white dark:bg-zinc-900"
          >
            <h3 className="font-semibold text-black dark:text-white mb-2">
              {t("giftCard.giftCard")}
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 focus:ring-2 ring-wood outline-0 rounded-md px-3 py-2 text-sm dark:placeholder:text-gray-300/80"
                placeholder={t("giftCard.placeHolder")}
              />
              <button className="bg-linear-to-l from-wood to-wood-dark  hover:brightness-110 text-white font-semibold cursor-pointer px-5 rounded-xl text-sm transition-all duration-200">
                {t("giftCard.apply")}
              </button>
            </div>
          </div>
          {/* order summary */}
          <div
            dir={isFa ? "rtl" : "ltr"}
            className="shadow-lg rounded-xl p-4 flex flex-col bg-white dark:bg-zinc-900 transition-all"
          >
            {/* HEADER */}
            <div className="flex flex-row justify-between items-center">
              <h3 className="font-semibold text-black dark:text-white mb-2">
                {t("orderSummary.orderSummary")}
              </h3>

              {/* TOGGLE BUTTON */}
              <button
                onClick={() => setIsSumOpen(!isSumOpen)}
                className="cursor-pointer flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"
              >
                <motion.span
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {!isSumOpen
                    ? t("orderSummary.details")
                    : t("orderSummary.close")}
                </motion.span>

                {/* ROTATING ICON */}
                <motion.i
                  animate={{ rotate: isSumOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="bi bi-chevron-down text-gray-600 dark:text-gray-300"
                />
              </button>
            </div>

            {/* COLLAPSIBLE CONTENT */}
            <AnimatePresence>
              {isSumOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-3">
                    {/* PRODUCTS */}
                    <div className="flex flex-row gap-2 overflow-x-auto pb-2">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-200 rounded-md bg-white dark:bg-neutral-700 dark:border-0"
                        >
                          <img
                            className="size-20 "
                            src={item.img}
                            alt="product"
                          />
                        </div>
                      ))}
                    </div>

                    {/* SHIPMENT PRICE */}
                    <div className="flex flex-row gap-1 text-xs mt-2">
                      <p className="text-gray-400 dark:text-gray-500">
                        {t("orderSummary.shipmentPrice")}:
                      </p>
                      <p className="font-bold text-black dark:text-white">
                        {isFa
                          ? englishToPersianNumber(payable.toLocaleString())
                          : payable.toLocaleString()}
                      </p>
                      <p className="font-bold text-black dark:text-white">
                        {t("orderSummary.unit")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
