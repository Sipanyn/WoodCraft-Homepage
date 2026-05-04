import styles from "./shipping.module.css";
import Logo from "@/base/logo/Logo";
import Modal from "@/base/modal/Modal";
import EditableAddress from "@/components/address/editableAddress/EditableAddress";
import { useAddressStore } from "@/stores/addressStore";
import { useCartStore } from "@/stores/useCartStore";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "@/utlities/ScrollToTop";

const Shipping: React.FC = () => {
  const { cartItems, items } = useCartStore();

  const addresses = useAddressStore((s) => s.addresses);
  const addAddress = useAddressStore((s) => s.addAddress);
  const updateAddress = useAddressStore((s) => s.updateAddress);
  const setDefault = useAddressStore((s) => s.setDefault);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const defaultAddress = addresses.find((a) => a.isDefault);

  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleSaveAddress = (address: any) => {
    addAddress(address);
    setIsAddingNew(false);
  };
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingCost = subtotal > 20000000 ? 0 : 150000;
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
  const { t } = useTranslation("shipping");
  // const isFa = i18n.language === "fa";
  const isFa = i18n.language === "fa";
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [open, setOpen] = useState(false);
  const options = [
    {
      value: "air",
      label: t("shippingMethod.air"),
      icon: "bi-airplane-engines",
    },
    {
      value: "sea",
      label: t("shippingMethod.sea"),
      icon: "bi-water",
    },
    {
      value: "ground",
      label: t("shippingMethod.ground"),
      icon: "bi-truck",
    },
  ];
  const selected = options.find((option) => option.value === selectedOption);

  return (
    <div className="container flex flex-col my-5 gap-6">
      <ScrollToTop />
      {/* HEADER */}
      <header
        className={`border-b border-gray-200 dark:border-zinc-700  py-3.5 px-3 flex items-center justify-between`}
      >
        <Link to="/cart">
          <button className="flex items-center gap-2 min-w-35 cursor-pointer text-black dark:text-white">
            <i className={`bi bi-arrow-${isFa ? "right" : "left"} text-xl`}></i>
            <p className="font-medium">{t("header.deliveryInfo")}</p>
          </button>
        </Link>

        <div className="flex justify-center flex-1">
          <Logo />
        </div>

        <div className="min-w-35"></div>
      </header>

      {/* MAIN RESPONSIVE WRAPPER */}
      <div className={`flex flex-col lg:flex-row gap-6 `} dir="ltr">
        {/* Prices Only */}
        <motion.ul
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-fit h-fit bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-5 flex flex-col gap-3 text-sm sticky top-0"
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
              dir={isFa ? "rtl" : "ltr"}
              className={`font-medium text-zinc-700 dark:text-zinc-100 ${isFa ? "text-left" : "text-right"} w-40 gap-5`}
            >
              {isFa
                ? englishToPersianNumber(totalBeforeDiscount.toLocaleString())
                : totalBeforeDiscount.toLocaleString()}{" "}
              {t("priceBox.unit")}
            </p>
          </motion.li>
          {/* --- SHIPPING COST --- */}

          <motion.li
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col text-gray-600 dark:text-gray-300 
  border-b border-gray-200/50 dark:border-zinc-700/60 
  pb-3 pt-2 text-sm gap-2 relative"
          >
            {/* عنوان + مقدار */}
            <div
              className={`flex justify-between items-center ${isFa ? "flex-row-reverse" : "flex-row"}`}
            >
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {t("priceBox.shippingCost")}
              </span>

              <span
                className={`font-semibold text-zinc-800 dark:text-zinc-100 ${
                  isFa ? "text-left" : "text-right"
                }`}
                dir={isFa ? "rtl" : "ltr"}
              >
                {selectedOption
                  ? shippingCost === 0
                    ? t("priceBox.free")
                    : isFa
                      ? englishToPersianNumber(shippingCost.toLocaleString())
                      : shippingCost.toLocaleString()
                  : t("priceBox.notSpecified")}{" "}
                {selectedOption && shippingCost !== 0 && t("priceBox.unit")}
              </span>
            </div>

            {/* Input قابل کلیک */}
            <div
              onClick={() => setOpen(!open)}
              className={`
      w-full px-2.5 py-1.5
      rounded-md
      bg-gray-50 dark:bg-zinc-800
      border border-gray-300/70 dark:border-zinc-700
      text-gray-700 dark:text-gray-200
      text-sm cursor-pointer
      flex justify-between items-center
      ${isFa ? "flex-row-reverse" : "flex-row"}
    `}
            >
              <span className="flex items-center gap-2">
                {selected ? (
                  <div
                    className={`flex gap-2 ${isFa ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <i className={`bi ${selected.icon}`}></i>
                    {selected.label}
                  </div>
                ) : (
                  t("shippingMethod.SelectShippingMethod")
                )}
              </span>

              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                className="text-gray-500 text-xs"
              >
                ▼
              </motion.span>
            </div>

            {/* Option Box */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16 }}
                  className={`absolute top-full left-0 right-0 mt-1 
        bg-white dark:bg-zinc-800 shadow-lg rounded-md 
        border border-gray-200 dark:border-zinc-700 
        z-40 overflow-hidden`}
                >
                  {options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSelectedOption(option.value);
                        setOpen(false);
                      }}
                      className={`
            px-3 py-2 text-sm flex items-center gap-2
            cursor-pointer transition-colors
            hover:bg-gray-100 dark:hover:bg-zinc-700
            ${selectedOption === option.value ? "bg-gray-100 dark:bg-zinc-700" : ""}
            ${isFa ? "flex-row-reverse" : "flex-row"}
          `}
                    >
                      <i className={`bi ${option.icon}`}></i>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
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
            className={`flex justify-between font-semibold text-sm pt-3 text-zinc-900 dark:text-zinc-50 gap-5 ${isFa ? "flex-row-reverse" : "flex-row"}`}
          >
            <span>{t("priceBox.total")}</span>
            <span
              dir={isFa ? "rtl" : "ltr"}
              className={`${isFa ? "text-left" : "text-right"} w-40 gap-5`}
            >
              {isFa
                ? englishToPersianNumber(total.toLocaleString())
                : total.toLocaleString()}{" "}
              {t("priceBox.unit")}
            </span>
          </motion.li>
          {/* --- BUTTON --- */}
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to={selectedOption ? "/cart/payment" : "#"}>
              <motion.button
                type="button"
                disabled={!selectedOption || addresses.length === 0}
                className={`
        w-full inline-block mt-4 sm:mt-5 text-center
        bg-linear-to-l from-wood to-wood-dark
        text-white rounded-xl shadow-lg py-2.5
        font-semibold text-sm sm:text-base
        transition-all duration-200
        ${
          selectedOption
            ? "hover:brightness-110 active:scale-95 cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }
      `}
              >
                {t("priceBox.placeOrder")}
              </motion.button>
            </Link>
          </motion.li>
        </motion.ul>
        {/* RIGHT SIDE (Address + Order Summary) */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Address */}
          {/* EMPTY STATE */}
          {addresses.length === 0 && !isAddingNew && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                <i className="bi bi-geo-alt text-3xl text-neutral-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                {t("titles.noAddresses")}
              </h3>
              <p className="text-neutral-500 max-w-xs mx-auto mb-6">
                {t("messages.noAddressesText")}
              </p>
              <button
                onClick={() => setIsAddingNew(true)}
                className="px-8 py-3 bg-linear-to-l from-wood to-wood-dark text-white rounded-xl font-bold hover:shadow-lg transition-shadow cursor-pointer"
              >
                {t("titles.firstAddress")}
              </button>
            </motion.div>
          )}
          {/* ADD NEW */}
          <AnimatePresence>
            {isAddingNew && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
                dir={isFa ? "rtl" : "ltr"}
              >
                <div className="p-6 bg-white dark:bg-neutral-800/50 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                      {t("titles.newShipping")}
                    </h3>
                    <button onClick={() => setIsAddingNew(false)}>
                      <i className="bi bi-x-lg  p-1.5  text-gray-400 hover:text-wood-dark transition-colors cursor-pointer"></i>
                    </button>
                  </div>

                  <EditableAddress
                    mode="create"
                    onSave={handleSaveAddress}
                    onCancel={() => setIsAddingNew(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {defaultAddress && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="shadow-lg rounded-xl p-5 flex flex-col gap-4 bg-white dark:bg-zinc-900 transition"
            >
              <div
                className={`flex justify-between items-center ${isFa ? "flex-row-reverse" : "flex-row"}`}
              >
                <h2 className="font-semibold text-lg text-black dark:text-white">
                  {t("addressBox.selectedAddress")}
                </h2>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(true)}
                  className="text-sm font-medium text-wood hover:text-wood/90 cursor-pointer transition"
                >
                  {t("addressBox.changeAddress")}
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg"
                dir={isFa ? "rtl" : "ltr"}
              >
                <EditableAddress
                  address={defaultAddress}
                  isDefault
                  mode="view"
                  showEdit={false}
                  onSave={() => {}}
                  onCancel={() => {}}
                  onSetDefault={() => {}}
                />
              </motion.div>
            </motion.section>
          )}
          {/* ORDER SUMMARY  saved in seprated file.tsx*/}

          {/*ship method */}
          {/* 
          <div className="shadow-lg rounded-xl p-5 flex flex-col gap-4 bg-white dark:bg-zinc-900">
            <h2
              className={`font-semibold text-lg ${isFa ? "text-right" : "text-left"} text-black dark:text-white`}
            >
              {t("shippingMethod.title")}
            </h2>
            <div className="flex flex-col sm:flex-row  justify-center items-center gap-2 sm:gap-4">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full sm:w-32 py-2 px-4 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer
            ${
              selectedOption === option
                ? "bg-linear-to-l from-wood to-wood-dark text-white border-wood-dark shadow-md"
                : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 hover:border-wood-dark"
            }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={showAll}
        onClose={() => {
          setShowAll(false);
          setEditingAddress(null);
          setIsCreating(false);
        }}
      >
        <div
          className={`w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex flex-col max-h-[85vh] ${styles.custom_scrollBar}`}
        >
          <div className="flex items-center justify-between shadow-xs px-5 py-4">
            <h2 className="font-semibold text-lg text-black dark:text-white">
              {" "}
              {t("addressBox.addresses")}
            </h2>

            <button
              onClick={() => setShowAll(false)}
              className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-gray-50 text-xl cursor-pointer"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div
            className={`flex flex-col gap-3 overflow-y-auto px-5 py-4 ${styles.custom_scrollBar}`}
          >
            {addresses.map((addr) =>
              editingAddress === addr.id ? (
                <EditableAddress
                  key={addr.id}
                  address={addr}
                  mode="edit"
                  isDefault={addr.isDefault}
                  showEdit
                  onEdit={() => setEditingAddress(addr.id)}
                  onSetDefault={(id) => {
                    setDefault(id);
                    setEditingAddress(null);
                  }}
                  onCancel={() => setEditingAddress(null)}
                  onSave={(updated) => {
                    updateAddress(updated);
                    setEditingAddress(null);
                  }}
                />
              ) : (
                <EditableAddress
                  key={addr.id}
                  address={addr}
                  mode="view"
                  isDefault={addr.isDefault}
                  showEdit={true}
                  onEdit={() => setEditingAddress(addr.id)}
                  onSetDefault={(id) => setDefault(id)}
                  onCancel={() => {}}
                  onSave={() => {}}
                />
              ),
            )}

            {isCreating ? (
              <EditableAddress
                key="create-form"
                mode="create"
                onSave={(data) => {
                  addAddress({
                    ...data,
                    isDefault: false,
                  });

                  setTimeout(() => {
                    const last = useAddressStore
                      .getState()
                      .addresses.slice(-1)[0];
                    if (last?.id) setDefault(last.id);
                  }, 0);

                  setIsCreating(false);
                }}
                onCancel={() => setIsCreating(false)}
              />
            ) : (
              <button
                className="border border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-gray-50 hover:text-black dark:hover:text-gray-50 transition cursor-pointer"
                onClick={() => setIsCreating(true)}
              >
                {t("addressBox.addNew")}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Shipping;
