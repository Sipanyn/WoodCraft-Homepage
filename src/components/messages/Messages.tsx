// src/components/Messages.tsx
import MessageCard from "@/components/messages/messageCard/MessageCard";
import { messages } from "@/constants/messageData";
import React from "react";
import { useTranslation } from "react-i18next";

const Messages: React.FC = () => {
  const { t } = useTranslation("messageData");
  return (
    <div className="rounded-xl   bg-white dark:bg-zinc-900 shadow-md p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {t("messages.messages")}
        </p>
      </div>

      <div className="flex flex-col divide-y divide-gray-100 dark:divide-neutral-700">
        {messages.map((message) => (
          <div key={message.id} className="py-4 first:pt-0 last:pb-0">
            <MessageCard messageData={message} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
