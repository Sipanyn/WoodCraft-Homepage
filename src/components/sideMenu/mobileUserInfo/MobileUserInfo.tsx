import { useUserInfo } from "@/stores/useUserInfo";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
import i18n from "@/utlities/i18n";
import React from "react";
import { useTranslation } from "react-i18next";

const MobileUserInfo: React.FC = () => {
  const { t } = useTranslation("sideMenu");
  const isFa = i18n.language === "fa";

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

  // اجرای ذخیره‌سازی همراه با ولیدیشن استور
  const handleSaveClick = () => {
    handleSave(t);
  };

  return (
    <div className="w-full flex items-center justify-between p-4 lg:hidden relative border-b border-gray-100 dark:border-gray-800">
      {/* Hidden file input */}
      <input
        id="avatarInputMobile"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />

      <div className={`flex items-center gap-x-3 flex-1 min-w-0`}>
        {/* Avatar */}
        <img
          src={avatar}
          className="size-10 ring-2 ring-gray-400/20 rounded-full cursor-pointer object-cover"
          alt="AVATAR"
          onClick={() => document.getElementById("avatarInputMobile").click()}
        />

        <span className="flex flex-col gap-y-1 overflow-hidden min-w-0 flex-1">
          {editing ? (
            <>
              {/* Name Input Group */}
              <div className="flex flex-col min-w-0">
                <input
                  className="text-black dark:text-white text-base bg-transparent border-b border-gray-400 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                {nameError && (
                  <span className="text-red-500 text-[10px] mt-0.5">
                    {nameError}
                  </span>
                )}
              </div>

              {/* Phone Input Group */}
              <div className="flex flex-col min-w-0">
                <input
                  type="tel" // Change input type to 'tel' for better mobile keyboard
                  dir={isFa ? "rtl" : "ltr"} // Set direction based on language
                  className="text-gray-400 bg-transparent border-b border-gray-300 focus:outline-none truncate"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} // Directly using Zustand's setPhone
                />
                {phoneError && (
                  <span className="text-red-500 text-[10px] mt-0.5">
                    {phoneError}
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="text-black dark:text-white text-base font-medium truncate">
                {name}
              </p>
              <p className="text-gray-400 text-sm truncate">
                {isFa ? englishToPersianNumber(phone) : phone}
              </p>
            </>
          )}
        </span>
      </div>

      {/* Edit or Save button */}
      <div className="ms-2">
        {editing ? (
          <button
            onClick={handleSaveClick}
            className={`text-white text-xs py-1.5 px-3 bg-gray-500 hover:bg-gray-600 rounded-md transition-colors `}
          >
            {t("save")}
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <i className="bi bi-pen text-wood-dark dark:text-white"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileUserInfo;
