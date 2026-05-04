// components/OrderProgressBar.tsx
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";

// Progress steps
export const orderProgressSteps = [
  "orderConfirmed",
  "inProduction",
  "qualityCheck",
  "shipped",
  "delivered",
];

// i18n keys - ONLY contain keys, not translated values
export const orderProgressStepKeys = {
  orderConfirmed: "orders.progress.confirmed",
  inProduction: "orders.progress.inProduction",
  qualityCheck: "orders.progress.qualityCheck",
  shipped: "orders.progress.shipped",
  delivered: "orders.progress.delivered",
};

interface OrderProgressBarProps {
  currentStep: number; // 0-4
  orderStatus: string; // 'inProgress', 'delivered', ...
  className?: string;
}

const OrderProgressBar: React.FC<OrderProgressBarProps> = ({
  currentStep,
  orderStatus,
  className = "",
}) => {
  // Get t function here, needed for labels in both desktop and mobile views
  const { t } = useTranslation("orderHistory");
  const isFa = i18n.language === "fa";

  if (orderStatus !== "inProgress" || currentStep === undefined) return null;

  const validStep = Math.max(
    0,
    Math.min(currentStep, orderProgressSteps.length - 1),
  );

  const primaryColor = "#8a6a47";
  const lightPrimaryColor = "#d4c4b4";
  const neutralColorLight = "#e5e7eb";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative w-full ${className}`}
    >
      {/* Desktop Horizontal */}
      <div className="hidden md:flex relative items-center w-full p-4">
        {/* single base line */}
        <div className="absolute left-0 right-0 h-2 rounded-full bg-gray-200 top-5.5" />

        {/* active progress line */}
        <div
          className="absolute h-2 rounded-full top-5.5"
          style={{
            width: `${(validStep / (orderProgressSteps.length - 1)) * 100}%`,
            backgroundColor: primaryColor,
            left: isFa ? "auto" : 0,
            right: isFa ? 0 : "auto",
          }}
        />

        {orderProgressSteps.map((stepKey, index) => {
          const isCompleted = index <= validStep;
          const isCurrent = index === validStep;

          const backgroundColor = isCurrent
            ? lightPrimaryColor
            : isCompleted
              ? primaryColor
              : neutralColorLight;

          const textColor = isCurrent
            ? primaryColor
            : isCompleted
              ? "white"
              : "#6b7280";

          return (
            <motion.div
              key={stepKey}
              custom={index}
              variants={stepVariants}
              className="flex flex-col items-center flex-1 relative z-10"
            >
              {/* circle */}
              <motion.div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                style={{ backgroundColor, color: textColor }}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
              >
                {isCompleted
                  ? "✓"
                  : isFa
                    ? englishToPersianNumber(index + 1)
                    : index + 1}
              </motion.div>

              {/* label */}
              <motion.div
                className="mt-2 text-xs font-semibold text-center whitespace-nowrap"
                style={{
                  color: isCurrent
                    ? primaryColor
                    : isCompleted
                      ? "#6b7280"
                      : "#9ca3af",
                }}
              >
                {t(
                  orderProgressStepKeys[
                    stepKey as keyof typeof orderProgressStepKeys
                  ],
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Vertical */}
      <div
        className="md:hidden relative flex flex-col gap-6 py-4"
        style={{
          paddingLeft: isFa ? 0 : 32,
          paddingRight: isFa ? 32 : 0,
        }}
      >
        {/* base vertical line */}
        <div
          className="absolute top-0 bottom-0 w-2 rounded-full bg-gray-200"
          style={{
            left: isFa ? "auto" : "14px",
            right: isFa ? "14px" : "auto",
          }}
        />

        {/* active progress line */}
        <div
          className="absolute w-2 rounded-full"
          style={{
            top: 0,
            height: `${(validStep / (orderProgressSteps.length - 1)) * 100}%`,
            backgroundColor: primaryColor,
            left: isFa ? "auto" : "14px",
            right: isFa ? "14px" : "auto",
          }}
        />

        {orderProgressSteps.map((stepKey, index) => {
          const isCompleted = index <= validStep;
          const isCurrent = index === validStep;

          const backgroundColor = isCurrent
            ? lightPrimaryColor
            : isCompleted
              ? primaryColor
              : neutralColorLight;

          const textColor = isCurrent
            ? primaryColor
            : isCompleted
              ? "white"
              : "#6b7280";

          return (
            <motion.div
              key={stepKey}
              custom={index}
              variants={stepVariants}
              className="flex items-center relative z-10"
            >
              {/* circle */}
              <motion.div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                style={{ backgroundColor, color: textColor }}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
              >
                {isCompleted ? "✓" : index + 1}
              </motion.div>

              {/* label */}
              <div
                className="text-sm font-semibold dark:text-gray-300"
                style={{
                  marginLeft: isFa ? 0 : 12,
                  marginRight: isFa ? 12 : 0,
                }}
              >
                {t(
                  orderProgressStepKeys[
                    stepKey as keyof typeof orderProgressStepKeys
                  ],
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OrderProgressBar;
