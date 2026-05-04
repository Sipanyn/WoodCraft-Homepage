import React, { useEffect, useState } from "react";
import type { AddressData } from "../../types/types";
import { useTranslation } from "react-i18next";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";

interface EditableAddressProps {
  address?: AddressData;
  onSave: (address: AddressData) => void;
  onCancel?: () => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  mode?: "edit" | "create" | "view";
  isDefault?: boolean;
  showEdit?: boolean;
  onEdit?: () => void;
}

const EditableAddress: React.FC<EditableAddressProps> = ({
  address: initialAddress,
  onSave,
  onCancel,
  onDelete,
  onSetDefault,
  mode = "view",
  isDefault = false,
  showEdit = true,
  onEdit,
}) => {
  const [address, setAddress] = useState<Omit<AddressData, "id" | "isDefault">>(
    mode === "create"
      ? {
          country: "",
          province: "",
          street: "",
          city: "",
          highway: "",
          street1: "",
          street2: "",
          postalCode: "",
          receiverName: "",
          receiverPhone: "",
        }
      : initialAddress!,
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressData, string>>
  >({});

  // --- FIX: Sync props → state in view + edit modes ---
  useEffect(() => {
    if (initialAddress && mode !== "create") {
      setAddress(initialAddress);
    }
  }, [initialAddress, mode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {};

    if (!address.country.trim()) newErrors.country = "Country is required";
    if (!address.province.trim()) newErrors.province = "Province is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.street.trim()) newErrors.street = "Street is required";

    if (!address.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{7,10}$/.test(address.postalCode)) {
      newErrors.postalCode = "Postal code must be 7-10 digits";
    }

    if (!address.receiverName.trim()) {
      newErrors.receiverName = "Receiver name is required";
    }

    if (!address.receiverPhone.trim()) {
      newErrors.receiverPhone = "Phone number is required";
    } else if (!/^09\d{9}$/.test(address.receiverPhone)) {
      newErrors.receiverPhone = "Phone must be 11 digits starting with 09";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onSave({ ...address });
    if (mode === "create") onCancel?.();
  };

  const handleCancel = () => {
    if (mode === "create") {
      onCancel?.();
    } else if (initialAddress) {
      setAddress(initialAddress);
      onCancel?.();
    }
    setErrors({});
  };

  const handleChange = (field: keyof AddressData, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatAddress = () => {
    const parts = [
      address.country,
      address.province,
      address.city,
      address.highway,
      address.street,
      address.street1,
      address.street2,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleSetDefault = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSetDefault?.(initialAddress?.id!);
  };

  const { t } = useTranslation("addresses");
  const isFa = i18n.language === "fa";

  return (
    <div
      className={`w-full p-4 rounded-lg relative ${isDefault ? "border-wood-dark border-3" : "border-gray-200 border"} `}
    >
      <div className={`flex justify-between items-start mb-3 flex-wrap gap-2`}>
        {mode === "edit" ? (
          <p className="text-black dark:text-white font-semibold">
            {t("titles.addressEditing")}
          </p>
        ) : mode === "create" ? null : (
          <div className={`flex items-center gap-x-2 flex-wrap gap-1 `}>
            <span className="flex items-center gap-x-1 text-wood">
              <i className="bi bi-geo-alt text-lg"></i>

              {isDefault && (
                <span className="text-xs bg-wood text-white px-2 py-1 rounded-full shrink-0">
                  {t("editableAddress.status.default")}
                </span>
              )}
            </span>

            <h2 className="font-DanaMedium text-lg text-black dark:text-white truncate max-w-xs sm:max-w-md lg:max-w-lg">
              {address.receiverName || "New Address"}
            </h2>
          </div>
        )}

        <div className="flex items-center gap-x-2">
          {mode !== "create" && (
            <>
              {onSetDefault && !isDefault && (
                <button
                  onClick={handleSetDefault}
                  className="text-sm text-gray-400 hover:text-wood transition-colors cursor-pointer"
                  title="Set as default"
                >
                  <i className="bi bi-star"></i>
                </button>
              )}

              {showEdit && (
                <button
                  onClick={handleEditClick}
                  className="text-gray-400 hover:text-wood transition-colors cursor-pointer"
                  title="Edit"
                >
                  <i className="bi bi-pen"></i>
                </button>
              )}

              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(initialAddress?.id!);
                  }}
                  className="text-gray-400 hover:text-wood transition-colors cursor-pointer"
                  title="Delete"
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {mode === "create" || mode === "edit" ? (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* country */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {t("editableAddress.labels.country")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${
                  errors.country ? "border-red-500" : "border-gray-400"
                }`}
                placeholder={t("editableAddress.placeholders.country")}
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.countryRequired")}
                </p>
              )}
            </div>
            {/* province */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {t("editableAddress.labels.province")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.province}
                onChange={(e) => handleChange("province", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${
                  errors.city ? "border-red-500" : "border-gray-400"
                }`}
                placeholder={t("editableAddress.placeholders.province")}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.provinceRequired")}
                </p>
              )}
            </div>
            {/* City */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {t("editableAddress.labels.city")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${
                  errors.city ? "border-red-500" : "border-gray-400"
                }`}
                placeholder={t("editableAddress.placeholders.city")}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.cityRequired")}
                </p>
              )}
            </div>
            {/* Highway */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.highway")}
              </label>
              <input
                type="text"
                value={address.highway}
                onChange={(e) => handleChange("highway", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400"
                placeholder={t("editableAddress.placeholders.highway")}
              />
            </div>

            {/* Street */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.street")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => handleChange("street", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${
                  errors.street ? "border-red-500" : "border-gray-400"
                }`}
                placeholder={t("editableAddress.placeholders.street")}
              />
              {errors.street && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.streetRequired")}
                </p>
              )}
            </div>

            {/* Street 1 */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.street1")}
              </label>
              <input
                type="text"
                value={address.street1}
                onChange={(e) => handleChange("street1", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400"
                placeholder={t("editableAddress.placeholders.street1")}
              />
            </div>

            {/* Street 2 */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.street2")}
              </label>
              <input
                type="text"
                value={address.street2}
                onChange={(e) => handleChange("street2", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400"
                placeholder={t("editableAddress.placeholders.street2")}
              />
            </div>

            {/* Postal Code */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.postalCode")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${
                  errors.postalCode ? "border-red-500" : "border-gray-400"
                }`}
                placeholder={t("editableAddress.placeholders.postalCode")}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.postalRequired")}
                </p>
              )}
            </div>

            {/* Receiver Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.receiverName")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address.receiverName}
                onChange={(e) => handleChange("receiverName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${
                  errors.receiverName ? "border-red-500" : "border-gray-400"
                }`}
                placeholder={t("editableAddress.placeholders.receiverName")}
              />
              {errors.receiverName && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.receiverNameRequired")}
                </p>
              )}
            </div>

            {/* Receiver Phone */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("editableAddress.labels.receiverPhone")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={address.receiverPhone}
                onChange={(e) => handleChange("receiverPhone", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-wood focus:border-wood outline-none transition-colors dark:text-white dark:placeholder:text-gray-400 ${isFa ? "text-right" : "text-left"} ${
                  errors.receiverPhone ? "border-red-500" : "border-gray-400 "
                }`}
                placeholder={t("editableAddress.placeholders.receiverPhone")}
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {t("editableAddress.errors.phoneRequired")}
                </p>
              )}
            </div>
          </div>

          <div
            className={`flex gap-3 pt-4 border-t border-gray-200 flex-wrap justify-center ${isFa ? "sm:justify-start" : "sm:justify-end"}`}
          >
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-white transition-colors duration-200 w-full sm:w-auto cursor-pointer"
            >
              {mode === "create"
                ? t("editableAddress.buttons.cancel")
                : t("editableAddress.buttons.discard")}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-wood text-white rounded-lg hover:bg-wood-dark transition-colors duration-200 font-medium w-full sm:w-auto cursor-pointer"
            >
              {mode === "create"
                ? t("editableAddress.buttons.addAddress")
                : t("editableAddress.buttons.saveChanges")}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`space-y-1.5 text-gray-600 dark:text-gray-300 mt-3 mr-2 `}
        >
          <p className="text-gray-800 dark:text-gray-200 font-medium wrap-break-word">
            {formatAddress()}
          </p>

          <p className="wrap-break-word">
            <span className="text-gray-400">
              {t("editableAddress.labels.postalCode")}
            </span>{" "}
            {isFa
              ? englishToPersianNumber(address.postalCode)
              : address.postalCode}
          </p>

          <div className={`wrap-break-word flex  gap-1.5`}>
            <span className="text-gray-400 ">
              {t("editableAddress.labels.receiverName")}
            </span>

            <div className={`flex gap-0.5`}>
              <p>{address.receiverName}</p> |{" "}
              <p>
                {isFa
                  ? englishToPersianNumber(address.receiverPhone)
                  : address.receiverPhone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableAddress;
