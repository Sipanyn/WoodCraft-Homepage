import { useUserInfo } from "@/stores/useUserInfo";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";

import React from "react";
import { useTranslation } from "react-i18next";

const SideMenuUserInfo: React.FC = () => {
  const { t } = useTranslation("sideMenu");

  const {
    name,
    phone,
    avatar,
    editing,
    nameError,
    phoneError,
    setName,
    setPhone,
    setEditing,
    handleImageChange,
    handleSave,
  } = useUserInfo();

  const handleSaveClick = () => {
    handleSave(t);
  };

  const isFa = i18n.language === "fa";

  return (
    <div className="w-full items-center justify-between p-4 hidden lg:flex relative mb-2.5">
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />

      <div className="flex items-center gap-x-3 flex-1 min-w-0">
        <img
          src={avatar}
          className="size-10 ring-2 ring-gray-400/20 rounded-full cursor-pointer"
          alt="AVATAR"
          onClick={() => document.getElementById("avatarInput")?.click()}
        />

        <span className="flex flex-col gap-y-2 overflow-hidden min-w-0 flex-1">
          {editing ? (
            <>
              {/* NAME INPUT */}
              <div className="flex flex-col min-w-0">
                <input
                  className="text-black dark:text-white text-lg bg-transparent border-b border-gray-400 focus:outline-none truncate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <span className="text-red-500 text-xs mt-1">{nameError}</span>
                )}
              </div>

              {/* PHONE INPUT */}
              <div className="flex flex-col min-w-0">
                <input
                  type="tel" // Change input type to 'tel' for better mobile keyboard
                  dir={isFa ? "rtl" : "ltr"} // Set direction based on language
                  className="text-gray-400 bg-transparent border-b border-gray-300 focus:outline-none truncate"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} // Directly using Zustand's setPhone
                />
                {phoneError && (
                  <span className="text-red-500 text-xs mt-1">
                    {phoneError}
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="text-black dark:text-white text-lg truncate">
                {name}
              </p>
              <p className="text-gray-400 truncate">
                {isFa ? englishToPersianNumber(phone) : phone}
              </p>
            </>
          )}
        </span>
      </div>

      {/* BUTTONS */}
      {editing ? (
        <button
          onClick={handleSaveClick}
          className={`text-white py-1 px-2 cursor-pointer rounded-sm absolute -bottom-7 bg-gray-400 ${
            isFa ? "left-5" : "right-5"
          }`}
        >
          {t("save")}
        </button>
      ) : (
        <i
          className="bi bi-pen cursor-pointer text-wood-dark dark:text-white py-1 px-1.5 hover:bg-wood-dark/10 rounded-sm"
          onClick={() => setEditing(true)}
        ></i>
      )}
    </div>
  );
};

export default SideMenuUserInfo;
