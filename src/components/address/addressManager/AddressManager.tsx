import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddressStore } from "@/stores/addressStore";
import EditableAddress from "../editableAddress/EditableAddress";
import AddressCard from "../addressCard/AddressCard";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";

const AddressManager: React.FC = () => {
  const addresses = useAddressStore((state) => state.addresses);
  const addAddress = useAddressStore((state) => state.addAddress);
  const updateAddress = useAddressStore((state) => state.updateAddress);
  const deleteAddress = useAddressStore((state) => state.deleteAddress);
  const setDefault = useAddressStore((state) => state.setDefault);

  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const { t } = useTranslation("addresses");
  const isFa = i18n.language === "fa";
  const handleSave = (address: any) => {
    updateAddress(address);
    setEditingAddress(null);
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
    if (editingAddress === id) setEditingAddress(null);
  };

  const handleSetDefault = (id: string) => {
    setDefault(id);
  };

  const handleSaveAddress = (address: any) => {
    addAddress(address);
    setIsAddingNew(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col shadow-sm border border-neutral-100 dark:border-none rounded-2xl p-6 dark:bg-zinc-900 bg-white mb-8 transition-all">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="font-bold text-neutral-800 dark:text-white text-xl sm:text-2xl tracking-tight">
            {t("titles.myAddresses")}
          </h2>
        </div>

        {addresses.length > 0 && (
          <button
            onClick={() => setIsAddingNew(true)}
            disabled={isAddingNew}
            className="flex items-center gap-x-2 px-4 py-2.5 bg-wood hover:bg-wood-dark text-white rounded-xl shadow-md shadow-wood/20 transition-all duration-300 disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            <i className="bi bi-plus-lg"></i>
            <span className="font-medium hidden sm:inline">
              {t("buttons.add")}
            </span>
          </button>
        )}
      </div>

      {/* ADDRESS LIST */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {addresses.map((addr) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <AddressCard
                address={addr}
                editingAddress={editingAddress}
                onEdit={() => setEditingAddress(addr.id)}
                onSave={handleSave}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
                onCancel={() => setEditingAddress(null)} // 👈 درست!
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ADD NEW */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 p-6 bg-white dark:bg-neutral-800/50 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
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
            className="px-8 py-3 bg-linear-to-l from-wood to-wood-dark text-white rounded-xl font-bold hover:shadow-lg transition-shadow cursor-pointer "
          >
            {t("titles.firstAddress")}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AddressManager;
